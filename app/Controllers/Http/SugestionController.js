"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sugestions
 */
const Sugestion = use("App/Models/Sugestion");
class SugestionController {
  /**
   * Show a list of all sugestions.
   * GET sugestions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async index({ request, response, view }) {
    const sugestions = await Sugestion.all();

    return sugestions;
  }

  /**
   * Render a form to be used for creating a new sugestion.
   * GET sugestions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new sugestion.
   * POST sugestions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      "subject",
      "user_id",
      "description",
      "condominium_id",
    ]);
    const sugestion = await Sugestion.create(data);
    return sugestion;
  }

  /**
   * Display a single sugestion.
   * GET sugestions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const sugestion = await Sugestion.query().where("id", params.id).first();
    await sugestion.load("user");
    await sugestion.load("condominium");
    return sugestion;
  }

  async update({ params, request, response }) {
    const sugestion = await Sugestion.find(params.id);
    const data = request.only(["subject", "user_id", "description"]);
    await sugestion.merge(data);
    await sugestion.save();
    return sugestion;
  }

  /**
   * Delete a sugestion with id.
   * DELETE sugestions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const sugestion = await Sugestion.find(params.id);
    await sugestion.delete();
  }
}

module.exports = SugestionController;
