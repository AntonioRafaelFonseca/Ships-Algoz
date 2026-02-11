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
