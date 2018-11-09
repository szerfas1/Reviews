import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'unistore/react';
import App from './app.js';
import { store } from './storeAndActions.js';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('reviews'),
);
