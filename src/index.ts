import './css/style.css';
import UserField from './js/userField';

// the html page is ready
document.addEventListener('DOMContentLoaded', () => {
    let currentField: UserField = null;
    const fieldWidth:number = 10;
    const fieldHeight:number = 10;
    const width: number = 500;
    const height: number = 500;
    const idOfElem: string = 'field-block';
    const info = document.getElementsByClassName('info')[0];

    //event on loading html page
    function onLoad() {
        currentField = new UserField(fieldWidth, fieldHeight, width, height, idOfElem);
        currentField.createEmptyField();
        currentField.drawField();

        document.getElementsByClassName('clear-btn')[0].addEventListener('click', clickManual, false);
        document.getElementsByClassName('generate-btn')[0].addEventListener('click', clickAuto, true);

        info.classList.add('hide');
    }

    //event click Manual
    function clickManual() {
        currentField.canvas.onmousemove = currentField.moveField.bind(currentField);
        currentField.canvas.oncontextmenu = currentField.toggleVertical.bind(currentField);
        currentField.canvas.onclick = currentField.clickField.bind(currentField);

        info.classList.remove('hide');

        currentField.manual();
    }

    //event click Auto
    function clickAuto() {
        currentField.auto();

        currentField.canvas.onmousemove = null;
        currentField.canvas.oncontextmenu = null;
        currentField.canvas.onclick = null;

        info.classList.add('hide');


    }

    // start running app
    onLoad();

});