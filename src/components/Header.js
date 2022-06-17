import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './Header.css';
import wallet from '../icons/wallet-solid.svg';
import user from '../icons/user-solid.svg';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const values = expenses.map((element) => (Number(element.value)
    * Number(element.exchangeRates[element.currency].ask)));
    const total = values.reduce((previous, totalValue) => previous + totalValue, 0);
    const number = 0;

    return (
      <header className='header'>
        <img className='iconsHeader' src={user} alt='user'/>
        <span className='textHeader' data-testid="email-field">{ email }</span>
        <img className='iconsHeader' src={wallet} alt='carteira'/>
        <span
          data-testid="total-field"
          className='numberHeader'
        >
          {values.length !== 0 ? (total.toFixed(2)) : number}
        </span>
        <span className='brl' data-testid="header-currency-field">BRL</span>
      </header>

    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
  value: store.values.value,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
