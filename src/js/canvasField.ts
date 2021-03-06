import BattleField from "./battleField";

//class display on canvas field, ships and get position of pointer
export default class CanvasField extends BattleField {

    tileWidth: number;
    tileHeight: number;
    canvas: any;
    ctx: CanvasRenderingContext2D;

    constructor(fieldWidth: number = 10,
                fieldHeight: number = 10,
                width: number = 600,
                height: number = 600,
                elem: string = 'field-block') {

        super(fieldWidth, fieldHeight);

        this.tileWidth = width / fieldWidth;
        this.tileHeight = height / fieldHeight;
        this.canvas = document.getElementById(elem);
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
    }

    //display on canvas field with ships
    drawField():void {
        let x, y: number;
        for (x = 0; x < this.field[0].length; x++) {
            for (y = 0; y < this.field.length; y++) {
                if (!this.field[x][y]) {
                    // empty field
                    this.ctx.fillStyle = '#ffffff';
                    this.ctx.fillRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
                    this.ctx.strokeStyle = '#000000';
                    this.ctx.strokeRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
                } else {
                    // ship
                    this.ctx.fillStyle = '#000000';
                    this.ctx.fillRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
                }
            }
        }
    }

    //display on canvas moving ship
    drawMovingShip(x: number, y: number):void {
        if (this.initShip.isVertical) {
            for (let i = y; i < y + this.initShip.length; i++) {
                this.ctx.fillStyle = '#7f7f7f';
                this.ctx.fillRect(x * this.tileWidth, i * this.tileHeight, this.tileWidth, this.tileHeight);
            }
        } else {
            for (let i = x; i < x + this.initShip.length; i++) {
                this.ctx.fillStyle = '#7f7f7f';
                this.ctx.fillRect(i * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
            }
        }
    }

    //get position of pointer
    getPointerPosition(e: DragEvent):number[] {
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

        return cell;
    }
}