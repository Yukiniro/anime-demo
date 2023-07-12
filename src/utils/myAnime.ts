import anime from 'animejs';

type ParamsType = {
  inAnime?: anime.AnimeParams;
  outAnime?: anime.AnimeParams;
};

class MyAnime {
  myAnimeInstance: anime.AnimeTimelineInstance;
  myAnimeInstanceParams: ParamsType;

  constructor() {
    this.myAnimeInstance = anime.timeline({ autoplay: false, duration: 2000 });
    this.myAnimeInstanceParams = {};
  }

  updateAnimeInstance(params: anime.AnimeParams) {
    this.myAnimeInstance = anime.timeline(params);
  }

  getMyInstance(): anime.AnimeTimelineInstance {
    return this.myAnimeInstance;
  }

  updateAnimeParams(params: ParamsType) {
    this.myAnimeInstanceParams = {
      inAnime: { ...this.myAnimeInstanceParams.inAnime, ...params.inAnime },
      outAnime: { ...this.myAnimeInstanceParams.outAnime, ...params.outAnime },
    };
  }

  getAnimeInstanceParams(): ParamsType {
    return this.myAnimeInstanceParams;
  }

  play() {
    const inAnime = this.myAnimeInstanceParams['inAnime'];
    const outAnime = this.myAnimeInstanceParams['outAnime'];

    this.myAnimeInstance = anime.timeline({
      targets: inAnime?.targets,
      autoplay: false,
    });

    if (inAnime && Object.keys(inAnime).length !== 0) {
      this.myAnimeInstance
        ?.add({
          ...inAnime,
        })
        .play();
    }
    // if (outAnime && Object.keys(outAnime).length !== 0) {
    //   this.myAnimeInstance = this.myAnimeInstance.add({
    //     ...outAnime,
    //   });
    // }
  }

  pause() {
    this.myAnimeInstance?.pause();
  }
}

export default MyAnime;
