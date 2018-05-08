'use strict';

import './css/style.css';
import Finder from "./js/finder";
import canvasMaze from "./js/canvas";
import mazeGenerator from "./js/mazeGenerator";
// import Node from './node';


let currentCanvas = null;
let currentMaze = null;
let mazeWidth = 10;
let mazeHeight = 10;


// the html page is ready
document.addEventListener("DOMContentLoaded", function () {

    function onload() {
        console.log('Page loaded.');

        currentMaze = new mazeGenerator(mazeWidth, mazeHeight);
        currentCanvas = new canvasMaze(mazeWidth, mazeHeight, 600, 600, 'maze-block', fieldClick);
        currentCanvas.drawMaze(currentMaze.maze);

    }

// generate new empty field
    function clickClear() {
        let size = document.getElementById("size").value;
        if (size > 9 && size < 151) {
            mazeWidth = mazeHeight = document.getElementById("size").value;
        } else {
            alert('Size of Maze from 10 to 150')
        }

        currentMaze = new mazeGenerator(mazeWidth, mazeHeight);
        currentCanvas = new canvasMaze(mazeWidth, mazeHeight, 600, 600, 'maze-block', fieldClick);
        currentCanvas.drawMaze(currentMaze.maze);
        // currentMaze.createEmptyField();
        // currentCanvas.drawMaze(currentMaze.maze);
    }

// handle click events on the canvas
    function clickFind() {
        let finderPath = new Finder(currentMaze.maze);
        currentCanvas.drawMaze(currentMaze.maze);
        currentCanvas.drawPath(finderPath.find());
    }

    function clickGenerate() {
        currentMaze.createMaze();
        currentCanvas.drawMaze(currentMaze.maze);
    }

// handle click events on the canvas
    function fieldClick(e) {
        let cell = currentCanvas.getPointerPosition(e);
        currentMaze.changeField(...cell);
        currentCanvas.drawMaze(currentMaze.maze);
    }

// start running app
    onload();

    //events-------------------------------
    document.getElementsByClassName("clear-btn").addEventListener("click", clickClear, false);
    document.getElementsByClassName("generate-btn").addEventListener("click", clickGenerate, false);
    document.getElementsByClassName("find-btn").addEventListener("click", clickFind, false);

});

