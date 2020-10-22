import React from 'react';
import {ModalBackground, ModalArea} from './styles';

function Modal(props){
  const  fecharModal = () =>{
    props.setVisible(false);
  };

  return(
      <>
        {props.visible === true &&
        <ModalBackground onClick={fecharModal}>
          <ModalArea>
            <h1>Seja Bem-Vindo!!</h1>
            {props.children}
          </ModalArea>
        </ModalBackground>
        }
      </>
  )
}

export default Modal;