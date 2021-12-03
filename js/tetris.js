const { isatty } = require("tty");

// DOM 선언
const playground = document.querySelector(".playground > ul");

//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
let score = 0;
let duration = 500;
let dowmInterval;
// 잠깐 담아두는 용도의 변수
let tempMovingItem;

const BLOCKS = {
  tree: [
    [[2,1],[0,1],[1,1],[1,0]],
  ]
}

// 실질적으로 다음 블럭의 타입과 좌표 등의 정보들을 가지고 있는 변수
const movingItem = {
  type: "tree", // 블럭의 형태를 가져옴(좌표값)
  direction: 0,
  top: 0,
  left: 3,
};

init()

// functions
// 스크립트가 호출이 될 때 바로 시작이 되는 초기 함수 init
function init() {
  tempMovingItem = { ...movingItem }; // 스프레드 오퍼레이터 : 껍데기를 벗긴 안의 내용만, 값을 복사해옴
  for(let i=0; i<GAME_ROWS; i++) {
    prependNewLine()
  }
  renderBlocks()
}

function prependNewLine(){
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  
  for(let j=0; j<10; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  
  li.prepend(ul)
  playground.prepend(li) 
}

function renderBlocks() {
  const { type, direction, top, left} = tempMovingItem;
  const movingBlocks = document.querySelectorAll(".moving");

  movingBlocks.forEach(moving => {
    moving.classList.remove(type, "moving");
  })

  BLOCKS[type][direction].forEach(block => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
    const isAvailable = checkEmpty(target);
    if(isAvailable) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...movingItem };
      // setTimeout(() => {
      //   renderBlocks();
      // }, 0);
      renderBlocks();
    }
    target.classList.add(type, "moving");
  });
}

function checkEmpty(target) {
  
  if(!target){
    return false;
  }
  return true;
}

function moveBlock(moveType, amount){
  tempMovingItem[moveType] += amount;
  renderBlocks()
}

// event handling
document.addEventListener("keydown", e => {
  console.log(e)
  switch(e.keyCode){
    case 39 : 
      moveBlock("left", 1);
      break;
    case 37 :
      moveBlock("left", -1);
      break;
    case 40 :
      moveBlock("top", 1);
      break;
    default :
      break;
    }
})