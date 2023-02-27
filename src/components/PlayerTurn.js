import { gameOver } from './Game'
import { infoDisplay } from './Game'
import { playerTurn } from './Game'
import { playerHits } from './Game'
import { playerSunkShips } from './Game'
import computerTurn from './ComputerTurn'
import checkScore from './CheckScore'

export default function handleClick(e) {
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