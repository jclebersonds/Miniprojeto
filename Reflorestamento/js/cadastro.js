document.addEventListener("DOMContentLoaded", function() {
    
    const arvoreSalva = localStorage.getItem("arvoreSelecionada") || "Pau-Brasil";
    aplicarCorFundo(arvoreSalva);

    
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioSalvo && usuarioSalvo.avatar) {
        aplicarCorFundo(usuarioSalvo.avatar);
    }

    // Configura eventos do formulário de cadastro
    const formCadastro = document.getElementById("cadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", function(event) {
            event.preventDefault();

            const usuario = {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                senha: document.getElementById("senha").value,
                avatar: document.getElementById("arvore").value
            };

            localStorage.setItem("usuario", JSON.stringify(usuario));
            aplicarCorFundo(usuario.avatar);
            window.location.href = "perfil.html"; 
        });
    }

    
    const seletorArvore = document.getElementById("arvore");
    if (seletorArvore) {
        seletorArvore.addEventListener("change", function() {
            aplicarCorFundo(this.value);
        });
    }
});

function aplicarCorFundo(arvore) {
    const coresGradiente = {
        "Pau-Brasil": "#D45454",
        "Castanheira": "#8B4513",
        "Peroba-Rosa": "#FF69B4"
    };

    document.documentElement.style.setProperty("--main-color", coresGradiente[arvore]);
    localStorage.setItem("arvoreSelecionada", arvore);
}

