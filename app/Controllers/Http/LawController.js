'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with laws
 */
const Law = use('App/Models/Law')
const Profile = use('App/Models/Profile')
class LawController {
  /**
   * Show a list of all laws.
   * GET laws
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

    const laws = await Law.query()
      .where('condominium_id', userProfile.condominium_id)
      .fetch()

    return laws
  }
  async all ({ request, response, view, auth }) {
    const user = await auth.getUser()
    await user.loadMany(['roles', 'profiles'])
    const userProfile = await user.profiles().first()

    const laws = await Law.query()
      .with('condominium')
      .fetch()

    return laws
  }

  /**
   * Create/save a new law.
   * POST laws
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only([
      'name',
      'description',
      'file_id',
      'condominium_id'
    ])
    const law = await Law.create(data)
    await law.load('condominium')
    return law
  }

  /**
   * Display a single law.
   * GET laws/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const laws = await Law.findOrFail(params.id)
    await laws.load('condominium')
    await laws.load('file')
    return laws
  }

  async update ({ params, request, response }) {
    const law = await Law.findOrFail(params.id)
    const data = request.only([
      'description',
      'name',
      'file_id',
      'condominium_id'
    ])
    law.merge(data)
    await law.save()
    return law
  }

  /**
   * Delete a law with id.
   * DELETE laws/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const law = await Law.findOrFail(params.id)
    await law.delete()
  }
}

module.exports = LawController
