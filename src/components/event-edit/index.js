import {createElement, render} from "../../utils/render";
import Smart from "../smart";
import HeaderComponent from "./header";
import DetailsComponent from "./details";

import flatpickr from "flatpickr";
import "../../../node_modules/flatpickr/dist/flatpickr.min.css";
import {extendObject, logToConsole} from "../../utils/common";

export default class EventEdit extends Smart {
  constructor(event, offers, destinations) {
    super();
    this._data = event;
    this._offers = offers;
    this._destinations = destinations;
    this._startDatepickr = null;
    this._endDatepickr = null;

    this._submitHandler = this._submitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);

    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._priceInputHanlder = this._priceInputHanlder.bind(this);
    this._destinationChageHandler = this._destinationChageHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  _getHeader() {
    const destinations = this._destinations.map((item) => item.name);
    return new HeaderComponent(this._data, destinations);
  }

  _getDetails() {
    return new DetailsComponent(this._data.destination, this._getOffers());
  }

  _getTemplate() {
    return `<form class="event event--edit" action="#" method="post"></form>`;
  }

  _createElement() {
    const el = createElement(this._getTemplate());

    render(el, [
      this._getHeader(),
      this._getDetails()
    ]);

    return el;
  }

  _getOffers() {
    const isOfferChecked = (offer) => {
      return this._data.offers
          .some((pointOffer) => offer.title === pointOffer.title);
    };

    return this._offers[this._data.type].map((offer) => {
      return extendObject(offer, {isChecked: isOfferChecked(offer)});
    });
  }

  _setStartDatepicker() {
    if (this._startDatepickr !== null) {
      this._startDatepickr.destroy();
      this._startDatepickr = null;
    }

    const dateStartElement = this.getInnerElement(`input[name="event-start-time"]`);

    this._startDatepickr = flatpickr(
        dateStartElement,
        {
          "enableTime": true,
          "time_24hr": true,
          "dateFormat": `d/m/y H:i`,
          "defaultDate": this._data.dateFrom,
          "maxDate": this._data.dateTo,
          "onChange": this._startDateChangeHandler,
          // "static": true
        }
    );
  }

  _setEndDatePickr() {
    if (this._endDatepickr !== null) {
      this._endDatepickr.destroy();
      this._endDatepickr = null;
    }

    this._endDatepickr = flatpickr(
        this.getInnerElement(`input[name="event-end-time"]`),
        {
          "enableTime": true,
          "time_24hr": true,
          "dateFormat": `d/m/y H:i`,
          "defaultDate": this._data.dateTo,
          "minDate": this._data.dateFrom,
          "onChange": this._endDateChangeHandler,
          // "static": true
        }
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSubmitHandler(this._callback.submit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
  }

  _setInnerHandlers() {
    this._setEndDatePickr();
    this._setStartDatepicker();

    this.getInnerElement(`.event__type-list`)
      .addEventListener(`change`, this._typeChangeHandler);
    this.getInnerElement(`.event__input--destination`)
      .addEventListener(`change`, this._destinationChageHandler);
    this.getInnerElement(`.event__input--price`)
        .addEventListener(`input`, this._priceInputHanlder);
  }

  _typeChangeHandler(evt) {
    if (evt.target.value !== this._data.type) {
      this.updateData({type: evt.target.value});
    }
  }

  _destinationChageHandler(evt) {
    const newDestinationName = evt.target.value;
    const newData = this._destinations.find((item) => item.name === newDestinationName);
    if (this._data.destination.name !== newDestinationName && newData) {
      logToConsole(`Изменяем destination`, newDestinationName);

      this.updateData({destination: newData});
    }
  }

  _priceInputHanlder(evt) {
    this.updateData({
      basePrice: Number(evt.target.value)
    }, true);
  }

  _startDateChangeHandler([newDate]) {
    this.updateData({
      dateFrom: new Date(newDate)
    }, true);
  }

  _endDateChangeHandler([newDate]) {
    this.updateData({
      dateTo: new Date(newDate)
    }, true);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(this._data);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _closeBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeBtnClick();
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
  }

  setSubmitHandler(cb) {
    this._callback.submit = cb;
    this.getElement().addEventListener(`submit`, this._submitHandler);
  }

  setFavoriteClickHandler(cb) {
    this._callback.favoriteClick = cb;
    this.getInnerElement(`.event__favorite-checkbox`)
      .addEventListener(`change`, this._favoriteClickHandler);
  }

  setCloseBtnClickHandler(cb) {
    this._callback.closeBtnClick = cb;
    this.getInnerElement(`.event__rollup-btn`)
      .addEventListener(`click`, this._closeBtnClickHandler);
  }

  setDeleteClickHandler(cb) {
    this._callback.deleteClick = cb;
    this.getInnerElement(`.event__reset-btn`)
      .addEventListener(`click`, this._deleteClickHandler);
  }

  reset(point) {
    this.updateData(point);
  }

  destroyFlatpickr() {
    if (this._endDatepickr !== null) {
      this._endDatepickr.destroy();
      this._endDatepickr = null;
    }

    if (this._startDatepickr !== null) {
      this._startDatepickr.destroy();
      this._startDatepickr = null;
    }

  }
}
