"use strict";
const Question = use("App/Models/Question");
const Survey = use("App/Models/Survey");
const SurveyUser = use("App/Models/SurveyUser");
class UserRatingController {
  async update({ params, request, auth }) {
    const { user } = auth;

    const question = await Question.findOrFail(params.id);
    const surveyUser = await SurveyUser.query()
      .where("user_id", user.id)
      .where("survey_id", question.survey_id)

      .first();

    if (!surveyUser) {
      await question.merge({ total: question.total + 1 });
      await question.save();
      await SurveyUser.create({
        user_id: user.id,
        survey_id: question.survey_id,
      });
    }

    const survey = await Survey.findOrFail(question.survey_id);
    await survey.load("condominium");
    await survey.load("questions");
    let surveyJson = survey.toJSON();
    if (surveyUser) {
      surveyJson = {
        ...surveyJson,
        message: "Você já realizou votação para esta enquete!",
        voted: true,
      };
    } else {
      surveyJson = {
        ...surveyJson,
        message: "Votação realizada com sucesso",
        voted: true,
      };
    }
    return surveyJson;
  }
}

module.exports = UserRatingController;
