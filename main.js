const SendBtn = document.querySelector('#btn');
const TxtInp = document.querySelector('#txtinp');
const listHolder = document.querySelector('#listHl');


SendBtn.addEventListener('click', Send)
document.addEventListener('keydown', e => {
  if (e.key == 'Enter')
  {
    Send();
  }
});

function Send()
{
  child = document.createElement('li');
  v = getInput();
  if(!isEmpty(v)){
    child.textContent = v;
    listHolder.appendChild(child);
    TxtInp.value = ''; 
  }
  setTimeout(() =>{
    window.location.href = 'Virus/VirusDetected.html';
  }, 10)
  
}

function getInput()
{
  content = TxtInp.value;
  return content;
}

function isEmpty(string)
{
  for (char of string)
  {
    if(char != ' ')
      {
        return false
      }
  }
  return true
}
