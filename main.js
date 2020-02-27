let grid
let nbBombs = 80
let nbCols = 20
let nbRows = 20
let gridTable

window.addEventListener("DOMContentLoaded", function(event) {
  setup()
});


function coordToIndex(x,y, nbCols, nbRows) {
  if (x < 0 || y < 0 || x > nbCols - 1 || y > nbRows - 1) {
    return -1
  }
  return x + y * nbCols
}
function indexToCoord(index, nbCols, nbRows) {
  if (index < (nbCols ) * (nbRows )) {
    let y = Math.floor(index / nbCols)
    let x = index - y * nbCols
    return {x,y}
  }
  return {x: -1, y:-1}
}

function finish(win) {
  console.log('finish', win)
  let restart
  if (win) {
    restart = confirm("Tu as Gagné! Bravo Champion!\nTu veux recommencer?")
  } else {
    restart = confirm("Tu as perdu... Je m'en doutais!\n Tu veux une nouvelle chance?")
  }
  if (restart) {
    gridTable.innerHTML = ""
    setup()
  }
}

function refresh() {
  for(let x = 0; x < nbCols; x++) {
    for(let y = 0; y < nbRows; y++) {
      if (!grid.cells[x][y].hidden) {
        document.getElementById(String(coordToIndex(x, y, nbCols, nbRows))).classList.remove("hidden");
      }
      if (grid.cells[x][y].flag) {
        document.getElementById(String(coordToIndex(x, y, nbCols, nbRows))).classList.add("flag");
      } else {
        document.getElementById(String(coordToIndex(x, y, nbCols, nbRows))).classList.remove("flag");
      }
    }
  }
}

function setup() {
  gridTable = document.getElementById("grid")
  grid = new Grid(nbCols, nbRows, nbBombs)
  for(let y = 0; y < nbCols; y++) {
    let col = document.createElement("tr")
    gridTable.appendChild(col)
    for(let x = 0; x < nbRows; x++) {
      let cell = document.createElement("td")
      cell.innerText = grid.cells[x][y].isBomb? "B" : grid.cells[x][y].nbBombsNeighbour
      cell.id = coordToIndex(x, y, nbCols, nbRows)
      cell.addEventListener("click", function(event) {
        const index = event.target.id
        const coord = indexToCoord(index, nbCols, nbRows)
        const finished = grid.click(coord)
        refresh()
        if (finished) {
          finish(false)
        }
      })
      cell.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const index = event.target.id
        const coord = indexToCoord(index, nbCols, nbRows)
        grid.setFlag(coord)
        refresh()
        return false;
      }, false);
      cell.classList.add("hidden")
      col.appendChild(cell)

    }
  }
}