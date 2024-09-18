import React from 'react';
import { Language } from '../redux/types';

interface LanguageListProps {
  languages: Language[];
}

const LanguageList: React.FC<LanguageListProps> = ({ languages }) => {
  return (
    <div>
      <h1>Select a Language</h1>
      <ul>
        {languages.map((language) => (
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
