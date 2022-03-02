import {render, replace} from "./utils/render";
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

  const replaceCardToEdit = () => {
    container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceEditToCard = () => {
    container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
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
};

const renderEvents = (container, renderingEvents) => {
  renderingEvents.forEach((event) => renderEvent(container, event));
};

const renderTripEvents = (container, tripEvents) => {

  if (tripEvents.length <= 0) {
    render(container, new NoEventsComponent());
    return;
  }

  render(container, new SortComponent());
  render(container, new TripDaysComponent());

  const eventsListElement = container.querySelector(`.trip-events__list`);

  renderEvents(eventsListElement, tripEvents);
};

const pageBodyElement = document.querySelector(`.page-body`);
const pageMainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfoComponent();
const tripControlsComponent = new TripControlsComponent();
const newEventButton = new NewEventButtonComponent();

render(tripMainElement, tripInfoComponent);
render(tripMainElement, tripControlsComponent);
render(tripMainElement, newEventButton);

render(tripControlsComponent, new SiteMenuComponent());
render(tripControlsComponent, new FilterComponent());

renderTripEvents(tripEventsElement, events);
