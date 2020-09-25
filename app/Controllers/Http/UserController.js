"use strict";
const User = use("App/Models/User");
const Env = use("Env");
const Profile = use("App/Models/Profile");
const Condominium = use("App/Models/Condominium");
const Mail = use("Mail");
class UserController {
  async store({ request, response }) {
    const data = request.only(["username", "email", "password", "name", "cpf"]);
    const user = await User.create(data);
    const data_profile = request.only([
      "username",
      "email",
      "name",
      "cpf",
      "condominium_id",
    ]);
    const profile = await Profile.create({
      ...data_profile,
      user_id: user.id,
      condominium_id: data_profile.condominium_id,
    });
    await user.roles().attach(3);

    const condominium = await Condominium.findOrFail(
      data_profile.condominium_id
    );

    await Mail.send(
      ["mails.register"],
      { email: user.email, name: user.name, condominium: condominium.name },
      (message) => {
        message
          .to(user.email)
          .from(Env.get("MAIL_USERNAME"), "Condomíno Perfil")
          .subject("Registro de usuário");
      }
    );

    return user;
  }

  async index({ request, response }) {
    const users = await User.query().with("profiles").fetch();
    return users;
  }

  async show({ request, response, params }) {
    const user = await User.query().where("id", params.id).first();
    await user.load("roles");

    let userToJson = user.toJSON();
    const profile = await Profile.findByOrFail("user_id", user.id);

    const condominium = await Condominium.findByOrFail(
      "id",
      profile.condominium_id
    );
    userToJson = { ...userToJson, condominium };

    return userToJson;
  }

  async update({ request, response, params }) {
    const data = request.only(["username", "email", "name", "cpf", "status"]);
    const user = await User.findByOrFail("id", params.id);
    await user.merge(data);
    await user.save();
    const data_profile = request.only([
      "username",
      "email",
      "name",
      "cpf",
      "condominium_id",
    ]);
    const profile = await Profile.findByOrFail("user_id", params.id);
    await profile.merge(data_profile);
    await profile.save();
    const dataRole = request.only(["role_id"]);
    if (dataRole) {
      await user.roles().where("user_id", params.id).detach();
      await user.roles().where("user_id", params.id).attach(dataRole.role_id);
    }
    await user.load("roles");
    return user;
  }
}

module.exports = UserController;
