const gameBoard = (() => {
    const player = (name, mark, turn) => {
        return {name, mark, turn};
    };
    
    const playerOne = player('Scottie', 'X', true);
    const playerTwo = player('OG', 'O', false);

    let round = 1;

    let _board = [
        '','','',
        '','','',
        '','',''
    ];

    const checkWin = ()

    const setTile = (index, tile) => {
        _board[index] = tile;
    }

    const getTile = (index) => {
        return _board[index];
    }

    const clearBoard = () => {
        for (let i = 0; i < _board.length; i++) {
            _board[i] = '';
        }
    }

    return {
        setTile,
        getTile,
        clearBoard
    }
})();

const displayController = (() => {
    const cell = document.querySelectorAll('.cell');
    const displayResult = document.querySelector('.game-result');

    // Listen for player choice and get cell index
    cell.forEach(box => {
        box.addEventListener('click', (e) => {
            // gameBoard.setTile(e.target.dataset.index, 'X');
            console.log(e.target.dataset.index)
            updatTiles();  
        })
    })

    const updatTiles = () => {
        for (let i = 0; i < 9; i++) {
            cell[i].textContent = gameBoard.getTile(i);
        }
    }

    return {
        updatTiles
    }
})();