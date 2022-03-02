import {render, replace} from "../utils/render";

import EventEditComponent from "../components/event-edit";
import NoEventsComponent from "../components/no-events";
import TripDaysComponent from "../components/trip-days";
import EventComponent from "../components/event";
import SortComponent from "../components/sort";


export default class Trip {
  constructor(container) {
    this._container = container;
    this._events = [];

    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._tripDaysComponent = new TripDaysComponent();
  }

  _renderEvent(container, event) {
    const eventComponent = new EventComponent(event);
    const eventEditComponent = new EventEditComponent(event);

    const replaceCardToEdit = () => {
      replace(eventEditComponent, eventComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const replaceEditToCard = () => {
      replace(eventComponent, eventEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Esc` || evt.key === `Escape`) {
        evt.preventDefault();
        replaceEditToCard();
      }
    };

    eventComponent.setEditBtnClickHandler(() => replaceCardToEdit());
    eventEditComponent.setSubmitHandler(() => replaceEditToCard());

    render(container, eventComponent);
  }

  _renderEvents(container, renderingEvents) {
    renderingEvents
    .forEach((event) => this._renderEvent(container, event));
  }

  _renderSort() {
    render(this._container, this._sortComponent);
  }

  _renderNoEvents() {
    render(this._container, this._noEventsComponent);
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

  render(events) {
    this._events = events.slice();
    this._sourcedEvents = events.slice();

    this._renderTrip();
  }
}
