function breadth_first_path(tree) {
  let q = [];
  q.push(tree);
  while (q.length > 0) {
    let v = q.shift();
    if ((v.node.row == state.goal_row) && (v.node.col == state.goal_col)) {
      let path = v.parents.slice(0);
      path.push(v.node);
      return path;
    }
    v.children.forEach(child => {
      q.push(child);
    })
  }
  return null;
}

function breadth_first_search() {
  if (!state.search_complete) {
    if (state.search_nodes_fringe.length > 0) {
      let curr_node = state.search_nodes_fringe.shift();
      state.search_nodes_visited.push(curr_node);
      if ((curr_node.node.row == state.goal_row) && (curr_node.node.col == state.goal_col)) {
        state.search_complete = true;
      }
      curr_node.children.forEach(child => {
        state.search_nodes_fringe.push(child);
      });
    }
  }
}