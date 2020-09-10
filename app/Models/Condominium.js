"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Condominium extends Model {
  profiles() {
    return this.hasMany("App/Models/Profile");
  }
}

module.exports = Condominium;
