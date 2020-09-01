"use strict";
const Question = use("App/Models/Question");
class UserRatingController {
  async update({ params, request }) {
    const question = await Question.findOrFail(params.id);
    await question.merge({ total: question.total + 1 });
    await question.save();
    return question;
  }
}

module.exports = UserRatingController;
