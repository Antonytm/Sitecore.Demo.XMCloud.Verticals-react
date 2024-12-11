/**
 * @type {import("astro").MiddlewareHandler}
 */
import { sitePrefixIdentifier } from "@/lib/constants";
import { languages } from "@/lib/languages";
import config from "@/temp/config";
import { defineMiddleware } from "astro/middleware";

export const multisite = defineMiddleware((context, next) => {

  const request = context.request;
  console.log('Is Astro middleware working?');
  const url = new URL(request.url.toLowerCase());

  if (request.url.indexOf(".js") === -1
    && request.url.indexOf(".css") === -1
    && request.url.indexOf(".ico") === -1
    && request.url.indexOf("site_") === -1) {
    const sites = [...config.sites, {
      "name": "Basic",
      "language": "en",
      "hostName": "deployment",
    }];
    console.log('Sites:', sites);
    for (const site of sites) {
      console.log('Site:', site);
      let path = url.pathname;
      let hasLanguage = false;
      for (const language of languages) {
        if (url.pathname.startsWith("/" + language.toLocaleLowerCase())) {
          hasLanguage = true;
        }
      }

      if (!hasLanguage) {
        path = `/${site.language}${path}`;
      }

      // https://github.com/Sitecore/Sitecore.Demo.XMCloud.Verticals/issues/251
      // Temporary fix for the issue above
      const hostname = site.hostName.replace("-basic", "-website");

      console.log('Hostname:', hostname);
      console.log('url.host:', url.host);
      if (url.host.startsWith(hostname)) {
        path = `/site_${site.name}${path}`;
        console.log('REWRITE:', `${url.protocol}//${url.host}${path}`.toLowerCase());
        return context.rewrite(`${url.protocol}//${url.host}${path}`.toLowerCase());
      }
    }
  }

  return next();
});