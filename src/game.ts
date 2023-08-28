

export type GameStatus = 'RUNNING' | 'PENDING' | 'FINISHED'

export type Game = {
    status: GameStatus,
    players: string[],
    words: string[],
    questions: string[],
    id: number
}

// just have one game at a time in this singleton
let game: Game = {status: 'PENDING', players: [], words: [], questions: [], id: 0};

export function addPlayer(player: string): true | string {
    if (game.status == 'PENDING') {
        game.players.push(player);
        return true;
    } else {
        return 'Cannot add player to in-progress or finished game.'
    }
}

function startGame(): true | string {
    // assign partners to all players
    if (~(game.players.length % 2)) {
        return 'Cannot start game with odd number of players.';
    }

    // assign words to partnerships

    // done!
    game.status = 'RUNNING';
    return true;
}

function getWordForPlayer(player: string): string {

}

function getPartnerForPlayer(player: string) {

}

