import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
// import { increment, decrement, incrementByAmount } from './store/features/counterSlice';
import type { RootState, AppDispatch } from './store/store';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';

function App() {
  // const count = useSelector((state: RootState) => state.counter.value);
  // console.log("count",count);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="App">
      {/* <button onClick={() => dispatch(increment())}>Increment</button> */}
   {/* <h1>{count}</h1> */}
   <Routes>
   <Route path="/" element={<Home />} />
   </Routes>
    </div>
  );
}

export default App;
