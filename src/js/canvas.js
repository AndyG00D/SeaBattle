import BattleField from './battleField.ts';

// const fieldClick = function () {
// };

export default class Canvasfield extends BattleField {
  constructor(fieldWidth = 10, fieldHeight = 10, width = 600, height = 600, elem = 'field-block') {
    super(fieldWidth, fieldHeight);

    this.tileWidth = width / fieldWidth;
    this.tileHeight = height / fieldHeight;
    this.canvas = document.getElementById(elem);
    this.canvas.width = width;
    this.canvas.height = height;
    // this.canvas.addEventListener('mousemove', this.fieldClick, false);
    // if (!this.canvas) alert('Canvas ERROR!');
    this.ctx = this.canvas.getContext('2d');
    // if (!this.ctx) alert('Canvas ERROR!');


    // this.canvas.onclick = this.fieldClick;
  }

  drawfield() {
    // console.log(`field: ${field}`);
    for (const x in this.field[0]) {
      for (const y in this.field) {
        if (!this.field[x][y]) {
          // empty field
          this.ctx.fillStyle = '#ffffff';
          this.ctx.fillRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
          this.ctx.strokeStyle = '#000000';
          this.ctx.strokeRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
        } else {
          // wall
          this.ctx.fillStyle = '#000000';
          this.ctx.fillRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
        }
      }
    }
  }


  drawMove(x, y, isVertical, length) {
    if (isVertical) {
      for (let i = y; i < y + length; i++) {
        this.ctx.fillStyle = '#7f7f7f';
        this.ctx.fillRect(x * this.tileWidth, i * this.tileHeight, this.tileWidth, this.tileHeight);
      }
    } else {
      for (let i = x; i < x + length; i++) {
        this.ctx.fillStyle = '#7f7f7f';
        this.ctx.fillRect(i * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
      }
    }
  }
  // // draw the path
  // drawMove(x, y) {
  //   // console.log(`Current path length: ${currentPath.length}`);
  //   // console.log(`Current path: ${currentPath}`);
  //   this.ctx.fillRect = '#7f7f7f';
  //   this.ctx.fillRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
  //   // if (isVertical) {
  //   //   this.ctx.fillRect = '#7f7f7f';
  //   //   this.ctx.fillRect(pos.x * this.tileWidth, (pos.y + length) * this.tileHeight, this.tileWidth, this.tileHeight);
  //   // } else {
  //   //   this.ctx.fillRect = '#7f7f7f';
  //   //   this.ctx.fillRect((pos.x + length) * this.tileWidth, pos.y * this.tileHeight, this.tileWidth, this.tileHeight);
  //   // }
  // }

  redraw() {
    console.log('redrawing...');

    // clear the screen
    this.ctx.strokeStyle = '#000000';
    this.ctx.strokeRect(0, 0, this.width, this.height);

    this.drawfield();
  }

  getPointerPosition(e) {
    let x;
    let y;

    if (e.pageX !== undefined && e.pageY !== undefined) {
      x = e.pageX;
      y = e.pageY;
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;


    const cell =
            [
              Math.floor(x / this.tileWidth),
              Math.floor(y / this.tileHeight),
            ];

    // console.log(`we clicked tile ${cell[0]},${cell[1]}`);

    return cell;
  }

  // fieldClick(e) {
  //   const cell = this.getPointerPosition(e);
  //   this.changeField(...cell);
  //   this.drawfield();
  // }
}
