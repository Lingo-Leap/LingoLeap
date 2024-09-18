import React from 'react';
import Navbar from '../components/Navbar'; 

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl  font-sans">Home Page</h1>
    </div>
  );
};

export default Home;