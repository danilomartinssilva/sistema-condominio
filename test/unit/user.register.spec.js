"use strict";

const { test, trait, before, after, beforeEach } = use("Test/Suite")(
  "Register"
);
const { ioc } = use("@adonisjs/fold");
const Factory = use("Factory");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const User = use("App/Models/User");
const Condominium = use("App/Models/Condominium");
const Profile = use("App/Models/Profile");
trait("Test/ApiClient");
trait("DatabaseTransactions");
trait("Auth/Client");

beforeEach(async () => {
  await Condominium.truncate();
  await User.truncate();
  await Profile.truncate();
});

test("it should be not created user when duplicated", async ({
  assert,
  client,
  should,
  expect,
}) => {
  const condominium = await Factory.model("App/Models/Condominium").create();
  await Factory.model("App/Models/User").create({
    email: "danilo.silva@yopmail.com",
  });
  const userFake2 = await Factory.model("App/Models/User").make({
    email: "danilo.silva@yopmail.com",
  });
  const userJson = userFake2.toJSON();

  const responseCreateUser = await client
    .post("users")
    .send({ ...userJson, condominium_id: condominium.id })
    .end();
  console.log(responseCreateUser);
  responseCreateUser.assertStatus(400);
});
test("it should be created user", async ({
  assert,
  client,
  should,
  expect,
}) => {
  const condominium = await Factory.model("App/Models/Condominium").create();
  const userFake = await Factory.model("App/Models/User").make({
    email: "danilo.silva@yopmail.com",
  });
  const userJson = userFake.toJSON();

  const responseCreateUser = await client
    .post("users")
    .send({ ...userJson, condominium_id: condominium.id })
    .end();
  console.log(responseCreateUser);
  responseCreateUser.assertStatus(200);
});
