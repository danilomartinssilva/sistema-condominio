'use strict'

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)

    return token
  }
  async whoami ({ request, auth, response }) {
    const user = await auth.getUser()
    await user.load('roles')
    await user.load('profiles')

    /*  await user.load("profiles") */
    return user
  }
}

module.exports = SessionController
