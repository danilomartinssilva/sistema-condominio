'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleUserSchema extends Schema {
  up () {
    this.create('role_users', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')

        .onDelete('SET NULL')
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onUpdate('CASCADE')

        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('role_users')
  }
}

module.exports = RoleUserSchema
