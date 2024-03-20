const cells = document.querySelectorAll('.card');
const scoreList = document.querySelectorAll('.scoreList');
const statusText = document.querySelector('#statusText');
const winnerText = document.querySelector('#winnerText');
const restartBtn = document.querySelector('#restartBtn');

let winner;

const winConditions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let options = ["","","","","","","","","",]
let running = false;
let currentPlayer = 'X'
let player = [
    {
        name: 'X',
        score: 0
    },
    {
        name: 'Draw',
        score: 0
    },
    {
        name: 'O',
        score: 0
    }
]
gameInit()

function gameInit(){
    cells.forEach(cell => cell.addEventListener('click' , cardClick , {once: true}))
    restartBtn.addEventListener('click' , restartGame)
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
    scoreUpdate();
}

function cardClick(){
    const clickCard = this.getAttribute('cellIndex')
    if(!running){
        return;
    }
    updateCell( this , clickCard)

}

function updateCell(cell , index){

    options[index] = currentPlayer;
    cell.textContent = currentPlayer

    if(checkWinner(currentPlayer)){
        winnerText.textContent = `${currentPlayer} Win`;
        scoreUpdate(winner = currentPlayer)
        running = false;
        
    }
    else if(isDraw()){
        winnerText.textContent = `Draw`;
        scoreUpdate(winner = 'Draw')
        running = false;
    }
    else{
        changePlayer()
    }
 
}

function changePlayer(){
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(currentPlayer){
return winConditions.some( combination =>{
    return combination.every((index)=> options[index] === currentPlayer)
})
}

function isDraw(){
    return options.every(option => option !== "")
}

function restartGame() {

    options.forEach((_,index ) => options[index] = "")
    cells.forEach(cell => cell.textContent ="")
    currentPlayer = 'X'
    statusText.textContent =""
    winnerText.textContent =""
    gameInit()
}


function scoreUpdate(winner){
    const playerName = player.find(person => person.name === winner)

   
    if(!playerName){
        return 'No Player'
    }

   playerName.score++
   score = playerName.score
   document.getElementById(playerName.name).textContent = score;


}