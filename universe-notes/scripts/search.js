import { readFile } from "node:fs/promises";

const searchTerm = process.argv.slice(2).join(" ").trim();

if (!searchTerm) {
  console.error("Usage: npm run search -- <word>");
  process.exitCode = 1;
} else {
  const notesUrl = new URL("../notes/keynote-highlights.json", import.meta.url);
  const { highlights } = JSON.parse(await readFile(notesUrl, "utf8"));
  const query = searchTerm.toLowerCase();
  const matches = highlights.filter(
    ({ title, summary }) =>
      title.toLowerCase().includes(query) || summary.toLowerCase().includes(query),
  );

  if (matches.length === 0) {
    console.log(`No highlights found for "${searchTerm}".`);
  }

  for (const { topic, title, summary } of matches) {
    console.log(`${title} (${topic})\n  ${summary}`);
  }
}
