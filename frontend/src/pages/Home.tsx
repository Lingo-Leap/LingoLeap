import React, { useEffect } from "react";
import Header from "../components/Header";
import LessonNode from "../components/LessonNode";
import LanguageList from "../components/LanguageList";
import { useSelector, useDispatch } from "react-redux";
import { fetchLanguages } from "../redux/actions/languageAction";
import { RootState, AppDispatch } from "../store/store";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { languages, status, error } = useSelector(
    (state: RootState) => state.language
  );

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  return (
    <div className="min-h-screen font-sans text-white bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header Component */}
      <Header />

      {/* Main Content Container */}
      <div className="container px-4 py-12 mx-auto">
        {/* Lesson Node */}
        <div className="mb-8">
          <LessonNode />
        </div>

        {/* Language List */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="mb-4 text-3xl font-bold text-green-400">Languages</h2>
          {status === "loading" ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading languages: {error}</p>
          ) : (
            <LanguageList languages={languages} />
          )}
        </div>

        {/* Example Button - Following Brand Style */}
        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 text-xl font-bold text-white transition-transform duration-300 bg-green-400 rounded-lg shadow-lg hover:bg-green-500 hover:scale-105">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
