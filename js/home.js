// js/home.js - Lógica para exibir os últimos comunicados na página Home

document.addEventListener('DOMContentLoaded', () => {
    carregarUltimosComunicados();
});

function carregarUltimosComunicados() {
    const comunicadosSalvos = localStorage.getItem('comunicadosIgreja');
    let comunicados = [];

    if (comunicadosSalvos) {
        comunicados = JSON.parse(comunicadosSalvos);
    }

    const listaComunicadosHome = document.getElementById('latestCommunicationsList');
    listaComunicadosHome.innerHTML = ''; // Limpa o conteúdo inicial

    // Ordena os comunicados por ID (mais recente primeiro) e pega os últimos 3
    const ultimosComunicados = comunicados
        .sort((a, b) => b.id - a.id)
        .slice(0, 3);

    if (ultimosComunicados.length === 0) {
        listaComunicadosHome.innerHTML = '<p class="no-communications">Nenhum comunicado recente para exibir.</p>';
        return;
    }

    ultimosComunicados.forEach(comunicado => {
        const comunicadoItem = document.createElement('div');
        comunicadoItem.classList.add('home-communication-item');

        const conteudoCurto = comunicado.conteudo.length > 150
            ? comunicado.conteudo.substring(0, 150) + '...'
            : comunicado.conteudo;

        const dataFormatada = new Date(comunicado.data).toLocaleDateString('pt-BR');

        comunicadoItem.innerHTML = `
            <h3>${comunicado.titulo}</h3>
            <p>${conteudoCurto}</p>
            <small>Publicado em: ${dataFormatada}</small>
        `;

        listaComunicadosHome.appendChild(comunicadoItem);
    });
}
