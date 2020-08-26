"use strict";

const Survey = use("App/Models/Survey");
const Question = use("App/Models/Survey");
const Profile = use("App/Models/Profile");
const QuestionUser = use("App/Models/QuestionUser");
class PollSurveyController {
  async store({ request, auth }) {
    const { id } = auth.user;
    const data = request.only(["question_id", "survey_id"]);
    /*  const findQuestionUser = await QuestionUser.query().where({
      survey_id: data.survey_id,
      user_id: id,
    });
    if (findQuestionUser) {
      findQuestionUser.merge({ ...data, user_id: id });
      return findQuestionUser;
    } */

    const questionUser = await QuestionUser.create({ ...data, user_id: id });
    return questionUser;
  }
}

module.exports = PollSurveyController;
