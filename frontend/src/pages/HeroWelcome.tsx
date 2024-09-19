import React from 'react';
import LoginContainer from '../components/LoginContainer';

const HeroWelcome: React.FC = () => {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#007bff] to-[#f8f9fa]">
      <div className="absolute inset-0 bg-black opacity-10" />

    
      <h1 className="absolute top-24 text-5xl font-bold text-white z-20">LINGOLEAP</h1>

      <h1 className="text-4xl md:text-5xl font-bold text-white z-20 mt-16">Unlock the World with Language</h1>
      <p className="mt-4 text-lg text-white z-20">Join millions of learners and start your journey today!</p>
      
      <div className="relative z-20"> 
        <LoginContainer /> 
      </div>

      <div className="absolute bottom-5 z-20 text-white">
        <p className="text-lg font-semibold">Join over 1 million learners worldwide!</p>
      </div>
    </div>
  );
};

export default HeroWelcome;
