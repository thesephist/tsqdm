import { tqdm } from "../tqdm";

describe("tqdm", () => {
  let mockWrite: jest.Mock;

  beforeEach(() => {
    mockWrite = jest.fn();
    const processStdout = { write: mockWrite };
    (global as any).process = { stdout: processStdout };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should handle arrays", async () => {
    const arr = [1, 2, 3];
    const result: number[] = [];

    for await (const item of tqdm(arr)) {
      result.push(item);
    }

    expect(result).toEqual([1, 2, 3]);
    expect(mockWrite).toHaveBeenCalled();
  });

  test("should handle iterables", async () => {
    function* range(n: number): IterableIterator<number> {
      for (let i = 0; i < n; i++) {
        yield i;
      }
    }

    const result: number[] = [];
    for await (const item of tqdm(range(3))) {
      result.push(item);
    }

    expect(result).toEqual([0, 1, 2]);
    expect(mockWrite).toHaveBeenCalled();
  });

  test("should respect custom label", async () => {
    const arr = [1, 2];
    const label = "Test Progress";

    for await (const item of tqdm(arr, { label })) {
      void item;
    }

    // Verify that at least one call to write included our label
    expect(
      mockWrite.mock.calls.some((call) => call[0].toString().includes(label)),
    ).toBe(true);
  });

  test("should respect custom width", async () => {
    const arr = [1, 2];
    const width = 32; // double the default

    for await (const item of tqdm(arr, { width })) {
      void item;
    }

    // The progress bar should be longer with larger width
    const lastCall =
      mockWrite.mock.calls[mockWrite.mock.calls.length - 2][0].toString();
    expect(lastCall.length).toBeGreaterThan(50); // arbitrary number that should be true for width=32
  });

  test("should handle async iterables", async () => {
    async function* asyncRange(n: number): AsyncIterableIterator<number> {
      for (let i = 0; i < n; i++) {
        yield i;
      }
    }

    const result: number[] = [];
    for await (const item of tqdm(asyncRange(3))) {
      result.push(item);
    }

    expect(result).toEqual([0, 1, 2]);
    expect(mockWrite).toHaveBeenCalled();
  });
});
