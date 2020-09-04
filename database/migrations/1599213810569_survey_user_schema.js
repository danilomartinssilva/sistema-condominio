"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SurveyUserSchema extends Schema {
  up() {
    this.create("survey_users", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("survey_id")
        .unsigned()
        .references("id")
        .inTable("surveys")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.timestamps();
    });
  }

  down() {
    this.drop("survey_users");
  }
}

module.exports = SurveyUserSchema;
