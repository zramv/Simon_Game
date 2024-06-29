activationButton();
var Level=0;
var MaxLevel=0;
var colorList =[];
var userColor =[];

var LevelUp = new Audio("./audio/level-up.mp3");
var buttonsSound=new Audio("./audio/button-press.mp3");
var GameOverSound= new Audio("./audio/gameOver.mp3")
var lightSound = new Audio("./audio/lightSound.mp3");

//when click show press animation 
function activationButton(){

$(".red-button").on("click",function(){
    continueChecker("red");
})
$(".blue-button").on("click",function(){
    continueChecker("blue");
})
$(".green-button").on("click",function(){
    continueChecker("green");
})
//yellow button
$(".yellow-button").on("click",function(){
    continueChecker("yellow");
})
//start button
$(".circle").on("click",function(){
    if(userColor.length==colorList.length){ nextLevel();}
    document.querySelector(".circle")
    .classList.add("button-circle-press");
    setTimeout(function(){
        document.querySelector(".circle")
        .classList.remove("button-circle-press");},"100");
    $(".buttons").removeClass("buttons-darker");
}).css("cursor","pointer");
}
//user select color to enter in user color
function selectColor(color){
    userColor.push(color);   
}

function checkEqual(colorList,userColor){
    if(colorList.length != userColor.length){return false;}
    else{
    for(var i = 0 ; i < colorList.length;i++){
        if(colorList[i]!=userColor[i]){return false;}
    }
    return true;
}
}
//display color by order and disable buttons
async function displayColors(colorList){
    document.querySelector(".title").innerHTML="<span>Focus</span> on the colors";
    $("button").off().css("cursor","default");
    $(".circle").off().css("cursor","default");
    for(var i=0 ; i<colorList.length; i++){
    await new Promise(resolve => setTimeout(resolve,1000));
    lightAnimation((colorList[i]),400);
    }
    document.querySelector(".title").innerHTML="<span>Select</span> right colors";
    activationButton();
    
}

//turn on the light of each button 
function lightAnimation(color){
    lightSound.play();
    document.querySelector("."+color+"-button")
    .classList.add("button-"+color+"-light");
    setTimeout(function(){
    document.querySelector("."+color+"-button")
    .classList.remove("button-"+color+"-light");},"400");
}

//animation of button when press
function animationPress(color){
    buttonsSound.play();
    document.querySelector("."+color+"-button")
    .classList.add("button-"+color+"-press");
    setTimeout(function(){
        document.querySelector("."+color+"-button")
        .classList.remove("button-"+color+"-press");},"100");
}

// generate random color
function randomColor(){;
    switch(Math.floor((Math.random()*4)+1)){
        case 1:
            return"red";
        case 2:
            return"blue";
        case 3:
            return"green";
        case 4:
            return"yellow";
    }
}

//add color to ListColors
function addColorInList(colorList){
    colorList.push(randomColor());
}
//if we call this function will gonna to next level
async function nextLevel(){
    Level++;
    if ( Level != 1){
        LevelUp.play();
    $(".circle").addClass("correctAnswer");
    }
    document.querySelector(".circle")
    .innerHTML="<p>LEVEL<br>"+Level+"</p>";//change text to present new level
    userColor=[];
    addColorInList(colorList);
    displayColors(colorList);
    
    await new Promise(resolve => setTimeout(resolve,200));
    $(".circle").removeClass("correctAnswer"),400;
    console.log("nextLevel");
    
}

//rest the game
function gameOver(){
colorList=[];
userColor=[];
GameOverSound.play();
if(MaxLevel < Level){
    MaxLevel= Level;
}
document.querySelector(".maxField").innerHTML=MaxLevel;
Level=0;
document.querySelector(".circle")
    .innerHTML="<p>START<br></p>";

document.querySelector(".title").innerHTML="GameOver";

$(".buttons").addClass("buttons-darker");


}

//check if select any wrong color
function CheckEachButton(){
document.querySelector(".title").innerHTML="Select right colors";
if(userColor[userColor.length-1]!=colorList[userColor.length-1])//last index
{
console.log("gameOver");
gameOver();
return true;
}
else
{
return false;
}

}


// determent the number of color can user enter in each level
function continueChecker(color){

var check; 
    if(userColor.length >= colorList.length){
        $(".buttons").off();
    }
    else{
    animationPress(color);
    selectColor(color);
    check = CheckEachButton();
    } 
    // this for if game is over the automatic level disable 
    if(userColor.length == colorList.length && userColor.length != 0){
        if (!check){
            nextLevel();
        }
    }
}

