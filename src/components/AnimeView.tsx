import { Slider } from 'antd';
import { forwardRef, useCallback } from 'react';
import { myAnime } from '../utils/myAnimeObj';

const AnimeView = forwardRef(({ progress }: { progress: number }, ref) => {
  const onSliderChange = useCallback((v: number) => {
    myAnime.pause();
    myAnime.setCurrentProgress(v);
    myAnime.seek(v);
  }, []);

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
