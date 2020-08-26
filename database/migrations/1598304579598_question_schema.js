"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class QuestionSchema extends Schema {
  up() {
    this.create("questions", (table) => {
      table.increments();
      table
        .integer("survey_id")
        .unsigned()
        .references("id")
        .inTable("surveys")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.string("question");

      table.timestamps();
    });
  }

  down() {
    this.drop("questions");
  }
}

module.exports = QuestionSchema;
