import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux/';
import { Link } from 'react-router-dom';
import { captureEmail } from '../actions';
import './Login.css';
import Footer from '../components/Footer';
import wallet from '../icons/wallet-solid.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const passwordLength = 4;
    const { name, value } = target;
    const { email, password } = this.state;
    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    // ideia de validação de email retirada do site https://learnetto.com/blog/react-form-validation
    this.setState({
      [name]: value,
    });
    if (emailValid !== null) {
      if (password.length > passwordLength) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: true,
        });
      }
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const {
      email,
      password,
      disabled,
    } = this.state;

    const { sendEmail } = this.props;

    return (
      <main>
        <div className='title'>
          <h1>My Wallet</h1>
          <img className='wallet' src={wallet} alt='carteira'/>
        </div>
        <div className='login'>
          <input
            className='inputs'
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
            value={ email }
            type="email"
            placeholder="Email"
          />
          <input
            className='inputs'
            data-testid="password-input"
            name="password"
            onChange={ this.handleChange }
            value={ password }
            type="password"
            placeholder="Password"
          />
          <Link to="/carteira">
            <button
              className='entrar'
              type="button"
              disabled={ disabled }
              onClick={ () => sendEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(captureEmail(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
