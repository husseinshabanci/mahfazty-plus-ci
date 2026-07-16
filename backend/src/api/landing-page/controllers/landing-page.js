'use strict';

/**
 * landing-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::landing-page.landing-page', ({ strapi }) => ({
  async find(ctx) {
    const uid = 'api::landing-page.landing-page';
    const locale = ctx.query?.locale || 'en';
    const document = await strapi.documents(uid).findFirst({
      locale,
      status: 'published',
      populate: {
        navLinks: true,
        companyLogos: {
          populate: {
            logo: true,
          },
        },
        logoImage: true,
        heroImage: true,
      },
    });

    if (!document) {
      return { data: null, meta: {} };
    }

    const sanitizedDocument = await this.sanitizeOutput(document, ctx);
    return this.transformResponse(sanitizedDocument);
  },
}));
