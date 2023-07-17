import { createSlice } from '@reduxjs/toolkit';
import { InAnimeType, OutAnimeType } from '../../components/ControllerView';
import { myAnime } from '../../utils/myAnimeObj';

// TODO word 和 text 不应该放在这里，而是在 type 改变后进行动画的计算
const typeMap = {
  word: ['hello', ' ', 'world'],
  text: ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'],
};

interface AnimeState {
  type?: string;
  content?: Array<string>;
  inAnime?: InAnimeType;
  outAnime?: OutAnimeType;
  duration: number;
  inDuration?: number;
  outDuration?: number;
  progress?: number;
}

const initialState: AnimeState = {
  type: 'word',
  content: ['hello', ' ', 'world'],
  inAnime: 'no',
  outAnime: 'no',
  duration: 2,
  inDuration: 1,
  outDuration: 1,
  progress: 0,
};


// TODO 当前版本的 redux 中的 reducer 可以不是纯函数了吗？
export const animeStateSlice = createSlice({
  name: 'animeState',
  initialState,
  reducers: {
    updateType: (state, action) => {
      state.type = action.payload;
      state.content = typeMap[action.payload];

      // TODO 是否需要 setTimeout。createAnimation 应该要在控制范围之内
      // 如果说会被视图上的 dom 更新影响，那么应该考虑完善或者取消跟视图的联系
      setTimeout(() => {
        myAnime.createAnimation();
      }, 0);
    },
    updateInAnime: (state, action) => {
      state.inAnime = action.payload;
      myAnime.setIntroName(action.payload as string);
      myAnime.createAnimation();
    },
    updateOutAnime: (state, action) => {
      state.outAnime = action.payload;
      myAnime.setOutroName(action.payload as string);
      myAnime.createAnimation();
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
      state.content = initialState.content;
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
