import EventEditComponent from "../components/event-edit";
import {RenedrPosition} from "../const";
import {remove, render} from "../utils/render";
import {nanoid} from "nanoid";


export default class NewPointController {
  constructor(container, offersModel, destinationsModel, changeData) {
    this._container = container;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._changeData = changeData;

    this._eventEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    const offers = this._offersModel.getOffers();
    const destinations = this._destinationsModel.getDestinations();
    this._eventEditComponent = new EventEditComponent(this._getEmptyPoint(), offers, destinations);
    this._eventEditComponent.getElement().classList.add(`trip-events__item`);
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

  destroy() {
    remove(this._eventEditComponent);
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
