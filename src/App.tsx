import './App.css';
import AnimeView from './components/AnimeView';
import ControllerView from './components/ControllerView';
import { useEffect, useRef } from 'react';
import { myAnime } from './utils/myAnimeObj';
import { useDispatch, useSelector } from 'react-redux';
import { updateProgress } from './features/anime/animeSlice';

function App() {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.animeStore.progress);
  const domRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      dispatch(updateProgress(myAnime.currentProgress()));
    }, 2);
    return () => {
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      domRef.current?.removeAttribute('style');
    }
  }, [progress]);

  const onResetStyle = () => {
    domRef.current?.removeAttribute('style');
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center items-center">
        <AnimeView progress={progress} ref={domRef} />
        <ControllerView onResetStyle={onResetStyle} />
      </div>
    </div>
  );
}

export default App;
