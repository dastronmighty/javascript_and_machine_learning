function tile_visited(tile, visited) {
    ret = false;

    visited.forEach(t => {
        if (t.pos.row == tile.pos.row && t.pos.col == tile.pos.col) {
            ret = true;
        }
    });

    return ret;
}

function create_node_tree(tile, tiles, visited, parents) {
    let new_visited = visited.slice(0);

    let part = {
        parents: parents,
        node: {
            row: tile.pos.row,
            col: tile.pos.col
        },
        children: []
    };

    new_visited.push(tile);

    tile.passage.forEach(pass => {
        let next_row = pass.row;
        let next_col = pass.col;
        switch (pass.pos) {
            case "N":
                next_row = next_row - 1;
                break;
            case "S":
                next_row = next_row + 1;
                break;
            case "E":
                next_col = next_col + 1;
                break;
            case "W":
                next_col = next_col - 1;
                break;
        }

        let new_parents = parents.slice(0);
        new_parents.push(part.node);

        let next = tiles[next_row][next_col];
        if (!tile_visited(next, visited)) {
            part.children.push(create_node_tree(next, tiles, new_visited, new_parents));
        }
    });

    return part;
}