import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router}  from 'react-router-dom';
import { management } from './redux/management'
import { Provider } from 'react-redux'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={management}>
        <App />
      </Provider> 
    </Router>
  </React.StrictMode>
);

reportWebVitals();
