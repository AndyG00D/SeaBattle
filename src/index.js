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

  function onload() {
    // console.log('Page loaded.');
    // currentfield = new BattleField(fieldWidth, fieldHeight);
    // currentfield.createEmptyField();
    // currentfield.initCells();
    // currentfield.initShips();
    currentCanvas = new Canvasfield(fieldWidth, fieldHeight, 600, 600, 'field-block');
    // currentCanvas.canvas.onclick = currentCanvas.fieldClick;
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
    currentCanvas.canvas.addEventListener('mousemove', fieldClick, false);
    currentCanvas.createEmptyField();
    currentCanvas.drawfield();
  }
  // // handle click events on the canvas
  // function clickFind() {
  //   currentCanvas.drawfield(currentCanvas.field);
  //   currentCanvas.drawPath(finderPath.find());
  // }

  function clickGenerate() {
      currentCanvas.canvas.removeEventListener('mousemove', fieldClick, false);
    currentCanvas.createEmptyField();
    currentCanvas.initShips();
    // currentfield.createfield();
    currentCanvas.drawfield();
  }

  // handle click events on the canvas
  function fieldClick(e) {
    const cell = currentCanvas.getPointerPosition(e);
    // currentCanvas.changeField(...cell);
    currentCanvas.drawfield();
    currentCanvas.drawMove(...cell, false, 4);
  }

  // start running app
  onload();

  // events-------------------------------
  // currentCanvas.canvas.addEventListener('mousemove', fieldClick, false);
  document.getElementsByClassName('clear-btn')[0].addEventListener('click', clickClear);
  document.getElementsByClassName('generate-btn')[0].addEventListener('click', clickGenerate);
  // document.getElementsByClassName('find-btn')[0].addEventListener('click', clickFind);
});

