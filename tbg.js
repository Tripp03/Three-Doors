const introLines = [
  "Cold.",
  "That was the first thing you felt.",
  "Dust clung to your fingers.",
  "You noticed The hallway stretched farther than it should.",
  "At the very end—",
  "Three doors stood there-",
  "Waiting..."
];

const dialogue1 = [ // this should display after introLines
  "As you approached the doors",
  "You hear a voice",
  "Faint",
  "Broken",
  "Almost Familiar...", //ghostLines 1st array after this
  "You froze" // keep walking button after here before continuing ghostLines
  ]
  
const ghostLines = [
  "Stop!", 
  "It'll all be over if you accept everything",
  "Please",
  "You've-" // Door slams after here
  ]

let index = 0;
let gameStarted = false;
let waitingForAction = false;
let currentLines = introLines;

const text = document.getElementById("text");
const container = document.getElementById("container");
const actionBtn = document.getElementById("actionBtn");
const enterBtn = document.getElementById("enterBtn");
const inst = document.getElementById("instructions"); 
 
 /* Action Button System */
  function showActionButton(text, action) {
  actionBtn.textContent = text;
  actionBtn.style.display = "inline-block";
  actionBtn.onclick = action;
}


function hideActionButton() {
  actionBtn.style.display = "none";
  actionBtn.onclick = null;  
}


/* Start game */
 enterBtn.addEventListener("click", function(p) {
  p.stopPropagation();
  start();
});


function start() {
  inst.textContent = "[Tap to continue]" ;
  container.style.display = "none";
  text.style.display = "block";

  gameStarted = true;
  index = 0;
  text.textContent = introLines[index]; // show first line right away
}

/* click handler */
document.body.addEventListener("click", handleClick);
function handleClick() {
  if (!gameStarted) return;
  if (waitingForAction) return;

  index++;

  if (index >= currentLines.length) return;

  text.textContent = currentLines[index];
      // these check if a button should appear
  action1(); 
  action2();
  action3();
}

actionBtn.addEventListener("click", function(p) {
  p.stopPropagation(); // idk how, but this helps it to not skip stuff in the array!! Thank you Claude!! :D
});

   // The getup action

function action1() {
  if (currentLines === introLines && index === 1) {
    showActionButton("Get Up", getUp);
    waitingForAction = true;
    inst.textContent = "[click button to continue...]";
  }
}

function getUp() {
  hideActionButton();
  waitingForAction = false;
  
  index++;
  text.textContent = introLines[2];
  action2();
  inst.textContent = "[Tap to continue...]" ;
}

               // Move action 
function action2() {
  if (currentLines === introLines && index === introLines.length - 1) {
    showActionButton("Move?", moveToDoors);
    waitingForAction = true;
    inst.textContent = "[click button to continue...]";
  }
}

function moveToDoors(){
  hideActionButton();
  waitingForAction = false;
  currentLines = dialogue1
  
  index = 0;
  text.textContent = dialogue1[index];
  inst.textContent = "[Tap to continue...]";
}

function action3() {
  if (currentLines === dialogue1 && index === 4) {
    showActionButton("Ignore", ignore);
    waitingForAction = true;
    inst.textContent = "[click button to continue...]";
  }
}

function ignore(){
  hideActionButton();
  waitingForAction = false;
  let currentLines = ghostLines;
  
  index = 0;
  text.textContent = currentLines[index];
  inst.textContent = "[Tap to continue...]" ;
}