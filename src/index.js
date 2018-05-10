import './css/style.css';
// import Finder from './js/finder';
import Canvasfield from './js/canvas';
import BattleField from './js/battleField.ts';
// import Node from './node';


// the html page is ready
document.addEventListener('DOMContentLoaded', () => {
  let currentCanvas = null;
  let currentfield = null;
  const finderPath = null;
  let fieldWidth = 10;
  let fieldHeight = 10;

  function onload() {
    // console.log('Page loaded.');
    currentfield = new BattleField(fieldWidth, fieldHeight);
    currentfield.createEmptyField();
    // currentfield.initCells();
    currentfield.initShips();
    currentCanvas = new Canvasfield(fieldWidth, fieldHeight, 600, 600, 'field-block', fieldClick);
    currentCanvas.drawfield(currentfield.field);
  }

  // generate new empty field
  function clickClear() {
    const size = document.getElementById('size').value;
    if (size > 9 && size < 151) {
      fieldWidth = size;
      fieldHeight = size;
      onload();
    } else {
      alert('Size of field from 10 to 150');
    }
  }
  // handle click events on the canvas
  function clickFind() {
    currentCanvas.drawfield(currentfield.field);
    currentCanvas.drawPath(finderPath.find());
  }

  function clickGenerate() {
    currentfield.createfield();
    currentCanvas.drawfield(currentfield.field);
  }

  // handle click events on the canvas
  function fieldClick(e) {
    const cell = currentCanvas.getPointerPosition(e);
    currentfield.changeField(...cell);
    currentCanvas.drawfield(currentfield.field);
  }

  // start running app
  onload();

  // events-------------------------------
  document.getElementsByClassName('clear-btn')[0].addEventListener('click', clickClear);
  document.getElementsByClassName('generate-btn')[0].addEventListener('click', clickGenerate);
  document.getElementsByClassName('find-btn')[0].addEventListener('click', clickFind);
});

