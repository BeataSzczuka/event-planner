import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route render={() => <App />} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
