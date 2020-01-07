let path = [];

function draw_path() {
    path.forEach(pos => {
        draw_square_from_pos(pos, "#00b300");
    });
    if (state.path.length > 0) {
        let new_pos = state.path.shift();
        path.push(new_pos);
    }
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
        breadth_first_search();
    }
}