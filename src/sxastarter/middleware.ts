import { rewrite } from '@vercel/edge';
const config = {};
config.sitecoreSiteName = import.meta.env.SITECORE_SITE_NAME || 'astro';
config.sitecoreApiKey = import.meta.env.SITECORE_API_KEY || '{6D3F291E-66A5-4703-887A-D549AF83D859}';
config.sitecoreApiHost = import.meta.env.SITECORE_API_HOST || 'https://xmcloudcm.localhost';
config.graphQLEndpointPath = import.meta.env.GRAPH_QL_ENDPOINT_PATH || '/sitecore/api/graph/edge';
config.graphQLEndpoint = import.meta.env.GRAPH_QL_ENDPOINT || 'https://xmcloudcm.localhost/sitecore/api/graph/edge';
config.rootItemId = import.meta.env.ROOT_ITEM_ID || '{A13C890B-43EA-45E2-8BAD-A8838112B83D}';
config.defaultLanguage = import.meta.env.DEFAULT_LANGUAGE || 'en';
config.fetchWith = import.meta.env.FETCH_WITH || 'GraphQL';
config.publicUrl = import.meta.env.PUBLIC_URL || 'services.sxastarter.localhost';
config.jssAppName = import.meta.env.JSS_APP_NAME || 'Services';
config.sitecoreEdgeUrl = import.meta.env.SITECORE_EDGE_URL || 'https://edge-platform.sitecorecloud.io';
config.sitecoreEdgeContextId = import.meta.env.SITECORE_EDGE_CONTEXT_ID || '75g8icASszahzLRs2UAEZa';
config.sites = import.meta.env.SITES || '[{"name":"Basic","hostName":"deployment-4nu2c4veudc0r9aare0a-basic.vercel.app","language":"en"},{"name":"Financial","hostName":"deployment-4nu2c4veudc0r9aare0a-financial.vercel.app","language":"en"},{"name":"Services","hostName":"deployment-4nu2c4veudc0r9aare0a-services.vercel.app","language":"en"}]';


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