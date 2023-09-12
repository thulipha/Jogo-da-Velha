const jogador = 'X';
const jogador2 = 'O';
let turno = jogador;
let game_over = false;
let empate = false;
let clock = 4;

const tabuleiro = document.querySelectorAll('.celula');
const notificacoes = document.querySelector('.avisos');
const finalizar_jogo = document.querySelectorAll('.gameOver');
const gameOverPage = document.querySelector('.gameOver');
const jogadorAtual = document.querySelector('.jogadorAtual');

let vencedorTexto = document.querySelector('.vencedor');

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
  



function jogar(){
  
  if(game_over === false){
    
    if(this.classList.contains('X') || this.classList.contains('O')){
      return false;
     }
     
    else{
      
      this.classList.add(turno);
      this.innerText = turno;
      
      checarVencedor();
      mudarTurno();
      jogadorAtual.innerText = turno;
     };
  };
  if(game_over === true || empate === true){
    return reiniciarJogo();
  };
  
  function mudarTurno(){
    turno === jogador ? turno = jogador2 : turno = jogador;
  };
  
  function checarVencedor() {
      const vencedor = combinacoes.some((comb) => {
    
        return comb.every((posicao) => {
    
          return tabuleiro[posicao].classList.contains(turno);
        });
      });
      if (vencedor) {
        vencedorTexto.innerText = turno;
        return game_over = true;
    
      }
      else {
        return checarEmpate();
      };
    };
    
  function checarEmpate() {
      let x = 0;
      let o = 0;
    
      tabuleiro.forEach((item) => {
        if (item.classList.contains('X'))
          x++;
    
        if (item.classList.contains('O'))
          o++;
    
        return x + o == 9 ? empatar() : false;
      });
    };
    
  function empatar() {
      empate = true;
      vencedorTexto.innerText = "Ninguém, Jogo empatado";
    
    };

  function reiniciarJogo(){
      
      gameOverPage.style.display = 'block';
      
      
      finalizar_jogo.forEach((item)=>{
        
        item.addEventListener('click', handleChoice);
      });
    };
    
  function handleChoice(e){
        if(e.target.id === 'yes') {
          
          document.querySelector('.timer-count').style.display = 'block';
          
          this.removeEventListener('click', handleChoice);
          return recarregarPagina();
        };
    };
    
  function recarregarPagina(){
      clock--;
      document.querySelector('#timer').innerText = clock;
      
      if(clock === 0)
        return location.reload();
        
      return timer = setTimeout(recarregarPagina,1000);
    };
};



tabuleiro.forEach((itemClicado) =>{
  
  itemClicado.addEventListener('click', jogar);
});
