"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Question extends Model {
  static boot() {
    super.boot();
    this.addHook("beforeCreate", async (questionInterface) => {
      questionInterface.total = 0;
    });
  }
}

module.exports = Question;
