if(!window.location.href.endsWith('obg.html')){
  const SendBtn = document.querySelector('#btn');
  const TxtInp = document.querySelector('#txtinp');
  const listHolder = document.querySelector('#listHl');
  
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
  function Send()
  {
    child = document.createElement('li');
    v = getInput();
    if(!isEmpty(v)){
      child.textContent = v;
      listHolder.appendChild(child);
      TxtInp.value = ''; 
    }
    if (Math.round(Math.random()*10)  == 90){
        setTimeout(() =>{
      window.location.href = 'Virus/VirusDetected.html';
      }, 1)
    }
    else{
      window.location.href = 'obg.html';
    }
  }
  SendBtn.addEventListener('click', Send)
  document.addEventListener('keydown', e => {
  if (e.key == 'Enter')
  {
    Send();
  }
});
}




document.addEventListener('keydown', e => {
      if (window.location.href.endsWith('obg.html') && e.key == 'a'){
        window.location.href = 'index.html'
      }});