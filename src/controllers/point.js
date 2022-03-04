const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class Point {
  constructor(container) {
    this._container = container;

    this._event = null;

    this._mode = Mode.DEFAULT;
  }

  init(event) {
    this._event = event;
  }

  _replaceCardToForm() {

  }

  _replaceFormToCard() {

  }
}
