"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SugestionSchema extends Schema {
  up() {
    this.create("sugestions", (table) => {
      table.increments();
      table.string("name");
      table
        .integer("condominium_id")
        .unsigned()
        .references("id")
        .inTable("condominiums")
        .onUpdate("CASCADE")

        .onDelete("SET NULL");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")

        .onDelete("SET NULL");
      table.string("subject");
      table.string("description");
      table.timestamps();
    });
  }

  down() {
    this.drop("sugestions");
  }
}

module.exports = SugestionSchema;
