import {render} from "./utils/render";
// import {RenedrPosition} from "./const";
import Api from "./api";
import NewEventButtonComponent from "./components/new-event-button";
import TripControlsComponent from "./components/trip-controls";
import SiteMenuComponent from "./components/site-menu";
import TripInfoComponent from "./components/trip-info";
import FilterComponent from "./components/filter";

import TripController from "./controllers/trip";
import PointsModel from "./models/points";
import DestinationsModel from "./models/destinations";
import OffersModel from "./models/offers";

// import {generatePoints} from "./mock/event";
// import {generateOffers} from "./mock/offer";

const END_POINT = `https://15.ecmascript.pages.academy/big-trip`;
const AUTH_TOKEN = `Basic 5oDAQcFxqGT1ZpU`;

// const POINTS_COUNT = 10;

const api = new Api(END_POINT, AUTH_TOKEN);
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

// const offers = generateOffers();
// const points = generatePoints(POINTS_COUNT, offers);

const pageBodyElement = document.querySelector(`.page-body`);
const pageMainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const tripControlsComponent = new TripControlsComponent();
const tripController = new TripController(tripEventsElement, pointsModel, offersModel, api);

render(tripMainElement, [
  new TripInfoComponent(),
  tripControlsComponent,
  new NewEventButtonComponent()
]);

render(tripControlsComponent, [
  new SiteMenuComponent(),
  new FilterComponent()
]);

// pointsModel.setPoints(points);
// tripController.init(offers);

api.getDestinations()
  .then((data) => destinationsModel.setDestinations(data))
  .then(() => api.getOffers())
  .then((data) => offersModel.setOffers(data))
  .then(() => api.getPoints())
  .then((data) => pointsModel.setPoints(data))
  .then(() => {
    // console.log(destinationsModel.getDestinations());
    // console.log(offersModel.getOffers());
    // console.log(pointsModel.getPoints());
    tripController.init();
  });
