"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class QuestionUserSchema extends Schema {
  up() {
    this.create("question_users", (table) => {
      table.increments();
      table
        .integer("survey_id")
        .unsigned()
        .references("id")
        .inTable("surveys")
        .onUpdate("CASCADE")

        .onDelete("SET NULL");

      table
        .integer("question_id")
        .unsigned()
        .references("id")
        .inTable("questions")
        .onUpdate("CASCADE")

        .onDelete("SET NULL");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")

        .onDelete("SET NULL");
      table.timestamps();
    });
  }

  down() {
    this.drop("question_users");
  }
}

module.exports = QuestionUserSchema;
