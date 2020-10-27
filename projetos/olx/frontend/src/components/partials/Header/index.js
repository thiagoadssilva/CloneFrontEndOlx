import React from 'react';
import { HeaderArea } from './styled';
import { Link } from 'react-router-dom';

import {doLougout, isLogged} from '../../../helpers/AuthHandler';

const Header = () => {

  let logged = isLogged();

  const handleLougout = () =>{
    doLougout();
    window.location.href = '/';
  }

  return(
    <HeaderArea>
      <div className="container">
        {/* INICIO - Criando a estrutura do menu lado esquerdo */}
        <div className="logo">
            <Link to="/">
                <span className="logo-1">O</span>
                <span className="logo-2">L</span>
                <span className="logo-3">X</span>
            </Link>
        </div>
        {/* FIM - Criando a estrutura do menu lado esquerdo */}

        {/* INICIO - Criando a estrutura do menu lado direito */}                
        <nav>                    
            <ul>
                {logged &&
                    <>
                      <li>
                          <Link to="/my-account">Minha Conta</Link>
                      </li>
                      <li>
                          <button onClick={handleLougout}>Sair</button>
                      </li>
                      <li>
                          <Link to="/post-an-ad" className="button">Poste um anúcio</Link>
                      </li>
                    </>
                }
                {!logged &&
                    <>
                      <li>
                          <Link to="/signin">Login</Link>
                      </li>
                      <li>
                          <Link to="/signup">Cadastrar</Link>
                      </li>
                      <li>
                        <Link to="/signin" className="button">Poste um anúcio</Link>
                      </li>
                    </>
                }                                
            </ul>
        </nav>
        {/* FIM - Criando a estrutura do menu lado direito */}
      </div>
    </HeaderArea>
  );
}

export default Header;