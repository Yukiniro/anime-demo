import { useEffect, useRef, useState } from 'react';
import MyAnime from '../utils/myAnime';
//  a. 入场：scale up，shift，contract
// b. 出场：glossy blur


// TODO 组件文件名和组件名保持一致，首字母大写
const AnimateText = () => {
  const textRef = useRef<MyAnime>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    textRef.current = new MyAnime({
      targets: '.anime-text',
      autoplay: false,
    });
  }, []);

  const onSelectedItems = (type: string) => {
    const items = selectedItems;
    if (items.includes(type)) {
      setSelectedItems(items.filter((i) => i !== type));
    } else {
      setSelectedItems([...selectedItems, type]);
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <div className="anime-text w-fit text-2xl z-0">Hello World</div>
      </div>

      <div className="space-x-2">
        <span>类型：</span>
        <span className="space-x-1">
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="scaleUp"
            onChange={() => {
              textRef.current?.addScaleUp();
            }}
          />
          <label>scale up</label>
        </span>
        <span className="space-x-1">
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="shift"
            onChange={() => {
              textRef.current?.addShift();
            }}
          />
          <label>shift</label>
        </span>
        <span className="space-x-1">
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="contract"
            onChange={() => {
              textRef.current?.addContract();
            }}
          />
          <label>contract</label>
        </span>
        <span className="space-x-1">
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="glossy blur"
            onChange={() => {
              textRef.current?.addGlossyBlur();
            }}
          />
          <label>glossy blur</label>
        </span>
      </div>
      <div className="space-x-2">
        <span>操作：</span>
        <button
          onClick={() => {
            textRef.current?.play();
          }}
        >
          play
        </button>
        <button
          onClick={() => {
            textRef.current?.pouse();
          }}
        >
          pouse
        </button>
        <button
          onClick={() => {
            textRef.current?.seek(200);
          }}
        >
          seek
        </button>
      </div>
      <div>
        <span>时长设置：</span>
        <input
          className="p-1 rounded-lg"
          placeholder="输入时长"
          type="number"
          min={0}
          onChange={(e) => {
            textRef.current?.updateDuration(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default AnimateText;
