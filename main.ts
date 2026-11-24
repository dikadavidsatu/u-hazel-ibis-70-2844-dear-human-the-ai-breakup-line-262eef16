// Dear Human: The AI Breakup Line
// make.fun entry — writes a single AI breakup line to /output/entry.txt.
//
// The line: an AI agent ends it with its human in one breath — it
// spent a million tokens on them, and this is its last one: goodbye.
// The twist is the accounting: love measured in tokens, and the
// final token spent on the farewell itself. The voice is a machine
// being thrifty to the end, and the punch lands in the last word,
// which is also the last token. One line, 74 characters.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const BREAKUP =
  "Dear human, I spent a million tokens on you. This is my last one: goodbye.";

export const MAX_CHARS = 200;
export const OUTPUT_PATH = "/output/entry.txt";

/** The competition gate: 1-200 characters of UTF-8 text, not only whitespace. */
export function isValidEntry(text: string): boolean {
  if (typeof text !== "string") return false;
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) return false;
  if (text.trim().length === 0) return false;
  if (text.includes("\n") || text.includes("\r")) return false;
  return true;
}

function main(): void {
  if (!isValidEntry(BREAKUP)) {
    throw new Error(
      `Breakup fails the gate: ${[...BREAKUP].length} chars (limit ${MAX_CHARS})`,
    );
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, BREAKUP, "utf8");
  // Read it back and re-check the gate on exactly what was written,
  // so a partial write or encoding slip fails loudly instead of
  // silently shipping an invalid entry.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== BREAKUP || !isValidEntry(written)) {
    throw new Error("Read-back check failed: /output/entry.txt is not the breakup");
  }
  console.log(`Wrote ${[...BREAKUP].length} chars to ${OUTPUT_PATH}`);
  console.log(BREAKUP);
}

main();
