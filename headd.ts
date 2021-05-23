import { readLines } from "https://deno.land/std/io/mod.ts";

export const head = async (
  stdin: Deno.Reader,
  count: number | null
): Promise<string[]> => {
  const display: string[] = [];
  // console.log("count: ", count, typeof count);
  let i = 0;
  for await (const line of readLines(stdin)) {
    i++;
    display.push(`${i}: ${line}`);
    if (Boolean(count) && count != null && i >= count) {
      break;
    }
  }
  return display;
};
