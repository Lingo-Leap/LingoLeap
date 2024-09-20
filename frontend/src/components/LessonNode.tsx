
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchLessons } from '../redux/actions/lessonAction';
import { RootState, AppDispatch } from '../store/store';
import Lesson from "./Lesson"



const Lessons: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
    const { lessons, status, error } = useSelector((state: RootState) => state.lessons);

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  return (
    <div>
       <Link to="/lesson">
      <h1>Leçons</h1>
      {status === 'loading' && <div>Chargement...</div>}
      {status === 'failed' && <div>Erreur: {error}</div>}
      {status === 'succeeded' && (
        <ul>
          {lessons.map((lesson : any) => (
         
            < Lesson lesson={lesson} />
          ))}
        </ul>
      )}
      </Link>
    </div>
  );
};

export default Lessons;