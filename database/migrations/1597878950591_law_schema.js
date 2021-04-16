"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LawSchema extends Schema {
  up() {
    this.create("laws", (table) => {
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
      table
        .integer("file_id")
        .unsigned()
        .references("id")
        .inTable("files")
        .onUpdate("CASCADE")

        .onDelete("SET NULL");
      table.timestamps();
    });
  }

  down() {
    this.drop("laws");
  }
}

module.exports = LawSchema;
