export const isWinner = (gameBoard, currentMove, currPlayer) => {
    let board = [...gameBoard];
    board[currentMove] = currPlayer;

    const winPos = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12],
    ];

    for(let i = 0; i < winPos.length; i++){
        const [c1, c2, c3, c4] = winPos[i];

        if(board[c1] > 0 && board[c1] === board[c2] && board[c2] === board[c3] && board[c3] === board[c4]){
            return true;
        }

    }

    return false;
}

export const isDraw = (gameBoard, currentMove, currPlayer) => {
    let board = [...gameBoard];
    board[currentMove] = currPlayer;

    for(let i = 0; i<board.length; i++){
        if(board[i] === 0){
            return false;
        }
    }

    return true;
}

const getRandomMove = (gameBoard) => {
    let validMoves = [];

    for(let i = 0; i<gameBoard.length; i++){
        if(gameBoard[i] === 0){
            validMoves.push(i);
        }
    }

    let rndMove = Math.floor(Math.random() * validMoves.length);
    return validMoves[rndMove];
} 

const getPosition = (gameBoard, moveChecks) => {
    for (let check = 0; check < moveChecks.length; check++) {
       
        for (let i = 0; i < moveChecks[check].max; i += moveChecks[check].step) {
            let series =
                gameBoard[i + moveChecks[check].indexes[0]].toString() +
                gameBoard[i + moveChecks[check].indexes[1]].toString() +
                gameBoard[i + moveChecks[check].indexes[2]].toString() +
                gameBoard[i + moveChecks[check].indexes[3]].toString();

            switch (series) {
                case "1110":
                case "2220":
                    return i + moveChecks[check].indexes[3];
                case "1101":
                case "2202":
                    return i + moveChecks[check].indexes[2];
                case "1011":
                case "2022":
                    return i + moveChecks[check].indexes[1];
                case "0111":
                case "0222":
                    return i + moveChecks[check].indexes[0];
                default:
            }
        }
    }
    return -1;
};

export const getComputerMove = (gameBoard) => {
    let moveChecks = [
        // vertical
        {
            indexes: [0, 4, 8, 12],
            max: 4,
            step: 1,
        },
        // horizontal
        {
            indexes: [0, 1, 2, 3],
            max: 16,
            step: 4,
        },
        // primary diagonal
        {
            indexes: [0, 5, 10, 15],
            max: 16,
            step: 16,
        },
        // secondary diagonal
        {
            indexes: [3, 6, 9, 12],
            max: 16,
            step: 16,
        }
    ];
    let position = getPosition(gameBoard, moveChecks);

    if(position !== -1) return position;
    return getRandomMove(gameBoard);
}