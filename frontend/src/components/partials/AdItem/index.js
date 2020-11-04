import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from './styled';

export default (props) =>{

    //console.log(props.data.images[0].url);
     //console.log("http://alunos.b7web.com.br:501/media/" + `props.data.images[0].url`);   
     console.log(props.data.image);

    let price = '';

    if(props.data.priceNegotiable){
        price = 'Preço Negociável';
    }else{
        price = `R$ ${props.data.price}`;
    }

    if(props.controle === 1){
        var urlImage = "http://alunos.b7web.com.br:501/media/"+props.data.images[0].url;
    }

    return(
        <Item className="aditem">
            {props.controle === 1 &&
                 <Link to={`/post-an-alter/${props.data.id}`}>
                    <div className="itemImage">
                        <img src={urlImage} alt="" ></img> 
                    </div>

                    <div className="itemName">{props.data.title}</div>
                    <div className="itemPrice">{price}</div>
                </Link>
            }
            {props.controle === 0 &&
                <Link to={`/ad/${props.data.id}`}>
                    <div className="itemImage">
                        <img src={props.data.image} alt="" ></img> 
                    </div>

                    <div className="itemName">{props.data.title}</div>
                    <div className="itemPrice">{price}</div>
                </Link>
            }


            
        </Item>
    );
}