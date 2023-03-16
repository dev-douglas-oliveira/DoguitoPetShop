export function valida(input) {
    //exporta a função valida para ser usada em outros arquivos
    const tipoDeInput = input.dataset.tipo; //pega o valor do atributo data-tipo do input

    if (validadores[tipoDeInput]) {
        //verifica se o tipo de input existe no objeto validadores
        validadores[tipoDeInput](input); //chama a função do objeto validadores passando o input como parâmetro
    }

    if (input.validity.valid) {
        //verifica se o input é válido
        input.parentElement.classList.remove("input-container--invalido"); //remove a classe de erro do input
        input.parentElement.querySelector(".input-mensagem-erro").innerHTML =
            ""; //limpa a mensagem de erro do input
    } else {
        input.parentElement.classList.add("input-container--invalido"); //adiciona a classe de erro do input
        input.parentElement.querySelector(".input-mensagem-erro").innerHTML =
            mostraMensagemDeErro(tipoDeInput, input); //adiciona a mensagem de erro do input
    }
}
const tiposDeErro = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]; //array com os tipos de erro

const mensagensDeErro = {
    //objeto com as mensagens de erro
    nome: {
        valueMissing: "O campo nome não pode estar vazio",
    },
    email: {
        valueMissing: "O campo email não pode estar vazio",
        typeMismatch: "O email digitado não é válido",
    },
    senha: {
        valueMissing: "O campo senha não pode estar vazio",
        patternMismatch:
            "A senha deve conter entre 6 e 12 caracteres e deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número",
    },
    dataNascimento: {
        valueMissing: "O campo data de nascimento não pode estar vazio",
        typeMismatch: "A data digitada não é válida",
        customError: "Você deve ter mais de 18 anos",
    },
};
const validadores = {
    dataNascimento: (input) => validaDataNascimento(input),
};

function mostraMensagemDeErro(tipoDeInput, input) {
    //função que retorna a mensagem de erro
    let mensagem = ""; //inicializa a variável mensagem com uma string vazia

    tiposDeErro.forEach((erro) => {
        //percorre o array tiposDeErro
        if (input.validity[erro]) {
            //verifica se o input tem o erro
            mensagem = mensagensDeErro[tipoDeInput][erro]; //se tiver o erro, pega a mensagem de erro do objeto mensagensDeErro
        }
    });

    if (input.validity.valueMissing) {
        //verifica se o input está vazio
        mensagem = mensagensDeErro[tipoDeInput].valueMissing; //se estiver vazio, pega a mensagem de erro do objeto mensagensDeErro
    } else if (input.validity.typeMismatch) {
        //verifica se o input está com o tipo errado
        mensagem = mensagensDeErro[tipoDeInput].typeMismatch; //se estiver com o tipo errado, pega a mensagem de erro do objeto mensagensDeErro
    } else if (input.validity.patternMismatch) {
        //verifica se o input está com o padrão errado
        mensagem = mensagensDeErro[tipoDeInput].patternMismatch; // se estiver com o padrão errado, pega a mensagem de erro do objeto mensagensDeErro
    } else if (input.validity.customError) {
        //  verifica se o input está com um erro customizado
        mensagem = mensagensDeErro[tipoDeInput].customError; //se estiver com um erro customizado, pega a mensagem de erro do objeto mensagensDeErro
    }
    return mensagem;
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value);
    maiorQue18(dataRecebida);
    let mensagem = "";

    if (input.value == "") {
        mensagem = "Informe a data de nascimento";
    } else if (isNaN(dataRecebida)) {
        mensagem = "Data inválida";
    } else if (!maiorQue18(dataRecebida)) {
        mensagem = "Você deve ter mais de 18 anos";
    }

    input.setCustomValidity(mensagem); //seta a mensagem de erro
}

function maiorQue18(data) {
    const dataAtual = new Date(); //data de hoje
    const dataMais18 = new Date(data.setFullYear(data.getFullYear() + 18)); //data de hoje + 18 anos

    return dataMais18 <= dataAtual; //retorna true se a data de hoje + 18 anos for menor ou igual a data de hoje
}
