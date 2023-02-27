import { playerTurn } from './Game'
import { optionContainer } from './Game'
import { infoDisplay } from './Game'
import { turnDisplay } from './Game'
import handleClick from './PlayerTurn'

// Start Button
export default function startGame() {
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