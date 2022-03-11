import {remove, render, replace} from "../utils/render";
import {extendObject} from "../utils/common";
import {UserAction} from "../const";
import EventEditComponent from "../components/event-edit";
import EventComponent from "../components/event";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class Point {
  constructor(container, changeMode, changeData) {
    this._container = container;
    this._event = null;
    this._offers = [];
    this._mode = Mode.DEFAULT;
    this._changeMode = changeMode;
    this._changeData = changeData;
    this._eventComponent = null;
    this._eventEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEditBtnClick = this._handleEditBtnClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEditFormSubmit = this._handleEditFormSubmit.bind(this);
    this._handleEditCloseBtnClick = this._handleEditCloseBtnClick.bind(this);
    this._handleDeleteClickHandler = this._handleDeleteClickHandler.bind(this);
  }

  init(event, offers) {
    this._event = event;
    this._offers = offers;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event, offers);

    this._eventComponent.setEditBtnClickHandler(this._handleEditBtnClick);

    this._eventEditComponent.setSubmitHandler(this._handleEditFormSubmit);
    this._eventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClickHandler);
    this._eventEditComponent.setCloseBtnClickHandler(this._handleEditCloseBtnClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._container, this._eventComponent);

      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDIT) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
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

  _handleEditBtnClick() {
    this._replaceCardToForm();
  }

  _handleEditFormSubmit() {
    this._changeData(
        UserAction.UPDATE_POINT,
        this._event
    );

    this._replaceFormToCard();
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        extendObject(this._event, {isFavorite: !this._event.isFavorite})
    );
  }

  _handleEditCloseBtnClick() {
    this._replaceFormToCard();
  }

  _handleDeleteClickHandler() {
    this._changeData(
        UserAction.DELETE_POINT,
        this._event
    );
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }
}
