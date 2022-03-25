import { setupWorker } from "msw";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Quiz({
  quiz,
  fetchQuiz,
  selectedAnswer,
  selectAnswer,
  postAnswer,
}) {
  useEffect(() => {
    if (quiz === null) {
      fetchQuiz();
    }
  }, [quiz]);

  console.log(quiz, selectedAnswer);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={`answer ${
                  quiz.answers[0].answer_id === selectedAnswer ? "selected" : ""
                }`}
              >
                {quiz.answers[0].text}
                <button onClick={() => selectAnswer(quiz.answers[0].answer_id)}>
                  {quiz.answers[0].answer_id === selectedAnswer
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>

              <div
                className={`answer ${
                  quiz.answers[1].answer_id === selectedAnswer ? "selected" : ""
                }`}
              >
                {quiz.answers[1].text}
                <button onClick={() => selectAnswer(quiz.answers[1].answer_id)}>
                  {quiz.answers[1].answer_id === selectedAnswer
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
            </div>

            <button
              disabled={!selectedAnswer}
              onClick={() => postAnswer(quiz.quiz_id, selectedAnswer)}
              id="submitAnswerBtn"
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

export default connect((st) => st, actionCreators)(Quiz);
