function fresh_tile(x, y, row, col) {
    return {
        pos: {
            x: x,
            y: y,
            row: row,
            col: col
        },
        walls: [{
                pos: "N",
                row: row,
                col: col
            },
            {
                pos: "S",
                row: row,
                col: col
            },
            {
                pos: "E",
                row: row,
                col: col
            },
            {
                pos: "W",
                row: row,
                col: col
            }
        ],
        passage: []
    };
}

function create_tile_grid(rows, columns, sqr_size) {
    let tile_list = [];
    for (let i = 0; i < rows; i++) {
        row_list = [];
        for (let j = 0; j < columns; j++) {
            let x_pos = j * sqr_size;
            let y_pos = i * sqr_size;
            row_list.push(fresh_tile(x_pos, y_pos, i, j));
        }
        tile_list.push(row_list);
    }
    return tile_list;
}

function create_null_grid(rows, columns) {
    let tile_list = [];
    for (let i = 0; i < rows; i++) {
        row_list = [];
        for (let j = 0; j < columns; j++) {
            row_list.push(null);
        }
        tile_list.push(row_list);
    }
    return tile_list;
}