import React, {useState, useEffect} from "react";
import { PageArea } from './styled';

import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage} from '../../components/MainComponents';

const Page = () =>{
  // Fazendo a chamada da função do arquivo que comunicação com a webService
  const api = useApi();

  //- INICIO Criando os states para cada campo que existe ne tela
  const [name, setName] = useState('');
  const [stateLoc, setStateLoc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stateList, setStateList] = useState([]);
  //- FIM Criando os states para cada campo que existe ne tela

  console.log(password)

  // Constante para fazer o controle do carregamento das informações da tela, não deixando o usuario dar duplo click no botão. 
  const [disabled, setDisabled] = useState(false);
  // Criando uma constante para o retorno de algum erro na api
  const [error, setError] = useState('');

  // Vamos criar uma useEffect para fazer a requisição no servidor dos estados
  useEffect (() =>{
    const getStates = async () =>{
      const slist = await api.getStates();
      setStateList(slist);
    }
    getStates();
  }, []);

  // Função que vai validar o acesso do usuario;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);// Aqui não permito que o usuario apere novamento no botão.
    setError('');

    if(password !== confirmPassword){
      setError('Senhas não batem!!');
      setDisabled(true);
      return;
    }
  
    // Criando uma constando que vai está armazendo o retorno da função como objeto json
    const json = await api.register(name, email, password, stateLoc);
     
    if(json.error){
      setError(json.error);
    }else{
      doLogin(json.token);
      window.location.href = '/';
    }

    setDisabled(false);
  }

  return(
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>    
      <PageArea>

        {error &&
          <ErrorMessage>{error}</ErrorMessage>
        }

        <form onSubmit={handleSubmit}>
          <label>
            <div className="area"> 
              <div className="area--title">Nome Completo</div>
              <div className="area--input">
                <input 
                  type="text" 
                  disabled={disabled}
                  value={name}
                  onChange={e=>setName(e.target.value)}
                  required></input>
              </div>
            </div>
          </label>

          <label>
            <div className="area"> 
              <div className="area--title">Estado</div>
              <div className="area--input">
                <select required value={stateLoc} onChange={e => setStateLoc(e.target.value)}>
                  <option>Selecione</option>
                  {stateList.map((i,k) =>
                    <option key={k} value={i._id}>{i.name}</option>
                  )}
                </select>
              </div>
            </div>
          </label>

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
                  onChange={e => setPassword(e.target.value)}
                  required>
                </input>
              </div>
            </div>
          </label>

          <label>
            <div className="area"> 
              <div className="area--title">Confirmar Senha</div>
              <div className="area--input">
                <input
                  type="password"
                  disabled={disabled}
                  value={confirmPassword}
                  onChange={e=>setConfirmPassword(e.target.value)}
                  required></input>
              </div>
            </div>
          </label>
          

          <label>
            <div className="area"> 
              <div className="area--title"></div>
              <div className="area--input">
                <button disabled={disabled}>Fazer Cadastro</button>
              </div>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default Page;