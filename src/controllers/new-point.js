import EventEditComponent from "../components/event-edit";
import {RenedrPosition} from "../const";
import {remove, render} from "../utils/render";
import {nanoid} from "nanoid";

const emptiPoint = {
  id: nanoid(),
  type: `taxi`,
  dateTo: new Date(),
  dateFrom: new Date(),
  basePrice: 0,
  isFavorite: false,
  destination: {
    name: ``,
    pictures: []
  },
  offers: [],
};

export default class NewPointController {
  constructor(container, changeData) {
    this._container = container;
    this._eventEditComponent = null;
    this._changeData = changeData;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    this._eventEditComponent = new EventEditComponent(emptiPoint, []);
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
}
