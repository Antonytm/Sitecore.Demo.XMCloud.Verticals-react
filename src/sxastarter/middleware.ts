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
    const sites = config.sites;
    for (const site of sites) {

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
      const hostname = (site.hostName.indexOf("-basic") > -1)
        ? site.hostName
        : site.hostName.replace("-basic", "-website");

      if (url.host.startsWith(hostname)) {
        path = `/site_${site.name}${path}`;
        console.log("VERCEL EDGE MIDDLEWARE REWRITE", `${url.protocol}//${url.host}${path}`);
        return rewrite(`${url.protocol}//${url.host}${path}`);
      }

    }
  }
  console.log("VERCEL EDGE MIDDLEWARE END");
}