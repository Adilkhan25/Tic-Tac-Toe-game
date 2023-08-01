const boxes  = document.querySelectorAll(".box");
const player = document.querySelector(".player");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winingPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
// initialize the game
 function initGame(){
    currentPlayer = "X";
    gameGrid =  ["", "", "", "", "", "", "", "", ""];
    // UI pe khali karna
    boxes.forEach((box)=>{
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove('win');
    });
    newGameBtn.classList.remove('active');
    player.innerText = `Current player-${currentPlayer}`;
 }
 initGame();
 function swapPlayer()
 {
    if(currentPlayer === "X") 
    {
        currentPlayer = "0";
    }
    else 
    {
        currentPlayer = "X";
    }

    player.innerText = `Current player-${currentPlayer}`;
   
   
 }
 function winOrDraw()
 {
    winingPosition.forEach((position)=>{
        if(gameGrid[position[0]]!="" && gameGrid[position[1]]!="" && gameGrid[position[2]]!="" &&
        gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])
        {
            player.innerText = `Winner is- ${gameGrid[position[0]]}`;
            // pointer event ko disable krna hai win ke baad
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })
            newGameBtn.classList.add('active');
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
            return;
        }
    })
    let cnt=0;
    gameGrid.forEach((box)=>{
        if(box!="") cnt++;
    })
    if(cnt===9) 
    {
        player.innerText = "Game tied!";
        newGameBtn.classList.add('active');
        return;
    }

 }
 function handleClick(index)
 {
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap the player
        swapPlayer();
        // check for win or draw
        winOrDraw();

    }

 }
 boxes.forEach((box, index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
 });
 newGameBtn.addEventListener('click', initGame);;
