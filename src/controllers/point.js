import {remove, render, replace} from "../utils/render";

import EventEditComponent from "../components/event-edit";
import EventComponent from "../components/event";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class Point {
  constructor(container, changeMode) {
    this._container = container;
    this._event = null;
    this._offers = [];
    this._mode = Mode.DEFAULT;
    this._changeMode = changeMode;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleEditBtnClickHandler = this._handleEditBtnClickHandler.bind(this);
    this._handleFormSubmitHandler = this._handleFormSubmitHandler.bind(this);
  }

  init(event, offers) {
    this._event = event;
    this._offers = offers;
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event, offers);

    this._eventComponent.setEditBtnClickHandler(this._handleEditBtnClickHandler);
    this._eventEditComponent.setSubmitHandler(this._handleFormSubmitHandler);

    render(this._container, this._eventComponent);
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDIT;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleEditBtnClickHandler() {
    this._replaceCardToForm();
  }

  _handleFormSubmitHandler() {
    this._replaceFormToCard();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode === Mode.EDIT) {
      this._replaceFormToCard();
    }
  }
}
