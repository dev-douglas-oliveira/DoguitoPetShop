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
    cpf: {
        valueMissing: "O campo CPF não pode estar vazio",
        customError: "O CPF digitado não é válido",
    },
    cep: {
        valueMissing: "O campo CEP não pode estar vazio",
        patternMismatch: "O CEP digitado não é válido",
        customError: "Não foi possível buscar o CEP",
    },
    logradouro: {
        valueMissing: "O campo logradouro não pode estar vazio",
    },
    cidade: {
        valueMissing: "O campo cidade não pode estar vazio",
    },
    estado: {
        valueMissing: "O campo estado não pode estar vazio",
    },
    preco: {
        valueMissing: "O campo preço não pode estar vazio",
    },
};
const validadores = {
    dataNascimento: (input) => validaDataNascimento(input),
    cpf: (input) => validaCPF(input),
    cep: (input) => recuperarCEP(input),
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
    let mensagem = "";

    if (!maiorQue18(dataRecebida)) {
        mensagem = "Você deve ser maior que 18 anos para se cadastrar.";
    }

    input.setCustomValidity(mensagem); //seta a mensagem de erro
}

function maiorQue18(data) {
    const dataAtual = new Date(); //data de hoje
    const dataMais18 = new Date(
        data.getUTCFullYear() + 18,
        data.getUTCMonth(),
        data.getUTCDate()
    );

    return dataMais18 <= dataAtual; //retorna true se a data de hoje + 18 anos for menor ou igual a data de hoje
}

function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, ""); //remove todos os caracteres que não são números
    let mensagem = "";

    if (!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
        //verifica se o cpf é válido
        mensagem = "CPF inválido";
    }

    input.setCustomValidity(mensagem); //seta a mensagem de erro
}

function checaCPFRepetido(cpf) {
    //função que verifica se o cpf é válido
    const valoresRepetidos = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
    ]; //array com os cpfs inválidos

    let cpfValido = true;

    valoresRepetidos.forEach((valorRepetido) => {
        // percorre o array valoresRepetidos
        if (valorRepetido == cpf) {
            //verifica se o cpf recebido é igual a algum valor do array cpfsInvalidos
            cpfValido = false; //se for igual, seta a variável cpfValido como false
        }
    });

    return cpfValido; //retorna true se o cpf for válido e false se o cpf for inválido
}

function checaEstruturaCPF(cpf) {
    const multiplicador = 10;
    const multiplicador2 = 11;

    return checaDigitoVerificador(cpf, multiplicador);
}

function checaDigitoVerificador(cpf, multiplicador) {
    if (multiplicador >= 12) {
        return true; //se o multiplicador for maior ou igual a 12, retorna true
    }
    let multiplicadorInicial = multiplicador;
    let soma = 0;
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split(""); //pega os 9 primeiros digitos do cpf
    const digitoVerificador = cpf.charAt(multiplicador - 1); //pega o primeiro digito verificador

    for (let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
        soma += cpfSemDigitos[contador] * multiplicadorInicial;
        contador++;
    }

    if (digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1); //se for igual, chama a função novamente para verificar o segundo digito verificador
    }
    return false;
}

function confirmaDigito(soma) {
    return 11 - (soma % 11);
}

function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, ""); //remove todos os caracteres que não são números
    const url = `https://viacep.com.br/ws/${cep}/json/`; //url da api do viacep

    if (cep != "") {
        const options = {
            method: "GET", // método da requisição
            mode: "cors", // modo de requisição
            headers: {
                "Content-Type": "application/json;charset=utf-8", // tipo de conteúdo da requisição
            },
        };

        if ((!input.validity.patternMismatch && input, validity.valueMissing)) {
            fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    //pega os dados da requisição
                    if (data.erro) {
                        input.setCustomValidity("CEP não encontrado"); //se o cep não for encontrado, seta a mensagem de erro
                        return;
                    }
                    input.setCustomValidity("");
                    preencheCamposComCEP(data);
                    return;
                });
        }
    }
}

function preencheCamposComCEP(data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]');
    const cidade = document.querySelector('[data-tipo="cidade"]');
    const estado = document.querySelector('[data-tipo="estado"]');

    logradouro.value = data.logradouro; //preenche o campo logradouro com o dado recebido da requisição
    cidade.value = data.localidade; //preenche o campo cidade com o dado recebido da requisição
    estado.value = data.uf; //preenche o campo estado com o dado recebido da requisição
}
