import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { newExpense, received } from '../actions';
import './Table.css';

class Table extends React.Component {
  editLine = (state) => {
    const { moveForWallet } = this.props;
    const datas = state;
    moveForWallet(true, datas);
  }

  deleteLine = (key) => {
    const { expenses, attState } = this.props;
    const newExpenses = expenses.filter((element) => element.id !== key);
    attState(newExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length !== 0
              ? expenses.map((element) => (
                <tr key={ element.id }>
                  <td>
                    {element.description}
                  </td>
                  <td>
                    {element.tag}
                  </td>
                  <td>
                    {element.method}
                  </td>
                  <td>
                    {parseFloat(element.value).toFixed(2)}
                  </td>
                  <td>
                    {Number(element.exchangeRates[element.currency].ask).toFixed(2)}
                  </td>
                  <td>
                    { element.exchangeRates[element.currency].name }
                  </td>
                  <td>
                    {Number(
                      element.value * element.exchangeRates[element.currency].ask,
                    ).toFixed(2)}
                  </td>
                  <td>
                    Real
                  </td>
                  <td>
                    <button
                      className='buttonEditTable'
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.editLine(element) }
                    >
                      Editar
                    </button>
                    <button
                      className='buttonDeletTable' 
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.deleteLine(element.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
              : console.log('sem dados')}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
  exchangeRates: store.values.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  attState: (expenses) => dispatch(newExpense(expenses)),
  moveForWallet: (bool, datas) => dispatch(received(bool, datas)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  attState: PropTypes.func.isRequired,
  moveForWallet: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
