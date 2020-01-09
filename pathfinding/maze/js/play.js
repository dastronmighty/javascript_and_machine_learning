function draw_path() {
    state.path.forEach(pos => {
        draw_square_from_pos(pos, "#00b300");
    });
}

function draw_visited() {
    state.search_nodes_visited.forEach(node => {
        draw_square_from_pos(node.node, "#e6e600");
    })
}

function draw_fringe() {
    state.search_nodes_fringe.forEach(node => {
        draw_square_from_pos(node.node, "#ffffff");
    })
}

function update() {
    draw_visited();
    draw_fringe();
    if (state.search_complete) {
        draw_path();
    } else {
        if (state.search_type === "BFS") {
            breadth_first_search();
        } else if (state.search_type === "DFS") {
            depth_first_search();
        } else if (state.search_type === "GBF") {
            greedy_best_first_search();
        }
    }
}