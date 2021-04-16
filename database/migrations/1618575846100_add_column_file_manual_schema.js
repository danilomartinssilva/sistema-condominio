'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnFileManualSchema extends Schema {
  up () {
    this.table('condominium_manuals', (table) => {


      table
      .integer("file_id")
      .unsigned()
      .references("id")
      .inTable("files")
      .onUpdate("CASCADE")

      .onDelete("SET NULL");



    })
  }

  down () {
    this.table('condominium_manuals', (table) => {
      table.dropForeignKey('file_id')
    })
    this.table('condominium_manuals', (table) => {
      table.dropColumn('file_id')
    })
  }
}

module.exports = AddColumnFileManualSchema
