import { valida } from "./validacao.js"; //importa a função valida do arquivo validacao.js

const inputs = document.querySelectorAll("input"); //pega todos os inputs do documento

inputs.forEach((input) => {
    //percorre todos os inputs
    input.addEventListener("input", (evento) => {
        //adiciona um evento de input para cada input
        valida(evento.target); //chama a função valida passando o input como parâmetro
    });
});
