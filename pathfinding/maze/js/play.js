let state = {
    row: 0,
    col: 0,
    pressedKeys: {
        W: false,
        E: false,
        N: false,
        S: false
    }
};

var keyMap = {
    68: "E",
    65: "W",
    87: "N",
    83: "S"
};

function keydown(event) {
    var key = keyMap[event.keyCode];
    state.pressedKeys[key] = true;
}

function keyup(event) {
    var key = keyMap[event.keyCode];
    state.pressedKeys[key] = false;
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);

function update() {

    let curr_pos = tiles[state.row][state.col];

    for (const [key, value] of Object.entries(state.pressedKeys)) {
        console.log(key, value);
    }



    let x_pos = (state.col * square_size) + 5;
    let y_pos = (state.row * square_size) + 5;
    let size = square_size - 10;

    ctx.fillStyle = "#00ff00"
    ctx.fillRect(x_pos, y_pos, size, size);
}