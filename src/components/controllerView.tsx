import { Button, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateType,
  updateInAnime,
  updateOutAnime,
  updateDuration,
  resetAnime,
} from '../features/anime/animeSlice';
import { myAnime } from '../utils/myAnimeObj';

export type InAnimeType = 'scaleUp' | 'shift' | 'contract' | 'no';
export type OutAnimeType = 'glossyBlur' | 'no';

const ControllerView = () => {
  const { type, inAnime, outAnime, duration } = useSelector(
    (state) => state.animeStore
  );

  const dispatch = useDispatch();

  const onTypeChange = (v: 'text' | 'word') => {
    dispatch(updateType(v));
  };

  const onInAnime = (v: InAnimeType) => {
    dispatch(updateInAnime(v));
  };

  const onOutAnime = (v: OutAnimeType) => {
    dispatch(updateOutAnime(v));
  };

  const onDuration = (v: number) => {
    dispatch(updateDuration(v));
  };

  const onStart = () => {
    myAnime.play();
  };

  const onReset = () => {
    dispatch(resetAnime());
  };

  return (
    <div className="p-4 border flex flex-col gap-y-4">
      <div>
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
      <div>
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
      <div>
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
      <div>
        <span>动画时长：</span>
        <InputNumber
          onChange={onDuration}
          value={duration}
          addonAfter={'s'}
          min={0}
          style={{ width: 120 }}
        />
      </div>
      <div>
        <span>入场动画时长：</span>
        <InputNumber
          addonAfter={'s'}
          min={0}
          defaultValue={2}
          style={{ width: 120 }}
        />
      </div>
      <div>
        <span>出场动画时长：</span>
        <InputNumber
          addonAfter={'s'}
          min={0}
          defaultValue={1}
          style={{ width: 120 }}
        />
      </div>

      <div className="space-x-4">
        <Button htmlType="submit" onClick={onStart}>
          {'播放'}
        </Button>
        <Button onClick={onReset}>重置</Button>
      </div>
    </div>
  );
};
export default ControllerView;
