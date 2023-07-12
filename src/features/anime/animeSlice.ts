import { createSlice } from '@reduxjs/toolkit';
import { InAnimeType, OutAnimeType } from '../../components/controllerView';

interface AnimeState {
  type?: string;
  inAnime?: InAnimeType;
  outAnime?: OutAnimeType;
  duration?: number;
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
};

export const animeStateSlice = createSlice({
  name: 'animeState',
  initialState,
  reducers: {
    updateParams: (state, action) => {
      const textWrapper = document.querySelector('.word-dom');

      if (action.payload.type === 'text') {
        textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
      } else {
        const letters = document.querySelectorAll('.letter');
        let str = '';
        letters.forEach((letter) => {
          str += letter.innerText;
        });
        textWrapper.innerText = str;
      }

      state.type = action.payload.type || state.type;
      state.inAnime = action.payload.inAnime || state.inAnime;
      state.outAnime = action.payload.outAnime || state.outAnime;
      state.duration = action.payload.duration || state.duration;
      state.inDuration = action.payload.inDuration || state.inDuration;
      state.outDuration = action.payload.outDuration || state.outDuration;
    },
  },
});

export const { updateParams } = animeStateSlice.actions;

export default animeStateSlice.reducer;
