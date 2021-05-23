import { readLines } from "https://deno.land/std/io/mod.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";

const req = async () => {
  const resp = await fetch("https://api.github.com/users/denoland");
  console.log(`fetched: ${resp.status}, body id=${(await resp.json())?.id}`);
};

const run = async (): Promise<number> => {
  await req();
  const filename = Deno.args[0];
  if (!(await exists(filename))) {
    console.error("not exist : ", filename);
    return 1;
  }
  const fileReader = await Deno.open(filename);
  for await (const line of readLines(fileReader)) {
    console.log("==> ", line);
  }
  return 0;
};

const main = async () => {
  Deno.exit(await run());
};
main();
