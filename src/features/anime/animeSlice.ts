import { createSlice } from '@reduxjs/toolkit';
import { InAnimeType, OutAnimeType } from '../../components/controllerView';
import { myAnime } from '../../utils/myAnimeObj';

const inAnimeMap = {
  no: {},
  scaleUp: {
    scale: [1, 4],
  },
  shift: {
    translateY: [-20, 0],
    opacity: [0, 1],
  },
  contract: {
    translateX: [20, 0],
    opacity: [0, 1],
  },
};

const outAnimeMap = {
  no: {},
  glossyBlur: {
    filter: ['blur(0)', 'blur(4px)'],
    scale: [1, 4],
    opacity: [1, 0],
  },
};

interface AnimeState {
  type?: string;
  inAnime?: InAnimeType;
  outAnime?: OutAnimeType;
  duration: number;
  inDuration?: number;
  outDuration?: number;
  progress?: number;
}

const initialState: AnimeState = {
  type: 'word',
  inAnime: 'no',
  outAnime: 'no',
  duration: 2,
  inDuration: 1,
  outDuration: 1,
  progress: 0,
};

export const animeStateSlice = createSlice({
  name: 'animeState',
  initialState,
  reducers: {
    updateType: (state, action) => {
      // TODO 动画的 target 应该从实例中获取
      // TODO 一般情况下不直接使用 DOM 的查询 API
      const textWrapper = document.querySelector('.word-dom');

      if (action.payload === 'text') {
        // TODO 内容的更新应该内置于动画实例
        textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
      } else {
        // TODO 同上
        const letters = document.querySelectorAll('.letter');
        let str = '';
        letters.forEach((letter) => {
          str += letter.innerText;
        });
        textWrapper.innerText = str;
      }
      state.type = action.payload;
    },
    updateInAnime: (state, action) => {
      state.inAnime = action.payload;
      const addParams = inAnimeMap[action.payload];

      // TODO 外部不应该直接获取实际的动画实例，而是应该由 myAnime 代理
      const instance = myAnime.updateAnimeInstance({
        targets: state.type === 'text' ? '.letters' : '.word-dom',
        autoplay: false,
        duration: state.duration * 1000,
        easing: 'linear',
      });
      if (state.outAnime !== 'no') {
        instance.add(addParams).add(outAnimeMap[state.outAnime]);
      } else {
        instance.add(addParams);
      }
    },
    updateOutAnime: (state, action) => {
      state.outAnime = action.payload;
      const addParams = outAnimeMap[action.payload];
      const instance = myAnime.updateAnimeInstance({
        targets: state.type === 'text' ? '.letters' : '.word-dom',
        autoplay: false,
        duration: state.duration * 1000,
        easing: 'linear',
      });
      if (state.inAnime !== 'no') {
        instance.add(inAnimeMap[state.inAnime]).add(addParams);
      } else {
        instance.add(addParams);
      }
    },
    updateDuration: (state, action) => {
      state.duration = action.payload;
      const instance = myAnime.updateAnimeInstance({
        targets: state.type === 'text' ? '.letters' : '.word-dom',
        autoplay: false,
        duration: state.duration * 1000,
        easing: 'linear',
      });
      if (state.inAnime !== 'no') {
        instance.add(inAnimeMap[state.inAnime]);
      }
      if (state.outAnime !== 'no') {
        instance.add(outAnimeMap[state.outAnime]);
      }
      if (state.inAnime !== 'no' && state.outAnime !== 'no') {
        instance
          .add(inAnimeMap[state.inAnime])
          .add(outAnimeMap[state.outAnime]);
      }
    },
    resetAnime(state) {
      state.type = initialState.type;
      state.inAnime = initialState.inAnime;
      state.outAnime = initialState.outAnime;
      state.duration = initialState.duration;
      state.inDuration = initialState.inDuration;
      state.outDuration = initialState.outDuration;
      myAnime.reset();
    },
  },
});

export const {
  updateType,
  updateInAnime,
  updateOutAnime,
  updateDuration,
  resetAnime,
} = animeStateSlice.actions;

export default animeStateSlice.reducer;
