function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

function drawLine(start_x, start_y, end_x, end_y) {
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(end_x, end_y);
    ctx.stroke();
}

function drawCell(tile) {
    tile.walls.forEach(wall => {
        if (wall.pos == "N") {
            drawLine(tile.pos.x, tile.pos.y, tile.pos.x + square_size, tile.pos.y);
        }
        if (wall.pos == "S") {
            drawLine(tile.pos.x,
                tile.pos.y + square_size,
                tile.pos.x + square_size,
                tile.pos.y + square_size
            );
        }
        if (wall.pos == "E") {
            drawLine(tile.pos.x + square_size,
                tile.pos.y,
                tile.pos.x + square_size,
                tile.pos.y + square_size
            );
        }
        if (wall.pos == "W") {
            drawLine(tile.pos.x, tile.pos.y, tile.pos.x, tile.pos.y + square_size);
        }
    });
}

function draw_maze() {
    ctx.strokeStyle = "black";
    tiles.forEach(row => {
        row.forEach(tile => {
            drawCell(tile);
        });
    });
}