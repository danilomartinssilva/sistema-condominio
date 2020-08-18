'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {
  roles () {
    return this.belongsToMany('App/Models/User').pivotTable('role_users')
  }
}

module.exports = Role
