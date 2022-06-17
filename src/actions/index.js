// Coloque aqui suas actions
export const EXPENSE = 'EXPENSE';
export const USER_EMAIL = 'USER_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const VALUES = 'VALUES';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const CAPTURE = 'CAPTURE';
export const RECEBENDO = 'RECEBENDO';

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const captureEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const captureExpense = (expenses) => ({
  type: EXPENSE,
  expenses,
});

export const newExpense = (newexpense) => ({
  type: NEW_EXPENSE,
  newexpense,
});

export const values = (data) => ({
  type: VALUES,
  data,
});

export const captureValueAndCurrency = (value, currency, coinName) => ({
  type: CAPTURE,
  value,
  currency,
  coinName,
});

export const received = (bool, datas) => ({
  type: RECEBENDO,
  bool,
  datas,
});

export function fetchAPI() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const codes = Object.keys(data);
    codes.splice(1, 1);
    dispatch(getCurrencies(codes));
    dispatch(values(data));
  };
}
