import { Game } from './Game';

export class GamesListResponse {
    constructor(public games: Game[]) {
    }
}