"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with balancesheets
 */
const BalanceSheet = use("App/Models/BalanceSheet");
const Profile = use("App/Models/Profile");

class BalanceSheetController {
  /**
   * Show a list of all balancesheets.
   * GET balancesheets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async index({ request, response, view, auth }) {
    const { user } = auth;
    const profile = await Profile.query().where("user_id", user.id).fetch();
    const balances = await BalanceSheet.query()
      .where("condominium_id", profile.rows[0].condominium_id)
      .fetch();
    return balances;
  }

  async store({ request, response, auth }) {
    const data = request.only([
      "name",
      "description",
      "file_id",
      "condominium_id",
    ]);
    const balance = await BalanceSheet.create(data);
    return balance;
  }
  async update({ params, request, response }) {
    const balance = await BalanceSheet.findOrFail(params.id);
    const data = request.only([
      "description",
      "name",
      "file_id",
      "condominium_id",
    ]);
    balance.merge(data);
    await balance.save();
    return balance;
  }

  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing balancesheet.
   * GET balancesheets/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update balancesheet details.
   * PUT or PATCH balancesheets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  /**
   * Delete a balancesheet with id.
   * DELETE balancesheets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const balance = await BalanceSheet.findOrFail(params.id);
    await balance.delete();
  }
}

module.exports = BalanceSheetController;
