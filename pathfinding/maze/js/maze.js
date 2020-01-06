function get_wall_neighbour(wall, tiles, rows, cols) {
    let row = wall.row;
    let col = wall.col;
    switch (wall.pos) {
        case "N":
            row -= 1;
            break;
        case "S":
            row += 1;
            break;
        case "E":
            col += 1;
            break;
        case "W":
            col -= 1;
            break;
    }
    neighbour = null;
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
        neighbour = tiles[row][col];
    }
    return neighbour;
}

function remove_neighbour_connection(tile, wall) {
    let new_tile = tile;

    let splice_idx = -1;
    for (let index = 0; index < new_tile.walls.length; index++) {
        if (
            (wall.pos == "N" && new_tile.walls[index].pos == "S") ||
            (wall.pos == "S" && new_tile.walls[index].pos == "N") ||
            (wall.pos == "E" && new_tile.walls[index].pos == "W") ||
            (wall.pos == "W" && new_tile.walls[index].pos == "E")
        ) {
            splice_idx = index;
        }
    }
    if (splice_idx != -1) {
        new_tile.passage.push(new_tile.walls.splice(splice_idx, 1)[0]);
    }
    return new_tile;
}

function neighbour_visited(neighbour, maze) {
    let ret = false;
    maze.forEach(tile => {
        if (
            tile.pos.row == neighbour.pos.row &&
            tile.pos.col == neighbour.pos.col
        ) {
            ret = true;
        }
    });
    return ret;
}

function remove_walls_from_maze(maze, neighbour, wall) {
    let mod_maze = maze;

    for (let index = 0; index < mod_maze.length; index++) {
        if (
            mod_maze[index].pos.row == wall.row &&
            mod_maze[index].pos.col == wall.col
        ) {
            let splice_idx = -1;

            for (
                let wall_index = 0; wall_index < mod_maze[index].walls.length; wall_index++
            ) {
                if (
                    (wall.pos == "N" && mod_maze[index].walls[wall_index].pos == "N") ||
                    (wall.pos == "S" && mod_maze[index].walls[wall_index].pos == "S") ||
                    (wall.pos == "E" && mod_maze[index].walls[wall_index].pos == "E") ||
                    (wall.pos == "W" && mod_maze[index].walls[wall_index].pos == "W")
                ) {
                    splice_idx = wall_index;
                }
            }

            if (splice_idx != -1) {
                mod_maze[index].passage.push(mod_maze[index].walls.splice(splice_idx, 1)[0]);
            }
        }
    }
    mod_maze.push(remove_neighbour_connection(neighbour, wall));

    return mod_maze;
}

function chop_new_passages(maze, rows, columns) {
    let new_maze = maze;

    let new_passages = Math.floor((rows * columns) * 0.1);

    let ind = 0;
    while (ind != new_passages) {

        let chp_row = Math.floor((Math.random() * (rows - 2))) + 1;
        let chp_col = Math.floor((Math.random() * (columns - 2))) + 1;

        let len = new_maze[chp_row][chp_col].walls.length;
        if ((len > 1 && columns < 8 && rows < 8) || len > 2) {
            let chp_wall_num = Math.floor(Math.random() * len);
            let chp_wall = new_maze[chp_row][chp_col].walls.splice(chp_wall_num, 1)[0];
            new_maze[chp_row][chp_col].passage.push(chp_wall);


            let chp_wall_2_row = chp_wall.row;
            let chp_wall_2_col = chp_wall.col;

            switch (chp_wall.pos) {
                case "N":
                    chp_wall_2_row = chp_wall_2_row - 1;
                    break;
                case "S":
                    chp_wall_2_row = chp_wall_2_row + 1;
                    break;
                case "E":
                    chp_wall_2_col = chp_wall_2_col + 1;
                    break;
                case "W":
                    chp_wall_2_col = chp_wall_2_col - 1;
                    break;
            }

            chp_wall_2_idx = -1;

            for (let index = 0; index < new_maze[chp_wall_2_row][chp_wall_2_col].walls.length; index++) {
                if (new_maze[chp_wall_2_row][chp_wall_2_col].walls[index].pos == "S" && chp_wall.pos == "N") {
                    chp_wall_2_idx = index
                } else if (new_maze[chp_wall_2_row][chp_wall_2_col].walls[index].pos == "N" && chp_wall.pos == "S") {
                    chp_wall_2_idx = index
                } else if (new_maze[chp_wall_2_row][chp_wall_2_col].walls[index].pos == "W" && chp_wall.pos == "E") {
                    chp_wall_2_idx = index
                } else if (new_maze[chp_wall_2_row][chp_wall_2_col].walls[index].pos == "E" && chp_wall.pos == "W") {
                    chp_wall_2_idx = index
                }
            }

            let chp_wall_2 = new_maze[chp_wall_2_row][chp_wall_2_col].walls.splice(chp_wall_2_idx, 1)[0];
            new_maze[chp_wall_2_row][chp_wall_2_col].passage.push(chp_wall_2);

            ind += 1;
        }

    }

    return new_maze;
}

function create_maze_tiles(rows, columns) {
    let new_tiles = create_tile_grid(rows, columns);
    let walls = [];
    let maze_list = [];
    const start_row = Math.floor(Math.random() * rows);
    const start_column = Math.floor(Math.random() * columns);

    let init_tile = new_tiles[start_row][start_column];
    maze_list.push(init_tile);
    walls = walls.concat(init_tile.walls);

    while (walls.length != 0) {
        let curr_wall_loc = Math.floor(Math.random() * walls.length);
        let curr_wall = walls[curr_wall_loc];
        let neighbour = get_wall_neighbour(curr_wall, new_tiles, rows, columns);
        if (neighbour != null) {
            if (!neighbour_visited(neighbour, maze_list)) {
                walls = walls.concat(neighbour.walls);
                maze_list = remove_walls_from_maze(maze_list, neighbour, curr_wall);
            }
        }
        walls.splice(curr_wall_loc, 1);
    }

    let maze = create_null_grid(rows, columns);

    while (maze_list.length != 0) {
        tile = maze_list.pop();
        maze[tile.pos.row][tile.pos.col] = tile;
    }

    maze = chop_new_passages(maze, rows, columns);

    return maze;
}