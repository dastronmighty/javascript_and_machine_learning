function update_ai_path() {
    if (state.bfs_path.length > 0) {
        let new_ai_pos = state.bfs_path.shift();
        state.ai_row = new_ai_pos.row;
        state.ai_col = new_ai_pos.col;
    }

}

function update() {
    ctx.fillStyle = "#00ff00";
    let ai_x = (state.ai_col * state.square_size) + 1;
    let ai_y = (state.ai_row * state.square_size) + 1;
    let ai_size = state.square_size - 2;
    ctx.fillRect(ai_x, ai_y, ai_size, ai_size);
    update_ai_path();
}