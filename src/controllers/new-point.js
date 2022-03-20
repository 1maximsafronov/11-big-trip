import EventEditComponent from "../components/event-edit";
import {remove, render} from "../utils/render";
import {nanoid} from "nanoid";
import {UserAction, UpdateType} from "../const";

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABOARDING: `ABOARDING`,
};

export default class NewPointController {
  constructor(container, offersModel, destinationsModel, changeData) {
    this._container = container;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._changeData = changeData;

    this._eventEditComponent = null;
    this._resetFormState = this._resetFormState.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  init() {
    const offers = this._offersModel.getOffers();
    const destinations = this._destinationsModel.getDestinations();
    this._eventEditComponent = new EventEditComponent(this._getEmptyPoint(), offers, destinations);

    this._eventEditComponent.getElement().classList.add(`trip-events__item`);
    this._eventEditComponent.setSubmitHandler(this._submitHandler);
    render(this._container, this._eventEditComponent);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _submitHandler(newPoint) {
    if (
      newPoint.basePrice <= 0 ||
      newPoint.destination === null ||
      newPoint.dateTo === null
    ) {
      this._eventEditComponent.shake(this._resetFormState);

      return;
    }

    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MAJOR_POINT_UPDATE,
        newPoint
    );
  }

  destroy() {
    remove(this._eventEditComponent);
  }

  _resetFormState() {
    this._eventEditComponent.updateData({
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    });

    this._eventEditComponent.getElement().classList.add(`trip-events__item`);
  }

  setViewState(state) {
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
        this._eventEditComponent.shake(this._resetFormState);
        break;
    }
  }

  _getEmptyPoint() {
    return {
      id: nanoid(),
      type: `taxi`,
      dateTo: new Date(),
      dateFrom: new Date(),
      basePrice: 0,
      isFavorite: false,
      destination: null,
      offers: [],
    };
  }
}
