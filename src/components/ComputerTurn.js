import { gameOver } from "./Game"
import { turnDisplay } from "./Game"
import { infoDisplay } from "./Game"
import { playerTurn } from "./Game"
import { computerHits } from "./Game"
import { computerSunkShips } from "./Game"
import checkScore from './CheckScore'
import handleClick from './PlayerTurn'

export default function computerTurn() {
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