const player = (name, tile) => {
    
    const getName = () => {
        return name;
    }

    const getTile = () => {
        return tile;
    }

    return {
        getName, 
        getTile
    };
};

const gameBoard = (() => {

    let _board = [
        '','','',
        '','','',
        '','','',
    ];

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
            console.log(e.target.dataset.index);
            let dataIndex = e.target.dataset.index;
            gameBoard.setTile(dataIndex,'O');
            drawTile();
        })
    })

    const drawTile = () => {
        for (let i = 0; i < 9; i++) {
            cell[i].textContent = gameBoard.getTile(i);
        }
    }


    return {
        drawTile
    }
})();

 const gameMaster = (() => {
    const playerOne = player('Scottie', 'X');
    const playerTwo = player('OG', 'O');

    
 })();