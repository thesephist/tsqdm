# tsqdm

TQDM for TypeScript / Deno.

## Usage

Tsqdm exposes a single named export, `tqdm`, which can wrap any of:

- `Array<T>`
- `IterableIterator<T>`
- `AsyncIterableIterator<T>`

See `./main.ts` for some examples of usage wrapping different types of collections and iterables. For example:

```ts
// tqdm over an array
for await (const it of tqdm([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
  await new Promise((res) => setTimeout(res, 250));
}

const max = 100;
// tqdm over synchronous iterables
for await (const it of tqdm(range(max))) {}
for await (const it of tqdm(range(max), { label: "Count" })) {}
for await (const it of tqdm(range(max), { size: max })) {}
for await (const it of tqdm(range(max), { label: "Count", size: max })) {}
// tqdm over asynchronous iterables
for await (const it of tqdm(asyncRange(max))) {}
for await (const it of tqdm(asyncRange(max), { label: "Count" })) {}
for await (const it of tqdm(asyncRange(max), { size: max })) {}
for await (const it of tqdm(asyncRange(max), { label: "Count", size: max })) {}
```

## Why?

I needed a nice async iterable progress bar for running some of my long-running research jobs, and existing libraries like npm/tqdm either didn't seem well-maintained or didn't have types.

This is a pretty small library (~103 CLOC), so can easily be pulled into small scripts and projects.

