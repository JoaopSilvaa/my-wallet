import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { newExpense, captureValueAndCurrency, fetchAPI, received } from '../actions';

class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props;
    this.state = state;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { moveForWallet, attState } = this.props;
    const { expenses } = this.props;
    const { id } = this.state;
    const datas = this.state;
    const newExpenses = expenses.filter((data) => data.id !== id );
    newExpenses.splice(id, 0, datas)
    attState(newExpenses);
    moveForWallet(false, datas);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <section className='form'>
          <label htmlFor="value">
            Valor:
            <input 
              className='inputWallet'
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              className='selectWallet'
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((element) => <option key={ element }>{element}</option>)}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              className='selectWallet'
              id="method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              className='selectWallet'
              id="tag"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              className='inputWallet'
              id="description"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            className='butonWallet'
            type="button"
            onClick={ this.handleClick }
          >
            Editar despesa
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
  state: store.values.datas,
});

const mapDispatchToProps = (dispatch) => ({
  loadFetch: () => dispatch(fetchAPI()),
  attState: (expenses) => dispatch(newExpense(expenses)),
  add: (value, currency, coinName) => dispatch(
    captureValueAndCurrency(value, currency, coinName),
  ),
  moveForWallet: (bool, datas) => dispatch(received(bool, datas))
});

FormEdit.propTypes = {
  loadFetch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addStates: PropTypes.func.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.object).isRequired,
  add: PropTypes.func.isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);
