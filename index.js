import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getUsers } from './actions/users.actions';

// outils de développement
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger'



const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))  //on est pas obligé de mettre le logger (c'est uniquement pour la phase de dev car sinon les utilisateurs peuvent avoir accès aux sources)
)

store.dispatch(getUsers())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);

