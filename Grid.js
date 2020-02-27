class Grid {
  constructor(nbCols, nbRows, nbBombs) {
    this.nbCols = nbCols;
    this.nbRows = nbRows;
    this.nbBombs = nbBombs;
    this.cells = new Array(nbCols);
    this.createCells()
    this.generateBombs()
    this.calcNeighbour()
    this.nbFlags = 0
    this.nbCells = 0
  }

  createCells() {
    for (let x = 0; x < this.nbCols; x++) {
      this.cells[x] = new Array(this.nbRows)
      for (let y = 0; y < this.nbRows; y++) {
        this.cells[x][y] = new Cell(x, y)
      }
    }
  }

  generateBombs() {
    let i = 0
    while(i < this.nbBombs) {
      let index = Math.floor(Math.random() * (this.nbRows * this.nbCols -1))
      let coord = indexToCoord(index, nbCols, nbRows)
      if (!this.cells[coord.x][coord.y].isBomb) {
        this.cells[coord.x][coord.y].isBomb = true
        i++
      }
    }
  }

  calcNeighbour() {
    for(let x = 0; x < this.nbCols; x++) {
      for(let y = 0; y < this.nbRows; y++) {
        this.cells[x][y].checkNeighbour(this.cells, nbCols, nbRows)
      }
    }
  }

  reveal(coord) {
    let cell = this.cells[coord.x][coord.y]
    if (cell.hidden && !cell.flag) {
      let res = cell.reveal()
      if (res.isBomb) return true
      else {
        if (res.nbBombsNeighbour == 0) {
          return this.extension(coord)
        }
      }
    }
    return false
  }

  extension(coord) {
    let isBomb = false
    if (coord.x > 0 && !isBomb) { // LEFT
      isBomb = this.reveal({x: coord.x - 1, y: coord.y})
    } 
    if (coord.y > 0 && !isBomb) { // TOP
      isBomb = this.reveal({x: coord.x, y: coord.y - 1})
    }
    if (coord.x < nbCols - 1 && !isBomb) { // RIGHT
      isBomb = this.reveal({x: coord.x + 1, y: coord.y})
    }
    if (coord.y < nbRows - 1 && !isBomb) {  // BOTTOM
      isBomb = this.reveal({x: coord.x , y: coord.y + 1})
    }
    if (coord.x  > 0 && coord.y > 0 && !isBomb) { // TOP LEFT
      isBomb = this.reveal({x: coord.x - 1, y: coord.y - 1})
    }
    if (coord.x  < nbCols - 1 && coord.y > 0 && !isBomb) { // TOP RIGHT
      isBomb = this.reveal({x: coord.x + 1, y: coord.y - 1})
    }
    if (coord.x  > 0 && coord.y < nbRows - 1 && !isBomb) { // BOTTOM LEFT
      isBomb = this.reveal({x: coord.x - 1, y: coord.y + 1})
    }
    if (coord.x  < nbCols - 1 && coord.y < nbRows - 1 && !isBomb) { // BOTTOM RIGHT
      isBomb = this.reveal({x: coord.x + 1, y: coord.y + 1})
    }
    return isBomb
  }

  getNbFlags(coord) {
    let nbFlags = 0
    if (coord.x > 0 && this.cells[coord.x - 1][coord.y].flag) { // LEFT
      nbFlags++
    } 
    if (coord.y > 0 && this.cells[coord.x][coord.y - 1].flag) { // TOP
      nbFlags++
    }
    if (coord.x < nbCols - 1 && this.cells[coord.x + 1][coord.y].flag) { // RIGHT
      nbFlags++
    }
    if (coord.y < nbRows - 1 && this.cells[coord.x][coord.y + 1].flag) {  // BOTTOM
      nbFlags++
    }
    if (coord.x  > 0 && coord.y > 0 && this.cells[coord.x - 1][coord.y - 1].flag) { // TOP LEFT
      nbFlags++
    }
    if (coord.x  < nbCols - 1 && coord.y > 0 && this.cells[coord.x + 1][coord.y - 1].flag) { // TOP RIGHT
      nbFlags++
    }
    if (coord.x  > 0 && coord.y < nbRows - 1 && this.cells[coord.x - 1][coord.y + 1].flag) { // BOTTOM LEFT
      nbFlags++
    }
    if (coord.x  < nbCols - 1 && coord.y < nbRows - 1 && this.cells[coord.x + 1][coord.y + 1].flag) { // BOTTOM RIGHT
      nbFlags++
    }
    return nbFlags
  }

  showAround(coord) {
    if(this.getNbFlags(coord) == this.cells[coord.x][coord.y].nbBombsNeighbour) {
      return this.extension(coord)
    }
    return false
  }

  setFlag(coord) {
    this.cells[coord.x][coord.y].setFlag()
  }

  click(coord) {
    let cell = this.cells[coord.x][coord.y]
    if(cell.hidden && !cell.flag) {
      return this.reveal(coord)
    } else if (!cell.hidden) {
      return this.showAround(coord)
    }
  }
}