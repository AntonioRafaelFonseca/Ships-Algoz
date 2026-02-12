const binDiv = document.querySelector('#bin');
let clicouNoBotao = false; // Controle de navegação segura

function fillBin() {
    let content = "";
    for (let i = 0; i < 40000; i++) {
        if (i % 450 === 0) content += '\n';
        content += Math.round(Math.random());
    }
    binDiv.textContent = content;
}

function panicLoop()
{
    triggerPanic();
    delay = Math.random()*2000
    setTimeout(panicLoop, delay)
}

function triggerPanic() {
    if (navigator.vibrate) {
        navigator.vibrate([400, 200, 400, 200, 1000]);
    }
    const sound = document.getElementById('error-sound');
    if (sound) sound.play().catch(() => {});
}

window.onbeforeunload = function() {
    // Se o utilizador tentar fechar a aba SEM clicar no botão, mostra o aviso
    if (!clicouNoBotao) {
        return "O seu dispositivo está infectado! Tem certeza que deseja sair sem limpar?";
    }
    // Se clicar no botão, o navegador deixa-o sair para a próxima página sem perguntar
    return undefined;
};

// 4. Evento do Botão "Limpar Agora"
document.querySelector('#btn-clean').addEventListener('click', (e) => {
    clicouNoBotao = true; // Liberta o bloqueio do 'onbeforeunload'
    triggerPanic();
    console.log("Iniciando transição para limpeza biométrica...");
});

// Inicialização
fillBin();

// Log dinâmico para aumentar a tensão
const log = document.getElementById('system-log');
const mensagens = [
    "> Tentando bypass de firewall...",
    "> <span class='danger'>Acesso root obtido!</span>",
    "> Upload de dados em curso...",
    "> <span class='warn'>Biometria facial necessária para parar!</span>"
];

let i = 0;
const interval = setInterval(() => {
    if(i < mensagens.length) {
        log.innerHTML += `<br>${mensagens[i]}`;
        i++;
    } else {
        clearInterval(interval);
    }
}, 2000);
panicLoop();