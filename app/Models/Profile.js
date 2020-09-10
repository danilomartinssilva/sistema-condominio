"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Profile extends Model {
  condominium() {
    this.belongsTo("App/Models/Condominium");
  }
}

module.exports = Profile;
