import React, {useState} from "react";
import { PageArea } from './styled';

import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage} from '../../components/MainComponents';


const Page = () =>{
  // Fazendo a chamada da função do arquivo que comunicação com a webService
  const api = useApi();

  //- INICIO Criando os states para cada campo que existe ne tela
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  //- INICIO Criando os states para cada campo que existe ne tela

  // Constante para fazer o controle do carregamento das informações da tela, não deixando o usuario dar duplo click no botão. 
  const [disabled, setDisabled] = useState(false);
  // Criando uma constante para o retorno de algum erro na api
  const [error, setError] = useState('');

  // Função que vai validar o acesso do usuario;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);// Aqui não permito que o usuario apere novamento no botão.
    setError('');
    // Criando uma constando que vai está armazendo o retorno da função como objeto json
    const json = await api.login(email, password);
     
    if(json.error){
      setError(json.error);
    }else{
      doLogin(json.token, rememberPassword);
      window.location.href = '/';
    }

    setDisabled(false);
  }

  return(
    <PageContainer>
      <PageTitle>Login</PageTitle>    
      <PageArea>

        {error &&
          <ErrorMessage>{error}</ErrorMessage>
        }

        <form onSubmit={handleSubmit}>
          <label>
            <div className="area"> 
              <div className="area--title">E-mail</div>
              <div className="area--input">
                <input 
                  type="email" 
                  disabled={disabled}
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  required></input>
              </div>
            </div>
          </label>

          <label>
            <div className="area"> 
              <div className="area--title">Senha</div>
              <div className="area--input">
                <input
                  type="password"
                  disabled={disabled}
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  required></input>
              </div>
            </div>
          </label>

          <label>
            <div className="area"> 
              <div className="area--title">Lembra Senha</div>
              <div className="area--input">
                <input
                  type="checkbox"
                  disabled={disabled}
                  checked={rememberPassword}
                  onChange={()=>setRememberPassword(!rememberPassword)}></input>
              </div>
            </div>
          </label>

          <label>
            <div className="area"> 
              <div className="area--title"></div>
              <div className="area--input">
                <button disabled={disabled}>Fazer Login</button>
              </div>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default Page;