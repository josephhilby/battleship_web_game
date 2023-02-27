import GameInfo from './GameInfo'
import GameBoards from './GameBoards'
import GameOptionContainer from './GameOptionContainer'

export default function Game() {
  return (
    <div>
      <GameInfo />
      <GameBoards />
      <GameOptionContainer />
    </div>
  );
}