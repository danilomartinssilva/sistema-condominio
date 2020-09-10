"use strict";
const User = use("App/Models/User");
class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.all();
    const user = await User.findByOrFail("email", email);
    const token = await auth.attempt(email, password);
    if (user.status === "waiting") {
      return response.status(500).json({ message: "Aguardando aprovação" });
    } else if (user.status === "inactive") {
      return response.status(500).json({ message: "Usuário inativo" });
    }

    return token;
  }
  async whoami({ request, auth, response }) {
    const user = await auth.getUser();
    await user.load("roles");
    await user.load("profiles");

    /*  await user.load("profiles") */
    return user;
  }
}

module.exports = SessionController;
