import { Slider } from 'antd';
import { forwardRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateProgress } from '../features/anime/animeSlice';
import { myAnime } from '../utils/myAnimeObj';

const AnimeView = forwardRef(({ progress }: { progress: number }, ref) => {
  const dispatch = useDispatch();

  const onSliderChange = useCallback(
    (v: number) => {
      myAnime.pause();
      myAnime.seek(v);
      dispatch(updateProgress(v));
    },
    [dispatch]
  );

  return (
    <div className="border rounded-md border-gray-300 p-4">
      <div className="w-96 h-96 flex justify-center items-center">
        <div ref={ref} className="flex text-4xl" />
      </div>
      <Slider value={progress} onChange={onSliderChange} />
    </div>
  );
});
export default AnimeView;
