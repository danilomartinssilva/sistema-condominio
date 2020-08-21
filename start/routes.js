"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
Route.post("users", "UserController.store").validator("User");

Route.post("login", "SessionController.store");
Route.get("me", "SessionController.whoami");
Route.post("passwords", "ForgotPasswordController.store");

Route.group(() => {
  Route.resource("events", "EventController").apiOnly();
  Route.resource("laws", "LawController").apiOnly();
  Route.get("eventsAll", "EventController.all");
  Route.resource("condominiums", "CondominiumController")
    .apiOnly()
    .except("index");
}).middleware(["auth"]);

Route.get("condominiums", "CondominiumController.index");
Route.post("files", "FileController.store");
Route.get("files/:id", "FileController.show");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});
