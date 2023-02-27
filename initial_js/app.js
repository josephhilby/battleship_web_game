
const optionContainer = document.querySelector('.option-container')
const gamesBoardContainer = document.querySelector('#gameboards-container')
const flipButton = document.querySelector('#flip-button')
const startButton = document.querySelector('#start-button')
const infoDisplay = document.querySelector('#info')
const turnDisplay = document.querySelector('#turn-display')


// Flip Button
let angle = 0
function flip() {
  const optionShips = Array.from(optionContainer.children);
  if (angle === 0) {
    angle = 90
  } else {
    angle = 0
  };
  optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`);
}

flipButton.addEventListener('click', flip)

// Start Button
function startGame() {
  if (playerTurn === undefined) {
    if (optionContainer.children.length !== 0) {
      infoDisplay.textContent = 'Please place all your ships, then we can start!'
    } else {
      const allBoardBlocks = document.querySelectorAll('#computer div')
      allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
      playerTurn = true
      turnDisplay.textContent = 'You go first'
      infoDisplay.textContent = 'You will need it!'
    }
  }
}
startButton.addEventListener('click', startGame)

// Game Board
function createBoard(color, user) {
  const gameBoardContainer = document.createElement('div');
  gameBoardContainer.classList.add('game-board');
  gameBoardContainer.style.backgroundColor = color;
  gameBoardContainer.id = user;

  for (let i = 0; i < 100; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.id = i;
    gameBoardContainer.append(block);
  };
  gamesBoardContainer.append(gameBoardContainer);
}

createBoard('blue', 'player')
createBoard('blue', 'computer')

// Ships
class Ship {
  constructor(name, length) {
    this.name = name
    this.length = length
  };
}

const submarine = new Ship ('submarine', 2)
const destroyer = new Ship ('destroyer', 3)
const cruiser = new Ship ('cruiser', 4)
const battleship = new Ship ('battleship', 5)

const ships = [submarine, destroyer, cruiser, battleship]
let notDropped

// Check Ship Placement
function getValidity(allBoardBlocks, isHorizontal, startIndex, ship) {
  let validStart = isHorizontal ? startIndex <= 100 - ship.length ? startIndex : 100 - ship.length : startIndex <= 100 - ship.length * 10 ? startIndex : startIndex - ship.length * 10 + 10

  let shipBlocks = [];

  for (let i = 0; i < ship.length; i++) {
    if (isHorizontal) {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i])
    } else {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i * 10])
    };
  };

  let valid
  if (isHorizontal) {
    shipBlocks.every((_shipBlock, index) =>
      valid = shipBlocks[0].id % 10 !== 10 - (shipBlocks.length - (index + 1)))
  } else {
    shipBlocks.every((_shipBlock, index) =>
      valid = shipBlocks[0].id < 90 + (10 * index + 1))
  }

  const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'))

  return { shipBlocks, valid, notTaken }
}

// Computer Ships
function addShipPiece(user, ship, startId) {
  const allBoardBlocks = document.querySelectorAll(`#${user} div`);
  let randomBool = Math.random() < 0.5;
  let isHorizontal = user === 'player' ? angle === 0 : randomBool;
  let randomStartIndex = Math.floor(Math.random() * 100);
  let startIndex = startId ? startId : randomStartIndex


  const { shipBlocks, valid, notTaken } = getValidity(allBoardBlocks, isHorizontal, startIndex, ship)

  if (valid && notTaken) {
    shipBlocks.forEach(shipBlock => {
      shipBlock.classList.add(ship.name)
      shipBlock.classList.add('taken')
    });
  } else {
    if (user === 'computer') addShipPiece('computer', ship, startId)
    if (user === 'player') notDropped = true
  }
}

ships.forEach(ship => addShipPiece('computer', ship))

// Player Ships
let draggedShip
const optionShips = Array.from(optionContainer.children)
optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart))

const allPlayerBlocks = document.querySelectorAll('#player div')
allPlayerBlocks.forEach(playerBlock => {
  playerBlock.addEventListener('dragover', dragOver)
  playerBlock.addEventListener('drop', dropShip)
})
function dragStart(e) {
  notDropped = false
  draggedShip = e.target
}

