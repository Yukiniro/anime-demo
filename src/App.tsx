import './App.css';
import AnimeView from './components/animeView';
import ControllerView from './components/controllerView';
import { useEffect } from 'react';
import { myAnime } from './utils/myAnimeObj';

function App() {
  useEffect(() => {
    myAnime.updateAnimeInstance({
      targets: '.word-dom',
      autoplay: false,
      duration: 2000,
    });
  }, []);
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
