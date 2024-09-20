import React from 'react';
import { Language } from '../redux/types'; // Adjust the path as necessary

interface LanguageListProps {
  languages: Language[]; // Expecting an array of Language objects
}

const LanguageList: React.FC<LanguageListProps> = ({ languages }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Available Languages</h2>
      <ul className="list-disc list-inside">
        {languages.length > 0 ? (
          languages.map((language) => (
            <li key={language.id} className="text-gray-700">
              {language.name}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No languages available.</li>
        )}
      </ul>
    </div>
  );
};

export default LanguageList;
