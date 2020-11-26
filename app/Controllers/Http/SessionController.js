"use strict";
const User = use("App/Models/User");
const Condominium = use("App/Models/Condominium");
class SessionController {
  async store({ request, response, auth }) {
    try {
      const { email, password } = request.all();
      const user = await User.findBy("email", email);

      const token = await auth.attempt(email, password);

      if (user.status === "waiting") {
        return response.status(500).json({ message: "Aguardando aprovação" });
      } else if (user.status === "inactive") {
        return response.status(500).json({ message: "Usuário inativo" });
      }
      return token;
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Informação: usuário e/ou senha incorretos!" });
    }
  }
  async whoami({ request, auth, response }) {
    const user = await auth.getUser();
    await user.loadMany(["roles", "profiles"]);

    const profile = await user.profiles().first();
    const condominium = await Condominium.find(profile.condominium_id);
    let userToJson = user.toJSON();
    userToJson = { ...userToJson, condominium };

    return userToJson;
  }
}

module.exports = SessionController;
