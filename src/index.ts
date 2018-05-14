import './css/style.css';
import CanvasField from './js/canvasField';

// the html page is ready
document.addEventListener('DOMContentLoaded', () => {
    let userField: CanvasField = null;
    const fieldWidth:number = 10;
    const fieldHeight:number = 10;


    function onload() {
        userField = new CanvasField(fieldWidth, fieldHeight, 600, 600, 'field-block');
        userField.createEmptyField();
        userField.drawField();
    }

    // handle click events on the canvas
    function moveField(e: DragEvent) {
        if (!userField.allPlaced) {
            const [x, y] = userField.getPointerPosition(e);
            userField.drawField();
            userField.drawMovingShip(x, y);
        }
    }

    function toggleVertical() {
        userField.initShip.isVertical = !userField.initShip.isVertical;
        return false;
    }

    function clickField(e: DragEvent) {
        if (!userField.allPlaced) {
            const [x, y] = userField.getPointerPosition(e);
            userField.initShip.x = x;
            userField.initShip.y = y;
            userField.placingShip();
            userField.drawField();
        }
    }

    // generate new empty field
    function clickManual() {
        userField.canvas.onmousemove = moveField;
        userField.canvas.oncontextmenu = toggleVertical;
        userField.canvas.onclick = clickField;

        userField.createEmptyField();
        userField.initShips();
        userField.drawField();
    }

    function clickGenerate() {
        userField.canvas.onmousemove = null;
        userField.canvas.oncontextmenu = null;
        userField.canvas.onclick = null;

        userField.createEmptyField();
        userField.initShips();
        userField.autoPlacingShip();
        userField.drawField();
    }

    // start running app
    onload();

    // events-------------------------------
    document.getElementsByClassName('clear-btn')[0].addEventListener('click', clickManual);
    document.getElementsByClassName('generate-btn')[0].addEventListener('click', clickGenerate);
});