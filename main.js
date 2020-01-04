let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const square_size = 10;
const rows = 80;
const columns = 80;
const width = columns * square_size;
const height = rows * square_size;

canvas.width = width;
canvas.height = height;

function fresh_tile(x, y, row, col) {
  return {
    pos: {
      x: x,
      y: y,
      row: row,
      col: col
    },
    walls: [{
        pos: "N",
        row: row,
        col: col
      },
      {
        pos: "S",
        row: row,
        col: col
      },
      {
        pos: "E",
        row: row,
        col: col
      },
      {
        pos: "W",
        row: row,
        col: col
      }
    ]
  };
}

function create_tile_grid(rows, columns) {
  let tile_list = [];
  for (let i = 0; i < rows; i++) {
    row_list = [];
    for (let j = 0; j < columns; j++) {
      let x_pos = j * square_size;
      let y_pos = i * square_size;
      row_list.push(fresh_tile(x_pos, y_pos, i, j));
    }
    tile_list.push(row_list);
  }
  return tile_list;
}

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
    new_tile.walls.splice(splice_idx, 1);
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
        mod_maze[index].walls.splice(splice_idx, 1);
      }
    }
  }
  mod_maze.push(remove_neighbour_connection(neighbour, wall));

  return mod_maze;
}

function create_maze_tiles(rows, columns) {
  let new_tiles = create_tile_grid(rows, columns);
  let walls = [];
  let maze = [];
  const start_row = Math.floor(Math.random() * rows);
  const start_column = Math.floor(Math.random() * columns);

  let init_tile = new_tiles[start_row][start_column];
  maze.push(init_tile);
  walls = walls.concat(init_tile.walls);

  while (walls.length != 0) {
    let curr_wall_loc = Math.floor(Math.random() * walls.length);
    let curr_wall = walls[curr_wall_loc];
    let neighbour = get_wall_neighbour(curr_wall, new_tiles, rows, columns);
    if (neighbour != null) {
      if (!neighbour_visited(neighbour, maze)) {
        walls = walls.concat(neighbour.walls);
        maze = remove_walls_from_maze(maze, neighbour, curr_wall);
      }
    }
    walls.splice(curr_wall_loc, 1);
  }
  return maze;
}

let tiles = create_maze_tiles(rows, columns);
console.log(tiles);

function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
}

function drawLine(start_x, start_y, end_x, end_y) {
  ctx.beginPath();
  ctx.moveTo(start_x, start_y);
  ctx.lineTo(end_x, end_y);
  ctx.stroke();
}

function drawCell(tile) {
  tile.walls.forEach(wall => {
    if (wall.pos == "N") {
      drawLine(tile.pos.x, tile.pos.y, tile.pos.x + square_size, tile.pos.y);
    }
    if (wall.pos == "S") {
      drawLine(
        tile.pos.x,
        tile.pos.y + square_size,
        tile.pos.x + square_size,
        tile.pos.y + square_size
      );
    }
    if (wall.pos == "E") {
      drawLine(
        tile.pos.x + square_size,
        tile.pos.y,
        tile.pos.x + square_size,
        tile.pos.y + square_size
      );
    }
    if (wall.pos == "W") {
      drawLine(tile.pos.x, tile.pos.y, tile.pos.x, tile.pos.y + square_size);
    }
  });
}

function draw() {
  ctx.strokeStyle = "white";
  tiles.forEach(tile => {
    drawCell(tile);
  });
}

draw();