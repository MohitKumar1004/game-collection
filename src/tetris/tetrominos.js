export const TETROMINOS = {
    // Example Tetrominos (col-1,row-1)
    //     ||
    0: {
        shape: [[0]],
        color: '0, 0, 0'
    },
    // Vertical Pole Tetrominos (col-4,row-4)
    //      _   ||   _    _
    //      _   ||   _    _
    //      _   ||   _    _
    //      _   ||   _    _
    I: {
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        color: '80, 227, 230'
    },
    // Reverse L Tetrominos (col-3,row-3)
    //      _   ||   _
    //      _   ||   _
    //     ||   ||   _
    J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0]
        ],
        color: '36, 95, 223'
    },
    // L Tetrominos (col-3,row-3)
    //      _   ||   _
    //      _   ||   _
    //      _   ||  ||
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L']
        ],
        color: '223, 173, 36'
    },
    // Small Box Tetrominos (col-2,row-2)
    //     ||   ||
    //     ||   ||
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O']
        ],
        color: '223, 217, 36'
    },
    // S Tetrominos (col-3,row-3)
    //      _   ||  ||
    //     ||   ||   _
    //      _    _   _
    S: {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0]
        ],
        color: '48, 211, 56'
    },
    // T Tetrominos (col-3,row-3)
    //      _   ||   _
    //     ||   ||  ||
    //      _    _   _
    T: {
        shape: [
            [0, 'T', 0],
            ['T', 'T', 'T'],
            [0, 0, 0]
        ],
        color: '132, 61, 198'
    },
    // Z Tetrominos (col-3,row-3)
    //     ||   ||   _
    //      _   ||   _
    //      _   ||  ||
    Z: {
        shape: [
            ['T', 'T', 0],
            [0, 'T', 0],
            [0, 'T', 'T']
        ],
        color: '227, 78, 78'
    },
    // E Tetrominos (col-3,row-3)
    //      _   ||  ||
    //      _   ||   _
    //      _   ||  ||
    E: {
        shape: [
            [0, 'E', 'E'],
            [0, 'E', 0],
            [0, 'E', 'E']
        ],
        color: '22, 78, 78'
    }
}

// Generate a random tetrominos from Object TETROMINOS
export const randomTetrominos = () => {
    const tetrominos = 'IJLOSTZE'
    const randTetrominos = tetrominos[Math.floor(Math.random() * tetrominos.length)]
    return TETROMINOS[randTetrominos]
}