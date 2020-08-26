"use strict";

const Survey = use("App/Models/Survey");
const Question = use("App/Models/Question");
class QuestionController {
  async store({ request }) {
    const data = request.only(["question", "survey_id"]);
    const question = Question.create(data);
    return question;
  }
  async index() {
    const questions = await Question.query().all();
    return questions;
  }
  async destroy({ params }) {
    const question = await Question.findOrFail(params.id);
    await question.delete();
  }
  async update({ params }) {
    const data = request.only(["question"]);
    const question = await Question.findOrFail(params.id);
    await question.merge(data);
    return question;
  }
}

module.exports = QuestionController;
