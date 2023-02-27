
export default function GameOptionContainer() {
  return (
    <div>
      <div class="option-container">
        <div id="0" class="submarine-preview submarine" draggable="true"></div>
        <div id ="1" class="destroyer-preview destroyer" draggable="true"></div>
        <div id="2" class="cruiser-preview cruiser" draggable="true"></div>
        <div id="3" class="battleship-preview battleship" draggable="true"></div>
      </div>

      <button id="flip-button">FLIP</button>
      <button id="start-button">START</button>
    </div>
  );
}