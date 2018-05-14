//Class contained parameters of ship
export default class Ship {
    length: number;
    isPlaced: boolean;
    isVertical: boolean;
    x: number;
    y: number;

    constructor(length: number) {
        this.length = length;
        this.isPlaced = false;
        this.isVertical = false;
    }
}