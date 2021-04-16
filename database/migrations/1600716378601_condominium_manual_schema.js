"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CondominiumManualSchema extends Schema {
  up() {
    this.create("condominium_manuals", (table) => {
      table.increments();
      table.string("name");
      table.text("description");
      table
        .integer("condominium_id")
        .unsigned()
        .references("id")
        .inTable("condominiums")
        .onUpdate("CASCADE")

        .onDelete("SET NULL");
      table.timestamps();
    });
  }

  down() {
    this.drop("condominium_manuals");
  }
}

module.exports = CondominiumManualSchema;
