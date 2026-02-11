const binDiv = document.querySelector('#bin')

function fillBin()
{
  for (let i = 0;i<20000;i++)
  {
    if(i%250 == 0){
      binDiv.textContent += '\n' 
    }
    binDiv.textContent += Math.round(Math.random());
  }
}
fillBin()