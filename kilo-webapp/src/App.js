import Title from './Title';
import Menu from './Menu';
import GameView from './GameView';

function App() {
  return (
    <div>
      <div><Title /></div>
      <div style={{ height: "100vh" }} class="d-grid align-items-center container">
        <div class="row">
          <div class="col-4 text-center">
            <Menu />
          </div>
          <div class="col-8 text-center">
            <GameView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
