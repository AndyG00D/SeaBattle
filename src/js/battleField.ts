/**
 * Позиция на поле
 * @param x позиция по оси Х
 * @param y позиция по оси У
 * @constructor
 */
class Pos {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

/**
 * Ячейка в поле
 * @param pos позиция ячейки
 * @param ship корабль, который установлен на ячейку
 * @constructor
 */
class Cell {
    pos: Pos;
    ship: any;

    constructor(pos: Pos, ship: any) {
        this.pos = pos;
        this.ship = ship;
    }
}

// class Ship {
//     cellWidgets: Cell;
//     constructor(){
//         this.cellWidgets = new Cell([],);
//     }
// }


class Ship{
    shipNumber: number;
    shipLength: number;
    shipIsPlaced: boolean;
    isVertical: boolean;
    x: number;
    y: number;
}


export default class BattleField {
    fieldWidth: number;
    fieldHeight: number;
    ships: number[];
    field: number[][];
    isAuto: boolean;
    initShip: Ship;
    waitUser: boolean;
    // autoInit: boolean;
    // cellWidgets: any;


    constructor(fieldWidth = 10, fieldHeight = 10) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.ships = [0, 4, 3, 2, 1];
        // this.autoInit = false;
        this.initShip = new Ship();
        this.isAuto = true;
        this.initShip.isVertical = false;

        // this.cellWidgets = new Cell(new Pos(), null);
        // this.field = [  [0,0,0,0,0,0,0,0,0,0],
        //                 [0,0,0,0,0,0,0,0,0,0],
        //                 [0,0,0,0,0,0,0,0,0,0],
        //                 [0,0,0,0,0,0,0,0,0,0],
        //                 [0,0,0,0,0,0,0,0,0,0],
        //                 [0,0,0,0,0,0,0,0,0,0],
        //                 [0,0,0,0,0,0,0,0,0,0],
        //                 [0,0,0,0,0,0,0,0,0,0],
        //                 [0,0,0,0,0,0,0,0,0,0],
        //                 [0,0,0,0,0,0,0,0,0,0]];
        // ];
        // window.console.log('field: ' + this.field);
    }





    createEmptyField(): void {
        this.field = new Array(this.fieldWidth);
        for (let x: number = 0; x < this.fieldWidth; x++) {
            this.field[x] = new Array(this.fieldHeight);
            for (let y: number = 0; y < this.fieldHeight; y++) {
                // window.console.log('x:' + x + ', y:' + y +', val:' + this.field[x][y]);
                this.field[x][y] = 0;
                // window.console.log('x:' + x + ', y:' + y +', val:' + this.field[x][y]);
            }
        }

        // for (let x: number = 0; x < this.fieldWidth; x++) {
        //     // this.field[x] = [];
        //         this.field[x].fill(0,0, this.fieldHeight);
        //     }
        window.console.log('field:' + this.field);
    }


    changeField(x: number, y: number): void {
        this.field[x][y] = +!this.field[x][y];
    }

    // ShipsInfo = {
    //
    //     /**
    //      * Четырехпалубник
    //      */
    //     FOUR_DECKER : {LENGTH: 4, COUNT: 1},
    //
    //     /**
    //      * Трехпалубник
    //      */
    //     THREE_DECKER : {LENGTH: 3, COUNT: 2},
    //
    //     /**
    //      * Двухпалубник
    //      */
    //     TWO_DECKER : {LENGTH: 2, COUNT: 3},
    //
    //     /**
    //      * Однопалубник
    //      */
    //     SINGLE_DECKER : {LENGTH: 1, COUNT: 4}
    // }


    /**
     * Возвращает позиции ячеек на которых установлен корабль
     */
    // getPositions() {
    //     let result = [];
    //     for (let i = 0; i < this.cellWidgets.length; i++) {
    //         result.push(this.cellWidgets[i].pos);
    //     }
    //     return result;
    // }

    /**
     * Инициализирует ячейки поля
     */
    // initCells() {
    //     for (let i = 0; i < this.fieldWidth; i++) {
    //         for (let j = 0; j < this.fieldHeight; j++) {
    //             let pos:Pos = new Pos(i, j);
    //             let cell = new Cell(pos, 0);
    //             this.cellWidgets.push(cell);
    //         }
    //     }
    // }

    //_________Functions for automatic generate battle field



    //1. init ships
    initShips():void {
        for (let i = 4; i > 0; i--) {
            this.initShip.shipNumber = this.ships[i];
            this.initShip.shipLength = i;
            this.placingShips();
        }
    }

    // 2. Placing ships with same length
    placingShips(): void {
        for (let i = 0; i < this.initShip.shipNumber; i++) {
            this.placingShip();
        }
    }

