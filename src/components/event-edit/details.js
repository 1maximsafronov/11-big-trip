import Abstract from "../abstract";
import {createElement, remove, render} from "../../utils/render";

const createOfferItemTemplate = ({name, title, price, isChecked}) => {
  return (
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
};

const createOffersListTemplate = (offers) => {
  if (offers <= 0) {
    return ``;
  }

  const offersMarkup = offers.map(createOfferItemTemplate).join(`\n`);

  return (
    `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersMarkup}
      </div>
    </section>`
  );
};


export default class EditDetails extends Abstract {
  constructor(point, offers) {
    super();
    this._data = point;
    this._offers = offers;
  }

  _getTemplate() {
    let offersListMarkup = ``;

    if (this._offers.length > 0) {
      offersListMarkup = createOffersListTemplate(this._offers);
    }

    return (
      `<section class="event__details">
        ${offersListMarkup}
      </section>`
    );
  }
}
