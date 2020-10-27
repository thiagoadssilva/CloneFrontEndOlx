/* Arquivo responsável pela validação de autenticação de acesso*/
import Cookies from 'js-cookie';

export const isLogged = () =>{
    let token = Cookies.get('token');
    return (token) ? true : false;
}

export const doLogin = (token, rememberPassword = false) =>{
    if(rememberPassword){
        // Se a opção de lembrar senha estiver marcada, vamos permitir que esse token fique armazendo mesmo quando fechar o navegador
        Cookies.set('token', token, {expires:999});
    }else{
        // Se não estiver marcado não vamos armazenar nada.
        Cookies.set('token', token);
    }
}

export const doLougout = () =>{
    Cookies.remove('token');
}