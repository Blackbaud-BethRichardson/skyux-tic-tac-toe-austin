export class GameStartRequest {
    humanPlayerFirst: boolean;

    constructor(humanPlayerFirst: boolean) {
        this.humanPlayerFirst = humanPlayerFirst;
    }
}