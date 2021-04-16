"use strict";

const Survey = use("App/Models/Survey");
const Question = use("App/Models/Survey");
const Profile = use("App/Models/Profile");
const SurveyUser = use("App/Models/SurveyUser");
class PollSurveyController {
  async store({ request, auth, response }) {
    const { id } = auth.user;
    const data = request.only(["question_id", "survey_id"]);
    const findSurveyUser = await SurveyUser.query().where({
      survey_id: data.survey_id,
      user_id: id,
    });
    if (findSurveyUser) {
      return response.status(401).json({ error: "Usuário já votou" });
    }

    const surveyUser = await SurveyUser.create({ ...data, user_id: id });
    return surveyUser;
  }
}

module.exports = PollSurveyController;
