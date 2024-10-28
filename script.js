// Simular autenticação
document.addEventListener('DOMContentLoaded', function() {
    // Espera até que todo o DOM seja carregado
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio do formulário para recarregar a página
        
        // Captura os valores inseridos pelo usuário
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Verifica se as credenciais estão corretas (simulando com admin/admin123)
        if (username === "admin" && password === "admin123") {
            // Redireciona para o dashboard se o login for bem-sucedido
            window.location.href = "dashboard.html"; 
        } else {
            // Exibe a mensagem de erro se as credenciais forem inválidas
            document.getElementById('error-message').classList.remove('hidden');
        }
    });
});
