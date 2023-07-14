import './App.css';
import { useEffect, useRef } from 'react';
import { myAnime } from './utils/myAnimeObj';
import { useDispatch, useSelector } from 'react-redux';
import { updateProgress } from './features/anime/animeSlice';
import ControllerView from './components/ControllerView';
import AnimeView from './components/AnimeView';

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
      Array.from(domRef.current.children).map((c) =>
        c.removeAttribute('style')
      );
    }
  }, [progress]);

  const onResetStyle = () => {
    Array.from(domRef.current.children).map((c) => c.removeAttribute('style'));
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
