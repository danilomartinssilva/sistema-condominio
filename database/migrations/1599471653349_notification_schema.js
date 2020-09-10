"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class NotificationSchema extends Schema {
  up() {
    this.create("notifications", (table) => {
      table.increments();

      table
        .integer("condominium_id")
        .unsigned()
        .references("id")
        .inTable("condominiums")
        .onUpdate("CASCADE");
      table.string("title");
      table.string("description");
      table.string("status");
      table.timestamps();
    });
  }

  down() {
    this.drop("notifications");
  }
}

module.exports = NotificationSchema;
