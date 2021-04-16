"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PrivateNotice extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
  condominium() {
    return this.belongsTo("App/Models/Condominium");
  }
}

module.exports = PrivateNotice;
