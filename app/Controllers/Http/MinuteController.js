'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with minutes
 */
const Minute = use('App/Models/Minute')
const Profile = use('App/Models/Profile')
class MinuteController {
  /**
   * Show a list of all minutes.
   * GET minutes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const { user } = auth
    const profile = await Profile.query()
      .where('user_id', user.id)
      .fetch()

    const minutes = await Minute.query()
      .where('condominium_id', profile.rows[0].condominium_id)
      /*   .with("file")
      .with("condominium") */
      .fetch()

    return minutes
  }

  /**
   * Render a form to be used for creating a new minute.
   * GET minutes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {}

  /**
   * Create/save a new minute.
   * POST minutes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const { user } = auth
    const profile = await Profile.query()
      .where('user_id', user.id)
      .fetch()
    const data = request.only([
      'name',
      'description',
      'file_id',
      'condominium_id'
    ])
    const minute = await Minute.create(data)
    return minute
  }

  /**
   * Display a single minute.
   * GET minutes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const minutes = await Minute.findOrFail(params.id)
    await minutes.load('condominium')
    await minutes.load('file')
    return minutes
  }

  /**
   * Render a form to update an existing minute.
   * GET minutes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {}

  /**
   * Update minute details.
   * PUT or PATCH minutes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const minute = await Minute.findOrFail(params.id)
    const data = request.only([
      'description',
      'name',
      'file_id',
      'condominium_id'
    ])
    minute.merge(data)
    await minute.save()
    return minute
  }

  /**
   * Delete a minute with id.
   * DELETE minutes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const minute = await Minute.findOrFail(params.id)
    await minute.delete()
  }
}

module.exports = MinuteController
