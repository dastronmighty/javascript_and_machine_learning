let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";

let maze_gen_button = document.getElementById("gen_maz_but");
let play_button = document.getElementById("play_btn");
let sqr_size_in = document.getElementById("sqr_size");
let row_amt_in = document.getElementById("row_amt");
let col_amt_in = document.getElementById("col_amt");
let passage_chance_in = document.getElementById("passage_chance");

let goal_row_in = document.getElementById("goal_r");
let goal_col_in = document.getElementById("goal_c");

sqr_size_in.value = 20;
row_amt_in.value = 20;
col_amt_in.value = 40;
passage_chance_in.value = 0.01;
goal_row_in.value = row_amt_in.value - 1
goal_col_in.value = col_amt_in.value - 1


function change_desc() {
    state.square_size = parseInt(sqr_size_in.value);
    state.rows = parseInt(row_amt_in.value);
    state.columns = parseInt(col_amt_in.value);
    goal_row_in.value = row_amt_in.value - 1
    goal_col_in.value = col_amt_in.value - 1

    state.goal_row = parseInt(goal_row_in.value);
    state.goal_col = parseInt(goal_col_in.value);

    state.chance = parseFloat(passage_chance_in.value);

    canvas.width = (state.columns * state.square_size);
    canvas.height = (state.rows * state.square_size);
}

const reset_ai = () => {
    state.goal_row = parseInt(goal_row_in.value);
    state.goal_col = parseInt(goal_col_in.value);
    state.path = breadth_first_path(state.tree);

    state.search_nodes_fringe = [];
    state.search_nodes_visited = [];
    state.search_complete = false;
    state.search_nodes_fringe.push(state.tree)
}

function generate_maze() {
    state.chance = passage_chance_in.value
    change_desc();
    state.play = false;
    state.tiles = create_maze_tiles(state);
    state.tree = create_node_tree(state.tiles[0][0], state.tiles, [], []);
    reset_ai();
    draw_maze();
}

maze_gen_button.addEventListener("click", generate_maze);

function press_play() {
    reset_ai();
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

setInterval(loop, 1);