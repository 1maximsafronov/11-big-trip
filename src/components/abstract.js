import {createElement} from "../utils";

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
