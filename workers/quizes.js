const { Quiz } = require("../models/quiz");

const getQuiz = async (req, res) => {
  const category = req.query.category;

  await Quiz.findOneRandom(
    { category },
    {},
    { limit: 1 },
    function (err, results) {
      if (!err) {
        if (results) {
          delete results.correctAnswer;
          res.send(results);
        } else {
          res.send({ message: "No quiz found" });
        }
      } else {
        res.send({ message: "No quiz found" });
      }
    },
  );
};

const checkQuiz = async (req, res) => {
  const { answer, quiz } = req.body;

  const currentQuiz = await Quiz.findById(quiz);

  if (answer === currentQuiz.correctAnswer) {
    return { answer: true };
  } else {
    return { answer: false };
  }
};

module.exports = {
  getQuiz,
  checkQuiz,
};
