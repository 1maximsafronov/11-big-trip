import {renderElement} from "./utils";
import {RenedrPosition} from "./const";


import TripInfoComponent from "./components/trip-info";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import TripDaysComponent from "./components/trip-days";
import EventComponent from "./components/event";
import TripControls from "./components/trip-controls";
import NewEventButton from "./components/new-event-button";

import {generateEvents} from "./mock/event";

const events = generateEvents(10);

const renderEvent = (container, event) => {
  const eventComponent = new EventComponent(event);
  renderElement(container, eventComponent.getElement(), RenedrPosition.BEFOREEND);
};

const renderEvents = (renderingEvents, container) => {
  renderingEvents.forEach((event) => renderEvent(container, event));
};

const pageBodyElement = document.querySelector(`.page-body`);
const pageMainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfoComponent();
const tripControlsComponent = new TripControls();
const newEventButton = new NewEventButton();

renderElement(tripMainElement, tripInfoComponent.getElement(), RenedrPosition.BEFOREEND);
renderElement(tripMainElement, tripControlsComponent.getElement(), RenedrPosition.BEFOREEND);
renderElement(tripMainElement, newEventButton.getElement(), RenedrPosition.BEFOREEND);

renderElement(tripControlsComponent.getElement(), new SiteMenuComponent().getElement(), RenedrPosition.BEFOREEND);
renderElement(tripControlsComponent.getElement(), new FilterComponent().getElement(), RenedrPosition.BEFOREEND);
renderElement(tripEventsElement, new SortComponent().getElement(), RenedrPosition.BEFOREEND);
renderElement(tripEventsElement, new TripDaysComponent().getElement(), RenedrPosition.BEFOREEND);

const eventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

renderEvents(events, eventsListElement);
