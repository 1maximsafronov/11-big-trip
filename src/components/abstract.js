import {createElement} from "../utils";

export default class Abstract {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Нужно переопределить метод getTemplate()`);
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
