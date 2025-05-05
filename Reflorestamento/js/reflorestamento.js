document.addEventListener("DOMContentLoaded", function() {
    
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioSalvo && usuarioSalvo.avatar) {
        aplicarCorFundo(usuarioSalvo.avatar);
    }
});

document.getElementById("reflorestamentoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const registroReflorestamento = {
        usuario: JSON.parse(localStorage.getItem("usuario")).nome || "Usuário Teste",
        quantidade: parseInt(document.getElementById("quantidade").value, 10),
        especie: document.getElementById("especie").value,
        dataRegistro: new Date().toISOString()
    };

    if (registroReflorestamento.quantidade <= 0 || isNaN(registroReflorestamento.quantidade)) {
        alert("Por favor, insira um número válido de árvores.");
        return;
    }

    let registros = JSON.parse(localStorage.getItem("registrosReflorestamento")) || [];
    registros.push(registroReflorestamento);
    localStorage.setItem("registrosReflorestamento", JSON.stringify(registros));

    alert("Ação de reflorestamento registrada com sucesso!");
    document.getElementById("reflorestamentoForm").reset();
});

function aplicarCorFundo(arvore) {
    const coresGradiente = {
        "Pau-Brasil": "linear-gradient(135deg, #D45454 30%, #8B0000 100%)",
        "Castanheira": "linear-gradient(135deg, #8B4513 30%, #5A3D1E 100%)",
        "Peroba-Rosa": "linear-gradient(135deg, rgb(245, 131, 188) 30%, #C71585 100%)"
    };

    document.documentElement.style.setProperty("--main-color", coresGradiente[arvore]);
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
