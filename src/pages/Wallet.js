import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { captureExpense, captureValueAndCurrency, fetchAPI } from '../actions';
import Header from '../components/Header';
import Table from '../components/Table';
import FormEdit from '../components/FormEdit';

const alim = 'Alimentação';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alim,
      exchangeRates: {},
      id: 0,
    };
  }

  componentDidMount() {
    const { loadFetch } = this.props;
    loadFetch();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { addStates, exchangeRates, loadFetch, add } = this.props;
    const { id, currency } = this.state;
    const indice = id + 1;
    loadFetch();
    await this.setState({
      exchangeRates,
    });
    addStates(this.state);
    const moedas = Object.values(exchangeRates);
    const coin = moedas.find((element) => element.code === currency);
    const value = coin.ask;
    const { name } = coin;
    const coinName = name.split('/')[0];
    add(value, currency, coinName);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alim,
      id: indice,
      exchangeRates: {},
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, bool } = this.props;
    return (
      <div>
        <Header />
        {bool !== true
          ?
          <section>
            <label htmlFor="value">
              Valor:
              <input
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
                id="currency"
                name="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                {currencies
                  .map((element) => <option key={ element }>{element}</option>)}
              </select>
            </label>
            <label htmlFor="method">
              Método de pagamento:
              <select
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
                id="description"
                data-testid="description-input"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </section>
          :
          <FormEdit currencies={currencies}/>
        }
        <section>
          <Table />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  currencies: store.wallet.currencies,
  exchangeRates: store.values.exchangeRates,
  bool: store.values.bool,
  datas: store.values.datas,
});

const mapDispatchToProps = (dispatch) => ({
  loadFetch: () => dispatch(fetchAPI()),
  addStates: (state) => dispatch(captureExpense(state)),
  add: (value, currency, coinName) => dispatch(
    captureValueAndCurrency(value, currency, coinName),
  ),
});

Wallet.propTypes = {
  loadFetch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addStates: PropTypes.func.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.object).isRequired,
  add: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
