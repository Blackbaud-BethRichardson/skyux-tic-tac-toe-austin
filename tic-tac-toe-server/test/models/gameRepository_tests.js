let should = require('should');
let GameRepository = require('../../api/models/gameRepository').GameRepository;
let MoveInstruction = require('../../api/models/MoveInstruction').MoveInstruction;
let Game = require('../../api/models/Game').Game;
let path = require('path');
let fs = require('fs');

describe("GameRepository", () => {
    it("should return a list with 10 items", () => {
        let gameRepo = new GameRepository();
        gameRepo.games.should.have.lengthOf(0);
    });

    it("should allow you to add a new game", () => {
        let gameRepo = new GameRepository();
        gameRepo.createGame(true);
        gameRepo.games.should.have.lengthOf(1);
    });

    it("should allow you to add a new game", () => {
        let gameRepo = new GameRepository();
        let game = gameRepo.createGame(true);
        game.humanPlayerFirst.should.be.true;
        game.id.should.equal(gameRepo.currentId - 1);
    });

    it("should allow you to add a new game", () => {
        let gameRepo = new GameRepository();
        let game = gameRepo.createGame(false);
        game.humanPlayerFirst.should.be.false;

        game.id.should.equal(gameRepo.currentId - 1);
    });

    it("should allow you to delete a game by id", () => {
        let gameRepo = new GameRepository();
        let game = gameRepo.createGame(false);
        gameRepo.removeGame(game.id);
        gameRepo.games.should.have.lengthOf(0);
        should(gameRepo.getGameWithId(game.id)).not.be.ok();
    });

    it("will not update a value already entered in board", () => {
        let gameRepo = new GameRepository();
        let game = gameRepo.createGame(true);

        let move = new MoveInstruction(1, 1);

        gameRepo.updateGame(game, move);
        game.board[1][1].should.equal(1);

        gameRepo.makeComputerMove(game, move);
        game.board[1][1].should.equal(1);
    });

    it("should allow you to update a game for human first", () => {
        let gameRepo = new GameRepository();
        let game = gameRepo.createGame(true);

        let move = new MoveInstruction(1, 1);

        gameRepo.updateGame(game, move);
        game.board[1][1].should.equal(1);

        let move2 = new MoveInstruction(1, 2);
        gameRepo.updateGame(game, move2);
        game.board[2][1].should.equal(1);
    });

    it("should create a first move on a game for human not first", () => {
        let gameRepo = new GameRepository();
        let game = gameRepo.createGame(false);
        let move = new MoveInstruction(1, 1);
        gameRepo.updateGame(game, move);

        let sum = gameRepo.figureOutNumberOfTurns(game);

        sum.should.equal(2);
    });

    it('should load saved games', done => {
        let data = [new Game(1, true), new Game(2, false)];
        let dataPath = path.join(__dirname, 'games.dat');
        fs.writeFileSync(dataPath, JSON.stringify(data), 'utf8');

        let repo = new GameRepository();
        repo
            .load(dataPath)
            .then(() => {
                let games = repo.list();
                games.should.deepEqual(data);
                done();
            })
            .catch( err => {

            })

    });


});