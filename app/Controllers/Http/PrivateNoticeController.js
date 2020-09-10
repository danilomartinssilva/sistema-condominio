"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PrivateNotice = use("App/Models/PrivateNotice");

class PrivateNoticeController {
  async index({ request, response, view, auth }) {
    const user = await auth.getUser();

    const notices = await PrivateNotice.query()
      .where("user_id", user.id)
      .fetch();
    return notices;
  }

  async all({ request, response, view, auth, params }) {
    const notices = await PrivateNotice.query()
      .where("condominium_id", params.condominium_id)
      .fetch();

    return notices;
  }
  async store({ request, response }) {
    const data = request.only([
      "title",
      "description",
      "condominium_id",
      "user_id",
    ]);

    const notice = await PrivateNotice.create(data);
    return notice;
  }

  async show({ params, request, response, view }) {
    const notice = await PrivateNotice.findOrFail(params.id);
    await notice.load("user");
    await notice.load("condominium");
    return notice;
  }

  async update({ params, request, response }) {
    const data = request.only(
      "title",
      "description",
      "condominium_id",
      "user_id"
    );
    const notice = await PrivateNotice.findOrFail(params.id);
    await notice.merge(data);
    await notice.save();
    return notice;
  }

  async destroy({ params, request, response }) {
    const notice = await PrivateNotice.findOrFail(params.id);
    notice.destroy();
  }
}

module.exports = PrivateNoticeController;
