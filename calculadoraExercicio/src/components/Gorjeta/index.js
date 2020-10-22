import React, {useState, useEffect} from 'react';
import Titulo from '../Titulo/index';
import LabelNome from '../Label/index';
import Modal from '../Modal/index';
import {DivPai, DivCOnteudoNumerico, Input, DivResultado, DivResultadoFilho} from './styles';

function Gorjeta(){

  const [ numeroUm, setNumeroUm ] = useState(0);
  const [ numeroDois, setNumeroDois] = useState(10);
  const [ modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
      setModalVisible(true); 
  },[]);

  return (
    <DivPai>
      <DivCOnteudoNumerico>
        <Modal visible={modalVisible} setVisible={setModalVisible}/>
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

export default Gorjeta;