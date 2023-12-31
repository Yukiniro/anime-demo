import { createSlice } from '@reduxjs/toolkit';
import { InAnimeType, OutAnimeType } from '../../components/ControllerView';
import { myAnime } from '../../utils/myAnimeObj';

export interface AnimeState {
  type?: string;
  content?: Array<string>;
  inAnime?: InAnimeType;
  outAnime?: OutAnimeType;
  duration: number;
  inDuration?: number;
  outDuration?: number;
  progress?: number;
  eleRef?: HTMLDivElement | null;
  isPlaying?: boolean;
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
  eleRef: null,
  isPlaying: false,
};

export const animeStateSlice = createSlice({
  name: 'animeState',
  initialState,
  reducers: {
    updateType: (state, action) => {
      state.type = action.payload;
      state.progress = initialState.progress;
      state.isPlaying = false;

      myAnime.pause();
      myAnime.setCurrentProgress(0);
      myAnime.setType(action.payload);
      myAnime.removeElement();
      myAnime.addToView(myAnime.createView(action.payload));
      myAnime.createAnimation();
    },
    updateInAnime: (state, action) => {
      state.inAnime = action.payload;
      state.progress = initialState.progress;
      state.isPlaying = false;

      myAnime.pause();
      myAnime.setCurrentProgress(0);
      myAnime.setIntroName(action.payload as string);
      myAnime.clearDomStyle();
      myAnime.createAnimation();
    },
    updateOutAnime: (state, action) => {
      state.outAnime = action.payload;
      state.progress = initialState.progress;
      state.isPlaying = false;

      myAnime.pause();
      myAnime.setCurrentProgress(0);
      myAnime.clearDomStyle();
      myAnime.setOutroName(action.payload as string);
      myAnime.createAnimation();
    },
    updateDuration: (state, action) => {
      const totalDuration = state.inDuration + state.outDuration;
      const dura = action.payload ? action.payload : initialState.duration;
      state.duration = dura;
      state.inDuration = dura * (state.inDuration / totalDuration);
      state.outDuration = dura * (state.outDuration / totalDuration);
      state.progress = initialState.progress;
      state.isPlaying = false;

      myAnime.pause();
      myAnime.setCurrentProgress(0);
      myAnime.setDuration(action.payload * 1000);
      myAnime.setIntroDuration(state.inDuration * 1000);
      myAnime.setOutroDuration(state.outDuration * 1000);
      myAnime.clearDomStyle();
      myAnime.createAnimation();
    },
    updateInDuration: (state, action) => {
      const dura = action.payload ? action.payload : initialState.inDuration;
      state.inDuration = dura;
      state.duration = dura + state.outDuration;
      state.progress = initialState.progress;
      state.isPlaying = false;

      myAnime.pause();
      myAnime.setCurrentProgress(0);
      myAnime.setDuration(state.duration * 1000);
      myAnime.setIntroDuration(dura * 1000);
      myAnime.clearDomStyle();
      myAnime.createAnimation();
    },
    updateOutDuration: (state, action) => {
      const dura = action.payload ? action.payload : initialState.inDuration;
      state.outDuration = dura;
      state.duration = dura + state.inDuration;
      state.progress = initialState.progress;
      state.isPlaying = false;

      myAnime.pause();
      myAnime.setCurrentProgress(0);
      myAnime.setDuration(state.duration * 1000);
      myAnime.setOutroDuration(dura * 1000);
      myAnime.clearDomStyle();
      myAnime.createAnimation();
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
      myAnime.setCurrentProgress(action.payload);
    },
    updateIsPlaying: (state, action) => {
      if (state.inAnime === 'no' && state.outAnime === 'no') {
        return;
      }

      const { play } = action.payload;
      state.isPlaying = play;
      if (play) {
        myAnime.play();
      } else {
        myAnime.pause();
      }
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
      state.isPlaying = false;
      myAnime.myReset();
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
  updateIsPlaying,
} = animeStateSlice.actions;

export default animeStateSlice.reducer;
