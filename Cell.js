class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isBomb = false;
    this.nbBombsNeighbour = -1
    // this.bombsNeighbour = []
    this.hidden = true
    this.flag = false
  }
  checkNeighbour(grid, nbCols, nbRows) {
    if (!this.isBomb) {
      this.nbBombsNeighbour = 0
      if (this.x > 0) { // LEFT
        this.nbBombsNeighbour += grid[this.x - 1][this.y].isBomb
        // this.bombsNeighbour.push(grid[this.x - 1][this.y])
      } 
      if (this.y > 0) { // TOP
        this.nbBombsNeighbour += grid[this.x][this.y - 1].isBomb
        // this.bombsNeighbour.push(grid[this.x ][this.y - 1])
      }
      if (this.x < nbCols - 1) { // RIGHT
        this.nbBombsNeighbour += grid[this.x + 1][this.y].isBomb
        // this.bombsNeighbour.push(grid[this.x + 1][this.y])
      }
      if (this.y < nbRows - 1) {  // BOTTOM
        this.nbBombsNeighbour += grid[this.x][this.y + 1].isBomb
        // this.bombsNeighbour.push(grid[this.x][this.y + 1])
      }
      if (this.x  > 0 && this.y > 0) { // TOP LEFT
        this.nbBombsNeighbour += grid[this.x - 1][this.y - 1].isBomb
        // this.bombsNeighbour.push(grid[this.x - 1][this.y - 1])
      }
      if (this.x  < nbCols - 1 && this.y > 0) { // TOP RIGHT
        this.nbBombsNeighbour += grid[this.x + 1][this.y - 1].isBomb
        // this.bombsNeighbour.push(grid[this.x + 1][this.y - 1])
      }
      if (this.x  > 0 && this.y < nbRows - 1) { // BOTTOM LEFT
        this.nbBombsNeighbour += grid[this.x - 1][this.y + 1].isBomb
        // this.bombsNeighbour.push(grid[this.x - 1][this.y + 1])
      }
      if (this.x  < nbCols - 1 && this.y < nbRows - 1) { // BOTTOM RIGHT
        this.nbBombsNeighbour += grid[this.x + 1][this.y + 1].isBomb
        // this.bombsNeighbour.push(grid[this.x + 1][this.y + 1])
      }
    }
  }
  reveal() {  
    this.hidden = false
    return {isBomb: this.isBomb, nbBombsNeighbour: this.nbBombsNeighbour}
  }
  setFlag() {
    if (this.hidden) this.flag = !this.flag
  }
}