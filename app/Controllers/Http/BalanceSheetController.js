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

  async index({ auth }) {
    const user = await auth.getUser();
    await user.loadMany(["roles", "profiles"]);
    const userProfile = await user.profiles().first();
    const balances = await BalanceSheet.query()
      .where("condominium_id", userProfile.condominium_id)
      .fetch();
    return balances;
  }
  async all({ auth }) {
    const balances = await BalanceSheet.query().with("condominium").fetch();
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
    await balance.load("condominium");
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

  async show({ params, request, response, view }) {
    const balance = await BalanceSheet.findOrFail(params.id);
    await balance.load("condominium");
    await balance.load("file");
    return balance;
  }

  async destroy({ params, request, response }) {
    const balance = await BalanceSheet.findOrFail(params.id);
    await balance.delete();
  }
}

module.exports = BalanceSheetController;
