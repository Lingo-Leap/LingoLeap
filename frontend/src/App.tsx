import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
// import { increment, decrement, incrementByAmount } from './store/features/counterSlice';
import type { RootState, AppDispatch } from './store/store';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';


import { Provider } from 'react-redux';
import { store } from './store/store';
import Progress from './components/Progress';
import './App.css';

const App: React.FC = () => {
  return (


    <Provider store={store}>
      <div className="App">
        <Progress />
         <Routes>
   <Route path="/" element={<Home />} />
   </Routes>
      </div>
    </Provider>
  );
};

export default App;
