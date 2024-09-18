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
            {language.description && <p>{language.description}</p>} {/* Check if description exists */}
            {language.languagePicture && <img src={language.languagePicture} alt={`${language.name} picture`} />} {/* Display image if exists */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageList;
