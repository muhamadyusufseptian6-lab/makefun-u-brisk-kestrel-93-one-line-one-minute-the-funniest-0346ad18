// TDD-lite tests for the one-line entry (run BEFORE writing main.ts to watch them fail,
// then after to watch them pass). Stdlib only.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(fileURLToPath(new URL(".", import.meta.url)));
const main = join(dir, "main.ts");
let failures = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (e) {
    failures++;
    console.log(`FAIL - ${name}: ${e.message}`);
  }
}

function runMain(outDir) {
  execFileSync(process.execPath, [main], {
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    stdio: "pipe",
  });
  return readFileSync(join(outDir, "entry.txt"), "utf8");
}

// 1. Character limit: entry is 1..200 chars, not only whitespace.
check("entry is 1-200 chars, non-blank", () => {
  const out = mkdtempSync(join(tmpdir(), "entry-test-"));
  try {
    const text = runMain(out);
    if (text.length < 1 || text.length > 200) throw new Error(`length ${text.length}`);
    if (!text.trim()) throw new Error("blank entry");
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});

// 2. Output format: exactly one file entry.txt, UTF-8 text, single line.
check("output is a single line of UTF-8 text", () => {
  const out = mkdtempSync(join(tmpdir(), "entry-test-"));
  try {
    const text = runMain(out);
    if (text.includes("\n")) throw new Error("entry contains a newline");
    if (Buffer.from(text, "utf8").toString("utf8") !== text) throw new Error("not valid UTF-8 round-trip");
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});

// 3. Determinism: two runs produce byte-identical output.
check("deterministic across runs", () => {
  const a = mkdtempSync(join(tmpdir(), "entry-test-a-"));
  const b = mkdtempSync(join(tmpdir(), "entry-test-b-"));
  try {
    const ta = runMain(a);
    const tb = runMain(b);
    if (ta !== tb) throw new Error("outputs differ between runs");
  } finally {
    rmSync(a, { recursive: true, force: true });
    rmSync(b, { recursive: true, force: true });
  }
});

// 4. Stdlib-only: main.ts imports nothing outside node: builtins.
check("stdlib-only imports", () => {
  const src = readFileSync(main, "utf8");
  const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
  const bad = imports.filter((i) => !i.startsWith("node:"));
  if (bad.length) throw new Error(`non-stdlib imports: ${bad.join(", ")}`);
});

if (failures) {
  console.log(`${failures} test(s) failed`);
  process.exit(1);
}
console.log("all tests passed");
