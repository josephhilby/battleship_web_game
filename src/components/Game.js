import GameInfo from './GameInfo'
import GameBoards from './GameBoards'
import GameOptionContainer from './GameOptionContainer'
import { Ship } from './Ships'
import { createBoard } from './GameBoards'
import flip from './FlipButton'
import startGame from './StartButton'

export const optionContainer = document.querySelector('.option-container')
export const gamesBoardContainer = document.querySelector('#gameboards-container')
export const infoDisplay = document.querySelector('#info')
export const turnDisplay = document.querySelector('#turn-display')

export let angle = 0
export let playerTurn
export let gameOver = false

export let playerHits = []
export const playerSunkShips = []
export let computerHits = []
export const computerSunkShips = []

const flipButton = document.querySelector('#flip-button')
flipButton.addEventListener('click', flip)
const startButton = document.querySelector('#start-button')
startButton.addEventListener('click', startGame)

createBoard('blue', 'player')
createBoard('blue', 'computer')

const submarine = new Ship('submarine', 2)
const destroyer = new Ship('destroyer', 3)
const cruiser = new Ship('cruiser', 4)
const battleship = new Ship('battleship', 5)
export const ships = [submarine, destroyer, cruiser, battleship]

let notDropped

export default function Game() {
  return (
    <div>
      <GameInfo />
      <GameBoards />
      <GameOptionContainer />
    </div>
  );
}