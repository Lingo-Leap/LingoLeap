import React, { useState } from 'react';
import { Language } from '../redux/types';

interface LanguageCardProps {
  flag: string;
  name: string;
  onSelect: () => void;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ flag, name, onSelect }) => {
  return (
    <div
      className="flex flex-col items-center p-4 border border-green-300 rounded-lg shadow-lg transition duration-300 cursor-pointer hover:bg-green-50 hover:scale-105"
      onClick={onSelect}
    >
      <img src={flag} alt={`${name} flag`} className="w-16 h-16 mb-2 object-contain" />
      <h3 className="text-lg font-bold text-green-700">{name}</h3>
    </div>
  );
};

interface LanguageListProps {
  languages: Language[];
}

const LanguageList: React.FC<LanguageListProps> = ({ languages }) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsListVisible(false);
  };

  const toggleLanguageList = () => {
    setIsListVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4 fixed top-0 right-0 h-screen w-[450px] bg-white shadow-md p-6 rounded-lg">
      <h1 className="text-2xl font-bold text-center text-green-600">Select a Language</h1>

      <button
        onClick={toggleLanguageList}
        className="bg-green-500 text-white rounded-full py-2 hover:bg-green-600 transition duration-300 w-full"
      >
        Select Your Language
      </button>

      {isListVisible && (
        <ul className="mt-4 grid grid-cols-2 gap-4">
          {languages.map((language) => (
            <li key={language.id}>
              <LanguageCard
                flag={language.languagePicture || ""}
                name={language.name}
                onSelect={() => handleLanguageSelect(language)}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Show selected language if dropdown is not visible */}
      {!isListVisible && selectedLanguage && (
        <div className="mt-4 p-4 border border-green-200 rounded-lg shadow-md text-center">
          <img
            src={selectedLanguage.languagePicture}
            alt={`${selectedLanguage.name} flag`}
            className="w-24 h-24 mb-2 object-contain mx-auto"
          />
          <h2 className="text-xl font-bold text-green-700">{selectedLanguage.name}</h2>
          {selectedLanguage.description && (
            <p className="mt-1 text-gray-600">{selectedLanguage.description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LanguageList;
