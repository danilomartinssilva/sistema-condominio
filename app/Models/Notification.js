"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Notification extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeCreate", async (notificationInstance) => {
      notificationInstance.status = "waiting";
    });
  }
  condominium() {
    return this.belongsTo("App/Models/Condominium");
  }
}

module.exports = Notification;
