const gameBoard = (() => {
    const _player = (name, mark) => {
        return {name, mark};
    };
    
    // Initialize players for now
    const scottie = _player('Scottie', 'X');
    const og = _player('OG', 'O');

    // Round counter to check for which players turn it is and if it ends in a draw
    let round = 1;

    // Empty board for start
    let _board = [
        '','','',
        '','','',
        '','',''
    ];

    const winCons = [
        [0, 1, 2], // Horizontal wins
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Vertical wins
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6], // Diagonal wins
        [0, 4, 8]
    ];

    // Sets plays the current round 
    const playRound = (currentIndex) => {
        console.log(checkWin());
        if(checkWin()) {
            gameBoard.setTile(currentIndex, _currentPlayerMark());
            displayController.updateEndWin();
        }
        else if(round === 9) {
            gameBoard.setTile(currentIndex, _currentPlayerMark());
            displayController.updateEndDraw();
        } else {
            gameBoard.setTile(currentIndex, _currentPlayerMark());
            round++;
        }
    }

    // Checks for which players turn it is
    const _currentPlayerMark = () => {
        return round % 2 === 1 ? scottie.mark : og.mark;
    }

    // Check for winner 
    const checkWin = () => {
        return winCons.some((combination) => {
            combination.every((i) => {
                getTile(i) === _currentPlayerMark;
            });
          });
    }

    // Sets mark on tile
    const setTile = (index, tile) => {
        _board[index] = tile;
    }
    
    // Gets curent mark on a specific tile
    const getTile = (index) => {
        return _board[index];
    }

    // Empty board for reset
    const resetGame = () => {
        for (let i = 0; i < _board.length; i++) {
            _board[i] = '';
        }
        round = 1;
    }

    return {
        setTile,
        getTile,
        resetGame,
        playRound
    }
})();

const displayController = (() => {
    const cell = document.querySelectorAll('.cell');
    const displayResult = document.querySelector('.game-result');
    const resetBtn = document.querySelector('button');

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

    resetBtn.addEventListener('click', () => {
        gameBoard.resetGame();
        updateTiles();
        displayResult.textContent = 'hello';
    });

    // Updates and populates the board with the current player marks
    const updateTiles = () => {
        for (let i = 0; i < 9; i++) {
            cell[i].textContent = gameBoard.getTile(i);
        }
    }

    // Update display for winner or if it's a draw
    const updateEndDraw = () => {
        displayResult.textContent = "It's a draw!";
    }

    const updateEndWin = () => {
        displayResult.textContent = "Someone won";
    }

    return {
        updateTiles,
        updateEndDraw,
        updateEndWin
    }
})();