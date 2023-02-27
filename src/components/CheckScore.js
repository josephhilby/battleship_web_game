import { infoDisplay } from "./Game"
import { gameOver } from "./Game"
import { playerHits } from "./Game"
import { playerSunkShips } from "./Game"
import { computerHits } from "./Game"
import { computerSunkShips } from "./Game"
import { ships } from "./Game"

export default function checkScore(user, userHits, userSunkShips) {
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
