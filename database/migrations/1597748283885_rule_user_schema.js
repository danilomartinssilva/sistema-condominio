'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RuleUserSchema extends Schema {
  up () {
    this.create('rule_users', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')

        .onDelete('SET NULL')
      table
        .integer('rule_id')
        .unsigned()
        .references('id')
        .inTable('rules')
        .onUpdate('CASCADE')

        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('rule_users')
  }
}

module.exports = RuleUserSchema
