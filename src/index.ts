// import './css/style.css';
//
// import CanvasField from './js/canvasField';
// // import BattleField from "./js/battleField";
//
// class Test extends CanvasField {
//
// }
//
// let t = new Test();
//
// // the html page is ready
// document.addEventListener('DOMContentLoaded', () => {
//     let userField: CanvasField = null;
//     const fieldWidth:number = 10;
//     const fieldHeight:number = 10;
//
//
//     function onload() {
//         userField = new CanvasField(fieldWidth, fieldHeight, 600, 600, 'field-block');
//         userField.createEmptyField();
//         userField.drawfield();
//     }
//
//     // handle click events on the canvas
//     function moveField(e:any) {
//         if (!userField.allPlaced) {
//             const [x, y] = userField.getPointerPosition(e);
//             userField.drawfield();
//             userField.drawMove(x, y);
//         }
//     }
//
//     function toggleVertical() {
//         userField.initShip.isVertical = !userField.initShip.isVertical;
//         return false;
//     }
//
//     function clickField(e:any) {
//         if (!userField.allPlaced) {
//             const [x, y] = userField.getPointerPosition(e);
//             userField.initShip.x = x;
//             userField.initShip.y = y;
//             userField.placingShip();
//             userField.drawfield();
//         }
//     }
//
//     // generate new empty field
//     function clickManual() {
//         userField.canvas.onmousemove = moveField;
//         userField.canvas.oncontextmenu = toggleVertical;
//         userField.canvas.onclick = clickField;
//         userField.createEmptyField();
//         userField.initShips();
//         userField.drawfield();
//     }
//
//     function clickGenerate() {
//         userField.canvas.removeEventListener('mousemove', moveField, false);
//         userField.createEmptyField();
//         userField.initShips();
//         userField.autoPlacingShip();
//         userField.drawfield();
//     }
//
//     // start running app
//     onload();
//
//     // events-------------------------------
//     document.getElementsByClassName('clear-btn')[0].addEventListener('click', clickManual);
//     document.getElementsByClassName('generate-btn')[0].addEventListener('click', clickGenerate);
// });