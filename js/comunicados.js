// js/comunicados.js - Lógica para o gerenciamento de comunicados
let comunicados = [];

window.onload = function() {
    carregarComunicados();
};

function publicarComunicado() {
    const titulo = document.getElementById('tituloComunicado').value.trim();
    const conteudo = document.getElementById('conteudoComunicado').value.trim();

    if (titulo === '' || conteudo === '') {
        alert('O título e o conteúdo do comunicado são obrigatórios!');
        return;
    }

    const novoComunicado = {
        id: Date.now(),
        titulo: titulo,
        conteudo: conteudo,
        data: new Date().toLocaleString('pt-BR')
    };

    // Adiciona o novo comunicado no início do array
    comunicados.unshift(novoComunicado);

    salvarComunicados();
    renderizarComunicados();

    // Limpa os campos do formulário
    document.getElementById('tituloComunicado').value = '';
    document.getElementById('conteudoComunicado').value = '';
}

function salvarComunicados() {
    localStorage.setItem('comunicadosIgreja', JSON.stringify(comunicados));
}

function carregarComunicados() {
    const comunicadosSalvos = localStorage.getItem('comunicadosIgreja');
    if (comunicadosSalvos) {
        comunicados = JSON.parse(comunicadosSalvos);
    }
    renderizarComunicados();
}

function renderizarComunicados() {
    const listaDeComunicadosDiv = document.getElementById('listaDeComunicados');
    listaDeComunicadosDiv.innerHTML = '';

    if (comunicados.length === 0) {
        listaDeComunicadosDiv.innerHTML = '<p>Nenhum comunicado publicado ainda.</p>';
        return;
    }

    comunicados.forEach(comunicado => {
        const comunicadoItem = document.createElement('div');
        comunicadoItem.classList.add('communication-item');
        comunicadoItem.innerHTML = `
            <button onclick="excluirComunicado(${comunicado.id})">Excluir</button>
            <h3>${comunicado.titulo}</h3>
            <p>${comunicado.conteudo.replace(/\n/g, '<br>')}</p>
            <small>Publicado em: ${comunicado.data}</small>
        `;
        listaDeComunicadosDiv.appendChild(comunicadoItem);
    });
}

function excluirComunicado(id) {
    comunicados = comunicados.filter(comunicado => comunicado.id !== id);
    salvarComunicados();
    renderizarComunicados();
}
