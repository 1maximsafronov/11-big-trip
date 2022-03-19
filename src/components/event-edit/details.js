import Abstract from "../abstract";
import {createElement, render} from "../../utils/render";

// !Небольшой фикс для url картинок
const fixPicUrl = (url) => {
  return url.replace(`http`, `https`);
};

const createOfferItemTemplate = ({id, title, price, isChecked}) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden"
        type="checkbox"
        id="event-offer-${id}"
        name="event-offer-${id}"
        ${isChecked ? `checked` : ``}
      >
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOffersSTemplate = () => {
  return (
    `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">
        Offers
      </h3>
      <div class="event__available-offers"></div>
    </section>`
  );
};

const createDestinationTemplate = ({description, pictures}) => {
  // !Небольшой фикс для url картинок
  // TODO: убрать фикс, если понадобится
  const picturesMarkup = pictures.map((pic) => (
    `<img class="event__photo" src="${fixPicUrl(pic.src)}" alt="${pic.description}">`
  )).join(`\n`);

  return (
    `<section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">${picturesMarkup}</div>
      </div>
    </section>`
  );
};

export default class EditDetails extends Abstract {
  constructor(destination, offers) {
    super();

    this._destination = destination;
    this._offers = offers;
  }

  _getOffersElement() {
    const el = createElement(createOffersSTemplate());
    const container = el.querySelector(`.event__available-offers`);

    for (const offer of this._offers) {
      render(container, createElement(createOfferItemTemplate(offer)));
    }

    return el;
  }

  _getDestinationElement() {
    const templ = createDestinationTemplate(this._destination);
    const el = createElement(templ);

    return el;
  }

  _getTemplate() {
    return `<section class="event__details"></section>`;
  }

  _createElement() {
    const el = createElement(this._getTemplate());

    if (this._offers.length > 0) {
      render(el, this._getOffersElement());
    }

    if (this._destination) {
      render(el, this._getDestinationElement());
    }

    return el;
  }
}
