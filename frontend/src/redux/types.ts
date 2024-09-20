// types.ts

// Represents a lesson in the application
export interface Lesson {
  id: string;
  title: string;
  content: string;
  level: number;
  isCompleted: boolean;
  type: 'multiple' | 'order';
  languageId: number;
  createdAt: string;
  updatedAt: string;
}

// Represents a language that can be associated with lessons
export interface Language {
  id: number;
  name: string;
  description?: string;
  languagePicture: string;
}

// Represents a question in a lesson
export interface Question {
  id: string; // Unique identifier for the question
  lessonId: string; // ID of the lesson this question belongs to
  text: string; // The question text
  options: string[]; 
  choices: Choice[]; // Array of possible answer options
  correctAnswer: string; // The correct answer (could be the option text or an identifier)
  createdAt: string; // Date the question was created (ISO string format)
  updatedAt: string; // Date the question was last updated (ISO string format)
}


export interface Choice {
  id: number;
  text: string;
  isCorrect: boolean;
  questionId: number;
}


// Represents the response type when fetching an array of lessons
export type LessonsResponse = Lesson[];

// Represents the response type when fetching an array of questions
export type QuestionsResponse = Question[];
