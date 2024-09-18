import React from 'react';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Baloo 2, sans-serif' }} className='font-sans'>
      <Header/>
      <h1> HELLO IM HOME PAGE </h1>
    </div>
  );
};

export default Home;