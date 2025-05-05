document.addEventListener("DOMContentLoaded", function() {
    
    const arvoreSalva = localStorage.getItem("arvoreSelecionada") || "Pau-Brasil";
    aplicarCorFundo(arvoreSalva);

    
    if (!localStorage.getItem("registrosReflorestamento")) {
        carregarDadosFicticios();
    }
});

function carregarDadosFicticios() {
    const dadosTeste = [
        { usuario: "Carlos Silva", quantidade: 300, especie: "Ipê", dataRegistro: "2025-04-15" },
        { usuario: "Ana Souza", quantidade: 150, especie: "Angico", dataRegistro: "2025-03-10" },
        { usuario: "Lucas Ferreira", quantidade: 500, especie: "Aroeira", dataRegistro: "2025-02-20" },
        { usuario: "Carlos Silva", quantidade: 200, especie: "Jequitibá", dataRegistro: "2025-01-30" }
    ];

    localStorage.setItem("registrosReflorestamento", JSON.stringify(dadosTeste));
}

function buscarRegistros() {
    const usuarioBusca = document.getElementById("usuario").value.trim().toLowerCase();
    const especieBusca = document.getElementById("tipoArvore").value;
    const registros = JSON.parse(localStorage.getItem("registrosReflorestamento")) || [];

    const resultadosFiltrados = registros.filter(registro => {
        const usuarioMatch = usuarioBusca === "" || registro.usuario.toLowerCase().includes(usuarioBusca);
        const especieMatch = especieBusca === "" || registro.especie === especieBusca;
        return usuarioMatch && especieMatch;
    });

    preencherTabela(resultadosFiltrados);
}

function preencherTabela(registros) {
    const tabelaBody = document.getElementById("resultados");
    tabelaBody.innerHTML = "";

    if (registros.length === 0) {
        const linha = tabelaBody.insertRow();
        const celula = linha.insertCell(0);
        celula.colSpan = 4;
        celula.innerText = "Nenhum registro encontrado.";
        celula.style.textAlign = "center";
        return;
    }

    registros.forEach(registro => {
        const linha = tabelaBody.insertRow();
        linha.insertCell(0).innerText = registro.usuario;
        linha.insertCell(1).innerText = registro.quantidade;
        linha.insertCell(2).innerText = registro.especie;
        linha.insertCell(3).innerText = new Date(registro.dataRegistro).toLocaleDateString();
    });
}

function aplicarCorFundo(arvore) {
    const coresGradiente = {
        "Pau-Brasil": "#D45454",
        "Castanheira": "#8B4513",
        "Peroba-Rosa": "#FF69B4"
    };

    document.documentElement.style.setProperty("--main-color", coresGradiente[arvore]);
    localStorage.setItem("arvoreSelecionada", arvore);
}
