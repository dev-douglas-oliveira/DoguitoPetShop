const dataNascimento = document.querySelector("#nascimento"); //input de data de nascimento

dataNascimento.addEventListener("blur", (evento) => {
    //evento disparado quando o elemento perde o foco
    validaDataNascimento(evento.target); //evento.target é o elemento que disparou o evento
});

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

    input.setCustomValidity(mensagem);//seta a mensagem de erro
}

function maiorQue18(data) {
    const dataAtual = new Date(); //data de hoje
    const dataMais18 = new Date(data.setFullYear(data.getFullYear() + 18)); //data de hoje + 18 anos

    return dataMais18 <= dataAtual; //retorna true se a data de hoje + 18 anos for menor ou igual a data de hoje
}
