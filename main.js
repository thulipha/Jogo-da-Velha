const jogador_X = 'X';
const jogador_O = 'O';
const celulas = document.querySelectorAll('.celula');
const jogadorAtual = document.querySelector('.jogadorAtual');
const combinacoes = [
  
  [0,1,2],
  [3,4,5],
  [6,7,8],
  
  [0,3,6],
  [1,4,7],
  [2,5,8],
  
  [2,4,6],
  [0,4,8]
  
  ];
let checarTurno = true;
let gameOver = false;

document.addEventListener('click', (event)=>{
  if(event.target.matches('.celula')){
    jogar(event.target.id, jogador_X);
    setTimeout(()=> computador(), 400);
  };
});

function jogar(id, turno){
  const celula = document.getElementById(id);
 
   if(celula.classList.contains('X')|| celula.classList.contains('O')){
     return false;
   }
   else{
     mudarTurno();
     celula.innerText = turno;
     celula.classList.add(turno);
     checarVencedor(turno);
   };
};

function mudarTurno(){
    turno = checarTurno ? jogador_X : jogador_O;
}
function checarVencedor(turno){
  
  const vencedor = combinacoes.some((comb)=>{
    return comb.every((posicao)=>{
      return celulas[posicao].classList.contains(turno);
    });
  });
  if(vencedor){
    encerrarJogo(turno);
  }
  else if(checarEmpate()){
    encerrarJogo();
  };
};

function encerrarJogo(vencedor = null){
  
  gameOver = true;
  const gameOverScreen = document.querySelector('.gameOver');
  const vencedorTexto = document.querySelector('.vencedor');
  let clock = 3;
  gameOverScreen.style.display = 'block';
  
  if(vencedor){
    vencedorTexto.innerText = vencedor;
    vencedorTexto.style.color = 'darkgreen';
  }
  else{
    vencedorTexto.innerText = 'Ninguem, terminou Empatado';
    vencedorTexto.style.color = 'darkred';
  };
  
  setInterval(()=>{
    document.querySelector('.timer-count').style.display = 'block';
    document.querySelector('#timer').innerText = clock;
    clock--;
  },1000);
    
  setTimeout(()=>{location.reload()}, 4000);
};

function checarEmpate(){
  let x = 0;
  let o = 0;
  
  for(index in celulas){
    if(!isNaN(index)){
      if(celulas[index].classList.contains(jogador_X)){
        x++;
      };
      
     if (celulas[index].classList.contains(jogador_O)){
        o++;
      };
    };
  };
  
  return x + o == 9 ? true : false;
};
 function computador(){
   let posicoesDisponiveis = [];
   
   for(index in celulas){
     
     if(!isNaN(index)){
       
       if(!celulas[index].classList.contains('X') && !celulas[index].classList.contains('O')){
         
         posicoesDisponiveis.push(index);
       };
     };
   };
   
   const posicaoAleatoria = Math.floor(Math.random() * posicoesDisponiveis.length);
   
   if(!gameOver){
     jogar(posicoesDisponiveis[posicaoAleatoria], jogador_O);
   };
 };
