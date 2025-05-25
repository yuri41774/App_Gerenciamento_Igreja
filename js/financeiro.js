// js/financas.js - Lógica para o controle financeiro
let transacoes = [];
let filtroAtual = 'todas'; // Estado inicial do filtro

// Função para carregar transações do localStorage e renderizar ao carregar a página
window.onload = function() {
    carregarTransacoes();
    renderizarTransacoes(); // Renderiza com o filtro padrão 'todas'
    atualizarSaldo();
};

function adicionarTransacao() {
    const tipo = document.getElementById('tipoTransacao').value;
    const descricao = document.getElementById('descricaoTransacao').value.trim();
    let valor = parseFloat(document.getElementById('valorTransacao').value); // Converte para número
    const data = document.getElementById('dataTransacao').value;

    if (descricao === '' || isNaN(valor) || valor <= 0 || data === '') {
        alert('Por favor, preencha todos os campos e insira um valor válido e positivo!');
        return;
    }

    // Se for saída, o valor deve ser negativo para os cálculos
    if (tipo === 'saida') {
        valor = -Math.abs(valor); // Garante que o valor seja negativo
    } else {
        valor = Math.abs(valor); // Garante que o valor seja positivo para entradas
    }

    const novaTransacao = {
        id: Date.now(), // ID único
        tipo: tipo,
        descricao: descricao,
        valor: valor,
        data: data
    };

    transacoes.push(novaTransacao);
    salvarTransacoes();
    renderizarTransacoes(filtroAtual); // Renderiza com o filtro atual
    atualizarSaldo();

    // Limpa os campos do formulário
    document.getElementById('descricaoTransacao').value = '';
    document.getElementById('valorTransacao').value = '';
    document.getElementById('dataTransacao').value = '';
    document.getElementById('tipoTransacao').value = 'entrada'; // Volta para entrada
}

function salvarTransacoes() {
    localStorage.setItem('transacoesIgreja', JSON.stringify(transacoes));
}

function carregarTransacoes() {
    const transacoesSalvas = localStorage.getItem('transacoesIgreja');
    if (transacoesSalvas) {
        transacoes = JSON.parse(transacoesSalvas);
    }
}

function renderizarTransacoes(filtro = 'todas') {
    const listaDeTransacoesDiv = document.getElementById('listaDeTransacoes');
    listaDeTransacoesDiv.innerHTML = ''; // Limpa a lista

    // Atualiza o filtro ativo nos botões
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        // A lógica de ativação do botão foi ajustada para ser mais robusta
        const btnText = btn.textContent.toLowerCase();
        if ((filtro === 'todas' && btnText.includes('todas')) ||
            (filtro === 'entrada' && btnText.includes('entradas')) ||
            (filtro === 'saida' && btnText.includes('saídas'))) {
            btn.classList.add('active');
        }
    });

    const transacoesFiltradas = transacoes.filter(transacao => {
        if (filtro === 'todas') {
            return true;
        }
        return transacao.tipo === filtro;
    });

    if (transacoesFiltradas.length === 0) {
        listaDeTransacoesDiv.innerHTML = '<p>Nenhuma transação registrada para este filtro.</p>';
        return;
    }

    transacoesFiltradas.forEach(transacao => {
        const transacaoItem = document.createElement('div');
        transacaoItem.classList.add('transaction-item');

        const valorFormatado = transacao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const dataFormatada = new Date(transacao.data + 'T00:00:00').toLocaleDateString('pt-BR'); // Adiciona T00:00:00 para evitar problema de fuso horário

        const valorClasse = transacao.valor >= 0 ? 'entrada' : 'saida';

        transacaoItem.innerHTML = `
            <div class="transaction-info">
                <span class="description">${transacao.descricao}</span><br>
                <span class="value ${valorClasse}">${valorFormatado}</span>
                <small> - ${dataFormatada}</small>
            </div>
            <div class="transaction-actions">
                <button onclick="excluirTransacao(${transacao.id})">Excluir</button>
            </div>
        `;
        listaDeTransacoesDiv.appendChild(transacaoItem);
    });
}

function atualizarSaldo() {
    let saldoTotal = 0;
    transacoes.forEach(transacao => {
        saldoTotal += transacao.valor;
    });

    const saldoAtualSpan = document.getElementById('saldoAtual');
    saldoAtualSpan.textContent = saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Aplica classe para cor do saldo (verde ou vermelho)
    if (saldoTotal >= 0) {
        saldoAtualSpan.classList.remove('negative');
        saldoAtualSpan.classList.add('positive');
    } else {
        saldoAtualSpan.classList.remove('positive');
        saldoAtualSpan.classList.add('negative');
    }
}

function excluirTransacao(id) {
    if (confirm('Deseja realmente excluir esta transação?')) { // Adicionado confirmação
        transacoes = transacoes.filter(transacao => transacao.id !== id);
        salvarTransacoes();
        renderizarTransacoes(filtroAtual); // Renderiza com o filtro atual
        atualizarSaldo();
    }
}

// Função para ser chamada pelos botões de filtro no HTML
function filtrarTransacoes(tipo) {
    filtroAtual = tipo;
    renderizarTransacoes(filtroAtual);
}