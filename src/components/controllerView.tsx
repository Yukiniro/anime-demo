import { Button, InputNumber, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateParams } from '../features/anime/animeSlice';

export type InAnimeType = 'scaleUp' | 'shift' | 'contract' | 'no';
export type OutAnimeType = 'glossyBlur' | 'no';

const ControllerView = () => {
  const [form] = useForm();
  const [play, setPlay] = useState(false);
  const animeState = useSelector((state) => state);
  console.log(animeState);

  const dispatch = useDispatch();

  const onTypeChange = (v: 'text' | 'word') => {
    dispatch(updateParams({ type: v }));
  };

  const onInAnime = (v: InAnimeType) => {
    dispatch(updateParams({ inAnime: v }));
    // switch (v) {
    //   case 'scaleUp':
    //     myAnime.updateAnimeParams({ inAnime: { scale: [0, 4] } });
    //     break;
    //   case 'shift':
    //     myAnime.updateAnimeParams({ inAnime: { scale: [0, 4] } });
    //     break;
    //   case 'contract':
    //     myAnime.updateAnimeParams({ inAnime: { scale: [0, 4] } });
    //     break;
    //   case 'glossyBlur':
    //     myAnime.updateAnimeParams({ inAnime: { scale: [0, 4] } });
    //     break;
    //   default:
    //     myAnime.updateAnimeParams({ inAnime: undefined });
    //     break;
    // }
  };

  const onOutAnime = (v: OutAnimeType) => {
    dispatch(updateParams({ outAnime: v }));
  };

  const onDuration = (v: number | null) => {
    dispatch(updateParams({ duration: v }));
  };

  const onStart = () => {};

  return (
    <div className="p-4 border flex flex-col gap-y-4">
      <div>
        <span>动画目标：</span>
        <Select
          defaultValue="word"
          onChange={onTypeChange}
          style={{ width: 120 }}
          options={[
            { value: 'text', label: '文字' },
            { value: 'word', label: '单词' },
          ]}
        />
      </div>
      <div>
        <span>入场动画：</span>
        <Select
          defaultValue={'no'}
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
          defaultValue={'no'}
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
          defaultValue={2}
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
          {play ? '暂停' : '播放'}
        </Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </div>
    </div>
  );
};
export default ControllerView;
