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
        return
      }
    }
  }
  printBoard(board)
  return
};
