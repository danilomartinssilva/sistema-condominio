'use strict'
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Profile = use('App/Models/Profile')
const Condominium = use('App/Models/Condominium')
class UserController {
  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password', 'name', 'cpf'])
    const user = await User.create(data)
    const data_profile = request.only([
      'username',
      'email',
      'name',
      'cpf',
      'condominium_id'
    ])
    const profile = await Profile.create({
      ...data_profile,
      user_id: user.id,
      condominium_id: 1
    })
    await user.roles().attach(3)

    return user
  }
}

module.exports = UserController
