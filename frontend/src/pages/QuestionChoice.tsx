import React from 'react';
import Progress from '../components/Progress';
import Questions from '../components/Questions';
import Choices from '../components/Choices';
const QuestionChoice: React.FC = () => {
  return (
    <div>
    <div className="mt-8"> {/* Add margin-top here */}
        <Progress />
        </div>
              <div className="mt-8"> {/* Add margin-bottom for spacing between Progress and Questions */}

        <Questions />
      </div>
           
      <div className="mt-8"> {/* Add margin-bottom for spacing between Progress and Questions */}
        <Choices/>
</div>
    </div>
  );
};

export default QuestionChoice;
