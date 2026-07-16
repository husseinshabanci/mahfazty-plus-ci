'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
      select: ['id', 'type'],
    });

    if (!publicRole) return;

    const action = 'api::landing-page.landing-page.find';
    const existingPermission = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: {
        action,
        role: publicRole.id,
      },
      select: ['id'],
    });

    if (existingPermission) return;

    const permission = await strapi.db.query('plugin::users-permissions.permission').create({
      data: {
        action,
        enabled: true,
        role: publicRole.id,
      },
    });

    await strapi.db.connection('up_permissions_role_lnk').insert({
      permission_id: permission.id,
      role_id: publicRole.id,
    });
  },
};
