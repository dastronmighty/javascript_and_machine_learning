function node_visited(node) {
  let ret = false;
  state.search_nodes_visited.forEach(pos => {
    if (pos.node.row == node.node.row && pos.node.col == node.node.col) {
      ret = true;
    }
  });
  return ret;
}

function manhattan_distance(tile) {
  let col_dist = Math.abs(state.goal_col - tile.node.col);
  let row_dist = Math.abs(state.goal_row - tile.node.row);
  let distance = col_dist + row_dist;
  return distance;
}

function greedy_best_selection() {
  let lowest = state.columns + state.rows;
  console.log("lowest = " + lowest);

  let index = 0;

  for (let idx = 0; idx < state.search_nodes_fringe.length; idx++) {
    console.log("man... dist for node");
    console.log(state.search_nodes_fringe[idx]);
    let dist = manhattan_distance(state.search_nodes_fringe[idx]);
    console.log(dist);

    if (dist < lowest) {
      lowest = dist;
      index = idx;
    }
  }
  let node = state.search_nodes_fringe.splice(index, 1)[0];

  return node;
}

function breadth_first_search() {
  if (!state.search_complete) {
    if (state.search_nodes_fringe.length > 0) {
      let curr_node = state.search_nodes_fringe.shift();
      if (!node_visited(curr_node)) {
        state.search_nodes_visited.push(curr_node);
        if (
          curr_node.node.row == state.goal_row &&
          curr_node.node.col == state.goal_col
        ) {
          let path = curr_node.parents.slice(0);
          path.push(curr_node.node);
          state.path = path;
          state.search_complete = true;
        }
        curr_node.children.forEach(child => {
          state.search_nodes_fringe.push(child);
        });
      }
    }
  }
}

function depth_first_search() {
  if (!state.search_complete) {
    if (state.search_nodes_fringe.length > 0) {
      let curr_node = state.search_nodes_fringe.pop();
      if (!node_visited(curr_node)) {
        state.search_nodes_visited.push(curr_node);
        if (
          curr_node.node.row == state.goal_row &&
          curr_node.node.col == state.goal_col
        ) {
          let path = curr_node.parents.slice(0);
          path.push(curr_node.node);
          state.path = path;
          state.search_complete = true;
        }
        curr_node.children.forEach(child => {
          state.search_nodes_fringe.push(child);
        });
      }
    }
  }
}

function greedy_best_first_search() {
  if (!state.search_complete) {
    if (state.search_nodes_fringe.length > 0) {
      let curr_node = greedy_best_selection();

      if (!node_visited(curr_node)) {
        state.search_nodes_visited.push(curr_node);
        if (
          curr_node.node.row == state.goal_row &&
          curr_node.node.col == state.goal_col
        ) {
          let path = curr_node.parents.slice(0);
          path.push(curr_node.node);
          state.path = path;
          state.search_complete = true;
        }
        curr_node.children.forEach(child => {
          state.search_nodes_fringe.push(child);
        });
      }
    }
  }
}
