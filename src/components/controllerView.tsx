import { Button, InputNumber, Select } from 'antd';
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
    if ((inAnime === 'no' && outAnime === 'no') || progress === 100) {
      setIsPlay(false);
    }
  }, [inAnime, outAnime, progress]);

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
    <div className="p-4 border flex flex-col gap-y-4">
      <div className="flex justify-between">
        <span>动画目标：</span>
        <Select
          value={type}
          onChange={onTypeChange}
          style={{ width: 120 }}
          options={[
            { value: '.word-dom', label: '单词' },
            { value: '.text-dom', label: '文字' },
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
        <Button htmlType="submit" onClick={onStart}>
          {isPlay ? '暂停' : '播放'}
        </Button>
        <Button onClick={onReset}>重置</Button>
      </div>
    </div>
  );
};
export default ControllerView;
