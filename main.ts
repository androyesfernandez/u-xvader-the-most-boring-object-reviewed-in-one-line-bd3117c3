// The Most Boring Object, Reviewed in One Line
// Writes a single one-line review of the most boring object (a paperclip)
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The paperclip holds two pages together for a living, then spends the rest of its life bent open in a drawer, holding nothing, like a tiny metal shrug.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

// Validate the line before writing.
if (LINE.length === 0 || LINE.trim().length === 0) {
  throw new Error("review line must not be empty or only whitespace");
}
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`review line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("review line must be a single line");
}
if (/[\x00-\x1f\x7f]/.test(LINE)) {
  throw new Error("review line must not contain control characters");
}

// Write with no trailing newline, then verify byte-identical round-trip.
writeFileSync(outPath, LINE, "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("verification failed: output does not match the review line");
}
console.log(`Wrote ${LINE.length} characters to ${outPath}`);
