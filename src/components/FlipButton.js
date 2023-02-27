import { angle } from './Game'
import { optionContainer } from './Game'

export default function flip() {
  const optionShips = Array.from(optionContainer.children);
  if (angle === 0) {
    angle = 90
  } else {
    angle = 0
  };
  optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`);
}