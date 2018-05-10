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


export default class BattleField {
    fieldWidth: number;
    fieldHeight: number;
    ships: number[];
    field: [[number]];
    // cellWidgets: any;

    constructor(fieldWidth = 10, fieldHeight = 10) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.ships = [0, 4, 3, 2, 1];
        // this.cellWidgets = new Cell(new Pos(), null);
        this.field = [[0]];
        // window.console.log('field: ' + this.field);
    }

    createEmptyField(): void {
        for (let x: number = 0; x < this.fieldWidth; x++) {
            this.field[x] = [this.fieldHeight];
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

    /**
     * Информация о караблях (длина корабля / количество кораблей)
     */
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


    //1. init ships
    initShips() {
        for (let i = 4; i > 0; i--) {
            this.placingShips(this.ships[i], i);
        }
    }

    // 2. Placing ships with same length
    placingShips(shipNumber: number, shipLength: number): void {
        for (let i = 0; i < shipNumber; i++) {
            this.placingShip(shipLength);
        }
    }

    // 3. Placing ship
    placingShip(shipLength: number) {

        let shipIsPlaced: boolean = false;

        while (!shipIsPlaced) {
            let isVertical: boolean = Math.random() > 0.5 ? true : false;
            let x: number = this.randomPos(this.fieldWidth);
            let y: number = this.randomPos(this.fieldHeight);

            // find rand coordinates begin of ship
            if (isVertical) {
                while (y + shipLength >= this.fieldHeight) {
                    y = this.randomPos(this.fieldHeight);
                }
            } else { //horizontal
                while (x + shipLength >= this.fieldWidth) {
                    x = this.randomPos(this.fieldWidth);
                }
            }

            // check aria around has near ships
            if (!this.isShipsInArea(x, y, isVertical, shipLength)) {
                let shipPositions = [];

                if (isVertical) {
                    for (let i = y; i < (y + shipLength); i++) {
                        shipPositions.push(new Pos(x, i))
                    }
                } else { // horizontal
                    for (let i = x; i < (x + shipLength); i++) {
                        shipPositions.push(new Pos(i, y));
                    }
                }

                //mark ship on field

                for (let pos of shipPositions) {
                    this.field[pos.x][pos.y] = 1;
                }

                shipIsPlaced = true;
            }
        }
    }

    //generate random position
    randomPos(range: number) {
        return Math.floor(Math.random() * (range - 1));
    }

    //Area around placing ship has other ships
    isShipsInArea(x: number, y: number, isVertical: boolean, shipLength: number): boolean {
        //position of area around ship
        let topLeftPos: Pos = new Pos(x - 1, y - 1);
        let bottomRightPos: Pos;

        if (isVertical) {
            bottomRightPos = new Pos(x + 1, y + shipLength + 1);
        } else {
            bottomRightPos = new Pos(x + shipLength + 1, y + 1);
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

    //cut side of area if it out edge of field
    cutAreaOutField(point: number, length: number) {
        if (point < 0) point = 0;
        if (point > length) point = length;
        return point;
    }


    /**
     * Устанавливает ячейку подбитой
     * @param pos позиция ячейки
     */
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
    //
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
