import Cookies from 'js-cookie';
import qs from 'qs';
// Aqui vamos criar um HOOK para fazer a comunicação com WebService (API)

const BASEAPI = 'http://alunos.b7web.com.br:501';

const apiFetchPost = async (andpoint, body) =>{

    if(!body.token){
        let token = Cookies.get('token');

        if(token){
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+andpoint, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json
}

const apiFetchGet = async (andpoint, body = []) =>{

    if(!body.token){
        let token = Cookies.get('token');

        if(token){
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+andpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if(json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json
}

// Criando um objeto para que vai conter as funções que vamos usar para pegar ou validar as informações no webService
const OlxAPI = {
    login:async(email, password) => {
       const json = await apiFetchPost(
           '/user/signin',
           {email, password}
       );
       return json;
    },

    register:async (name, email, password, stateLoc) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },

    getStates:async () =>{
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;
    },

    getCategories:async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    }
};

// Obriganto o retorno de uma função
export default () => OlxAPI;