import moment from "moment";
import Abstract from "../abstract";
import {capitalizeFirstLetter, getEventTypePlaceholder} from "../../utils/common";

const createTypeGroupTemplate = (eventId, type) => {
  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${eventId}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventId}" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi"
              ${type === `taxi` ? `checked` : ``}
            >
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${eventId}">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus"
            ${type === `bus` ? `checked` : ``}
            >
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-${eventId}">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train"
            ${type === `train` ? `checked` : ``}
            >
            <label class="event__type-label  event__type-label--train" for="event-type-train-${eventId}">Train</label>
          </div>
          <div class="event__type-item">
            <input id="event-type-ship-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship"
              ${type === `ship` ? `checked` : ``}
            >
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-${eventId}">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport"
              ${type === `transport` ? `checked` : ``}
            >
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-${eventId}">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive"
              ${type === `drive` ? `checked` : ``}
            >
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-${eventId}">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight"
            ${type === `flight` ? `checked` : ``}
            >
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-${eventId}">Flight</label>
          </div>
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          <div class="event__type-item">
            <input id="event-type-check-in-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in"
              ${type === `check-in` ? `checked` : ``}
            >
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${eventId}">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing"
              ${type === `sightseeing` ? `checked` : ``}
            >
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${eventId}">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant"
              ${type === `restaurant` ? `checked` : ``}
            >
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${eventId}">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>`
  );
};

const createTemplate = (event, destinations) => {
  const {id: eventId, isFavorite, type, destination, dateFrom, dateTo, basePrice} = event;
  const placeholder = getEventTypePlaceholder(type);
  const startTime = moment(dateFrom).format(`DD/MM/YY HH:mm`);
  const endTime = moment(dateTo).format(`DD/MM/YY HH:mm`);

  const typeGroupMarkup = createTypeGroupTemplate(eventId, type);
  return (
    `<header class="event__header">
        ${typeGroupMarkup}

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${eventId}">
          ${capitalizeFirstLetter(type)} ${placeholder}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${eventId}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${eventId}">
        <datalist id="destination-list-${eventId}">
          ${destinations.map((item) => (`<option value="${item}"></option>`)).join(`\n`)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${eventId}">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-${eventId}" type="text" name="event-start-time" value="${startTime}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${eventId}">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-${eventId}" type="text" name="event-end-time" value="${endTime}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${eventId}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${eventId}" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input class="event__favorite-checkbox visually-hidden"
        id="event-favorite-${eventId}"
        type="checkbox"
        name="event-favorite"
        ${isFavorite ? `checked` : ``}
      >
      <label class="event__favorite-btn" for="event-favorite-${eventId}">
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

export default class EventEditHeader extends Abstract {
  constructor(event, destinations) {
    super();
    this._event = event;
    this._destinations = destinations;
  }

  _getTemplate() {
    return createTemplate(this._event, this._destinations);
  }
}
