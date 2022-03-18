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
    this._datepicker = null;

    this._submitHandler = this._submitHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChageHandler = this._destinationChageHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._setInnerHandlers();
    // this._setDatepicker();
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

  _setDatepicker() {
    if (this._datepicker !== null) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
        this.getInnerElement(`input[name="event-start-time"]`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.dateFrom,
          onChange: () => {}
        }
    );
  }

  restoreHandlers() {
    // this._setDatepicker();
    this._setInnerHandlers();
    this.setSubmitHandler(this._callback.submit);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setInnerHandlers() {
    this.getInnerElement(`.event__type-list`)
      .addEventListener(`change`, this._typeChangeHandler);
    this.getInnerElement(`.event__input--destination`)
      .addEventListener(`change`, this._destinationChageHandler);
  }

  _typeChangeHandler(evt) {
    if (evt.target.value !== this._data.type) {
      this.updateData({type: evt.target.value});
    }
  }

  _destinationChageHandler(evt) {
    const newDestinationName = evt.target.value;
    if (this._data.destination.name !== newDestinationName) {
      logToConsole(`Изменяем destination`, newDestinationName);
      const newData = this._destinations.find((item) => item.name === newDestinationName);
      this.updateData({destination: newData});
    }
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit();
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
    this.getElement()
      .addEventListener(`submit`, this._submitHandler);
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
}
