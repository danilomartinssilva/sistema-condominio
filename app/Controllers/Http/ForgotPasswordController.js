"use strict";
const User = use("App/Models/User");
const crypto = require("crypto");
const moment = require("moment");
const Mail = use("Mail");
class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);
      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();
      await user.save();

      await Mail.send(
        ["mails.forgotpassword"],
        {
          email,
          token: user.token,
          link: `${request.input("redirect_url")}/?token=${user.token}`,
        },
        (message) => {
          message
            .to(user.email)
            .from("danilomartins.pacs@gmail.com", "Condomíno Perfil")
            .subject("Recuperação de senha");
        }
      );
    } catch (error) {
      return response.status(401).send({
        error: { message: "Algo não deu certo, esse e-mail existe mesmo?" },
      });
    }
  }

  async update({ request, response, params }) {
    try {
      const { token, password } = request.all();
      const user = await User.findBy("token", token);
      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.token_created_at);
      if (tokenExpired) {
        return response
          .status(401)
          .json({ erroor: "Token inválido para requisição" });
      }
      user.token = null;
      user.token_created_at = null;
      user.password = password;
      await user.save();
    } catch (err) {
      console.log("Err", err);
      return response
        .status(401)
        .json({ erroor: "Erro ao resetar sua senhas" });
    }
  }
}

module.exports = ForgotPasswordController;
