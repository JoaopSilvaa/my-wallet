import { combineReducers } from 'redux';
import user from './user';
import values from './values';
import wallet from './wallet';
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({
  user,
  wallet,
  values,
});

export default rootReducer;
