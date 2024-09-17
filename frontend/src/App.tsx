import React from 'react';

import { Provider } from 'react-redux';
import { store } from './store/store';
import Progress from './components/Progress';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Progress />
      </div>
    </Provider>
  );
};

export default App;
