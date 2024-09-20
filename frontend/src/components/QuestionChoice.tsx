import React from "react";
import Questions from "./Questions";
import Choices from "./Choices";
import Progress from "./Progress";

const QuestionChoice: React.FC = () => {
  return (
  <div>
    <Progress/>
    <Questions/>
    <Choices/>
  </div>
  )
};

export default QuestionChoice;
