import { tqdm } from "./src/tqdm.ts";

function* range(n: number, burn: number = 100000000): IterableIterator<number> {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < burn; j++) {}
    yield i;
  }
}

async function* asyncRange(
  n: number,
  latencyMs: number = 32,
): AsyncIterableIterator<number> {
  for (let i = 0; i < n; i++) {
    await new Promise((res) => setTimeout(res, latencyMs));
    yield i;
  }
}

for await (const it of tqdm([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
  await new Promise((res) => setTimeout(res, 250));
}
const max = 100;
for await (const it of tqdm(range(max))) {}
for await (const it of tqdm(range(max), { label: "Count" })) {}
for await (const it of tqdm(range(max), { size: max })) {}
for await (const it of tqdm(range(max), { label: "Count", size: max })) {}
for await (const it of tqdm(asyncRange(max))) {}
for await (const it of tqdm(asyncRange(max), { label: "Count" })) {}
for await (const it of tqdm(asyncRange(max), { size: max })) {}
for await (const it of tqdm(asyncRange(max), { label: "Count", size: max })) {}
console.log("done.");
