"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SurveySchema extends Schema {
  up() {
    this.create("surveys", (table) => {
      table.increments();
      table.string("status");
      table.string("header");
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
    this.drop("surveys");
  }
}

module.exports = SurveySchema;
