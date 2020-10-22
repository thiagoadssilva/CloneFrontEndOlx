import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Titulo from './components/Titulo/index';
import LabelNome from './components/Label/index';

function App(){

  const [ numeroUm, setNumeroUm ] = useState(0);
  const [ numeroDois, setNumeroDois] = useState(10);

  const valorConta = (e) => {
      setNumeroUm(parseFloat(e.target.value));
  }

  const valorDesconto = (e) =>{
      setNumeroDois(parseFloat(e.target.value));
  }

  useEffect (() => {
    if(numeroUm < 0){
      alert('Valor da conta não pode ser menor que 0');
      setNumeroUm(0);      
    }

    if(numeroDois < 0){
      alert('Valor da gorjeta não pode ser menor que 0');
      setNumeroDois(10);      
    }

  }, [numeroUm, numeroDois]);

  return (
    <DivPai>
      <DivCOnteudoNumerico>
        <Titulo/>

        <LabelNome nome="Quanto deu a conta?"/>
        <br/>
        <Input type="number" value={numeroUm} onChange={valorConta}></Input>
        <br/>
        <LabelNome nome="Qual a porcentagem da gorjeta?"/>
        <br/>
        <Input type="number" value={numeroDois} onChange={valorDesconto}></Input>
      </DivCOnteudoNumerico>

      <DivResultado>
        {numeroUm > 0 &&
          <DivResultadoFilho>
            <p>Sub-total: R$ {numeroUm}</p>
            <p>Gorjeta ({numeroDois}%): R$ {numeroUm * (numeroDois / 100)}</p>
            <p><b> Total: R$ {numeroUm + ((numeroDois / 100) * numeroUm)}</b></p>
          </DivResultadoFilho>
        }
      </DivResultado>
    </DivPai>
  )
}

const Input = styled.input`
    margin-left: 5px;
    width: 400px;
    height: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Title = styled.h1`
  color: red;
  font-size: 30px;
  margin-left: 40px;
  align-content: center;
  
`;

const DivPai = styled.div`
  border: 1px solid;
`;

const DivCOnteudoNumerico = styled.div`
  margin-top: 5px;
  margin-right: 5px;
  margin-left: 5px;

  position: relative;
  border: 1px solid;
`;

const DivResultado = styled.div`
  margin-top: 5px;
  margin-right: 5px;
  margin-left: 5px;
  margin-bottom: 5px;
  border: 1px solid;
`;

const DivResultadoFilho = styled.div`
  margin-left: 5px;

`;

export default App;