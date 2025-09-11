function contar() {
    // Obtém os elementos de entrada e resultado do HTML
    var startNumber = document.getElementById("start"); // valor inicial
    var endNumber = document.getElementById("end");     // valor final
    var stepNumber = document.getElementById("step");   // valor do passo
    var result = document.getElementById("result");     // área de resultado

    // Verifica se algum campo está vazio
    if (
        startNumber.value.length == 0 ||
        endNumber.value.length == 0 ||
        stepNumber.value.length == 0
    ) {
        result.innerHTML = "Impossível contar!"; // Mensagem de erro
    } else {
        result.innerHTML = "Contando: <br>"; // Inicia o resultado
        result.innerHTML += "🏠 "; // Ícone inicial

        // Converte os valores de entrada para número
        let i = Number(startNumber.value);
        let f = Number(endNumber.value);
        let p = Number(stepNumber.value);

        // Verifica se o passo é inválido (zero ou negativo)
        if (p <= 0) {
            window.alert("Erro: o passo precisa ser maior que zero. Usando passo 1.");
            p = 1; // Define o passo como 1 por padrão
        }

        if (i < f) {
            // Contagem crescente
            for (let c = i; c <= f; c += p) {
                result.innerHTML += `${c} ✌🏻 `; // Adiciona cada número com emoji
            }
        } else {
            // Contagem regressiva
            for (let c = i; c >= f; c -= p) {
                result.innerHTML += `${c} ✌🏻 `; // Adiciona cada número com emoji
            }
        }
        result.innerHTML += `🏁`; // Ícone de finalização
    }
}
