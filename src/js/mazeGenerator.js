'use strict';

export default class mazeGenerator {
    constructor(mazeWidth = 10, mazeHeight = 10) {
        this.mazeWidth = mazeWidth;
        this.mazeHeight = mazeHeight;
        this.maze = [[]];
        this.createEmptyField();
    }

    createEmptyField() {
        // create emptiness
        for (let x = 0; x < this.mazeWidth; x++) {
            this.maze[x] = [];

            for (let y = 0; y < this.mazeHeight; y++) {
                this.maze[x][y] = 0;
            }
        }
    }


// fill the maze with walls
    createMaze() {
        console.log('Creating maze...');

        this.createEmptyField();

        // scatter some walls
        for (let x = 0; x < this.mazeWidth; x++) {
            for (let y = 0; y < this.mazeHeight; y++) {
                if (Math.random() > 0.75) {
                    this.maze[x][y] = 1;
                } else {
                    this.maze[x][y] = 0;
                }
            }
        }

        this.maze[0][0] = 0;
        this.maze[this.mazeWidth - 1][this.mazeHeight - 1] = 0;
    }

    // fill the maze with walls
    changeField(x, y) {
        if (this.maze[x][y] === 0) {
            this.maze[x][y] = 1;
        } else {
            this.maze[x][y] = 0;
        }
    }
}