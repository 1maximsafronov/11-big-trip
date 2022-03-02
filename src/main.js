import {render, replace} from "./utils/render";
import {RenedrPosition} from "./const";

import NewEventButtonComponent from "./components/new-event-button";
import TripControlsComponent from "./components/trip-controls";
import EventEditComponent from "./components/event-edit";
import NoEventsComponent from "./components/no-events";
import SiteMenuComponent from "./components/site-menu";
import TripInfoComponent from "./components/trip-info";
import TripDaysComponent from "./components/trip-days";
import FilterComponent from "./components/filter";
import EventComponent from "./components/event";
import SortComponent from "./components/sort";

import {generateEvents} from "./mock/event";

const EVENTS_COUNTER = 10;

const events = generateEvents(EVENTS_COUNTER);

const renderEvent = (container, event) => {
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
};

const renderEvents = (container, renderingEvents) => {
  renderingEvents
    .forEach((event) => renderEvent(container, event));
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

const tripControlsComponent = new TripControlsComponent();

render(tripMainElement, new TripInfoComponent());
render(tripMainElement, tripControlsComponent);
render(tripMainElement, new NewEventButtonComponent());

render(tripControlsComponent, new SiteMenuComponent());
render(tripControlsComponent, new FilterComponent());

renderTripEvents(tripEventsElement, events);
