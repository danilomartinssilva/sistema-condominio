'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RuleSchema extends Schema {
  up () {
    this.create('rules', table => {
      table.increments()
      table.string('name', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('rules')
  }
}

module.exports = RuleSchema
