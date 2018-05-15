import Position from './position';
import Ship from './ship';

//class generate field, ships and placed it
export default class BattleField {
    fieldWidth: number;
    fieldHeight: number;
    shipTypes: number[];
    field: number[][];
    initShip: Ship;
    allShips: Ship[];
    allPlaced: boolean;

    constructor(fieldWidth = 10, fieldHeight = 10) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.shipTypes = [0, 4, 3, 2, 1];
        this.allShips = [];
        this.allPlaced = false;
    }

    //generate empty field
    createEmptyField(): void {
        this.field = new Array(this.fieldWidth);
        for (let x: number = 0; x < this.fieldWidth; x++) {
            this.field[x] = new Array(this.fieldHeight);
            for (let y: number = 0; y < this.fieldHeight; y++) {
                this.field[x][y] = 0;
            }
        }
    }

    // init ships
    initShips(): void {
        this.allPlaced = false;
        for (let i = 4; i > 0; i--) {
            for (let j = 0; j < this.shipTypes[i]; j++) {
                this.allShips.push(new Ship(i))
            }
        }
        this.getShip();
    }

    //Get not placed ship
    getShip(): void {
        for (let i = 0; i < this.allShips.length; i++) {
            if (!this.allShips[i].isPlaced) {
                this.initShip = this.allShips[i];
                this.allPlaced = false;
                break;
            } else {
                this.initShip = null;
                this.allPlaced = true;
            }
        }
    }

    //Automatic placing ships
    autoPlacingShip(): void {
        while (!this.allPlaced && !this.initShip.isPlaced) {
            this.initShip.isVertical = Math.random() > 0.5;

            // find rand coordinates begin of ship
            if (this.initShip.isVertical) {
                this.initShip.x = BattleField.randomPos(this.fieldWidth);
                this.initShip.y = BattleField.randomPos(this.fieldHeight - this.initShip.length);
            } else { //horizontal
                this.initShip.x = BattleField.randomPos(this.fieldWidth - this.initShip.length);
                this.initShip.y = BattleField.randomPos(this.fieldHeight);
            }

            this.placingShip();
        }
    }

    // Placing ship
    placingShip(): void {
        let isOutField: boolean;
        if (this.initShip.isVertical) {
            isOutField = (this.initShip.y + this.initShip.length) > this.fieldWidth;
        } else {
            isOutField = (this.initShip.x + this.initShip.length) > this.fieldHeight;
        }

        if (!this.isShipsInArea() && !isOutField) {

            if (this.initShip.isVertical) {
                for (let i = this.initShip.y; i < (this.initShip.y + this.initShip.length); i++) {
                    this.field[this.initShip.x][i] = 1;
                }
            } else { // horizontal
                for (let i = this.initShip.x; i < (this.initShip.x + this.initShip.length); i++) {
                    this.field[i][this.initShip.y] = 1;
                }
            }

            this.initShip.isPlaced = true;
            this.getShip();
        }
    }

    //Generate random position
    static randomPos(range: number): number {
        return Math.floor(Math.random() * range);
    }

    //Area around placing ship has other ships
    isShipsInArea(): boolean {
        //position of area around ship
        let topLeftPos: Position = new Position(this.initShip.x - 1, this.initShip.y - 1);
        let bottomRightPos: Position;
        if (this.initShip.isVertical) {
            bottomRightPos = new Position(this.initShip.x + 1, this.initShip.y + this.initShip.length);
        } else {
            bottomRightPos = new Position(this.initShip.x + this.initShip.length, this.initShip.y + 1);
        }

        //cut part of area if it out edge of field
        topLeftPos.x = this.cutAreaOutField(topLeftPos.x, this.fieldWidth);
        topLeftPos.y = this.cutAreaOutField(topLeftPos.y, this.fieldHeight);
        bottomRightPos.x = this.cutAreaOutField(bottomRightPos.x, this.fieldWidth);
        bottomRightPos.y = this.cutAreaOutField(bottomRightPos.y, this.fieldHeight);

        for (let i = topLeftPos.x; i <= bottomRightPos.x; i++) {
            for (let j = topLeftPos.y; j <= bottomRightPos.y; j++) {
                if (this.field[i][j] == 1) return true;
            }
        }
        return false;
    }

    //Cut side of area if it out edge of field
    cutAreaOutField(point: number, length: number): number {
        if (point < 0) return 0;
        if (point > length - 1) return length - 1;
        return point;
    }
}
