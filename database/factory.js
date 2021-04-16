"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/Condominium", (faker, i, data = {}) => {
  return {
    name: faker.name(),
    ...data,
  };
});
Factory.blueprint("App/Models/User", (faker, i, data = {}) => {
  return {
    username: faker.string(),
    email: faker.email(),
    password: faker.string(),
    cpf: faker.string({ length: 11 }),
    name: faker.name(),
    status: faker.pickone(["waiting", "active"]),

    ...data,
  };
});
Factory.blueprint("App/Models/Profile", (faker, i, data = {}) => {
  return {
    cpf: faker.string({ length: 11 }),
    apartament_number: faker.number(),

    ...data,
  };
});
