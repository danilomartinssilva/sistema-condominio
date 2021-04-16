'use strict'

const CondominiumManual = use("App/Models/CondominiumManual");

class CondominiumManualController {


   /**
   * Show a list of all condominiummanuals.
   * GET condominiummanuals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async index({ request, response, view, auth }) {
      const user = await auth.getUser();
      const profile = await user.profiles().first();
      const manuals = await CondominiumManual.query()
        .where("condominium_id", profile.condominium_id)
        .with('file')
        .fetch();

      return manuals;
    }
    async getAll({ request, response, view }) {
      const manuals = await CondominiumManual.all();

      return manuals;
    }

    async store({ request, response }) {
      const data = request.only(["description", "name", "condominium_id"]);
      const manuals = await CondominiumManual.create(data);

      return manuals;
    }

    async show({ params, request, response, view }) {
      const manuals = await CondominiumManual.query()
        .where("id", params.id)

        .first();

      await manuals.load("condominium");
      await manuals.load('file')
      return manuals;
    }

    async update({ params, request, response }) {
      const manuals = await CondominiumManual.find(params.id);
      const data = request.only(["subject", "user_id", "description"]);
      await manuals.merge(data);
      await manuals.save();
      return manuals;
    }

    async destroy({ params, request, response }) {
      const manuals = await CondominiumManual.find(params.id);
      await manuals.delete();
    }

}

module.exports = CondominiumManualController
