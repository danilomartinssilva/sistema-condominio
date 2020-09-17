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
  Route.get("lawsAll", "LawController.all");
  Route.resource("balances", "BalanceSheetController").apiOnly();
  Route.get("balancesAll", "BalanceSheetController.all");
  Route.resource("conventions", "ConventionController").apiOnly();
  Route.get("conventionsAll", "ConventionController.all");
  Route.resource("regulaments", "RegulamentController").apiOnly();
  Route.resource("minutes", "MinuteController").apiOnly();
  Route.get("minutesAll", "MinuteController.all");
  Route.resource("surveys", "SurveyController").apiOnly();
  Route.resource("questions", "QuestionController").apiOnly();
  Route.resource("notifications", "NotificationController").apiOnly();
  Route.get("notificationsAll", "NotificationController.all");
  Route.resource("notices", "PrivateNoticeController").apiOnly();
  Route.get("noticesAll", "PrivateNoticeController.all");
  Route.put("evaluating/:id", "UserRatingController.update");
  Route.resource("sugestions", "SugestionController").apiOnly();
  Route.post("addVotation", "PollSurveyController.store");
  Route.get("eventsAll", "EventController.all");
  Route.resource("condominiums", "CondominiumController")
    .apiOnly()
    .except("index");
  Route.post("files", "FileController.store");

  Route.get("users", "UserController.index");
  Route.get("users/:id", "UserController.show");
  Route.put("users/:id", "UserController.update");
}).middleware(["auth"]);
Route.get("files/:id", "FileController.show");
Route.get("condominiums", "CondominiumController.index");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});
