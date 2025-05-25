// js/membros.js - Lógica para o gerenciamento de membros
let membros = [];

window.onload = function() {
    carregarMembros();
};

function adicionarMembro() {
    const nome = document.getElementById('nomeMembro').value.trim();
    const telefone = document.getElementById('telefoneMembro').value.trim();
    const email = document.getElementById('emailMembro').value.trim();

    if (nome === '') {
        alert('O nome do membro é obrigatório!');
        return;
    }

    const novoMembro = {
        id: Date.now(),
        nome: nome,
        telefone: telefone,
        email: email
    };

    membros.push(novoMembro);
    salvarMembros();
    renderizarMembros();

    document.getElementById('nomeMembro').value = '';
    document.getElementById('telefoneMembro').value = '';
    document.getElementById('emailMembro').value = '';
}

function salvarMembros() {
    localStorage.setItem('membrosIgreja', JSON.stringify(membros));
}

function carregarMembros() {
    const membrosSalvos = localStorage.getItem('membrosIgreja');
    if (membrosSalvos) {
        membros = JSON.parse(membrosSalvos);
    }
    renderizarMembros();
}

function renderizarMembros() {
    const listaDeMembrosDiv = document.getElementById('listaDeMembros');
    listaDeMembrosDiv.innerHTML = '';

    if (membros.length === 0) {
        listaDeMembrosDiv.innerHTML = '<p>Nenhum membro cadastrado ainda.</p>';
        return;
    }

    membros.forEach(membro => {
        const membroItem = document.createElement('div');
        membroItem.classList.add('member-item');
        membroItem.innerHTML = `
            <div class="member-info">
                <strong>Nome:</strong> ${membro.nome}<br>
                ${membro.telefone ? `<strong>Telefone:</strong> ${membro.telefone}<br>` : ''}
                ${membro.email ? `<strong>E-mail:</strong> ${membro.email}` : ''}
            </div>
            <div class="member-actions">
                <button onclick="excluirMembro(${membro.id})">Excluir</button>
            </div>
        `;
        listaDeMembrosDiv.appendChild(membroItem);
    });
}

function excluirMembro(id) {
    membros = membros.filter(membro => membro.id !== id);
    salvarMembros();
    renderizarMembros();
}