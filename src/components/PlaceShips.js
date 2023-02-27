// Check Valid Ship Placement
export function getValidity(allBoardBlocks, isHorizontal, startIndex, ship) {
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
export function addShipPiece(user, ship, startId) {
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
const allPlayerBlocks = document.querySelectorAll('#player div')

optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart))

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