    // sleep(ms) {
    //     return new Promise(this.waitUser = (resolve) => setTimeout(resolve, ms));
    // }


    // 3. Placing ship
    placingShip() {

        this.initShip.shipIsPlaced = false;

        while (!this.initShip.shipIsPlaced) {

            if (this.isAuto) {
                this.initShip.isVertical = Math.random() > 0.5;
                // find rand coordinates begin of ship
                if (this.initShip.isVertical) {
                    // while (y + shipLength >= this.fieldHeight) {
                    this.initShip.x = BattleField.randomPos(this.fieldWidth);
                    this.initShip.y = BattleField.randomPos(this.fieldHeight - this.initShip.shipLength);
                    // }
                } else { //horizontal
                    // while (x + shipLength >= this.fieldWidth) {
                    this.initShip.x = BattleField.randomPos(this.fieldWidth - this.initShip.shipLength);
                    this.initShip.y = BattleField.randomPos(this.fieldHeight);
                    // }
                }
            } else {
                // window.console.log("Wait...");
                // // this.waitUser = setTimeout(() =>{}, 5000000000);
                // // await this.sleep(20000000);
                // this.waitUser = false;
                // await this.sleep()};
                // window.console.log("Run...");
            }


            // check aria around has near ships
            if (!this.isShipsInArea()) {
                let shipPositions = [];

                if (this.initShip.isVertical) {
                    for (let i = this.initShip.y; i < (this.initShip.y + this.initShip.shipLength); i++) {
                        shipPositions.push(new Pos(this.initShip.x, i))
                    }
                } else { // horizontal
                    for (let i = this.initShip.x; i < (this.initShip.x + this.initShip.shipLength); i++) {
                        shipPositions.push(new Pos(i, this.initShip.y));
                    }
                }

                //mark ship on field

                for (let pos of shipPositions) {
                    this.field[pos.x][pos.y] = 1;
                }

                this.initShip.shipIsPlaced = true;
            }
        }
    }

    //3.1 generate random position
    static randomPos(range: number):number {
        return Math.floor(Math.random() * range);
    }

    //4. Area around placing ship has other ships
    isShipsInArea(): boolean {
        //position of area around ship
        let topLeftPos: Pos = new Pos(this.initShip.x - 1, this.initShip.y - 1);
        let bottomRightPos: Pos;

        if (this.initShip.isVertical) {
            bottomRightPos = new Pos(this.initShip.x + 1, this.initShip.y + this.initShip.shipLength + 1);
        } else {
            bottomRightPos = new Pos(this.initShip.x + this.initShip.shipLength + 1, this.initShip.y + 1);
        }

        //cut part of area if it out edge of field
        topLeftPos.x = this.cutAreaOutField(topLeftPos.x, this.fieldWidth);
        topLeftPos.y = this.cutAreaOutField(topLeftPos.y, this.fieldHeight);
        bottomRightPos.x = this.cutAreaOutField(bottomRightPos.x, this.fieldWidth);
        bottomRightPos.y = this.cutAreaOutField(bottomRightPos.y, this.fieldHeight);

        window.console.log('field: ' + this.field);

        for (let i = topLeftPos.x; i <= bottomRightPos.x; i++) {
            for (let j = topLeftPos.y; j <= bottomRightPos.y; j++) {
                // let cell = this.getCellByPosition(new Pos(i, j));
                // if (cell && cell.ship) {
                //     isShipExistInArea = true;
                //     break;
                window.console.log('x:' + i + ', y:' + j + ' val: ' + this.field[i][j]);
                if (this.field[i][j] == 1) return true;
            }
        }
        return false;
    }

    // 4.1 cut side of area if it out edge of field
    cutAreaOutField(point: number, length: number) {
        if (point < 0) return 0;
        if (point > length-1) {
            return length - 1;
        }
        return point;
    }


    // setCellFired(pos:Pos) {
    //     let cell = this.getCellByPosition(pos);
    //     if (cell) {
    //         cell.isFired = true;
    //     }
    // }

    // /**
    //  * Возвращает корабль котор. находится на переданной позиции
    //  * @param pos позиция корабля
    //  * @returns {*}
    //  */
    // getShipByPosition(pos:Pos) {
    //     let cell = this.getCellByPosition(pos);
    //     return cell.ship;
    // }

    // /**
    //  * Возвращает ячейку по переданной позиции
    //  * @param pos позиция
    //  * @returns {null}
    //  */
    // getCellByPosition(pos:Pos) {
    //     let result = null;
    //
    //     for (let i = 0; i < this.cellWidgets.length; i++) {
    //         let cell = this.cellWidgets[i];
    //         if (cell.pos.x == pos.x && cell.pos.y == pos.y) {
    //             result = cell;
    //             break;
    //         }
    //     }
    //     return result;
    // }

}
