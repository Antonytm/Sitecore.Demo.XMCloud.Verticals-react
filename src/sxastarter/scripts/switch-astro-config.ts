import fs from "fs";

if (process.env.VERCEL){
  // Remove astro.config.mjs
  fs.unlinkSync("./astro.config.mjs");
  // Rename astro.config.vercel.mjs to astro.config.mjs
  fs.renameSync("./astro.config.vercel.mjs", "./astro.config.mjs");
}