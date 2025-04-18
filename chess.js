document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('chessboard');
    let selectedPiece = null;
    let currentPlayer = 'white';
    let gameState = createInitialBoard();

    // Create the chessboard
    function renderBoard() {
        board.innerHTML = '';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `square ${(row + col) % 2 === 0 ? 'white' : 'black'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                
                const piece = gameState[row][col];
                if (piece) {
                    square.textContent = getPieceSymbol(piece);
                    square.style.color = piece.color === 'white' ? '#fff' : '#000';
                }
                
                square.addEventListener('click', () => handleSquareClick(row, col));
                board.appendChild(square);
            }
        }
    }

    // Handle square clicks
    function handleSquareClick(row, col) {
        const piece = gameState[row][col];
        
        // If no piece is selected and the clicked square has a piece of current player's color
        if (!selectedPiece && piece && piece.color === currentPlayer) {
            selectedPiece = { row, col };
            highlightSquare(row, col, 'selected');
            showPossibleMoves(row, col);
            return;
        }
        
        // If a piece is already selected
        if (selectedPiece) {
            // If clicking on another piece of the same color
            if (piece && piece.color === currentPlayer) {
                clearHighlights();
                selectedPiece = { row, col };
                highlightSquare(row, col, 'selected');
                showPossibleMoves(row, col);
                return;
            }
            
            // Check if the move is valid
            const fromRow = selectedPiece.row;
            const fromCol = selectedPiece.col;
            
            if (isValidMove(fromRow, fromCol, row, col)) {
                // Move the piece
                gameState[row][col] = gameState[fromRow][fromCol];
                gameState[fromRow][fromCol] = null;
                
                // Switch player
                currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
            }
            
            clearHighlights();
            selectedPiece = null;
            renderBoard();
        }
    }

    // Helper functions
    function createInitialBoard() {
        const board = Array(8).fill().map(() => Array(8).fill(null));
        
        // Set up pawns
        for (let col = 0; col < 8; col++) {
            board[1][col] = { type: 'pawn', color: 'black' };
            board[6][col] = { type: 'pawn', color: 'white' };
        }
        
        // Set up other pieces
        const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
        for (let col = 0; col < 8; col++) {
            board[0][col] = { type: pieces[col], color: 'black' };
            board[7][col] = { type: pieces[col], color: 'white' };
        }
        
        return board;
    }

    function getPieceSymbol(piece) {
        const symbols = {
            king: '♔',
            queen: '♕',
            rook: '♖',
            bishop: '♗',
            knight: '♘',
            pawn: '♙'
        };
        return piece.color === 'black' ? symbols[piece.type] : 
               symbols[piece.type].toLowerCase();
    }

    function isValidMove(fromRow, fromCol, toRow, toCol) {
        const piece = gameState[fromRow][fromCol];
        if (!piece) return false;
        
        // Basic pawn movement (simplified)
        if (piece.type === 'pawn') {
            if (piece.color === 'white') {
                // White pawn moves up
                return (fromCol === toCol && fromRow - toRow === 1 && !gameState[toRow][toCol]) ||
                       (fromRow === 6 && fromCol === toCol && fromRow - toRow === 2 && 
                        !gameState[5][toCol] && !gameState[4][toCol]);
            } else {
                // Black pawn moves down
                return (fromCol === toCol && toRow - fromRow === 1 && !gameState[toRow][toCol]) ||
                       (fromRow === 1 && fromCol === toCol && toRow - fromRow === 2 && 
                        !gameState[2][toCol] && !gameState[3][toCol]);
            }
        }
        
        // Add more movement rules for other pieces here...
        return false;
    }

    function highlightSquare(row, col, className) {
        const squares = document.querySelectorAll('.square');
        const index = row * 8 + col;
        squares[index].classList.add(className);
    }

    function showPossibleMoves(row, col) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (isValidMove(row, col, r, c)) {
                    highlightSquare(r, c, 'possible-move');
                }
            }
        }
    }

    function clearHighlights() {
        document.querySelectorAll('.square').forEach(square => {
            square.classList.remove('selected', 'possible-move');
        });
    }

    // Initialize the game
    renderBoard();
});
