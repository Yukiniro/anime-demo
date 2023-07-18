import './App.css';
import { useEffect, useRef, useCallback } from 'react';
import { myAnime } from './utils/myAnimeObj';
import { useDispatch, useSelector } from 'react-redux';
import ControllerView from './components/ControllerView';
import AnimeView from './components/AnimeView';
import { updateIsPlaying, updateProgress } from './features/anime/animeSlice';

function App() {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.animeStore.progress);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    myAnime.setAnimeRef(domRef.current);
    myAnime.addToView(myAnime.createView());
    return () => myAnime.removeElement();
  }, []);

  useEffect(() => {
    function repeatOften() {
      dispatch(updateProgress(myAnime.currentProgress()));
      if (myAnime.getPaused()) {
        dispatch(updateIsPlaying({ isPlaying: false }));
      }
      requestAnimationFrame(repeatOften);
    }
    requestAnimationFrame(repeatOften);
  }, [dispatch]);

  const onResetStyle = useCallback(() => {
    myAnime.clearDomStyle();
  }, []);

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
