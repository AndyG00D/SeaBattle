import CanvasField from './canvasField';

//class contains methods for events of users battle field
export default class UserField extends CanvasField {

    constructor(fieldWidth: number = 10,
                fieldHeight: number = 10,
                width: number = 600,
                height: number = 600,
                elem: string = 'field-block') {

        super(fieldWidth, fieldHeight, width, height, elem);
    }

    //event move pointer on the canvas
    moveField(e: DragEvent) {
        if (!this.allPlaced) {
            const [x, y] = this.getPointerPosition(e);
            this.drawField();
            this.drawMovingShip(x, y);
        }
    }

    //event routing ship
    toggleVertical() {
        this.initShip.isVertical = !this.initShip.isVertical;
        return false;
    }

    //handle click events on the canvas
    clickField(e: DragEvent) {
        if (!this.allPlaced) {
            const [x, y] = this.getPointerPosition(e);
            this.initShip.x = x;
            this.initShip.y = y;
            this.placingShip();
            this.drawField();
        }
    }

    //start user manual placing ships
    manual() {
        this.createEmptyField();
        this.initShips();
        this.drawField();
    }

    //start automatic placing ships
    auto() {
        this.createEmptyField();
        this.initShips();
        this.autoPlacingShip();
        this.drawField();
    }
}