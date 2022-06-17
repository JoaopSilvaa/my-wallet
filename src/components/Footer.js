import React from 'react';
import linkedin from '../icons/linkedin-brands.svg';
import github from '../icons/github-brands.svg';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className='footer'>
            <p>Desenvolvido por João Antônio <br/>
                DEV - FullStack 
            </p>
        <div className='icons'>
          <a href='https://www.linkedin.com/in/joaoantoniosilvaa/'>
            <img className='icon' src={linkedin} alt='icone linkedin para acesso ao perfil likedin de João'/>
          </a>
          <a href='https://github.com/JoaopSilvaa'>
            <img className='icon' src={github} alt='ícone github para acesso ao perfil github de João'/>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
