export class Game {
    startedOn: Date;
    board: number[][];
    completed: {winnerIndex: number};

    constructor(public id: number, public humanPlayerFirst: boolean) {
        this.startedOn = new Date();
        this.board = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
        this.completed = {winnerIndex: 0}
    }
}
