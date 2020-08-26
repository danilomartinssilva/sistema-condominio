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
  Route.resource("balances", "BalanceSheetController").apiOnly();
  Route.resource("conventions", "ConventionController").apiOnly();
  Route.resource("surveys", "SurveyController").apiOnly();
  Route.resource("questions", "QuestionController").apiOnly();
  Route.post("addVotation", "PollSurveyController.store");
  Route.get("eventsAll", "EventController.all");
  Route.resource("condominiums", "CondominiumController")
    .apiOnly()
    .except("index");
  Route.post("files", "FileController.store");
  Route.get("files/:id", "FileController.show");
}).middleware(["auth"]);

Route.get("condominiums", "CondominiumController.index");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});
