import { CAPTURE, RECEBENDO, VALUES } from '../actions';

const INITIAL_VALUES = {
  exchangeRates: {},
  value: [],
  currency: '',
  coinName: [],
  bool: false,
  datas: [],
};

const values = (state = INITIAL_VALUES, action) => {
  switch (action.type) {
  case VALUES:
    return {
      ...state,
      exchangeRates: action.data,
    };
  case CAPTURE:
    return {
      ...state,
      value: [...state.value, action.value],
      currency: action.currency,
      coinName: [...state.coinName, action.coinName],
    };
  case RECEBENDO:
    return {
      ...state,
      bool: action.bool,
      datas: action.datas,
    };
  default:
    return state;
  }
};
export default values;
