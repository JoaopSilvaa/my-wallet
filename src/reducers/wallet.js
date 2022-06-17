// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EXPENSE, GET_CURRENCIES, NEW_EXPENSE } from '../actions';

const EXPENSES = {
  currencies: [],
  expenses: [],
};

const wallet = (state = EXPENSES, action) => {
  switch (action.type) {
  case EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case NEW_EXPENSE:
    return {
      ...state,
      expenses: action.newexpense,
    };
  default:
    return state;
  }
};

export default wallet;
