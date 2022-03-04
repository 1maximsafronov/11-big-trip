import {render} from "../utils/render";
import {SortType} from "../const";

import NoEventsComponent from "../components/no-events";
import TripDaysComponent from "../components/trip-days";
import SortComponent from "../components/sort";

import PointController from "./point";

export default class Trip {
  constructor(container) {
    this._container = container;
    this._events = [];
    this._offers = [];
    this._currentSortType = SortType.DEFAULT;

    this._pointController = {};

    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._tripDaysComponent = new TripDaysComponent();

    this._handleSortChange = this._handleSortChange.bind(this);
  }

  _renderEvent(container, event) {
    const pointController = new PointController(container);
    pointController.init(event, this._offers);
  }

  _renderEvents(container, renderingEvents) {
    renderingEvents
    .forEach((event) => this._renderEvent(container, event));
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.BY_PRICE:
        this._events.sort((eventA, eventB) => eventB.basePrice - eventA.basePrice);
        break;
      case SortType.BY_TIME:
        this._events = this._sourcedEvents.slice();
        break;
      default:
        this._events = this._sourcedEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventList();

    const eventsListElement = this._container.querySelector(`.trip-events__list`);

    this._renderEvents(eventsListElement, this._events);
  }

  _renderSort() {
    render(this._container, this._sortComponent);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortChange);
  }

  _renderNoEvents() {
    render(this._container, this._noEventsComponent);
  }

  _clearEventList() {
    const eventsListElement = this._container.querySelector(`.trip-events__list`);
    eventsListElement.innerHTML = ``;
  }

  _renderTrip() {
    if (this._events.length <= 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    render(this._container, this._tripDaysComponent);

    const eventsListElement = this._container.querySelector(`.trip-events__list`);

    this._renderEvents(eventsListElement, this._events);
  }

  render(events, offers) {
    this._events = events.slice();
    this._sourcedEvents = events.slice();
    this._offers = offers;

    this._renderTrip();
  }
}
