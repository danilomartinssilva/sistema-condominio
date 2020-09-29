'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFieldNumeroApartamentoInProfileSchema extends Schema {
  up() {
    this.table('profiles', (table) => {
      table.integer("apartament_number")
    })
  }

  down() {
    this.table('profiles', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddFieldNumeroApartamentoInProfileSchema
