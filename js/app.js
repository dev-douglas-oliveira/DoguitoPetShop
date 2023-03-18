import { valida } from "./validacao.js"; //importa a função valida do arquivo validacao.js

const inputs = document.querySelectorAll("input"); //pega todos os inputs do documento

inputs.forEach((input) => {
    //percorre o array de inputs
    if (input.dataset.tipo === "preco") {
        SimpleMaskMoney.setMask(input, {
            prefix: "R$ ",
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ",",
            thousandsSeparator: ".",
            cursor: "end",
        });
    }

    input.addEventListener("input", (evento) => {
        //adiciona um evento de input para cada input
        valida(evento.target); //chama a função valida passando o input como parâmetro
    });
});
