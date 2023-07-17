import { InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateType,
  updateInAnime,
  updateOutAnime,
  updateDuration,
  updateInDuration,
  updateOutDuration,
  resetAnime,
} from '../features/anime/animeSlice';
import { myAnime } from '../utils/myAnimeObj';
import { useState, useEffect } from 'react';

export type InAnimeType = 'scaleUp' | 'shift' | 'contract' | 'no';
export type OutAnimeType = 'glossyBlur' | 'no';

const ControllerView = ({ onResetStyle }: { onResetStyle: () => void }) => {
  const {
    type,
    inAnime,
    outAnime,
    duration,
    inDuration,
    outDuration,
    progress,
  } = useSelector((state) => state.animeStore);

  const dispatch = useDispatch();

  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    if (progress === 100 || myAnime.getPaused()) {
      setIsPlay(false);
    }
  }, [progress]);

  const onTypeChange = (v: 'text' | 'word') => {
    dispatch(updateType(v));
  };

  const onInAnime = (v: InAnimeType) => {
    dispatch(updateInAnime(v));
  };

  const onOutAnime = (v: OutAnimeType) => {
    dispatch(updateOutAnime(v));
  };

  const onInDuration = (v?: number) => {
    dispatch(updateInDuration(v));
  };
  const onOutDuration = (v?: number) => {
    dispatch(updateOutDuration(v));
  };
  const onDuration = (v?: number) => {
    dispatch(updateDuration(v));
  };

  const onStart = () => {
    if (inAnime === 'no' && outAnime === 'no') {
      return;
    }

    if (isPlay) {
      myAnime.pause();
    } else {
      myAnime.play();
    }
    setIsPlay(!isPlay);
  };

  const onReset = () => {
    dispatch(resetAnime());
    onResetStyle();
  };

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="flex justify-between">
        <span>动画目标：</span>
        <Select
          value={type}
          onChange={onTypeChange}
          style={{ width: 120 }}
          options={[
            { value: 'word', label: '单词' },
            { value: 'text', label: '文字' },
          ]}
        />
      </div>
      <div className="flex justify-between">
        <span>入场动画：</span>
        <Select
          value={inAnime}
          onChange={onInAnime}
          style={{ width: 120 }}
          options={[
            { value: 'no', label: '无' },
            { value: 'scaleUp', label: 'scale up' },
            { value: 'shift', label: 'shift' },
            { value: 'contract', label: 'contract' },
          ]}
        />
      </div>
      <div className="flex justify-between">
        <span>出场动画：</span>
        <Select
          onChange={onOutAnime}
          value={outAnime}
          style={{ width: 120 }}
          options={[
            { value: 'no', label: '无' },
            { value: 'glossyBlur', label: 'glossy blur' },
          ]}
        />
      </div>
      <div className="flex justify-between">
        <span>动画时长：</span>
        <InputNumber
          onChange={onDuration}
          value={duration}
          addonAfter={'s'}
          min={0}
          style={{ width: 120 }}
        />
      </div>
      <div className="flex justify-between">
        <span>入场动画时长：</span>
        <InputNumber
          addonAfter={'s'}
          min={0}
          value={inDuration}
          onChange={onInDuration}
          style={{ width: 120 }}
        />
      </div>
      <div className="flex justify-between">
        <span>出场动画时长：</span>
        <InputNumber
          onChange={onOutDuration}
          addonAfter={'s'}
          min={0}
          value={outDuration}
          style={{ width: 120 }}
        />
      </div>

      <div className="space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
          onClick={onStart}
        >
          {isPlay ? '暂停' : '播放'}
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 py-1 px-4 border border-gray-400 rounded shadow"
          onClick={onReset}
        >
          重置
        </button>
      </div>
    </div>
  );
};
export default ControllerView;
