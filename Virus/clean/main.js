const p = document.querySelector('#pr');

let v = 5

nxtTick()
function nxtTick()
{
  setTimeout(e, Math.random()*5000);
}
function e() 
{
  v += 1;
  const oldTag = `(${v-1}%)`;
  const newTag = `(${v}%)`;

  if (p.textContent.includes(oldTag)) {
    p.textContent = p.textContent.replace(oldTag, newTag);
  } else {
    p.textContent += ` (${v}%)`;
  }

  if (v < 99) {
    nxtTick();
  }
}

function getBrowser()
{
  const ua = navigator.userAgent;
  if (/chrome|crios|crmo/i.test(ua)) return "Google Chrome";
  if (/firefox|iceweasel|fxios/i.test(ua)) return "Mozilla Firefox";
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return "Safari";
  if (/edg/i.test(ua)) return "Microsoft Edge";
  if (/instagram/i.test(ua)) return "Instagram Browser";
  return "Navegador Desconhecido";
}

function getOs()
{
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "Android";
  if (/iPad|iPhone|iPod/.test(ua)) return "iOS (iPhone/iPad)";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Macintosh/i.test(ua)) return "Mac OS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Dispositivo Desconhecido";
}

window.onload = () => {
  const div = document.querySelector('.square')

  let newtxt = `<p>PROTOCOLO DE SEGURANÇA ${getOs().toUpperCase()} CRITICO ATIVADO</p>`
  
  div.innerHTML = newtxt + div.innerHTML;
}

setInterval(() => {
  let sound = new Audio("https://www.myinstants.com/media/sounds/nintendo-wii-the-sound-of-death-online-audio-converter.mp3")
  
  sound.volume = 1.0
  if(sound) sound.play();
  if(navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 500]);
}, 1500)