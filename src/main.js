import {render} from "./utils/render";
import {RenedrPosition} from "./const";


import TripInfoComponent from "./components/trip-info";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import TripDaysComponent from "./components/trip-days";
import EventComponent from "./components/event";
import TripControlsComponent from "./components/trip-controls";
import NewEventButtonComponent from "./components/new-event-button";
import EventEditComponent from "./components/event-edit";
import NoEventsComponent from "./components/no-events";

import {generateEvents} from "./mock/event";

const EVENTS_COUNTER = 10;

const events = generateEvents(EVENTS_COUNTER);

const renderEvent = (container, event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  const replaceEventToEdit = () => {
    container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Esc` || evt.key === `Escape`;

    if (isEscKey) {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  const ediForm = eventEditComponent.getElement().querySelector(`form`);

  editButton.addEventListener(`click`, (evt)=> {
    evt.preventDefault();
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  ediForm.addEventListener(`submit`, (evt)=> {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });


  render(container, eventComponent.getElement(), RenedrPosition.BEFOREEND);
};

const renderEvents = (renderingEvents, container) => {
  renderingEvents.forEach((event) => renderEvent(container, event));
};

const renderTripEvents = (container, tripEvents) => {

  if (tripEvents.length <= 0) {
    render(container, new NoEventsComponent().getElement(), RenedrPosition.BEFOREEND);
    return;
  }

  render(container, new SortComponent().getElement(), RenedrPosition.BEFOREEND);
  render(container, new TripDaysComponent().getElement(), RenedrPosition.BEFOREEND);

  const eventsListElement = container.querySelector(`.trip-events__list`);

  renderEvents(tripEvents, eventsListElement);
};

const pageBodyElement = document.querySelector(`.page-body`);
const pageMainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfoComponent();
const tripControlsComponent = new TripControlsComponent();
const newEventButton = new NewEventButtonComponent();

render(tripMainElement, tripInfoComponent.getElement(), RenedrPosition.BEFOREEND);
render(tripMainElement, tripControlsComponent.getElement(), RenedrPosition.BEFOREEND);
render(tripMainElement, newEventButton.getElement(), RenedrPosition.BEFOREEND);

render(tripControlsComponent.getElement(), new SiteMenuComponent().getElement(), RenedrPosition.BEFOREEND);
render(tripControlsComponent.getElement(), new FilterComponent().getElement(), RenedrPosition.BEFOREEND);

renderTripEvents(tripEventsElement, events);
