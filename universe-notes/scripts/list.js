import { readFile } from "node:fs/promises";

const notesUrl = new URL("../notes/keynote-highlights.json", import.meta.url);
const { highlights } = JSON.parse(await readFile(notesUrl, "utf8"));
const topics = new Map();

for (const { topic, title } of highlights) {
  const titles = topics.get(topic) ?? [];
  titles.push(title);
  topics.set(topic, titles);
}

for (const [topic, titles] of topics) {
  console.log(topic);
  for (const title of titles) {
    console.log(`  - ${title}`);
  }
}
