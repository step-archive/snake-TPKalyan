let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const offerPlayAgain = function(){
  let display = document.getElementById('hidden_tail');
  let button = document.createElement('input');
  button.type = 'button';
  button.onclick = reset;
  button.className = 'center'
  button.value = 'Play again!';
  display.appendChild(button);
}

const isInBetween = function(value,min,max){
  return value > min && value < max
}

const positionOnBoard = function(position){
  let xCoOrd = position.x;
  let yCoOrd = position.y;
  return (isInBetween(xCoOrd,-1,numberOfCols)  &&  isInBetween(yCoOrd,-1,numberOfRows));
}

const doesHeadHitsBody = function(){
  let head = snake.getHead();
  return snake.body.some((position)=>head.isSameCoordAs(position));
}

const doesSnakeHitsWall = function(){
  let nextPos = snake.getHead().next();
  return (!positionOnBoard(nextPos));
}

const isGameOver = function(){
  return doesHeadHitsBody() || doesSnakeHitsWall();
}

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
    return ;
  }
  if(isGameOver()){
    clearInterval(animator);
    offerPlayAgain()
    return ;
  }
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
