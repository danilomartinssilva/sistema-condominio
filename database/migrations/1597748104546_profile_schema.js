'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', table => {
      table.increments()

      table
        .integer('condominium_id')
        .unsigned()
        .references('id')
        .inTable('condominiums')
        .onUpdate('CASCADE')

        .onDelete('SET NULL')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')

        .onDelete('SET NULL')
      table
        .string('username', 80)
        .notNullable()
        .unique()
      table
        .string('email', 254)
        .notNullable()
        .unique()
      table
        .string('cpf', 11)
        .notNullable()
        .unique()
      table.string('name', 254).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
