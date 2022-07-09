const main = function () {
  const board = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0],
  ];

  printBoard(board);
  const [solution, err] = solve(board);
  if (err == null) {
    console.log("Sudoku board Solution");
    printBoard(solution);
  } else {
    console.log(err);
  }
};

const solve = function (board, error) {
  if (isGameOver(board)) {
    return [board, null];
  }

  const [cell, err] = checkEmpty(board);
  if (err != null) {
    return [board, err];
  }

  for (let val = 1; val < 10; val++) {
    board[cell.x][cell.y] = val;

    if (valid(board, val, cell)) {
      const [sol, err] = solve(board);
      if (err == null) {
        return [sol, null];
      }
    }
    board[cell.x][cell.y] = 0;
  }
  return [board, "Unable to solve game"];
};

const solveBoard = function (board) {
  for (let row = 1; row <= 9; row++) {
    for (let col = 1; col <= 9; col++) {
      if (board[row - 1][col - 1] === 0) {
        for (let value = 1; value < 10; value++) {
          const cell = Pos(row - 1, col - 1);
          if (valid(board, value, cell)) {
            board[cell.x][cell.y] = value;
            solveBoard(board);
            board[cell.x][cell.y] = 0;
          }
        }
        return;
      }
    }
  }
  printBoard(board);
  return;
};

const valid = function (board, num, p) {
  const boxI = p.x / 3;
  const boxJ = p.x / 3;

  //check row
  for (const [i, _] of board.entries()) {
    if (board[p.x][i] == num && p.y != i) {
      return false;
    }
  }

  //check col
  for (const [i, _] of board.entries()) {
    if (board[i][p.y] == num && p.x != i) {
      return false;
    }
  }

  //check box
  for (const [i, _] of board.entries()) {
    for (let j = boxJ; j < boxJ + 3; j++) {
      if (board[i][j] == num && p.x != i && p.y != j) {
        return false;
      }
    }
  }
  return true;
};

const checkEmpty = function (board) {
  for (const [i, row] of board.entries()) {
    for (const [j, val] of row.entries()) {
      if (val === 0) {
        return Pos(i, j), null;
      }
    }
  }

  return null, "no empty case found";
};

const isGameOver = function (board) {
  for (const [_, line] of board.entries()) {
    for (const [_, val] of line.entries()) {
      if (val == 0) {
        return false;
      }
    }
  }
  return true;
};

const printBoard = function (board) {
  for (const [i, _] of board.entries()) {
    if (i % 3 === 0 && i != 0) {
      console.log("- - - - - - - - - - - - - - - -");
    }
    for(const [j, _] of board[i].entries()){
      if(j % 3 === 0 && j != 0){
        console.log(" | ")
      }
      // if( j ===8 ){

      // }

      // printf, printf
    }
  }
};
