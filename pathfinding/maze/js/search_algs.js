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