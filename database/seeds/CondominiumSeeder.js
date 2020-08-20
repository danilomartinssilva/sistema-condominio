"use strict";

/*
|--------------------------------------------------------------------------
| CondominiumSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Condominium = use("App/Models/Condominium");

class CondominiumSeeder {
  async run() {
    await Condominium.create({
      name: "Condomínio Master",
    });
  }
}

module.exports = CondominiumSeeder;
