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

const createDestinationTemplate = (destintation) => {

  const description = destintation.description;

  const pictures = destintation.pictures;

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${pictures.map((picture) => (`<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)).join(`\n`)}
        </div>
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
        ${createDestinationTemplate(this._data.destination)}
      </section>`
    );
  }
}
