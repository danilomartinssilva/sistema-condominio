"use strict";

const Survey = use("App/Models/Survey");
const Profile = use("App/Models/Profile");
class SurveyController {
  async store({ request }) {
    const data = request.only(["header", "condominium_id", "questions"]);
    const survey = new Survey();
    await survey.save(data);
    await survey.questions().createMany(data.questions);

    /*   for (let i = 0; i < data.questions; i++) {
      await survey.questions().attach(data.questions[i]);
    } */

    return survey;
  }
  async show({ request, response, params }) {
    const survey = await Survey.findOrFail(params.id);
    await survey.load("condominium");
    await survey.load("questions");
    return survey;
  }
  async index({ auth }) {
    const { id } = auth.user;
    const { condominium_id } = await Profile.findOrFail({ user_id: id });
    const survey = await Survey.query()
      .where({ condominium_id: condominium_id })
      .fetch();
    return survey;
  }
  async update({ params, request }) {
    const data = request.only(["header"]);
    const survey = await Survey.findOrFail(params.id);
    survey.merge(data);
    return survey;
  }
  async destroy() {
    const survey = await Survey.findOrFail(params.id);
    await survey.delete();
  }
}

module.exports = SurveyController;
