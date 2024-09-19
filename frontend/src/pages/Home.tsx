    import React, {useEffect} from 'react';
    import Header from '../components/Header';
    import LessonNode from '../components/LessonNode';
    import LanguageList from '../components/LanguageList';
    import { useSelector, useDispatch } from'react-redux';
    import { fetchLanguages } from '../redux/actions/languageAction';
    import { RootState, AppDispatch } from '../store/store';



    const Home: React.FC = () => {
        const dispatch: AppDispatch = useDispatch();
        const { languages, status, error } = useSelector((state: RootState) => state.language);
      
        useEffect(() => {
          dispatch(fetchLanguages());
        }, [dispatch]);
      
    return (
        <div style={{ fontFamily: 'Baloo 2, sans-serif' }} className='font-sans'>
        <Header/>
                <LessonNode/>
                <LanguageList languages={languages} />

        </div>
    );
    };

export default Home;
