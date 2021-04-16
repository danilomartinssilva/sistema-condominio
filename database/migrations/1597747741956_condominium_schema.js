'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CondominiumSchema extends Schema {
  up () {
    this.create('condominiums', table => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('condominiums')
  }
}

module.exports = CondominiumSchema
