import moment from "moment";
import Abstract from "./abstract";
import {capitalizeFirstLetter} from "../utils/common";

const OFFERS_LIMIT = 3;

const getEventDuration = (dateFrom, dateTo) => {
  const diff = moment(dateTo).diff(dateFrom, `minutes`);
  const d = Math.floor(diff / 60 / 24);
  const h = Math.floor(diff / 60 % 24);
  const m = diff % 60;
  return `${d}D ${h}H ${m}M`;
};

const createOfferTemplate = ({title, price}) => {
  return (
    `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </li>`
  );
};


const createTemplate = (event) => {
  const {
    type,
    offers,
    dateTo,
    dateFrom,
    basePrice,
    destination,
  } = event;

  const startTime = moment(dateFrom).format(`HH:mm`);
  const endTime = moment(dateTo).format(`HH:mm`);
  const eventDuration = getEventDuration(dateFrom, dateTo);
  const title = `${capitalizeFirstLetter(type)} to ${destination.name}`;


  const offersMarkup = offers.slice(0, OFFERS_LIMIT)
    .map((offer) => createOfferTemplate(offer))
    .join(`\n`);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${endTime} </time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends Abstract {
  constructor(event) {
    super();

    this._event = event;
    this._editBtnClickHandler = this._editBtnClickHandler.bind(this);
  }

  _getTemplate() {
    return createTemplate(this._event);
  }

  _editBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.editBtnClick();
  }

  setEditBtnClickHandler(callback) {
    this._callback.editBtnClick = callback;
    this.getInnerElement(`.event__rollup-btn`)
      .addEventListener(`click`, this._editBtnClickHandler);
  }
}
