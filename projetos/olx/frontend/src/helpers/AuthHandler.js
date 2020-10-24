/* Arquivo responsável pela validação de autenticação de acesso*/
import Cookies from 'js-cookie';

export const isLogged = () =>{
    let token = Cookies.get('token');
    return (token) ? true : false;
}