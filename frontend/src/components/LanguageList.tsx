

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLanguagesRequest } from '../redux/actions/languageActions';

const LanguageList: React.FC = () => {
  const dispatch = useDispatch();
  const { languages, loading, error } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(fetchLanguagesRequest());
  
    fetch('/api/languages') 
      .then(response => response.json())
      .then(data => {
        dispatch(fetchLanguagesSuccess(data));
      })
      .catch(err => {
        dispatch(fetchLanguagesFailure(err.message));
      });
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Select a Language</h1>
      <ul>
        {languages.map((language: any) => (
          <li key={language.id}>
            <h2>{language.name}</h2>
            <p>{language.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageList;
