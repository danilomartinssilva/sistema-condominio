"use strict";

class User {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      username: "required|unique:users",
      email: "required|email|unique:users",
      cpf: "required|unique:users",
    };
  }
}

module.exports = User;
