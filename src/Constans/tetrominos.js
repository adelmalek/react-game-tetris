const TETROMINOS = {
    I : [
            [ 
                [1, 1, 1, 1]
            ], 
            [ 
                [1], 
                [1],
                [1], 
                [1] 
            ]
    ],
    O : [
            [ 
                [1, 1], 
                [1, 1]
            ]
    ],
    S : [
            [ 
                [0, 1, 1], 
                [1, 1, 0] 
            ], 
            [ 
                [1, 0], 
                [1, 1], 
                [0, 1] 
            ]
    ],
    Z : [
            [ 
                [1, 1, 0], 
                [0, 1, 1] 
            ], 
            [ 
                [0, 1], 
                [1, 1], 
                [1, 0] 
            ]
    ],
    L : [
            [ 
                [1, 0], 
                [1, 0], 
                [1, 1] 
            ], 
            [ 
                [1, 1, 1], 
                [1, 0, 0] 
            ], 
            [ 
                [1, 1], 
                [0, 1], 
                [0, 1] 
            ], 
            [ 
                [0, 0, 1], 
                [1, 1, 1] 
            ]
    ],
    J : [
            [ 
                [0, 1], 
                [0, 1], 
                [1, 1] 
            ], 
            [ 
                [1, 0, 0],
                [1, 1, 1] 
            ], 
            [ 
                [1, 1], 
                [1, 0], 
                [1, 0] 
            ], 
            [ 
                [1, 1, 1], 
                [0, 0, 1] 
            ]
    ],
    T : [
            [ 
                [1, 1, 1], 
                [0, 1, 0] 
            ], 
            [ 
                [0, 1], 
                [1, 1], 
                [0, 1] 
            ], 
            [ 
                [0, 1, 0], 
                [1, 1, 1] 
            ], 
            [ 
                [1, 0], 
                [1, 1], 
                [1, 0] 
            ]
    ]
}

export default TETROMINOS;