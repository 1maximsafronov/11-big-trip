import Abstract from "./abstract";
import {createElement, render} from "../utils/render";

export default class TripInfo extends Abstract {
  constructor() {
    super();

    this._tripInfo = {};
  }

  _getInfoTitle() {
    const el = createElement(
        `<h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>`
    );

    return el;
  }

  _getInfoDates() {
    const el = createElement(
        `<p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>`
    );

    return el;
  }

  _getInfoMain() {
    const el = createElement(`<div class="trip-info__main"></div>`);

    render(el, [
      this._getInfoTitle(),
      this._getInfoDates(),
    ]);

    return el;
  }

  _getInfoCost() {
    const el = createElement(
        `<p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
        </p>`
    );

    return el;
  }

  _getTemplate() {
    return `<section class="trip-main__trip-info  trip-info"></section>`;
  }

  _createElement() {
    const el = createElement(this._getTemplate());

    render(el, [
      this._getInfoMain(),
      this._getInfoCost(),
    ]);

    return el;
  }
}
