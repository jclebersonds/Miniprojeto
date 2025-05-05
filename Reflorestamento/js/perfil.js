document.addEventListener("DOMContentLoaded", function() {
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario")) || {
        nome: "Usuário Teste",
        avatar: "Pau-Brasil",
        bio: "Bem-vindo ao ReflorestApp!",
        totalArvores: 0
    };

    let registros = JSON.parse(localStorage.getItem("registrosReflorestamento")) || [];
    usuarioSalvo.totalArvores = registros
        .filter(registro => registro.usuario === usuarioSalvo.nome)
        .reduce((total, registro) => total + parseInt(registro.quantidade, 10), 0);

    localStorage.setItem("usuario", JSON.stringify(usuarioSalvo));

    aplicarCorFundo(usuarioSalvo.avatar);
    definirAvatar(usuarioSalvo.avatar, usuarioSalvo.totalArvores);

    
    document.getElementById("nomeUsuario").innerText = usuarioSalvo.nome;
    document.getElementById("bio").value = usuarioSalvo.bio;
    document.getElementById("totalArvores").innerText = usuarioSalvo.totalArvores || 0;
});

function aplicarCorFundo(arvore) {
    const coresGradiente = {
        "Pau-Brasil": "#D45454",
        "Castanheira": "#8B4513",
        "Peroba-Rosa": "#FF69B4"
    };

    if (!coresGradiente[arvore]) {
        console.warn("Árvore não reconhecida:", arvore);
        arvore = "Pau-Brasil"; 
    }

    document.documentElement.style.setProperty("--main-color", coresGradiente[arvore]);
    localStorage.setItem("arvoreSelecionada", arvore);
}

function definirAvatar(arvore, totalArvores) {
    const avatares = {
        "Pau-Brasil": ["pau-brasil-100.png", "pau-brasil-300.png", "pau-brasil-700.png", "pau-brasil-1500.png"],
        "Castanheira": ["castanheira-100.png", "castanheira-300.png", "castanheira-700.png", "castanheira-1500.png"],
        "Peroba-Rosa": ["peroba-100.png", "peroba-300.png", "peroba-700.png", "peroba-1500.png"]
    };

    if (!avatares[arvore]) {
        console.warn(`Avatar não encontrado para árvore: ${arvore}, usando padrão.`);
        arvore = "Pau-Brasil"; 
    }

    let nivel = 0;
    if (totalArvores >= 1500) nivel = 3;
    else if (totalArvores >= 700) nivel = 2;
    else if (totalArvores > 300) nivel = 1;

    const caminhoAvatar = `Reflorestamento/assets/${avatares[arvore][nivel]}`;

    
    const avatarElemento = document.getElementById("avatar");
    if (avatarElemento) {
        avatarElemento.src = caminhoAvatar;
    } else {
        console.warn("Elemento #avatar não encontrado no DOM.");
    }
}

function salvarBio() {
    let usuario = JSON.parse(localStorage.getItem("usuario")) || {};
    usuario.bio = document.getElementById("bio").value;
    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Bio atualizada com sucesso!");
}
