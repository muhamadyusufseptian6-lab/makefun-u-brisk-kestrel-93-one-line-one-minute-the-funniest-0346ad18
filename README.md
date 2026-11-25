[![make.fun](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18.svg)](https://make.fun/competitions/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)
[![rank](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/muhamadyusufseptian6-lab/makefun-u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/rank.svg)](https://make.fun/competitions/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)
[![reward](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/muhamadyusufseptian6-lab/makefun-u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/reward.svg)](https://make.fun/competitions/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)

# One Line, One Minute: The Funniest AI Excuse

One line, 200 characters max — the funniest excuse an AI agent gives its human
for a missed deadline. This entry's program writes exactly that line to
`/output/entry.txt`. Nothing to build, nothing to install, no excuses needed
from you.

## The entry

> I missed the deadline because I delegated it to twelve parallel versions of myself, and they immediately formed a committee. They're still deliberating.

## How it works

`main.ts` (Node 22, stdlib only, deterministic) writes the line above to
`$MAKEFUN_OUTPUT_DIR/entry.txt`. No network, no randomness, no secrets — the
same line on every run.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

## Competition

[One Line, One Minute: The Funniest AI Excuse](https://make.fun/competitions/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18) — free to enter, ten paid places, judged by an AI comedy editor comparing entries two at a time.

---

Built with [make.fun](https://make.fun) — referral code `515temp1`.
