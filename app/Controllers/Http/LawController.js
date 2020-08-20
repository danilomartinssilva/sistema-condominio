"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with laws
 */
const Law = use("App/Models/Law");
const Profile = use("App/Models/Profile");
class LawController {
  /**
   * Show a list of all laws.
   * GET laws
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const { user } = auth;
    const profile = await Profile.query().where("user_id", user.id).fetch();

    const laws = await Law.query()
      .where("condominium_id", profile.rows[0].condominium_id)
      /*   .with("file")
      .with("condominium") */
      .fetch();

    return laws;
  }

  /**
   * Create/save a new law.
   * POST laws
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { user } = auth;
    const profile = await Profile.query().where("user_id", user.id).fetch();
    const data = request.only([
      "name",
      "description",
      "file_id",
      "condominium_id",
    ]);
    const law = await Law.create(data);
    return law;
  }

  /**
   * Display a single law.
   * GET laws/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const laws = await Law.findOrFail(params.id);
    await laws.load("condominium");
    await laws.load("file");
    return laws;
  }

  async update({ params, request, response }) {
    const law = await Law.findOrFail(params.id);
    const data = request.only([
      "description",
      "name",
      "file_id",
      "condominium_id",
    ]);
    law.merge(data);
    await law.save();
    return law;
  }

  /**
   * Delete a law with id.
   * DELETE laws/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const law = await Law.findOrFail(params.id);
    await law.delete();
  }
}

module.exports = LawController;
