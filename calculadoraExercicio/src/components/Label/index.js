import React from 'react';
import {ValorConta} from './styles';


function LabelNome(props) {
    return(
        <>
          <ValorConta>{props.nome}</ValorConta>
        </>
    )
}


export default LabelNome;