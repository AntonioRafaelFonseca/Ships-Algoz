const binDiv = document.querySelector('#bin');

// Preenche o fundo com código binário
function fillBin() {
    let content = "";
    for (let i = 0; i < 200000; i++) {
        if (i % 450 === 0) content += '\n';
        content += Math.round(Math.random());
    }
    binDiv.textContent = content;
}

// Função para vibrar o telemóvel (Funciona melhor em Android)
function triggerPanic() {
    if (navigator.vibrate) {
        // Padrão de vibração: vibra, para, vibra forte
        navigator.vibrate([200, 100, 200, 100, 500]);
    }
    
    const sound = document.getElementById('error-sound');
    if (sound) sound.play().catch(() => {
        console.log("Audio bloqueado pelo browser até interação.");
    });
}

// Evento ao clicar no botão de limpeza
document.querySelector('#btn-clean').addEventListener('click', (e) => {
    triggerPanic();
    // Impedir saída rápida para aumentar o susto
    console.log("Tentativa de limpeza registada...");
});

// Impede que a pessoa feche a aba sem ver um aviso
window.onbeforeunload = function() {
    return "O vírus ainda está ativo! Tem certeza?";
};

// Inicia o binário
fillBin();

// Atualiza o log do sistema dinamicamente
const log = document.getElementById('system-log');
const mensagens = [
    "> Tentando bypass de firewall...",
    "> <span class='danger'>Acesso root obtido!</span>",
    "> Extraindo coordenadas GPS...",
    "> Upload de fotos em curso..."
];

let i = 0;
setInterval(() => {
    if(i < mensagens.length) {
        log.innerHTML += `<br>${mensagens[i]}`;
        i++;
    }
}, 2000);