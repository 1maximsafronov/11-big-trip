import {renderElement} from "./utils";
import {RenedrPosition} from "./const";


import TripInfoComponent from "./components/trip-info";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import TripDaysComponent from "./components/trip-days";
import EventComponent from "./components/event";

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
const tripControlsElement = pageBodyElement.querySelector(`.trip-controls`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

renderElement(tripMainElement, new TripInfoComponent().getElement(), RenedrPosition.AFTERBEGIN);
renderElement(tripControlsElement, new SiteMenuComponent().getElement(), RenedrPosition.BEFOREEND);
renderElement(tripControlsElement, new FilterComponent().getElement(), RenedrPosition.BEFOREEND);
renderElement(tripEventsElement, new SortComponent().getElement(), RenedrPosition.BEFOREEND);
renderElement(tripEventsElement, new TripDaysComponent().getElement(), RenedrPosition.BEFOREEND);

const eventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

renderEvents(events, eventsListElement);
