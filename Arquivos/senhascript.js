document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('loginForm');
    const inputs = document.querySelectorAll('.input');
    const mensagem = document.getElementById('mensagem');
    
    inputs.forEach(input => {
        if(input.value.trim() !== '') {
            input.classList.add('has-val');
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;
        
        const USUARIO_VALIDO = 'admin';
        const SENHA_VALIDA = '123@456';
        
        if(usuario === USUARIO_VALIDO && senha === SENHA_VALIDA) {
            mensagem.textContent = 'Login válido! Redirecionando...';
            mensagem.className = 'sucesso';
            
            setTimeout(() => {
                window.location.href = 'https://www.example.com';
            }, 2000);
        } else {
            mensagem.textContent = 'Usuário ou senha incorretos!';
            mensagem.className = 'erro';
            
            setTimeout(() => {
                mensagem.textContent = '';
                mensagem.className = '';
            }, 3000);
        }
    });
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('has-val');
        });
        
        input.addEventListener('blur', function() {
            if(this.value === '') {
                this.classList.remove('has-val');
            }
        });
    });
});