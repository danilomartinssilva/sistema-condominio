'use strict'

const Profile = use('App/Models/Profile')
const Condominium = use('App/Models/Condominium')
class ProfileController {
  async update ({ request, response, auth }) {
    const data = request.only(['username', 'email', 'name', 'cpf'])
    const user = await auth.getUser()
    await user.merge(data)
    await user.save()
    const data_profile = request.only([
      'username',
      'email',
      'name',
      'cpf',
      'condominium_id'
    ])
    const profile = await Profile.findByOrFail('user_id', user.id)
    await profile.merge(data_profile)
    await profile.save()

    await user.loadMany(['roles', 'profiles'])
    const condominium = await Condominium.find(profile.condominium_id)
    let userToJson = user.toJSON()
    userToJson = { ...userToJson, condominium }
    return userToJson
  }
}

module.exports = ProfileController
