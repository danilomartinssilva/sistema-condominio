'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LawsSchema extends Schema {
  up () {
    this.create('laws', table => {
      table.increments()
      table.text('content')
      table.string('link', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('laws')
  }
}

module.exports = LawsSchema
