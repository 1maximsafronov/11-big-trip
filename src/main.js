import {render} from "./utils";

import {createTripInfoTemplate} from "./components/trip-info";
import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createSortTemplate} from "./components/sort";
import {createTripDaysTemplate} from "./components/trip-days";
import {createEventTemplate} from "./components/event";

import {generateEvents} from "./mock/event";

const events = generateEvents(10);

const renderEvents = (renderingEvents, container, place) => {
  renderingEvents.forEach((event) => {
    render(container, createEventTemplate(event), place);
  });
};


const pageBodyElement = document.querySelector(`.page-body`);
const pageMainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);
const tripControlsElement = pageBodyElement.querySelector(`.trip-controls`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);
render(tripControlsElement, createSiteMenuTemplate(), `beforeEnd`);
render(tripControlsElement, createFilterTemplate(), `beforeEnd`);
render(tripEventsElement, createSortTemplate(), `beforeEnd`);
render(tripEventsElement, createTripDaysTemplate(), `beforeEnd`);

const eventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

renderEvents(events, eventsListElement, `beforeEnd`);
