import { Slider } from 'antd';

const AnimeView = () => {
  return (
    <div className="border border-gray-400 p-4">
      <div className="w-96 h-96 border border-gray-400 flex justify-center items-center">
        <div className="word-dom">hello world</div>
      </div>
      <Slider defaultValue={30} />
    </div>
  );
};
export default AnimeView;
