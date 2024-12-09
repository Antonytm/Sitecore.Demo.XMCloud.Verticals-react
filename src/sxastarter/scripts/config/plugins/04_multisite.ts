import type { IConfigPlugin, JssConfig } from "../config-generator";
import { GraphQLSiteInfoService, SiteInfo } from "@sitecore-jss/sitecore-jss/site";
import { GraphQLRequestClient } from "@sitecore-jss/sitecore-jss";

export const getEdgeProxyContentUrl = (
  sitecoreEdgeContextId: string,
  sitecoreEdgeUrl = "https://edge-platform.sitecorecloud.io"
) => `${sitecoreEdgeUrl}/v1/content/api/graphql/v1?sitecoreContextId=${sitecoreEdgeContextId}`;

/**
 * This plugin will set the "sites" config prop.
 * By default this will attempt to fetch site information directly from Sitecore (using the GraphQLSiteInfoService).
 * You could easily modify this to fetch from another source such as a static JSON file instead.
 */
class MultisitePlugin implements IConfigPlugin {
  order = 40;

  async execute(config: JssConfig): Promise<JssConfig> {
    console.log('MultisitePlugin executing');
    let sites: SiteInfo[] = [];
    console.log('Fetching site information');
    try {
      if (process.env.SITECORE_EDGE_CONTEXT_ID) {
        const siteInfoService = new GraphQLSiteInfoService({
          clientFactory: GraphQLRequestClient.createClientFactory({
            endpoint: getEdgeProxyContentUrl(process.env.SITECORE_EDGE_CONTEXT_ID),
            apiKey: "not-needed",
          })
        });
        sites = await siteInfoService.fetchSiteInfo();
        console.log('Fetched site information from Sitecore Edge');
      }
    } catch (error) {
      console.error('Error fetching site information');
      console.error(error);
    }

    return Object.assign({}, config, {
      sites: JSON.stringify(sites),
    });
  }
}

export const multisitePlugin = new MultisitePlugin();