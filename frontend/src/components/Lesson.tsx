import React from 'react';


interface LessonProps {
  lesson: {
    id: number;
    title: string;
    content: string; 
    createdAt: string;
    updatedAt: string;
    isCompleted: boolean;
    languageId: number;
    level: number;
    type: string;
  };
}

const Lesson: React.FC<LessonProps> = ({ lesson }) => {
  console.log(lesson);
  

  return (

    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p> 
      {/* <p>Level: {lesson.level}</p>
      <p>Status: {lesson.isCompleted ? 'Completed' : 'Not Completed'}</p> */}
    </div>
  );
};

export default Lesson;

