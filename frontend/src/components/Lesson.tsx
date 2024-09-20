// components/Lesson.tsx
import React from 'react';

// Définir le type des props attendues pour la leçon
interface LessonProps {
  lesson: {
    id: number;
    title: string;
    description: string;
  };
}

const Lesson: React.FC<LessonProps> = ({ lesson }) => {
    console.log(lesson)
  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
    </div>
  );
};

export default Lesson;