import {createElement} from "../utils/render";
const SHAKE_ANIMATION_TIMEOUT = 600;


export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Нельзя создать экземпляр класса Abstract напрямую`);
    }

    this._element = null;
    this._callback = {};
  }

  _getTemplate() {
    throw new Error(`Нужно переопределить метод getTemplate()`);
  }

  _createElement() {
    return createElement(this._getTemplate());
  }

  getElement() {
    if (this._element === null) {
      this._element = this._createElement();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getInnerElement(cssSelector = ``) {
    return this.getElement().querySelector(cssSelector);
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
