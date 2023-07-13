import { Slider } from 'antd';
import { myAnime } from '../utils/myAnimeObj';
import { forwardRef, useState } from 'react';

const AnimeView = forwardRef(({ progress }: { progress: number }, ref) => {
  const [content, setContent] = useState(['hello ', 'world']);
  return (
    <div className="border border-gray-400 p-4">
      <div className="w-96 h-96 border border-gray-400 flex justify-center items-center">
        <div ref={ref} className="word-dom z-0">
          {content.map((c) => (
            <span className="anime-dom" key={c}>
              {c}
            </span>
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
