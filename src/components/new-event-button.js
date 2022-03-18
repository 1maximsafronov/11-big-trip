import Abstract from "./abstract";

export default class NewEventButton extends Abstract {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  _getTemplate() {
    return (
      `<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>`
    );
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(cb) {
    this._callback.click = cb;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
