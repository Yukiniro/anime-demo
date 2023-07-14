import anime from 'animejs';

type BaseType = string | null;
type FieldsType = {
  duration: number;
  introDuration: number;
  outroDuration: number;
  introName: BaseType;
  outroName: BaseType;
  viewClass: BaseType;
};
const inAnimeMap: Record<string, anime.AnimeAnimParams> = {
  no: {},
  scaleUp: {
    scale: [0, 1],
    opacity: [0, 1],
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

const outAnimeMap: Record<string, anime.AnimeAnimParams> = {
  no: {},
  glossyBlur: {
    filter: ['blur(0)', 'blur(4px)'],
    scale: [1, 2],
    opacity: [1, 0],
  },
};

class MyAnime {
  myAnimeInstance: anime.AnimeTimelineInstance | null;
  #duration;
  #introDuration;
  #outroDuration;
  #introName: BaseType;
  #outroName: BaseType;
  #viewClass: BaseType;

  constructor() {
    this.myAnimeInstance = anime.timeline({
      autoplay: false,
    });
    this.#duration = 2000;
    this.#introDuration = 1000;
    this.#outroDuration = 1000;
    this.#introName = 'no';
    this.#outroName = 'no';
    this.#viewClass = '.word-dom';
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
    this.#duration = 2000;
    this.#introDuration = 1000;
    this.#outroDuration = 1000;
    this.#introName = 'no';
    this.#outroName = 'no';
    this.#viewClass = '.word-dom';
    this.myAnimeInstance?.remove(this.#viewClass);
    this.myAnimeInstance = null;
  }

  setDuration(duration: number) {
    this.#duration = duration;
  }

  setIntroDuration(duration: number): void {
    this.#introDuration = duration;
  }

  getIntroDuration(): number {
    return this.#introDuration;
  }

  setOutroDuration(duration: number): void {
    this.#outroDuration = duration;
  }

  getOutroDuration(): number {
    return this.#outroDuration;
  }

  setIntroName(name: string): void {
    this.#introName = name;
  }

  getIntroName(): BaseType {
    return this.#introName;
  }

  setOutroName(name: string): void {
    this.#outroName = name;
  }

  getOutroName(): BaseType {
    return this.#outroName;
  }

  setViewClass(domClass: BaseType): void {
    this.#viewClass = domClass;
  }

  getViewClass(): BaseType {
    return this.#viewClass;
  }

  #getFieldsParams(): FieldsType {
    return {
      introDuration: this.#introDuration,
      outroDuration: this.#outroDuration,
      introName: this.#introName,
      outroName: this.#outroName,
      viewClass: this.#viewClass,
      duration: this.#duration,
    };
  }

  //todo: dom更新
  createView(): HTMLDivElement {
    const viewClass = this.getViewClass();
    const textWrapper = document.querySelector('.word-dom');

    if (viewClass === '.text-dom') {
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
    return textWrapper as HTMLDivElement;
  }

  createAnimation(): anime.AnimeTimelineInstance {
    const {
      viewClass,
      duration,
      introDuration,
      outroDuration,
      introName,
      outroName,
    } = this.#getFieldsParams();
    const animeInstance = anime.timeline({
      targets: viewClass,
      autoplay: false,
      easing: 'linear',
      duration,
      delay: (_, i) => {
        return i * 100;
      },
      // delay: anime.stagger(200),
    });

    if (introName !== 'no' && outroName !== 'no') {
      return (this.myAnimeInstance = animeInstance
        .add({
          duration: introDuration,
          ...inAnimeMap[introName as string],
        })
        .add({
          duration: outroDuration,
          ...outAnimeMap[outroName as string],
        }));
    }
    if (introName !== 'no' && outroName === 'no') {
      return (this.myAnimeInstance = animeInstance.add({
        duration: introDuration,
        ...inAnimeMap[introName as string],
      }));
    }
    if (introName === 'no' && outroName !== 'no') {
      return (this.myAnimeInstance = animeInstance.add({
        duration: outroDuration,
        ...outAnimeMap[outroName as string],
      }));
    }
  }

  currentProgress(): number {
    return this.myAnimeInstance?.progress as number;
  }
}

export default MyAnime;
