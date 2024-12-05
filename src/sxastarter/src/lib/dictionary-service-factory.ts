
import jssI18n from '@sitecore-jss/sitecore-jss/i18n';
import type { DictionaryService } from '@sitecore-jss/sitecore-jss/i18n';
import jss from '@sitecore-jss/sitecore-jss';
import config from '../temp/config';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-react';
import { createGraphQLClientFactory } from './graphql/graphql-create-client-factory';

const { RestDictionaryService, GraphQLDictionaryService} = jssI18n;
const { constants } = jss;

/**
 * Factory responsible for creating a DictionaryService instance
 */
export class DictionaryServiceFactory {  
  create(): DictionaryService {
    if(import.meta.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL){
      const clientFactory = createGraphQLClientFactory();
      
      return new GraphQLDictionaryService({
        siteName: config.jssAppName || config.sitecoreSiteName,
        /*
          The Dictionary Service needs a root item ID in order to fetch dictionary phrases for the current
          app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
          otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
        */
        //rootItemId: '{08D9417D-5071-46FF-896B-EB76B0790526}',
        cacheEnabled: false,
        clientFactory
      })
    } else {
      return new RestDictionaryService({
        apiHost: config.sitecoreApiHost,
        apiKey: config.sitecoreApiKey,
        siteName: config.sitecoreSiteName,
      });
    }
  }
}

/** DictionaryServiceFactory singleton */
export const dictionaryServiceFactory = new DictionaryServiceFactory();
