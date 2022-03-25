import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form({ inputChange, form, postQuiz }) {
  console.log(form);
  const onChange = (evt) => {
    inputChange(evt.target.id, evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    postQuiz(form);
  };
  const isDisabled =
    form.newTrueAnswer.trim() === "" ||
    form.newFalseAnswer.trim() === "" ||
    form.newQuestion.trim() === "";
  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={form.newQuestion}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        value={form.newTrueAnswer}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        value={form.newFalseAnswer}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button disabled={isDisabled} id="submitNewQuizBtn">
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form);
