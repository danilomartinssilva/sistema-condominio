"use strict";

const Survey = use("App/Models/Survey");
const Profile = use("App/Models/Profile");
const SurveyUser = use("App/Models/SurveyUser");
class SurveyController {
  async store({ request }) {
    const data = request.only(["header", "condominium_id", "questions"]);
    const survey = await Survey.create({
      condominium_id: data.condominium_id,
      header: data.header,
    });
    const questions = data.questions.filter(
      (item) => item["question"] !== undefined
    );
    await survey.questions().createMany(questions);
    return survey;
  }
  async show({ request, response, params, auth }) {
    const { user } = auth;
    const surveyUser = await SurveyUser.query()
      .where("user_id", user.id)
      .where("survey_id", params.id)
      .first();

    const survey = await Survey.findOrFail(params.id);
    await survey.load("condominium");
    await survey.load("questions");

    let surveyJson = survey.toJSON();
    if (!surveyUser) {
      surveyJson = {
        ...surveyJson,

        voted: false,
      };
    } else {
      surveyJson = {
        ...surveyJson,
        voted: true,
      };
    }

    return surveyJson;
  }
  async index({ auth }) {
    const profile = await Profile.findByOrFail("user_id", auth.user.id);
    const survey = await Survey.query()
      .where({ condominium_id: profile.$originalAttributes.condominium_id })
      .fetch();
    return survey;
  }

  async update({ params, request }) {
    const data = request.only(["header"]);
    const survey = await Survey.findOrFail(params.id);
    survey.merge(data);
    return survey;
  }
  async destroy({ params }) {
    const survey = await Survey.findOrFail(params.id);
    await survey.delete();
  }
}

module.exports = SurveyController;
