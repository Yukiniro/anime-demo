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

    // TODO dispatch 应该作为依赖。当前场景不会存在问题，但是如果存在需要重新初始化 reducer 的业务就可能会由问题
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // TODO 这个处理建议作为文字对象的接口
      Array.from(domRef.current.children).map((c) =>
        c.removeAttribute('style')
      );
    }
  }, [progress]);

  // TODO #1 作为 props 或者 effect 依赖的函数使用 useCallback 进行包裹
  const onResetStyle = () => {

    // TODO 同#1。并且不应该存在两个完全一样的使用，应该进行提取
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
