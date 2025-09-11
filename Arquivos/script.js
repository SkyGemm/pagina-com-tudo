function mostrarSaudacao() {
    const horaAtual = new Date().getHours();
    const saudacaoElement = document.getElementById('saudacao');
    const body = document.body;
    
    body.className = '';
    document.querySelectorAll('.imagem-periodo').forEach(img => {
        img.style.display = 'none';
    });
    
    if (horaAtual >= 5 && horaAtual < 12) {
        saudacaoElement.textContent = "Bom dia! ☀️";
        document.getElementById('manha').style.display = 'block';
        body.classList.add('manha');
    } else if (horaAtual >= 12 && horaAtual < 18) {
        saudacaoElement.textContent = "Boa tarde! 🌤️";
        document.getElementById('tarde').style.display = 'block';
        body.classList.add('tarde');
    } else {
        saudacaoElement.textContent = "Boa noite! 🌙";
        document.getElementById('noite').style.display = 'block';
        body.classList.add('noite');
    }
}

window.addEventListener('DOMContentLoaded', mostrarSaudacao);
setInterval(mostrarSaudacao, 3600000);