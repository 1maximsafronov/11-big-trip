import {remove, render, replace} from "../utils/render";
import {extendObject, logToConsole} from "../utils/common";
import {UserAction} from "../const";
import EventEditComponent from "../components/event-edit";
import EventComponent from "../components/event";
import EventContainer from "../components/event-container";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABOARDING: `ABOARDING`,
};

export default class Point {
  constructor(container, offersModel, destinationsModel, changeMode, changeData) {
    this._container = container;
    this._event = null;
    this._mode = Mode.DEFAULT;
    this._changeMode = changeMode;
    this._changeData = changeData;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._eventContainer = null;
    this._eventComponent = null;
    this._eventEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEditBtnClick = this._handleEditBtnClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEditFormSubmit = this._handleEditFormSubmit.bind(this);
    this._handleEditCloseBtnClick = this._handleEditCloseBtnClick.bind(this);
    this._handleDeleteClickHandler = this._handleDeleteClickHandler.bind(this);
  }

  init(event) {
    this._event = event;
    this._renderEventContainer();
    this._renderEventCard();
    this._renderEventEditForm();
  }

  _renderEventContainer() {
    const prevEventContainer = this._eventContainer;
    this._eventContainer = new EventContainer();

    if (prevEventContainer === null) {
      render(this._container, this._eventContainer);
      return;
    }
  }

  _renderEventCard() {
    const prevEventComponent = this._eventComponent;
    this._eventComponent = new EventComponent(this._event);
    this._eventComponent.setEditBtnClickHandler(this._handleEditBtnClick);

    if (prevEventComponent === null) {
      render(this._eventContainer, this._eventComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    remove(prevEventComponent);
  }

  _renderEventEditForm() {
    const offers = this._offersModel.getOffers();
    const destinations = this._destinationsModel.getDestinations();
    const prevEventEditComponent = this._eventEditComponent;
    this._eventEditComponent = new EventEditComponent(this._event, offers, destinations);

    this._eventEditComponent.setSubmitHandler(this._handleEditFormSubmit);
    this._eventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClickHandler);
    this._eventEditComponent.setCloseBtnClickHandler(this._handleEditCloseBtnClick);

    if (prevEventEditComponent === null) {
      if (this._mode === Mode.EDIT) {
        render(this._eventContainer, this._eventEditComponent);
      }
      return;
    }

    if (this._mode === Mode.EDIT) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventEditComponent);
  }

  destroy() {
    this._eventEditComponent.destroyFlatpickr();
    remove(this._eventContainer);
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode === Mode.EDIT) {
      this._eventEditComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABOARDING:
        this._eventEditComponent.shake(resetFormState);
        this._eventComponent.shake(resetFormState);
        break;
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

  _handleEditFormSubmit(updatedPoint) {
    logToConsole(`Обновляем данные точки`, updatedPoint);
    this._changeData(
        UserAction.UPDATE_POINT,
        updatedPoint
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        extendObject(this._event, {isFavorite: !this._event.isFavorite})
    );
  }

  _handleEditCloseBtnClick() {
    this._eventEditComponent.reset(this._event);
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
      this._eventEditComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }
}
