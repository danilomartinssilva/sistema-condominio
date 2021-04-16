'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with regulaments
 */
const Profile = use('App/Models/Profile')
const Regulament = use('App/Models/Regulament')
class RegulamentController {
  /**
   * Show a list of all regulaments.
   * GET regulaments
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

    const regulaments = await Regulament.query()
      .where('condominium_id', profile.rows[0].condominium_id)
      /*   .with("file")
      .with("condominium") */
      .fetch()

    return regulaments
  }

  /**
   * Render a form to be used for creating a new regulament.
   * GET regulaments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view, auth }) {}

  /**
   * Create/save a new regulament.
   * POST regulaments
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
    const regulament = await Regulament.create(data)
    return regulament
  }

  /**
   * Display a single regulament.
   * GET regulaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const regulaments = await Regulament.findOrFail(params.id)
    await regulaments.load('condominium')
    await regulaments.load('file')
    return regulaments
  }

  /**
   * Render a form to update an existing regulament.
   * GET regulaments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {}

  /**
   * Update regulament details.
   * PUT or PATCH regulaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const regulament = await Regulament.findOrFail(params.id)
    const data = request.only([
      'description',
      'name',
      'file_id',
      'condominium_id'
    ])
    regulament.merge(data)
    await regulament.save()
    return regulament
  }

  /**
   * Delete a regulament with id.
   * DELETE regulaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const regulament = await Regulament.findOrFail(params.id)
    await regulament.delete()
  }
}

module.exports = RegulamentController
