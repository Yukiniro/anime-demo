import { Slider } from 'antd';
import { myAnime } from '../utils/myAnimeObj';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

const AnimeView = forwardRef(({ progress }: { progress: number }, ref) => {
  const { content } = useSelector((state) => state.animeStore);

  return (
    <div className="border rounded-md border-gray-300 p-4">
      <div className="w-96 h-96 flex justify-center items-center">
        <div ref={ref} className="flex">
          {content.map((c, index) => (
            <div key={index} className="word-dom text-4xl z-0">
              {c.replace(/\s/g, '\u00a0')}
            </div>
          ))}
        </div>
      </div>
      <Slider
        value={progress === 100 ? 0 : progress}
        onChange={(v) => {
          myAnime.seek(v);
        }}
      />
    </div>
  );
});
export default AnimeView;
