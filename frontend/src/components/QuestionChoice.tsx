
import React from 'react';

interface Choice {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface QuestionChoiceProps {
  choice: Choice;
}

const QuestionChoice: React.FC<QuestionChoiceProps> = ({ choice }) => {
  return (
    <div className="choice-item">
      <p>{choice.text}</p>

    </div>
  );
};

export default QuestionChoice;

