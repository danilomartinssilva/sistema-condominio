"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Survey extends Model {
  static boot() {
    super.boot();
    this.addHook("beforeCreate", async (surveyInterface) => {
      surveyInterface.status = "active";
    });
  }
  condominium() {
    return this.belongsTo("App/Models/Condominium");
  }
  questions() {
    return this.hasMany("App/Models/Question");
  }
}

module.exports = Survey;
