let totalCount =9;
let gameBox = document.querySelector(".game-box");
let resetBtn = document.querySelector("#reset");
let turnInfo = document.querySelector('.turn-info')
let boxAll= gameBox.querySelectorAll('.box')
let winnerInfo= document.querySelector('.game-info-winner')
let CurrentPlayer = "X"
let isGameOver = false
let saveState = {}


const changePlayer= ()=>{
   return CurrentPlayer=='X'? 0 : 'X'
}
const element = {};

const checkWin=()=>{
    let boxText= gameBox.querySelectorAll('.boxText')

    boxText.forEach((box,i)=>{
        element.id = i;
        element.value = box.innerText;
        localStorage.setItem(`saveGame${i}`,JSON.stringify(element)); 
    })

    // localStorage.setItem(`saveGame`,JSON.stringify(data));

    let winArr=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    winArr.forEach((e)=>{


        // const saveStateString = JSON.stringify(saveState);
        // localStorage.setItem('saveState', saveStateString);



       if (boxText[e[0]].innerText==boxText[e[1]].innerText && boxText[e[1]].innerText==boxText[e[2]].innerText && boxText[e[2]].innerText!='' ){       
        isGameOver=true
        winnerInfo.innerText = `${boxText[e[0]].innerText} Won The Match`
       }
})
}

gameBox.addEventListener("click", function(e){
    e.preventDefault();
    if(e.target.classList.contains('box')){
       boxSpan = e.target.querySelector('span')
        if(boxSpan && !boxSpan.textContent){
           boxSpan.textContent= CurrentPlayer
           CurrentPlayer = changePlayer();
           checkWin()
           turnInfo.innerText = !isGameOver?`Turn for ${CurrentPlayer}`:` `
           }  
        }
    })

resetBtn.addEventListener('click',function(){

    boxAll.forEach((element)=>{
      let span = element.querySelector('span')
      span.innerText ="";
    })
    localStorage.clear();
    isGameOver=false;
    winnerInfo.innerText = " "
    turnInfo.innerText = ' '
})

//Get Data from Local Storage
const loadData = ()=>{
 boxAll.forEach((box,i)=>{
 
    let value = JSON.parse(localStorage.getItem(`saveGame${i}`)).value
    console.log(value)
    let span = box.querySelector('span')
      span.innerText =value;
 })   
}

window.onload = loadData();