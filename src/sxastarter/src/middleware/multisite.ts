import { sitePrefixIdentifier } from "@/lib/constants";
import config from "@/temp/config";
import { defineMiddleware } from "astro/middleware";

export const multisite = defineMiddleware((context: any, next) => {
  if(context.request.url.indexOf(sitePrefixIdentifier) > 0){
    return next();
  }
  if (config.sites) {
    const sites = JSON.parse(config.sites);
    for (const site of sites) {
      if(site.hostName === context.request.url.hostname){
        const url = `/${sitePrefixIdentifier}${context.request.url.pathname}`;
        return context.rewrite(new Request(url));
      }
    }
  }

  return next();
});