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
        // TODO 不建议直接在这里进行重置处理，而是修改 pogress 进行更新
        value={progress === 100 ? 0 : progress}

        // TODO 同#1
        onChange={(v) => {
          myAnime.seek(v);
        }}
      />
    </div>
  );
});
export default AnimeView;
