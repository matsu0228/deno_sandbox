import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { StringReader } from "https://deno.land/std@0.97.0/io/mod.ts";
import { head } from "./headd.ts";

type TestData = {
  name: string;
  in: Deno.Reader;
  option?: number;
  expected: string[];
};

Deno.test("head", async () => {
  const testData: TestData[] = [
    {
      name: "without count option",
      in: new StringReader("aaa \nbbb \nccc"),
      expected: ["1: aaa ", "2: bbb ", "3: ccc"],
    },
    {
      name: "入力よりも指定行数がすくないとき",
      in: new StringReader("aaa \nbbb \nccc"),
      option: 2,
      expected: ["1: aaa ", "2: bbb "],
    },
    {
      name: "入力よりも指定行数が多いとき",
      in: new StringReader("aaa \nbbb \nccc"),
      option: 1000,
      expected: ["1: aaa ", "2: bbb ", "3: ccc"],
    },
  ];
  for (const t of testData) {
    const actual = await head(t.in, t.option ?? null);
    assertEquals(t.expected, actual, t.name);
  }
});
