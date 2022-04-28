const gameBoard = (() => {
    const player = (name, mark, turn) => {
        return {name, mark, turn};
    };
    
    const scottie = player('Scottie', 'X', true);
    const og = player('OG', 'O', false);

    let round = 1;

    let _board = [
        '','','',
        '','','',
        '','',''
    ];

    // Sets plays the current round 
    const playRound = (currentIndex) => {
        if(round === 9) {
            gameBoard.setTile(currentIndex, _currentPlayerMark())
            displayController.updateEndGame();
        } else {
            gameBoard.setTile(currentIndex, _currentPlayerMark())
            round++;
        }
    }

    // Checks for which players turn it is
    const _currentPlayerMark = () => {
        return round % 2 === 1 ? scottie.mark : og.mark;
    }


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
        clearBoard,
        playRound
    }
})();

const displayController = (() => {
    const cell = document.querySelectorAll('.cell');
    const displayResult = document.querySelector('.game-result');

    // Listen for player choice and get cell index
    cell.forEach(box => {
        box.addEventListener('click', (e) => {
            if(e.target.textContent === '') {
                gameBoard.playRound(e.target.dataset.index)
                console.log(e.target.dataset.index)
                updateTiles();  
            }
        })
    })

    // Updates and populates the board with the current player marks
    const updateTiles = () => {
        for (let i = 0; i < 9; i++) {
            cell[i].textContent = gameBoard.getTile(i);
        }
    }

    // Update display for winner or if it's a draw
    const updateEndGame = () => {
        displayResult.textContent = "It's a draw!";
    }

    return {
        updateTiles,
        updateEndGame
    }
})();