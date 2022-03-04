import {render} from "./utils/render";
// import {RenedrPosition} from "./const";

import NewEventButtonComponent from "./components/new-event-button";
import TripControlsComponent from "./components/trip-controls";
import SiteMenuComponent from "./components/site-menu";
import TripInfoComponent from "./components/trip-info";
import FilterComponent from "./components/filter";

import TripController from "./controllers/trip";

import {generateEvents} from "./mock/event";
import {generateOffers} from "./mock/offer";

const EVENTS_COUNTER = 10;

const offers = generateOffers();
const events = generateEvents(EVENTS_COUNTER, offers);


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

const tripController = new TripController(tripEventsElement);
tripController.render(events, offers);
