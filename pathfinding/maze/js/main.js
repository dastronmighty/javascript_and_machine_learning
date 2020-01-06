let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let square_size = 0;
let rows = 0;
let columns = 0;
let width = columns * square_size;
let height = rows * square_size;
canvas.width = width;
canvas.height = height;
let play = false;

let tiles = [];

let maze_gen_button = document.getElementById("gen_maz_but");
let sqr_size_in = document.getElementById("sqr_size");
let row_amt_in = document.getElementById("row_amt");
let col_amt_in = document.getElementById("col_amt");
sqr_size_in.value = 15;
row_amt_in.value = 30;
col_amt_in.value = 30;

let play_btn = document.getElementById("play_btn");

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

let current_ai_position = null

function reset() {
    state.col = 0;
    state.row = 0;
}

function generate_maze() {

    square_size = parseInt(sqr_size_in.value);
    rows = parseInt(row_amt_in.value);
    columns = parseInt(col_amt_in.value)

    width = columns * square_size;
    height = rows * square_size;
    canvas.width = width;
    canvas.height = height;

    tiles = create_maze_tiles(rows, columns);
    play = false;
    reset();
}

maze_gen_button.addEventListener("click", generate_maze);

play_btn.addEventListener("click", e => {
    play = true;
    reset();
    current_ai_position = tiles[state.row][state.col];

});

function loop() {
    clearCanvas();
    draw_maze();
    if (play) {
        update();
    }
}




setInterval(loop, 1);