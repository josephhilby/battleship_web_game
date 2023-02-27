export default function GameOptionContainer() {
  return (
    <div>
      <div className="option-container">
        <div id="0" className="submarine-preview submarine" draggable="true"></div>
        <div id ="1" className="destroyer-preview destroyer" draggable="true"></div>
        <div id="2" className="cruiser-preview cruiser" draggable="true"></div>
        <div id="3" className="battleship-preview battleship" draggable="true"></div>
      </div>

      <button id="flip-button">FLIP</button>
      <button id="start-button">START</button>
    </div>
  );
}