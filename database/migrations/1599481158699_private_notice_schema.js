"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PrivateNoticeSchema extends Schema {
  up() {
    this.create("private_notices", (table) => {
      table.increments();
      table
        .integer("condominium_id")
        .unsigned()
        .references("id")
        .inTable("condominiums")
        .onUpdate("CASCADE");
      table.string("title");
      table.string("description");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE");

      table.timestamps();
    });
  }

  down() {
    this.drop("private_notices");
  }
}

module.exports = PrivateNoticeSchema;
