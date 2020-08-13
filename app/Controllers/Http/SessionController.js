"use strict";

class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }
  async whoami({ request, auth, response }) {
    const user = await auth.getUser();
    return user;
  }
}

module.exports = SessionController;
