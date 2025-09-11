document.getElementById('formLogin')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    
    if (usuario === 'Admin' && senha === '123@4') {
        alert('Login realizado com sucesso!');
        window.location.href = 'veiculos.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

if (window.location.pathname.includes('aluguel.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const veiculoId = urlParams.get('veiculo');
        
        const veiculos = {
            '1': { nome: 'Carro Econômico', preco: 120, imagem: 'images/carro1.jpg' },
            '2': { nome: 'SUV', preco: 200, imagem: 'images/carro2.jpg' },
            '3': { nome: 'Pickup', preco: 250, imagem: 'images/carro3.jpg' },
            '4': { nome: 'Carro de Luxo', preco: 350, imagem: 'images/carro4.jpg' }
        };
        
        const veiculoSelecionado = veiculos[veiculoId];
        
        if (veiculoSelecionado) {
            const infoVeiculo = document.getElementById('info-veiculo');
            infoVeiculo.innerHTML = `
                <div class="veiculo-selecionado">
                    <img src="${veiculoSelecionado.imagem}" alt="${veiculoSelecionado.nome}">
                    <h3>${veiculoSelecionado.nome}</h3>
                    <p>Preço por dia: R$ ${veiculoSelecionado.preco}</p>
                </div>
            `;
        }
    });
}

document.getElementById('formAluguel')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    window.location.href = 'confirmacao.html';
});