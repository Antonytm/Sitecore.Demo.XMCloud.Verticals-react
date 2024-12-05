import fs from "fs";

if (process.env.VERCEL){
  fs.unlinkSync("./astro.config.mjs");
  fs.renameSync("./astro.config.mjs.vercel", "./astro.config.mjs");
}