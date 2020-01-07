function clearCanvas() {
    ctx.clearRect(0, 0, (state.columns * state.square_size), (state.rows * state.square_size));
}

function drawLine(start_x, start_y, end_x, end_y) {
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(end_x, end_y);
    ctx.stroke();
}

function drawCell(tile) {
    tile.walls.forEach(wall => {
        switch (wall.pos) {
            case "N":
                drawLine(tile.pos.x, tile.pos.y, tile.pos.x + state.square_size, tile.pos.y);
                break;
            case "S":
                drawLine(tile.pos.x,
                    tile.pos.y + state.square_size,
                    tile.pos.x + state.square_size,
                    tile.pos.y + state.square_size
                );
                break;
            case "E":
                drawLine(tile.pos.x + state.square_size,
                    tile.pos.y,
                    tile.pos.x + state.square_size,
                    tile.pos.y + state.square_size
                );
                break;
            case "W":
                drawLine(tile.pos.x, tile.pos.y, tile.pos.x, tile.pos.y + state.square_size);
                break;
        }
    });
}

function draw_maze() {
    if (state.tiles.length > 0) {
        state.tiles.forEach(row => {
            row.forEach(tile => {
                drawCell(tile);
            });
        });
    }
    let goal_x = (state.goal_col) * state.square_size + 1;
    let goal_y = (state.goal_row) * state.square_size + 1;
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(goal_x, goal_y, state.square_size - 2, state.square_size - 2);
}