import './App.css';
import AnimeView from './components/animeView';
import ControllerView from './components/controllerView';

function App() {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center">
        <AnimeView />
        <ControllerView />
      </div>
    </div>
  );
}

export default App;
