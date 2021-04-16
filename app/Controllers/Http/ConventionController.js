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
    const user = await auth.getUser()
    await user.loadMany(['roles', 'profiles'])
    const userProfile = await user.profiles().first()
    const conventions = await Convention.query()
      .where('condominium_id', userProfile.condominium_id)
      .fetch()
    return conventions
  }
  async all ({ request, response, auth }) {
    const conventions = await Convention.query()
      .with('condominium')
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
    await convention.load('condominium')
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
