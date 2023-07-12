import anime from 'animejs';

class MyAnime {
  myAnimeInstance: anime.AnimeTimelineInstance;
  myAnime;

  constructor() {
    this.myAnime = anime;
    this.myAnimeInstance = this.myAnime.timeline({
      autoplay: false,
      duration: 2000,
    });
  }

  updateAnimeInstance(params?: anime.AnimeParams) {
    this.myAnimeInstance = anime.timeline(params);
    return this.myAnimeInstance;
  }

  getMyInstance(): anime.AnimeTimelineInstance {
    return this.myAnimeInstance;
  }

  play() {
    this.myAnimeInstance?.play();
  }

  seek(number: number) {
    this.myAnimeInstance?.seek(this.myAnimeInstance.duration * (number / 100));
  }

  pause() {
    this.myAnimeInstance?.pause();
  }

  reset() {
    this.updateAnimeInstance({
      targets: '.word-dom',
      autoplay: false,
      easing: 'linear',
      duration: 2,
    });
  }
}

export default MyAnime;
