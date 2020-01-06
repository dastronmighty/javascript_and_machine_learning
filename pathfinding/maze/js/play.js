let neighbors = [];

function depth_first_ai_search() {
    if (!(current_ai_position.pos.row == (rows - 1) && current_ai_position.pos.col == (columns - 1))) {
        let neighbors = [];
        current_ai_position.passage.forEach(path => {
            new_tile = null;

            switch (path.pos) {
                case "N":
                    new_tile = tiles[state.row - 1][state.col];
                    break;
                case "S":
                    new_tile = tiles[state.row + 1][state.col];
                    break;
                case "E":
                    new_tile = tiles[state.row][state.col + 1];
                    break;
                case "W":
                    new_tile = tiles[state.row][state.col - 1];
                    break;
            }

            neighbors.push(new_tile);
        });
        current_ai_position = neighbors[Math.floor(Math.random() * neighbors.length)];
    }
}

function pos_to_state() {
    state.row = current_ai_position.pos.row;
    state.col = current_ai_position.pos.col;
}

function update() {

    let x_pos = state.col * square_size + 1;
    let y_pos = state.row * square_size + 1;
    let size = square_size - 2;
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(x_pos, y_pos, size, size);

    depth_first_ai_search();
    pos_to_state();
}