import { rewrite } from '@vercel/edge';
import config from "@/temp/config";

export default function middleware(request: Request) {
  console.log(request);
  console.log(request.url);
  console.log(new URL(request.url));
  console.log(new URL(request.url).host);
  console.log(new URL(request.url).pathname);

  console.log("VERCEL EDGE MIDDLEWARE");
  if (request.url.indexOf(".js") === -1
    && request.url.indexOf(".css") === -1
    && request.url.indexOf("site_") === -1) {
    if (config.sites) {
      const sites = JSON.parse(config.sites);
      const url = new URL(request.url);
      for (const site of sites) {
        if (request.url.indexOf(site.hostName) > 0) {
          return rewrite(request.url.replace(site.hostName, site.hostName + "/site_" + site.name));
        }
      }
    }
  }
  console.log("VERCEL EDGE MIDDLEWARE END");
}