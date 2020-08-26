'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with conventions
 */
const Convention = use('App/Models/Convention')
const Profile = use('App/Models/Profile')
class ConventionController {
  /**
   * Show a list of all conventions.
   * GET conventions
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
    const conventions = await Convention.query()
      .where('condominium_id', profile.rows[0].condominium_id)
      .fetch()
    return conventions
  }

  async store ({ request, response, auth }) {
    const data = request.only([
      'name',
      'description',
      'file_id',
      'condominium_id'
    ])
    const convention = await Convention.create(data)
    return convention
  }

  async show ({ params, request, response, view }) {
    const convention = await Convention.findOrFail(params.id)
    await convention.load('condominium')
    await convention.load('file')
    return convention
  }

  async edit ({ params, request, response, view }) {}

  /**
   * Update convention details.
   * PUT or PATCH conventions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const convention = await Convention.findOrFail(params.id)
    const data = request.only([
      'description',
      'name',
      'file_id',
      'condominium_id'
    ])
    convention.merge(data)
    await convention.save()
    return convention
  }

  /**
   * Delete a convention with id.
   * DELETE conventions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const convention = await Convention.findOrFail(params.id)
    await convention.delete()
  }
}

module.exports = ConventionController
