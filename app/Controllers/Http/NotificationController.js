"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Notification = use("App/Models/Notification");

class NotificationController {
  async index({ request, response, view, auth }) {
    const user = await auth.getUser();
    const profile = await user.profiles().first();

    const notifications = await Notification.query()
      .where("condominium_id", profile.condominium_id)
      .where("status", "active")
      .fetch();

    return notifications;
  }
  async all({ request, response, view, auth }) {
    const notifications = await Notification.all();

    return notifications;
  }

  async store({ request, response }) {
    const data = request.only(["condominium_id", "description", "title"]);
    const notification = await Notification.create(data);
    return notification;
  }

  async show({ params, request, response, view }) {
    const notification = await Notification.findOrFail(params.id);
    await notification.load("condominium");

    return notification;
  }

  async update({ params, request, response }) {
    const data = request.only([
      "condominium_id",
      "description",
      "name",
      "status",
    ]);
    const notification = await Notification.findOrFail(params.id);
    await notification.merge(data);
    await notification.save();
    return notification;
  }

  async destroy({ params, request, response }) {
    const notification = await Notification.findOrFail(params.id);
    await notification.delete();
  }
}

module.exports = NotificationController;
