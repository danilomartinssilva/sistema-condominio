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
  Route.resource("regulaments", "RegulamentController").apiOnly();
  Route.resource("minutes", "MinuteController").apiOnly();
  Route.resource("surveys", "SurveyController").apiOnly();
  Route.resource("questions", "QuestionController").apiOnly();
  Route.put("evaluating/:id", "UserRatingController.update");

  Route.post("addVotation", "PollSurveyController.store");
  Route.get("eventsAll", "EventController.all");
  Route.resource("condominiums", "CondominiumController")
    .apiOnly()
    .except("index");
  Route.post("files", "FileController.store");
}).middleware(["auth"]);
Route.get("files/:id", "FileController.show");
Route.get("condominiums", "CondominiumController.index");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});
