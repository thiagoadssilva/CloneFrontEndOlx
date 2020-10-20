import React, {useState} from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width: 400px;
    height: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

var total = 0;


function App(){
  const [ numeroUm, setNumeroUm ] = useState(0);
  const [ numeroDois, setNumeroDois] = useState(10);

  const valorConta = (e) => {
      setNumeroUm(parseFloat(e.target.value));
  }

  const valorDesconto = (e) =>{
      setNumeroDois(parseFloat(e.target.value));
  }

  return (
    <div>
        <h1>Calculadora de Gorjeta</h1> 

        <span>Quanto deu a conta?</span>
        <br/>
        <Input type="number" value={numeroUm} onChange={valorConta}></Input>
        <br/>
        <span>Qual a porcentagem da gorjeta?</span>
        <br/>
        <Input type="number" value={numeroDois} onChange={valorDesconto}></Input>

        <hr/>
        
        {numeroUm > 0 &&
          <div>
            <p>Sub-total: R$ {numeroUm}</p>
            <p>Gorjeta ({numeroDois}%): R$ {numeroUm * (numeroDois / 100)}</p>
            <p><b> Total: R$ {numeroUm + ((numeroDois / 100) * numeroUm)}</b></p>
          </div>
        }
        
        
    </div>
  )
}

export default App;