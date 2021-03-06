'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Law extends Model {
  condominium () {
    return this.belongsTo('App/Models/Condominium')
  }
  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Law
