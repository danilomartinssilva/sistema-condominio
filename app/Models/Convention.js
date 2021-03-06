'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Convention extends Model {
  condominium () {
    return this.belongsTo('App/Models/Condominium')
  }
  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Convention
