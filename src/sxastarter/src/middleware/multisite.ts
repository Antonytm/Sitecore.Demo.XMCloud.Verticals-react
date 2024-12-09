import { sitePrefixIdentifier } from "@/lib/constants";
import config from "@/temp/config";
import { defineMiddleware } from "astro/middleware";

export const multisite = defineMiddleware((context: any, next) => {
  console.log("-----------------");
  console.log(context.request);
  console.log("-----------------");
  if (context.request.url.indexOf(sitePrefixIdentifier) > 0) {
    return next();
  }
  if (config.sites) {
    const sites = JSON.parse(config.sites);
    for (const site of sites) {
      console.log("compare site names");
      console.log(site.name);
      console.log(context.request.url);
      console.log(site.hostName);
      if (context.request.url.indexOf(site.hostName) > 0) {
        const url = `/${sitePrefixIdentifier}${context.request.url.pathname}`;
        console.log("new url");
        console.log(url);
        return context.rewrite(new Request(url));
      }
    }
  }

  return next();
});