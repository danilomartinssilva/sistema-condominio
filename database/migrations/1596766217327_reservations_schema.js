'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationsSchema extends Schema {
  up () {
    this.create('reservations', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('reservations')
  }
}

module.exports = ReservationsSchema
