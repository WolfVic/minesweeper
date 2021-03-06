let grid
let nbBombs = 50
let nbCols = 20
let nbRows = 20
let gridTable
let formLevel

window.addEventListener("DOMContentLoaded", function(event) {
  formLevel = document.getElementById("selectLvl")
  gridTable = document.getElementById("grid")
  formLevel.addEventListener("submit", function(event) {
    event.preventDefault()
    for (var i = 0; i < 5; i++) {
      if (event.target[i].checked) {
        console.log(i)
        changeLevel(event.target[i].value)
        break;
      }
    }
  })
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
  let isRestart
  if (win) {
    isRestart = confirm("Tu as Gagné! Bravo Champion!\nTu veux recommencer?")
  } else {
    isRestart = confirm("Tu as perdu... Je m'en doutais!\n Tu veux une nouvelle chance?")
  }
  if (isRestart) {
    restart()
  }
}

function restart() {
  gridTable.innerHTML = ""
  setup()
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

function changeLevel(level) {
  // console.log(level)
  switch (level) {
    case 'lvl0':
      nbCols = 8
      nbRows = 8
      nbBombs = 10
      break;
    case 'lvl1':
      nbCols = 16
      nbRows = 16
      nbBombs = 40
      break;
    case 'lvl2':
      nbCols = 15
      nbRows = 13
      nbBombs = 40
      break;
    case 'lvl3':
      nbCols = 30
      nbRows = 16
      nbBombs = 99
      break;
    case 'lvl4':
      nbCols = 30
      nbRows = 16
      nbBombs = 150
      break;
  }
  restart()
  topFunction()
}

function setup() {
  grid = new Grid(nbCols, nbRows, nbBombs)
  for(let y = 0; y < nbRows; y++) {
    let col = document.createElement("tr")
    gridTable.appendChild(col)
    for(let x = 0; x < nbCols; x++) {
      let cell = document.createElement("td")
      cell.innerText = grid.cells[x][y].isBomb? "B" : grid.cells[x][y].nbBombsNeighbour
      cell.id = coordToIndex(x, y, nbCols, nbRows)
      cell.addEventListener("click", function(event) {
        const index = event.target.id
        const coord = indexToCoord(index, nbCols, nbRows)
        const finished = grid.click(coord)
        refresh()
        if (finished) {
          finish(grid.win)
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

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 