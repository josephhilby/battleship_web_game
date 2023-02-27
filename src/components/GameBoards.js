import { gamesBoardContainer } from './Game'

export function createBoard(color, user) {
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

export default function GameBoards() {
  return (
    <div id="gameboards-container"></div>
  );
}