// Aqui vamos criar um HOOK para fazer a comunicação com WebService (API)

// Criando um objeto para que vai conter as funções que vamos usar para pegar ou validar as informações no webService
const OlxAPI = {
    login:async(login, password) => {
            // aqui vai fica a comunicação
        return {error: 'Funcionalidade Imcompleta'};
    }
};

// Obriganto o retorno de uma função
export default () => OlxAPI;