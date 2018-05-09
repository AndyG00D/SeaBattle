import './css/style.css';
import Finder from './js/finder';
import CanvasMaze from './js/canvas';
import MazeGenerator from './js/mazeGenerator';
// import Node from './node';


// the html page is ready
document.addEventListener('DOMContentLoaded', () => {
  let currentCanvas = null;
  let currentMaze = null;
  let finderPath = null;
  let mazeWidth = 10;
  let mazeHeight = 10;

  function onload() {
    // console.log('Page loaded.');
    currentMaze = new MazeGenerator(mazeWidth, mazeHeight);
    currentMaze.createEmptyField();
    finderPath = new Finder(currentMaze.maze);
    currentCanvas = new CanvasMaze(mazeWidth, mazeHeight, 600, 600, 'maze-block', fieldClick);
    currentCanvas.drawMaze(currentMaze.maze);
  }

  // generate new empty field
  function clickClear() {
    const size = document.getElementById('size').value;
    if (size > 9 && size < 151) {
      mazeWidth = size;
      mazeHeight = size;
      onload();
    } else {
      alert('Size of Maze from 10 to 150');
    }
  }
  // handle click events on the canvas
  function clickFind() {
    currentCanvas.drawMaze(currentMaze.maze);
    currentCanvas.drawPath(finderPath.find());
  }

  function clickGenerate() {
    currentMaze.createMaze();
    currentCanvas.drawMaze(currentMaze.maze);
  }

  // handle click events on the canvas
  function fieldClick(e) {
    const cell = currentCanvas.getPointerPosition(e);
    currentMaze.changeField(...cell);
    currentCanvas.drawMaze(currentMaze.maze);
  }

  // start running app
  onload();

  // events-------------------------------
  document.getElementsByClassName('clear-btn')[0].addEventListener('click', clickClear);
  document.getElementsByClassName('generate-btn')[0].addEventListener('click', clickGenerate);
  document.getElementsByClassName('find-btn')[0].addEventListener('click', clickFind);
});

