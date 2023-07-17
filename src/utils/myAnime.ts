import anime from 'animejs';

type BaseType = string | null;
type TypeTarget = 'text' | 'word';

type FieldsType = {
  type: TypeTarget;
  duration: number;
  introDuration: number;
  outroDuration: number;
  introName: BaseType;
  outroName: BaseType;
  viewClass: BaseType;
  currentProcess: number;
  animeRef: HTMLDivElement | null;
  content: string;
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
  #type;
  #duration;
  #introDuration;
  #outroDuration;
  #introName: BaseType;
  #outroName: BaseType;
  #viewClass: BaseType;
  #currentProcess: number;
  #animeRef: HTMLDivElement | null;
  #content: string;

  constructor() {
    this.myAnimeInstance = anime.timeline({
      autoplay: false,
    });
    this.#type = 'word';
    this.#duration = 2000;
    this.#introDuration = 1000;
    this.#outroDuration = 1000;
    this.#introName = 'no';
    this.#outroName = 'no';
    this.#viewClass = '.word-dom';
    this.#currentProcess = 0;
    this.#animeRef = null;
    this.#content = '';
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
    this.seek(0);
    this.clearDomStyle();
    this.#duration = 2000;
    this.#introDuration = 1000;
    this.#outroDuration = 1000;
    this.#introName = 'no';
    this.#outroName = 'no';
    this.#viewClass = '.word-dom';
    this.myAnimeInstance = null;
    this.#currentProcess = 0;
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
      type: this.#type,
      introDuration: this.#introDuration,
      outroDuration: this.#outroDuration,
      introName: this.#introName,
      outroName: this.#outroName,
      viewClass: this.#viewClass,
      duration: this.#duration,
      currentProcess: this.#currentProcess,
      animeRef: this.#animeRef,
    };
  }

  removeElement() {
    if (this.#animeRef) {
      this.#animeRef.innerHTML = '';
    }
  }

  addToView(type: TypeTarget) {
    const els = this.createView(type);
    this.#animeRef?.append(...els);
  }

  //TODO 取代组件上的 dom 生成
  createView(type: TypeTarget) {
    let els: HTMLElement[] = [];
    if (type === 'word') {
      els = ['hello', '\u00a0', 'world'].map((o) => {
        const element = document.createElement('div');
        element.classList.add('word-dom');
        element.innerText = o;
        return element;
      });
    } else {
      els = ['h', 'e', 'l', 'l', 'o', '\u00a0', 'w', 'o', 'r', 'l', 'd'].map(
        (o) => {
          const element = document.createElement('div');
          element.classList.add('word-dom');
          element.innerText = o;
          return element;
        }
      );
    }
    return els;
  }

  clearDomStyle() {
    Array.from(this.#animeRef?.childNodes).map((c) =>
      c.removeAttribute('style')
    );
  }

  createAnimation(): anime.AnimeTimelineInstance {
    const _self = this;
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
      update(anim) {
        _self.setCurrentProcess(Math.round(anim.progress));
      },
      delay: (_, i) => {
        return i * 100;
      },
    });

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

  setCurrentProcess(process: number) {
    this.#currentProcess = process;
  }

  setAnimeRef(animeRef: HTMLDivElement | null) {
    this.#animeRef = animeRef;
  }

  currentProgress(): number {
    return this.#currentProcess;
  }

  getPaused(): boolean {
    return this.myAnimeInstance?.paused as boolean;
  }
}

export default MyAnime;
