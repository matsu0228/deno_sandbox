import Denomander from "https://deno.land/x/denomander/mod.ts";
import { StringReader } from "https://deno.land/std@0.97.0/io/mod.ts";

import { head } from "./headd.ts";

const run = async (): Promise<number> => {
  const program = new Denomander({
    app_name: "Headd is UNIX head command written by Deno",
    app_description: "Headd is UNIX head command written by Deno",
    app_version: "1.0.0",
  });
  program
    .command("headd", "display first lines of a file")
    .option("-n --count", "lines")
    .parse(Deno.args);

  const lines = await head(Deno.stdin, program.count);
  await Deno.copy(new StringReader(lines.join("\n")), Deno.stdout);

  return 0;
};

Deno.exit(await run());
