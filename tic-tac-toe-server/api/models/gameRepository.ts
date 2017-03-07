import { Game } from './Game'
import {MoveInstruction} from "./MoveInstruction";
import * as fs from 'fs'
export class GameRepository {
    games: Game[];
    currentId: number = 0;

    constructor() {
        this.games = [];
        // this.init();
    }

    init() : void {
        let numGames = 10;
        let i = 0;
        while (i < numGames) {
            this.createGame(i % 2 == 0);
            i++;
        }
    }

    list() {
        return this.games;
    }

    createGame(humanPlayerFirst: boolean) : Game {
        let game = new Game(this.currentId, humanPlayerFirst);
        this.games.push(game);
        this.currentId++;
        if (!game.humanPlayerFirst) {
            this.makeRandomComputerMove(game);
        }
        return game;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomMove() : MoveInstruction {
        let row = this.getRandomInt(1,2);
        let col = this.getRandomInt(1,2);
        return new MoveInstruction(row, col);
    }

    makeHumanMove(game : Game, move : MoveInstruction) {
        let player = game.humanPlayerFirst ? 1 : 2;
        this.makeMove(game, move, player);
    }

    makeRandomComputerMove(game : Game) : MoveInstruction{
        let move = this.getRandomMove();
        this.makeComputerMove(game, move);
        return move;
    }

    makeComputerMove(game : Game, move: MoveInstruction) {
        let player = game.humanPlayerFirst ? 2 : 1;
        this.makeMove(game, move, player);
    }

    makeMove(game : Game, move : MoveInstruction, player : number) {
        if (game.board[move.columnIndex][move.rowIndex] === 0) {
            game.board[move.columnIndex][move.rowIndex] = player;
        }
    }

    getGameWithId(id: number) : Game {
    return this.games.filter( game => {
        return game.id === id;
    })[0];
}

    removeGame(id: number) : void {
    this.games = this.games.filter(game => game.id !== id);
    }

    updateGame(game: Game, move: MoveInstruction) {
        this.makeHumanMove(game, move);
        this.makeRandomComputerMove(game);
    }

    figureOutNumberOfTurns(game: Game) : number {
        return game.board[0].reduce(this.add, 0) +
            game.board[1].reduce(this.add, 0) +
            game.board[2].reduce(this.add, 0);
    }

    add(a, b) {
        if (b == 1) {
            return a + b;
        } else {
            return a;
        }
    }

    public load(dataPath: string) : Promise<Game[]> {
        return new Promise((good, bad) => {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if(err) {
                    return bad(err);
                }
                let games = JSON.parse(data);
                games.forEach(game => game.startedOn = new Date(game.startedOn));
                this.games = games;
                good(this.games);
            });
        });
    }
}