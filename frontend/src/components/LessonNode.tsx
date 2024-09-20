// components/Lessons.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessons } from '../redux/actions/lessonAction';
import { RootState } from '../store/store';
import Lesson from "./Lesson"



const Lessons: React.FC = () => {
  const dispatch = useDispatch();
  const { lessons, status, error } = useSelector((state: RootState) => state.lessons);

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  return (
    <div>
      <h1>Leçons</h1>
      {status === 'loading' && <div>Chargement...</div>}
      {status === 'failed' && <div>Erreur: {error}</div>}
      {status === 'succeeded' && (
        <ul>
          {lessons.map((lesson : any) => (
            // <li key={lesson.id}>{lesson.title}</li>
            < Lesson lesson={lesson} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Lessons;