const buttons = document.querySelectorAll('.pick');
const myScoreEl = document.getElementById('player_score');
const computerScoreEl = document.getElementById('computer_score');
const choices = ['paper', 'scissors', 'rock'];
const main = document.getElementById('main');
const selection = document.getElementById('selection');
const resetBtn = document.getElementById('reset');
const result = document.getElementById('win');
const user_select = document.getElementById('user_select');
const computer_select = document.getElementById('computer_select');
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const rulesModal = document.getElementById('modal');
const blackBack = document.querySelector('.rules-container');

// Initialize scores & user choice
let myScore = localStorage.getItem('myScore') ? parseInt(localStorage.getItem('myScore')) : 0;
let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;
let userChoice = undefined;

// Update scores on the UI
updateScoreUI();


buttons.forEach(button => {
  button.addEventListener('click', ()=>{
    userChoice = button.getAttribute('data-choice');
    main.style.display = 'none';
    selection.style.display = 'grid';
    checkWinner();
  })
});

//Play again button
resetBtn.addEventListener('click',()=>{
    
    main.style.display = 'flex';
    selection.style.display = 'none';
    result.innerText = "";
    document.querySelector(".next-btn").style.display = "none";
    
    
    if (result.innerText === "YOU WON") {
      myScoreUpdate();
    } else if (result.innerText === "PC WON") {
      computerScoreUpdate();
    }
    
    localStorage.setItem('myScore', myScore);
    localStorage.setItem('computerScore', computerScore);

    updateScoreUI();
});

//Show game rules
function showRules() {
    const rulesPopup = document.getElementById("rules-popup");
    rulesPopup.style.display = "block";
}

//close rules
function closeRules() {
    const rulesPopup = document.getElementById("rules-popup");
    rulesPopup.style.display = "none";
}

// Function to check who wins
function checkWinner(){
  
  const computerChoice = pickRandomChoice();
  document.getElementById('user_select').style.boxShadow = "none";
  document.getElementById('computer_select').style.boxShadow = "none";

  
  updateSelection(user_select, userChoice);
  updateSelection(computer_select, computerChoice);

  if (userChoice === computerChoice){
    result.innerText= "DRAW";
  }else if(userChoice === 'paper' && computerChoice==='rock'
  || userChoice === 'rock' && computerChoice === 'scissors'
  || userChoice === 'scissors' && computerChoice === 'paper'){
    
    myScoreUpdate();
    result.innerText= "YOU WON";
    document.querySelector(".next-btn").style.display = "inline-block";
    document.getElementById('user_select').style.boxShadow = "0 0 0 20px #2a9a25, 0 0 0 40px #36964c, 0 0 0 60px rgba(111, 173, 44, 0.971)";

  }else{
    
    result.innerText= "PC WON";
    computerScoreUpdate();
    document.querySelector(".next-btn").style.display = "none";
    document.getElementById('computer_select').style.boxShadow = "0 0 0 20px #2a9a25, 0 0 0 40px #36964c, 0 0 0 60px rgba(111, 173, 44, 0.971)";

  }
  /*localStorage.setItem('myScore', myScore);
  localStorage.setItem('computerScore', computerScore);

  updateScoreUI();*/
}

//Update user score
function myScoreUpdate(){
  myScore++;
  
}

//Update computer score
function computerScoreUpdate(){
  computerScore++;
  
}

// Function to pick computer choice
function pickRandomChoice(){
  return choices[Math.floor(Math.random()*choices.length)];
}


function updateSelection(selectionEl, choice, addBoxShadow = false){
  selectionEl.classList.remove('btn-paper');
  selectionEl.classList.remove('btn-scissors');
  selectionEl.classList.remove('btn-rock');
  
  const img = selectionEl.querySelector('img');
  selectionEl.classList.add('btn-'+choice);
  img.src= choice+'.png';
  img.alt = choice;

  
}

// Update scores on the UI
function updateScoreUI() {
  myScoreEl.innerText = myScore;
  computerScoreEl.innerText = computerScore;
}

// next button
document.querySelector(".next-btn").addEventListener("click", function() {
    
    let scoresUpdated = localStorage.getItem('scoresUpdated');
    if (!scoresUpdated) {
      
      if (result.innerText === "YOU WON") {
        myScoreUpdate();
      } else if (result.innerText === "PC WON") {
        computerScoreUpdate();
      }
      
      localStorage.setItem('myScore', myScore);
      localStorage.setItem('computerScore', computerScore);
      
      localStorage.setItem('scoresUpdated', true);
    }
    
    window.location.href = "winner.html";
  });
