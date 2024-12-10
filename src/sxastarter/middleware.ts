import { rewrite } from '@vercel/edge';
const config = require("./src/temp/config.vercel.js");

export default function middleware(request: Request) {
  console.log(request);
  const url = new URL(request.url);
  console.log(url.host);
  console.log(url.pathname);

  console.log("VERCEL EDGE MIDDLEWARE");
  if (request.url.indexOf(".js") === -1
    && request.url.indexOf(".css") === -1
    && request.url.indexOf(".ico") === -1
    && request.url.indexOf("site_") === -1) {
    console.log("config.sites", JSON.stringify(config.sites));
    const sites = config.sites;
    const url = new URL(request.url);
    for (const site of sites) {
      if (request.url.indexOf(site.hostName) > 0) {
        return rewrite(request.url.replace(site.hostName, site.hostName + "/site_" + site.name));
      }
    }
  }
  console.log("VERCEL EDGE MIDDLEWARE END");
}