"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class CondominiumManual extends Model {
  condominium() {
    return this.belongsTo("App/Models/Condominium");
  }
}

module.exports = CondominiumManual;
