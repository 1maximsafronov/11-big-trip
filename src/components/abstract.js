import {createElement} from "../utils/render";

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
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
