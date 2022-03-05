import {createElement, render} from "../utils/render";
import Smart from "./smart";

const createHeaderTemplate = (event) => {
  const {isFavorite, type} = event;
  return (
    `<header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          Flight to
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input class="event__favorite-checkbox visually-hidden"
        id="event-favorite-1"
        type="checkbox"
        name="event-favorite"
        ${isFavorite ? `checked` : ``}
      >
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>`
  );
};


export default class EventEdit extends Smart {
  constructor(event, offers) {
    super();

    this._data = event;
    this._offers = offers;

    this._submitHandler = this._submitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._typeChangeHandler = this._typeChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  _getTemplate() {
    return `<li class="trip-events__item"></li>`;
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit();
  }

  setSubmitHandler(callback) {
    this._callback.submit = callback;

    const editForm = this.getElement().querySelector(`form`);
    editForm.addEventListener(`submit`, this._submitHandler);
  }

  _getHeaderElement() {
    const el = createElement(createHeaderTemplate(this._data));

    return el;
  }

  _getOfferElement(offer) {
    const {name, title, price, isChecked} = offer;
    const template = (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
          type="checkbox"
          id="event-offer-${name}-1"
          name="event-offer-${name}"
          ${isChecked ? `checked` : ``}
        >
        <label class="event__offer-label" for="event-offer-${name}-1">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );

    const el = createElement(template);

    return el;
  }

  _getOffersListElement() {
    const el = createElement(`<div class="event__available-offers"></div>`);
    const offers = this._offers.find((item) => item.type === this._data.type).offers;

    for (const offer of offers) {
      render(el, this._getOfferElement(offer));
    }

    return el;
  }

  _getOffersElement() {
    const el = createElement((
      `<section class="event__section event__section--offers">
        <h3 class="event__section-title event__section-title--offers">Offers</h3>
      </section>`
    ));

    render(el, this._getOffersListElement());

    return el;
  }

  _getDetailsElement() {
    const el = createElement(`<section class="event__details"></section>`);
    render(el, this._getOffersElement());

    return el;
  }

  _getFormElement() {
    const el = createElement(`<form class="event  event--edit" action="#" method="post"></form>`);
    render(el, this._getHeaderElement());
    render(el, this._getDetailsElement());

    return el;
  }

  _createElement() {
    const el = super._createElement();
    render(el, this._getFormElement());

    return el;
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector(`.event__favorite-checkbox`)
      .addEventListener(`change`, this._favoriteClickHandler);
  }

  _typeChangeHandler(evt) {
    this.updateData({
      type: evt.target.value
    });
  }

  _setInnerHandlers() {
    const typeList = this.getElement().querySelector(`.event__type-list`);

    typeList.addEventListener(`change`, this._typeChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSubmitHandler(this._callback.submit);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }
}
