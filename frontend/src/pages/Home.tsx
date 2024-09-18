    import React from 'react';
    import Header from '../components/Header';
    import LessonNode from '../components/LessonNode';

    const Home: React.FC = () => {
    return (
        <div style={{ fontFamily: 'Baloo 2, sans-serif' }} className='font-sans'>
        <Header/>
        <h1> HELLO IM HOME PAGE </h1>
        <LessonNode/>

        </div>
    );
    };

export default Home;
