// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Função para adicionar recurso
    const addResourceButton = document.getElementById('add-resource-button');
    const resourceList = document.getElementById('resource-list');

    addResourceButton.addEventListener('click', () => {
        const resourceName = document.getElementById('resource-name').value.trim();
        const resourceStatus = document.getElementById('resource-status').value.trim();

        if (resourceName && resourceStatus) {
            const listItem = document.createElement('li');
            listItem.textContent = `Resource: ${resourceName}, Status: ${resourceStatus}`;
            
            resourceList.appendChild(listItem);

            // Limpar campos
            document.getElementById('resource-name').value = '';
            document.getElementById('resource-status').value = '';
        } else {
            alert('Please enter both resource name and status.');
        }
    });

    // Logout button functionality
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
        alert('Logging out...');
        // Simula um logout redirecionando para a página de login
        window.location.href = 'login.html';
    });

    // Simulação de dados do gráfico de segurança
    const securityChart = document.getElementById('security-chart');
    function updateSecurityChart() {
        securityChart.textContent = 'Security Status: All systems operational.';
        
        // Simula uma atualização de status de segurança
        setTimeout(() => {
            securityChart.textContent = 'Security Alert: Minor issues detected!';
        }, 5000);
    }

    updateSecurityChart();
});
