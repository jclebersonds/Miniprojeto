document.addEventListener("DOMContentLoaded", function() {
    aplicarTemaUsuario();
    carregarDestaques();
});

function aplicarTemaUsuario() {
    const arvoreSalva = localStorage.getItem("arvoreSelecionada") || "Pau-Brasil";
    aplicarCorFundo(arvoreSalva);
}

function aplicarCorFundo(arvore) {
    const coresGradiente = {
        "Pau-Brasil": "#D45454",
        "Castanheira": "#8B4513",
        "Peroba-Rosa": "#FF69B4"
    };

    document.documentElement.style.setProperty("--main-color", coresGradiente[arvore] || coresGradiente["Pau-Brasil"]);
}

function carregarDestaques() {
    const usuariosTeste = [
        { nome: "Carlos Silva", avatar: "Pau-Brasil", totalArvores: 1800 },
        { nome: "Ana Souza", avatar: "Castanheira", totalArvores: 1200 },
        { nome: "Lucas Ferreira", avatar: "Peroba-Rosa", totalArvores: 850 },

    ];

    preencherDestaques(usuariosTeste);
}

function preencherDestaques(usuarios) {
    const container = document.getElementById("topUsuarios");
    container.innerHTML = "";

    usuarios.forEach(usuario => {
        const caminhoAvatar = definirAvatar(usuario.avatar, usuario.totalArvores);

        container.innerHTML += `
            <div class="usuario-destaque">
                <img src="${caminhoAvatar}" alt="Avatar de ${usuario.avatar}">
                <h2>${usuario.nome}</h2>
                <h3>🌳 ${usuario.totalArvores} árvores plantadas</h3>
            </div>
        `;
    });
}

function definirAvatar(arvore, totalArvores) {
    const avatares = {
        "Pau-Brasil": ["pau-brasil-100.png", "pau-brasil-300.png", "pau-brasil-700.png", "pau-brasil-1500.png"],
        "Castanheira": ["castanheira-100.png", "castanheira-300.png", "castanheira-700.png", "castanheira-1500.png"],
        "Peroba-Rosa": ["peroba-100.png", "peroba-300.png", "peroba-700.png", "peroba-1500.png"]
    };

    const nivel = totalArvores >= 1500 ? 3 : totalArvores >= 700 ? 2 : totalArvores > 300 ? 1 : 0;
    return `Reflorestamento/assets/${avatares[arvore][nivel]}`;
}
