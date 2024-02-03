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

Running `deno run main.ts` shows the following styles of progress bars:

```
$ deno run main.ts
100.0% |████████████████| 9/9 | 2.28>0.00s 3.95it/s
100 | 4.71s 21.23it/s
Count: 100 | 4.76s 21.03it/s
100.0% |████████████████| 100/100 | 4.83>0.00s 20.72it/s
Count: 100.0% |████████████████| 100/100 | 4.70>0.00s 21.29it/s
100 | 3.46s 28.94it/s
Count: 100 | 3.50s 28.60it/s
100.0% |████████████████| 100/100 | 3.44>0.00s 29.10it/s
Count: 100.0% |████████████████| 100/100 | 3.53>0.00s 28.34it/s
```

## Why?

I needed a nice async iterable progress bar for running some of my long-running research jobs, and existing libraries like npm/tqdm either didn't seem well-maintained or didn't have types.

This is a pretty small library (~103 CLOC), so can easily be pulled into small scripts and projects.

