"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with events
 */
const Event = use("App/Models/Event");
const { isAfter, parseISO } = require("date-fns");
class EventController {
  /**
   * Show a list of all events.
   * GET events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const events = await Event.query()
      .where("user_id  ", auth.user.id)
      .with("user")
      .fetch();

    return events;
  }
  async all({ request, response, view, auth }) {
    const events = await Event.query()

      .with("user")
      .fetch();

    return events;
  }

  async store({ request, response, auth }) {
    const data = request.only(["description", "start_date_event", "ambient"]);

    if (isAfter(new Date(), new Date(data.start_date_event))) {
      return response.status(500).json({
        message: "A data do evento, deve ser maior que a data de hoje",
      });
    }

    const issetEvent = await Event.findBy({
      start_date_event: data.start_date_event,
    });

    if (issetEvent) {
      return response.status(500).json({
        message: "Já existe um evento, registrado para o mesmo período",
      });
    }
    const event = await Event.create({ ...data, user_id: auth.user.id });

    const event_added = await Event.findOrFail(event.id);
    await event_added.load("user");
    return event_added;
  }

  /**
   * Display a single event.
   * GET events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const event = await Event.findOrFail(params.id);
    await event.load("user");

    return event;
  }

  /**
   * Render a form to update an existing event.
   * GET events/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Update event details.
   * PUT or PATCH events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const event = await Event.findOrFail(params.id);
    const data = request.only(["description", "start_date_event", "status"]);

    event.merge(data);
    await event.save();
    await event.load("user");
    return event;
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const event = await Event.findOrFail(params.id);
    await event.delete();
  }
}

module.exports = EventController;
