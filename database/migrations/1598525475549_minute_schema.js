'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MinuteSchema extends Schema {
  up () {
    this.create('minutes', table => {
      table.increments()
      table.string('name')
      table.text('description')
      table
        .integer('condominium_id')
        .unsigned()
        .references('id')
        .inTable('condominiums')
        .onUpdate('CASCADE')

        .onDelete('SET NULL')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('minutes')
  }
}

module.exports = MinuteSchema
