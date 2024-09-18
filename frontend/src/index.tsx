import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { HelmetProvider, Helmet } from 'react-helmet-async';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router>
      {/* <HelmetProvider>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800&display=swap" rel="stylesheet" />
        </Helmet> */}
        <App />
      {/* </HelmetProvider> */}
    </Router>
  </Provider>
);
