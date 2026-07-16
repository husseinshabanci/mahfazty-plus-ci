import type { Schema, Struct } from '@strapi/strapi';

export interface NavigationCompanyLogo extends Struct.ComponentSchema {
  collectionName: 'components_navigation_company_logos';
  info: {
    displayName: 'Company Logo';
    icon: 'image';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface NavigationLink extends Struct.ComponentSchema {
  collectionName: 'components_navigation_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'navigation.company-logo': NavigationCompanyLogo;
      'navigation.link': NavigationLink;
    }
  }
}
