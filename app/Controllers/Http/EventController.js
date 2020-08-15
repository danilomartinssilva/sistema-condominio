"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with events
 */
const Event = use("App/Models/Event");
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
    const events = await Event.query().with("user").fetch({
      user_id: auth.user.id,
    });
    return events;
  }

  async store({ request, response, auth }) {
    const data = request.only(["description", "start_date_event"]);
    const issetEvent = await Event.findBy({
      start_date_event: data.start_date_event,
    });

    if (issetEvent) {
      return response.json({
        message: "Já existe um evento, registrado para o mesmo período",
      });
    }
    const event = Event.create({ ...data, user_id: auth.user.id });
    return event;
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
    const data = request.only(["description", "start_date_event"]);

    event.merge(data);
    await event.save();
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
