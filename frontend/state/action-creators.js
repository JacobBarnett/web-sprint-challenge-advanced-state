// ❗ You don't need to add extra action creators to achieve MVP
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_INFO_MESSAGE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";
import axios from "axios";
import { createResponseComposition, response } from "msw";
import { fromByteArray } from "ipaddr.js";

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answer) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answer,
  };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz() {}

export function inputChange(key, value) {
  return { type: INPUT_CHANGE, key, value };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: SET_QUIZ_INTO_STATE, payload: "loading" });
    axios.get("http://localhost:9000/api/quiz/next").then((response) => {
      dispatch({ type: SET_QUIZ_INTO_STATE, payload: response.data });
    });
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer", {
        quiz_id,
        answer_id,
      })
      .then((response) => {
        dispatch(selectAnswer(null));
        dispatch(setMessage(response.data.message));
        dispatch(fetchQuiz());
      });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz(form) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/new", {
        question_text: form.newQuestion,
        true_answer_text: form.newTrueAnswer,
        false_answer_text: form.newFalseAnswer,
      })
      .then((response) => {
        dispatch(
          setMessage(`Congrats: "${form.newQuestion}" is a great question!
        `)
        );
        dispatch(resetForm());
      });
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
