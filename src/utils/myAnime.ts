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
  completed: boolean;
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
    scale: [1, 1.5],
    opacity: [1, 0],
  },
};

class MyAnime {
  myAnimeInstance: anime.AnimeTimelineInstance | null;
  #type: TypeTarget;
  #duration;
  #introDuration;
  #outroDuration;
  #introName: BaseType;
  #outroName: BaseType;
  #viewClass: BaseType;
  #currentProgress: number;
  #animeRef: HTMLDivElement | null;
  #content: string;
  #completed: boolean;
  #delayTime: number;

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
    this.#currentProgress = 0;
    this.#animeRef = null;
    this.#content = 'hello world';
    this.#completed = false;
    this.#delayTime = 100;
  }

  play() {
    this.myAnimeInstance?.play();
  }

  seek(val: number) {
    let delayTotal = this.#animeRef
      ? (this.#animeRef.childNodes.length - 1) * this.#delayTime
      : 0;
    this.myAnimeInstance?.reset();
    this.myAnimeInstance?.seek((this.#duration + delayTotal) * (val / 100));
  }

  pause() {
    this.myAnimeInstance?.pause();
  }

  myReset() {
    this.pause();
    this.seek(0);
    this.clearDomStyle();
    this.#duration = 2000;
    this.#introDuration = 1000;
    this.#outroDuration = 1000;
    this.#introName = 'no';
    this.#outroName = 'no';
    this.#viewClass = '.word-dom';
    this.myAnimeInstance = null;
    this.#currentProgress = 0;
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
      currentProcess: this.#currentProgress,
      animeRef: this.#animeRef,
      content: this.#content,
      completed: this.#completed,
    };
  }

  removeElement() {
    if (this.#animeRef) {
      this.#animeRef.innerHTML = '';
    }
  }

  addToView(els: HTMLElement[]): void {
    if (this.#animeRef) {
      this.#animeRef.append(...els);
    }
  }

  createView() {
    let els: HTMLElement[] = [];
    let newContent = [];
    if (this.#type === 'word') {
      newContent = this.#content.split(/(\s+)/);
    } else {
      const newArr: string[][] = [];
      this.#content.split(/(\s+)/).map((c) => {
        return newArr.push(c.split(''));
      });
      newContent = newArr.flat();
    }

    els = newContent.map((o) => {
      const element = document.createElement('div');
      element.classList.add('word-dom');
      element.innerText = o === ' ' ? '\u00a0' : o;
      return element;
    });

    return els;
  }

  clearDomStyle() {
    Array.from(this.#animeRef?.childNodes).map((c) =>
      c.removeAttribute('style')
    );
  }

  createAnimation() {
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
      duration: duration,
      update(anim) {
        _self.setCurrentProgress(Math.round(anim.progress));
      },
      complete(anim) {
        _self.setCompleted(anim.completed);
      },
      delay(_, i) {
        return i * 100;
      },
    });

    this.myAnimeInstance = animeInstance
      .add({
        duration: introDuration,
        ...inAnimeMap[introName as string],
      })
      .add({
        duration: outroDuration,
        ...outAnimeMap[outroName as string],
      });
  }

  setCompleted(completed: boolean) {
    this.#completed = completed;
  }

  getCompleted(): boolean {
    return this.#completed;
  }

  setCurrentProgress(process: number) {
    this.#currentProgress = process;
  }

  setAnimeRef(animeRef: HTMLDivElement | null) {
    this.#animeRef = animeRef;
  }

  setType(type: TypeTarget) {
    this.#type = type;
  }

  currentProgress(): number {
    return this.#currentProgress;
  }

  getPaused(): boolean {
    return this.myAnimeInstance?.paused as boolean;
  }
}

export default MyAnime;
