import {createElement, remove, render} from "../../utils/render";
import Smart from "../smart";
import HeaderComponent from "./header";
import DetailsComponent from "./details";

import flatpickr from "flatpickr";
import "../../../node_modules/flatpickr/dist/flatpickr.min.css";
import {extendObject, logToConsole} from "../../utils/common";

export default class EventEdit extends Smart {
  constructor(event, offers) {
    super();
    this._data = event;
    this._offers = offers;
    this._datepicker = null;

    this._headerComponent = null;
    this._detailsComponent = null;

    this._submitHandler = this._submitHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);

    this._setInnerHandlers();
    // this._setDatepicker();
  }

  _getTemplate() {
    return `<form class="event event--edit" action="#" method="post"></form>`;
  }


  _createElement() {
    const el = createElement(this._getTemplate());

    if (this._headerComponent !== null) {
      remove(this._headerComponent);
      this._headerComponent = null;
    }

    if (this._detailsComponent !== null) {
      remove(this._detailsComponent);
      this._detailsComponent = null;
    }

    let offers = [];
    if (this._offers.length < 0) {
      offers = this._offers
        .find((item) => item.type === this._data.type).offers
        .map((offer) => {

          const isChecked = this._data.offers.some((pointOffer) => pointOffer.title === offer.title);
          return extendObject(offer, {isChecked});
        });
    }

    this._headerComponent = new HeaderComponent(this._data);
    this._headerComponent.setDestinationChangeHandler(this._destinationChangeHandler);
    this._detailsComponent = new DetailsComponent(this._data, offers);
    render(el, this._headerComponent);
    render(el, this._detailsComponent);

    return el;
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
  }

  _typeChangeHandler(evt) {
    this.updateData({type: evt.target.value});
  }

  _destinationChangeHandler(newDestinationName) {
    logToConsole(`Изменяем destination`, newDestinationName);
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