function dragOver(e) {
  e.preventDefault()
  const ship = ships[draggedShip.id]
  highlightArea(e.target.id, ship)
}

function dropShip(e) {
  const startId = e.target.id
  const ship = ships[draggedShip.id]
  addShipPiece('player', ship, startId)
  if (!notDropped) {
    draggedShip.remove()
  }
}

// Drag Highlight
function highlightArea(startIndex, ship) {
  const allBoardBlocks = document.querySelectorAll('#player div')
  let isHorizontal = angle === 0

  const { shipBlocks, valid, notTaken } = getValidity(allBoardBlocks, isHorizontal, startIndex, ship)

  if (valid && notTaken) {
    shipBlocks.forEach(shipBlock => {
      shipBlock.classList.add('hover')
      setTimeout(() => shipBlock.classList.remove('hover'), 500)
    })
  }
}

// Game Logic
let gameOver = false
let playerTurn


let playerHits = []
const playerSunkShips = []
let computerHits = []
const computerSunkShips = []

// Score Keeper
function checkScore(user, userHits, userSunkShips) {
  function checkShip(shipName, shipLength) {
    console.log(userHits.filter(storedShipName => storedShipName === shipName))
    if (
      userHits.filter(storedShipName => storedShipName === shipName).length === shipLength
    ) {
      infoDisplay.textContent = `The ${user} sunk a ${shipName}!`
      if (user === 'player') {
        playerHits = userHits.filter(storedShipName => storedShipName !== shipName)
      }
      if (user === 'computer') {
        computerHits = userHits.filter(storedShipName => storedShipName !== shipName)
      }
      userSunkShips.push(shipName)
    }
  }
  ships.forEach(ship => checkShip(ship.name, ship.length))

  if (playerSunkShips.length === 4) {
    infoDisplay.textContent = "You sunk all my ships you jerk!"
    gameOver = true
  }

  if (computerSunkShips.length === 4) {
    infoDisplay.textContent = "I win!"
    gameOver = true
  }
}

// Player Turn
function handleClick(e) {
  if (!gameOver) {
    if (e.target.classList.contains('taken')) {
      e.target.classList.add('hit')
      infoDisplay.textContent = "Hit!"
      let classes = Array.from(e.target.classList)
      classes = classes[1]
      playerHits.push(classes)
      checkScore('player', playerHits, playerSunkShips)
    }
    if (!e.target.classList.contains('taken')) {
      infoDisplay.textContent = "Miss!"
      e.target.classList.add('miss')
      e.target.innerHTML = "X"
    }
    playerTurn = false
    const allBoardBlocks = document.querySelectorAll('#computer div')
    allBoardBlocks.forEach(block => block.replaceWith(block.cloneNode(true)))
    setTimeout(computerTurn, 2000)
  }
}

// Computer Turn
function computerTurn() {
  if (!gameOver) {
    turnDisplay.textContent = 'My turn!'
    infoDisplay.textContent = 'Mwahahaha!'

    setTimeout(() => {
      let randomGo = Math.floor(Math.random() * 100)
      const allBoardBlocks = document.querySelectorAll('#player div')

      if (allBoardBlocks[randomGo].classList.contains('taken') && allBoardBlocks[randomGo].classList.contains('boom')) {
        computerTurn()
        return
      } else if (allBoardBlocks[randomGo].classList.contains('taken') && !allBoardBlocks[randomGo].classList.contains('boom')) {
        allBoardBlocks[randomGo].classList.add('hit')
        infoDisplay.textContent = "Hit"
        let classes = Array.from(allBoardBlocks[randomGo].classList)
        classes = classes[1]
        computerHits.push(classes)
        checkScore('computer', computerHits, computerSunkShips)
      } else {
        infoDisplay.textContent = "Miss"
        allBoardBlocks[randomGo].classList.add('miss')
        allBoardBlocks[randomGo].innerHTML = "X"
      }
    }, 1000)

    setTimeout(() => {
      playerTurn = true
      turnDisplay.textContent = "Your turn"
      const allBoardBlocks = document.querySelectorAll('#computer div')
      allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
    }, 3000)
  }
}
