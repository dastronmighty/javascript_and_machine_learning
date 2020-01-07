let state = {
    rows: 0,
    columns: 0,
    square_size: 0,
    chance: 0,
    play: false,
    ai_row: 0,
    ai_col: 0,
    tiles: [],
    tree: null,
    bfs_path: []
};

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";

let maze_gen_button = document.getElementById("gen_maz_but");
let play_button = document.getElementById("play_btn");
let sqr_size_in = document.getElementById("sqr_size");
let row_amt_in = document.getElementById("row_amt");
let col_amt_in = document.getElementById("col_amt");
let passage_chance_in = document.getElementById("passage_chance");

sqr_size_in.value = 15;
row_amt_in.value = 40;
col_amt_in.value = 60;
passage_chance_in.value = 0.008;

function change_size() {
    state.square_size = parseInt(sqr_size_in.value);
    state.rows = parseInt(row_amt_in.value);
    state.columns = parseInt(col_amt_in.value)
    let width = state.columns * state.square_size;
    let height = state.rows * state.square_size;
    canvas.width = width;
    canvas.height = height;
}

const reset_ai = () => {
    state.ai_col = 0;
    state.ai_row = 0;
}

function generate_maze() {
    state.chance = passage_chance_in.value
    change_size();
    state.play = false;
    reset_ai();
    state.tiles = create_maze_tiles(state);
    state.tree = create_node_tree(state.tiles[0][0], state.tiles, [], []);
    state.bfs_path = breadth_first_path(state.tree);
    draw_maze();
}

maze_gen_button.addEventListener("click", generate_maze);

function press_play() {
    reset_ai();
    state.bfs_path = breadth_first_path(state.tree);
    state.play = true;
}

play_button.addEventListener("click", press_play);

function loop() {
    clearCanvas();
    draw_maze();
    if (state.play) {
        update();
    }
}

setInterval(loop, 100);