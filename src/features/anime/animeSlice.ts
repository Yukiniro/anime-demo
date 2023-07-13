import { createSlice } from '@reduxjs/toolkit';
import { InAnimeType, OutAnimeType } from '../../components/ControllerView';
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
  type: '.word-dom',
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
      state.type = action.payload;
      myAnime.setViewClass(action.payload as string);
      myAnime.createAnimation();
    },
    updateInAnime: (state, action) => {
      state.inAnime = action.payload;
      myAnime.setIntroName(action.payload as string);
      myAnime.createAnimation();

      // const addParams = inAnimeMap[action.payload];

      // TODO 外部不应该直接获取实际的动画实例，而是应该由 myAnime 代理
      // const instance = myAnime.updateAnimeInstance({
      //   targets: state.type === 'text' ? '.letters' : '.word-dom',
      //   autoplay: false,
      //   duration: state.duration * 1000,
      //   easing: 'linear',
      // });
      // if (state.outAnime !== 'no') {
      //   instance.add(addParams).add(outAnimeMap[state.outAnime]);
      // } else {
      //   instance.add(addParams);
      // }
    },
    updateOutAnime: (state, action) => {
      state.outAnime = action.payload;
      myAnime.setOutroName(action.payload as string);
      myAnime.createAnimation();

      // const addParams = outAnimeMap[action.payload];
      // const instance = myAnime.updateAnimeInstance({
      //   targets: state.type === 'text' ? '.letters' : '.word-dom',
      //   autoplay: false,
      //   duration: state.duration * 1000,
      //   easing: 'linear',
      // });
      // if (state.inAnime !== 'no') {
      //   instance.add(inAnimeMap[state.inAnime]).add(addParams);
      // } else {
      //   instance.add(addParams);
      // }
    },
    updateDuration: (state, action) => {
      const totalDuration = state.inDuration + state.outDuration;
      const dura = action.payload ? action.payload : initialState.duration;
      state.duration = dura;
      state.inDuration = dura * (state.inDuration / totalDuration);
      state.outDuration = dura * (state.outDuration / totalDuration);
      myAnime.setDuration(action.payload * 1000);
      myAnime.setIntroDuration(state.inDuration * 1000);
      myAnime.setOutroDuration(state.outDuration * 1000);
      myAnime.createAnimation();
    },
    updateInDuration: (state, action) => {
      const dura = action.payload ? action.payload : initialState.inDuration;
      state.inDuration = dura;
      state.duration = dura + state.outDuration;
      myAnime.setDuration(state.duration * 1000);
      myAnime.setIntroDuration(dura * 1000);
      myAnime.createAnimation();
    },
    updateOutDuration: (state, action) => {
      const dura = action.payload ? action.payload : initialState.inDuration;
      state.outDuration = dura;
      state.duration = dura + state.inDuration;
      myAnime.setDuration(state.duration * 1000);
      myAnime.setOutroDuration(dura * 1000);
      myAnime.createAnimation();
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
    resetAnime(state) {
      state.type = initialState.type;
      state.inAnime = initialState.inAnime;
      state.outAnime = initialState.outAnime;
      state.duration = initialState.duration;
      state.inDuration = initialState.inDuration;
      state.outDuration = initialState.outDuration;
      state.progress = initialState.progress;
      myAnime.reset();
    },
  },
});

export const {
  updateType,
  updateInAnime,
  updateOutAnime,
  updateDuration,
  updateProgress,
  updateInDuration,
  updateOutDuration,
  resetAnime,
} = animeStateSlice.actions;

export default animeStateSlice.reducer;
