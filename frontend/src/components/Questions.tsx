// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchQuestions } from '../redux/actions/questionAction'; 
// import { RootState } from '../store/store';
// import QuestionChoice from '../components/QuestionChoice'; 
// interface ChoiceType {
//   id: number;
//   text: string;
//   isCorrect: boolean;
// }

// interface Question {
//   id: number;
//   text: string;
//   choices: ChoiceType[];
// }

// const Questions: React.FC = () => {
//   const { lessonId } = useParams<{ lessonId: string }>();
//   const dispatch = useDispatch();
  
//   const questions = useSelector((state: RootState) => state.questions.questions) as Question[];
//   const status = useSelector((state: RootState) => state.questions.status);
//   const error = useSelector((state: RootState) => state.questions.error);

//   useEffect(() => {
//     if (lessonId) {
//       dispatch(fetchQuestions(Number(lessonId)));
//     }
//   }, [dispatch, lessonId]);

//   if (status === 'loading') {
//     return <div className="text-center mt-8">Loading questions...</div>;
//   }

//   if (status === 'failed') {
//     return <div className="text-center mt-8">Error: {error}</div>;
//   }

//   return (
//     <div className="questions-container">
//       <h2 className="text-center mb-4">Questions for Lesson {lessonId}</h2>
//       {questions?.map((question) => (
//         <div key={question.id} className="flex justify-center mt-8">
//           <div className="relative bg-yellow-300 text-gray-800 font-bold rounded-lg shadow-lg max-w-md w-full p-6">
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-yellow-300"></div>
//             <p className="text-xl">{question.text}</p>
//             <div className="choices mt-4">
//               {question.choices.map((choice) => (
//                 <QuestionChoice key={choice.id} choice={choice} />
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Questions; 

export {}