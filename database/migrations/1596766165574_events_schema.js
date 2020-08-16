"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EventsSchema extends Schema {
  up() {
    this.create("events", (table) => {
      table.increments();
      table.text("description");
      table
        .timestamp("start_date_event", { useTz: true })
        .notNullable()
        .unique();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")

        .onDelete("SET NULL");

      /* table.date("end_date_event"); */

      table.string("status");
      table.timestamps();
    });
  }

  down() {
    this.drop("events");
  }
}

module.exports = EventsSchema;
