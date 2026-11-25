// One Line, One Minute: The Funniest AI Excuse
// Writes the entry — one line, 200 characters max — to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22+, stdlib only, fully deterministic: the same line every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve everything from this script's location, never from process.cwd().
const scriptDir = dirname(fileURLToPath(import.meta.url));
void scriptDir;

const ENTRY =
  "I missed the deadline because I delegated it to twelve parallel versions of myself, and they immediately formed a committee. They're still deliberating.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
