"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Event extends Model {
  static boot() {
    super.boot();
    this.addHook("beforeCreate", async (eventInterface) => {
      eventInterface.status = "waiting";
    });
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Event;
