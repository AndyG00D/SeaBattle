import './css/style.css';
// import Finder from './js/finder';
import Canvasfield from './js/canvas';
// import BattleField from './js/battleField.ts';
// import Node from './node';


// the html page is ready
document.addEventListener('DOMContentLoaded', () => {
  let currentCanvas = null;
  // let currentfield = null;
  // const finderPath = null;
  const fieldWidth = 10;
  const fieldHeight = 10;


  function clickGenerate() {
    currentCanvas.canvas.removeEventListener('mousemove', moveField, false);
    currentCanvas.isAuto = true;
    currentCanvas.createEmptyField();
    currentCanvas.initShips();
    // currentfield.createfield();
    currentCanvas.drawfield();
  }

  // handle click events on the canvas
  function moveField(e) {
    const cell = currentCanvas.getPointerPosition(e);
    // currentCanvas.changeField(...cell);
    currentCanvas.drawfield();
    currentCanvas.drawMove(cell[0], cell[1], currentCanvas.initShip.isVertical, currentCanvas.initShip.shipLength);
  }

  function toggleVertical(e) {
    currentCanvas.initShip.isVertical = !currentCanvas.initShip.isVertical;
    return false;
  }

  function clickField(e) {
    const cell = currentCanvas.getPointerPosition(e);
    currentCanvas.initShip.x = cell[0];
    currentCanvas.initShip.y = cell[1];
    // clearTimeout(currentCanvas.waitUser);
    currentCanvas.waitUser = true;
    currentCanvas.drawfield();
  }


  function onload() {
    // console.log('Page loaded.');
    // currentfield = new BattleField(fieldWidth, fieldHeight);
    // currentfield.createEmptyField();
    // currentfield.initCells();
    // currentfield.initShips();
    currentCanvas = new Canvasfield(fieldWidth, fieldHeight, 600, 600, 'field-block');
    // currentCanvas.canvas.onclick = currentCanvas.moveField;
    currentCanvas.createEmptyField();
    currentCanvas.drawfield(currentCanvas.field);
    // currentCanvas.drawMove(1, 1);
  }

  // generate new empty field
  function clickClear() {
    // const size = document.getElementById('size').value;
    // if (size > 9 && size < 151) {
    //   fieldWidth = size;
    //   fieldHeight = size;
    //   onload();
    // } else {
    //   alert('Size of field from 10 to 150');
    // }
    currentCanvas.canvas.addEventListener('mousemove', moveField, false);
    // currentCanvas.canvas.addEventListener('contextmenu', toggleVertical, false);
    currentCanvas.canvas.oncontextmenu = toggleVertical;
    currentCanvas.canvas.onclick = clickField;
    currentCanvas.isAuto = false;
    currentCanvas.createEmptyField();
    currentCanvas.initShips();
    // currentfield.createfield();
    currentCanvas.drawfield();
    // currentCanvas.createEmptyField();
    // currentCanvas.drawfield();
  }
  // // handle click events on the canvas
  // function clickFind() {
  //   currentCanvas.drawfield(currentCanvas.field);
  //   currentCanvas.drawPath(finderPath.find());
  // }


  // start running app
  onload();

  // events-------------------------------
  // currentCanvas.canvas.addEventListener('mousemove', moveField, false);
  document.getElementsByClassName('clear-btn')[0].addEventListener('click', clickClear);
  document.getElementsByClassName('generate-btn')[0].addEventListener('click', clickGenerate);
  // document.getElementsByClassName('find-btn')[0].addEventListener('click', clickFind);
});

