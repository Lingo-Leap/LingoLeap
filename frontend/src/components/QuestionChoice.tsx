// import React from "react";
// import Questions from "./Questions";

// interface Choice {
//   id: number;
//   text: string;
//   isCorrect: boolean;
// }

// interface QuestionChoiceProps {
//   choice: Choice;
// }

// const QuestionChoice: React.FC<QuestionChoiceProps> = ({ choice }) => {
//   return (
//     <div className="choice-item">
//       <p>{choice.text}</p>

//     </div>
//   );
// };

// export default QuestionChoice;


import React from "react";
// import Questions from "./Questions";
import Choices from "./Choices";
import Progress from "./Progress";

const QuestionChoice: React.FC = () => {
  return (  
  <div>
    <Progress/>
    {/* <Questions/> */}
    <Choices/>
  </div>
  )
};

export default QuestionChoice;
