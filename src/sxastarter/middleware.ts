import { rewrite } from '@vercel/edge';
import config from './src/temp/config.vercel.js';
import { languages } from './src/lib/languages.js';

export default function middleware(request: Request) {
  const url = new URL(request.url.toLowerCase());

  console.log("VERCEL EDGE MIDDLEWARE");
  if (request.url.indexOf(".js") === -1
    && request.url.indexOf(".css") === -1
    && request.url.indexOf(".ico") === -1
    && request.url.indexOf("site_") === -1) {
    const sites = [...config.sites, {
      "name": "Basic",
      "language": "en",
      "hostName": "deployment",
    }];
    
    for (const site of sites) {

      let path = url.pathname;


      let hasLanguage = false;
      console.log("VERCEL EDGE MIDDLEWARE LANGUAGE", languages);
      for (const language of languages) {
        console.log("VERCEL EDGE MIDDLEWARE LANGUAGE", language);
        if (url.pathname.startsWith("/" + language.toLocaleLowerCase())) {
          console.log("VERCEL EDGE MIDDLEWARE HAS LANGUAGE", language);
          hasLanguage = true;
        }
      }

      if (!hasLanguage) {
        path = `/${site.language}${path}`;
      }

      // https://github.com/Sitecore/Sitecore.Demo.XMCloud.Verticals/issues/251
      // Temporary fix for the issue above
      const hostname = site.hostName.replace("-basic", "-website");

      console.log("VERCEL EDGE MIDDLEWARE HOSTNAME", hostname);
      console.log("VERCEL EDGE MIDDLEWARE URL HOST", url.host);
      console.log("VERCEL EDGE MIDDLEWARE URL HOST STARTS WITH HOSTNAME", url.host.startsWith(hostname));

      if (url.host.startsWith(hostname)) {
        path = `/site_${site.name}${path}`;
        console.log("VERCEL EDGE MIDDLEWARE REWRITE", `${url.protocol}//${url.host}${path}`);
        return rewrite(`${url.protocol}//${url.host}${path}`);
      }

    }
  }
  console.log("VERCEL EDGE MIDDLEWARE END");
}