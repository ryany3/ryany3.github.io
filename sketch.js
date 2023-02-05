HEIGHT = 570
WIDTH = 420

graphHeight = 350
graphWidth = 400

topMargin = 10
sideMargin = 10

lastMilestone = sideMargin + 2
dx = 1
x1 = sideMargin
y1 = (graphHeight/2+10)
x2 = x1
y2 = y1

numDivs = 8
xMile = graphWidth/numDivs
numCorrect = 0
bullOrBear = 2 //0 = bull, 1 = bear

news = true
newsNotDrawn = true
weight = 0
val = graphHeight/2 - y2 + 200;
lastVal = val
lastPoint = false

let button1;
let button2;

let scenarios;

money = 5000
shares = 50
canChangeChoice = true

function preload(){
  scenarios = loadStrings('scenarios.txt');
  alert("You are a stockbroker trying to predict how $HACKS performs. Use the news alerts to guess whether the stock will be BULLISH (increase in value) or BEARISH (decrease in value)!")
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(90);
  rect(10, topMargin, graphWidth, graphHeight);
  drawButtons();
  fill('green')
  stroke('white')
  text(round(val, 2), x1+4, y1+4)
  stroke('green')
  fill('black')
  strokeWeight(7)
  point(x1,y1)
  drawStats(2)
}

function draw() {
  if(news && newsNotDrawn){
    drawNews();
  } else if(!canChangeChoice) {
    drawGraph();
  }
}

function drawNews(){
  event = splitTokens(random(scenarios), "|")
  alert(event[0])
  weight = int(event[1])
  newsNotDrawn = false
  canChangeChoice = true
}

function drawStats(i){
  stroke('black')
  strokeWeight(1)
  fill('black')
  rect(10, 2*topMargin + graphHeight, graphWidth, 70);
  stroke('green')
  fill('green')
  textSize(20)
  if(i == 0){
  text("SCORE: GUESSED " + numCorrect + " out of " + numDivs, 75, 2*topMargin + graphHeight + 40)
  }
  else if (i == 1){
    text("FINAL SCORE: " + numCorrect + "/" + numDivs + " CORRECT!", 75, 2*topMargin + graphHeight + 40)
    alert("THANKS FOR PLAYING! HOPEFULLY YOU LEARNED ABOUT THE VOLATILITY OF THE MARKET :D")
  }
  else {
    text(">>>MARKET VOLATILITY SIMULATOR<<<", 15, 2*topMargin + graphHeight + 40)
  }
  textSize(12)

}


function drawGraph(){
  if(x1 < graphWidth+10){
    if(y2 < 10) y2 = 10
    if(y2 > (graphHeight+10)) y2 = (graphHeight+10)
    line(x1, y1, x2, y2);
    x1 = x2
    y1 = y2
    x2 += dx
    y2 -= random(-8 + weight, 8)
  }
  else if(!lastPoint){
    lastPoint = true
    val = graphHeight/2 - y2 + 200;
    if(val >= lastVal){
      fill('green')
      stroke('white')
      text(round(val, 2), x1-40, y1+4)
     stroke('green')
      fill('green')
      if(bullOrBear == 0){
        numCorrect += 1
      }
    } else {
      fill('red')
      stroke('white')
      text(round(val, 2), x1-40, y1+4)
      stroke('red')
      fill('red')
      if(bullOrBear == 1){
        numCorrect += 1
      }
    }
    
    lastVal = val
    strokeWeight(7)
    point(x1, y1)
    stroke('red')
    strokeWeight(1)
    drawStats(1)
  }
  if(x1 >= lastMilestone + xMile){
    val = graphHeight/2 - y1 + 200;
    if(val >= lastVal){
      fill('green')
      stroke('white')
      text(round(val, 2), x1-40, y1+4)
     stroke('green')
      fill('green')
      if(bullOrBear == 0){
        numCorrect += 1
      }
    } else {
      fill('red')
      stroke('white')
      text(round(val, 2), x1-40, y1+4)
      stroke('red')
      fill('red')
      if(bullOrBear == 1){
        numCorrect += 1
      }
      
    }
    
    lastVal = val
    strokeWeight(7)
    point(x1, y1)
    stroke('red')
    strokeWeight(1)
    lastMilestone += xMile
    news = true
    newsNotDrawn = true
    canChangeChoice = true
    drawStats(0)
  }
  stroke('black')
  strokeWeight(1)
}

function drawButtons(){
  button1 = createButton('BULLISH')
  button2 = createButton('BEARISH')
  button1.position(sideMargin, graphHeight+100);
  button1.mousePressed(bull);
  button1.size(200,100)
  button2.position(sideMargin + 200, graphHeight+100);
  button2.mousePressed(bear);
  button2.size(200,100)
  
}

function bull(){
  if(canChangeChoice){
    bullOrBear = 0
    news=false
    canChangeChoice = false
  }
}

function bear(){
  if(canChangeChoice){
    bullOrBear = 1
    news=false
    canChangeChoice = false
  } 
}