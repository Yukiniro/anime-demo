import { Slider } from 'antd';
import { myAnime } from '../utils/myAnimeObj';

const AnimeView = () => {
  return (
    <div className="border border-gray-400 p-4">
      <div className="w-96 h-96 border border-gray-400 flex justify-center items-center">
        <div className="word-dom">hello world</div>
      </div>
      <Slider
        onChange={(v) => {
          myAnime.seek(v);
        }}
      />
    </div>
  );
};
export default AnimeView;
