// js/ministerios.js - Lógica para o gerenciamento de ministérios/departamentos
let ministerios = [];

// Função para carregar ministérios do localStorage quando a página carrega
window.onload = function() {
    carregarMinisterios();
};

// Função para adicionar um novo ministério
function adicionarMinisterio() {
    const nome = document.getElementById('nomeMinisterio').value.trim();
    const lider = document.getElementById('liderMinisterio').value.trim();
    const descricao = document.getElementById('descricaoMinisterio').value.trim();

    if (nome === '') {
        alert('O nome do Ministério/Departamento é obrigatório!');
        return;
    }

    const novoMinisterio = {
        id: Date.now(),
        nome,
        lider,
        descricao
    };

    ministerios.push(novoMinisterio);
    salvarMinisterios();
    renderizarMinisterios();

    // Limpa os campos
    document.getElementById('nomeMinisterio').value = '';
    document.getElementById('liderMinisterio').value = '';
    document.getElementById('descricaoMinisterio').value = '';
}

// Função para salvar os ministérios
function salvarMinisterios() {
    localStorage.setItem('ministeriosIgreja', JSON.stringify(ministerios));
}

// Função para carregar os ministérios
function carregarMinisterios() {
    const ministeriosSalvos = localStorage.getItem('ministeriosIgreja');
    if (ministeriosSalvos) {
        ministerios = JSON.parse(ministeriosSalvos);
    }
    renderizarMinisterios();
}

// Função para renderizar os ministérios
function renderizarMinisterios() {
    const listaDeMinisteriosDiv = document.getElementById('listaDeMinisterios');
    listaDeMinisteriosDiv.innerHTML = '';

    if (ministerios.length === 0) {
        listaDeMinisteriosDiv.innerHTML = '<p>Nenhum ministério cadastrado ainda.</p>';
        return;
    }

    ministerios.forEach(ministerio => {
        const ministerioItem = document.createElement('div');
        ministerioItem.classList.add('ministerio-item');

        ministerioItem.innerHTML = `
            <button onclick="excluirMinisterio(${ministerio.id})">Excluir</button>
            <h3>${ministerio.nome}</h3>
            ${ministerio.lider ? `<p><strong>Líder:</strong> ${ministerio.lider}</p>` : ''}
            ${ministerio.descricao ? `<p><strong>Descrição:</strong> ${ministerio.descricao.replace(/\n/g, '<br>')}</p>` : ''}
        `;

        listaDeMinisteriosDiv.appendChild(ministerioItem);
    });
}

// Função para excluir um ministério
function excluirMinisterio(id) {
    ministerios = ministerios.filter(ministerio => ministerio.id !== id);
    salvarMinisterios();
    renderizarMinisterios();
}
