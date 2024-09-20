// pages/Home.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LanguageList from '../components/LanguageList';
import LessonNode from '../components/LessonNode';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLanguages } from '../redux/actions/languageAction';

import { RootState, AppDispatch } from '../store/store';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  
  const { languages } = useSelector((state: RootState) => state.language);
  const lessons = useSelector((state: RootState) => state.lessons.items) || [];


  const handleLessonClick = (lessonId: number) => {
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <div style={{ fontFamily: 'Baloo 2, sans-serif' }} className='font-sans'>
      <Header />
      <LessonNode /> 
      <LanguageList languages={languages} />
    </div>
  );
};

export default Home;
