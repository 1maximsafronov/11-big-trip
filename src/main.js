import {render} from "./utils/render";
// import {RenedrPosition} from "./const";
import Api from "./api/api.js";
import NewEventButtonComponent from "./components/new-event-button";
import TripControlsComponent from "./components/trip-controls";
import SiteMenuComponent from "./components/site-menu";
import TripInfoComponent from "./components/trip-info";
import FilterComponent from "./components/filter";

import TripController from "./controllers/trip";
import PointsModel from "./models/points";
import DestinationsModel from "./models/destinations";
import OffersModel from "./models/offers";
import Provider from "./api/provider";
import Store from "./api/store";

// import {generatePoints} from "./mock/event";
// import {generateOffers} from "./mock/offer";

const END_POINT = `https://15.ecmascript.pages.academy/big-trip`;
const AUTH_TOKEN = `Basic 5oDAQcFxqGT1ZpU`;

const STORE_PREFIX = `big-trip-12-localStore`;
const STORE_VERSION = `v1.0.0`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VERSION}`;

// const POINTS_COUNT = 10;
const localStorage = window.localStorage;
const api = new Api(END_POINT, AUTH_TOKEN);
const store = new Store(STORE_NAME, localStorage);
const apiWithProvider = new Provider(api, store);
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
const tripController = new TripController(tripEventsElement, pointsModel, offersModel, apiWithProvider);

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

const loadDestinations = () => {
  return apiWithProvider.getDestinations()
    .then((data) => destinationsModel.setDestinations(data));
};

const loadOffers = () => {
  return apiWithProvider.getOffers()
    .then((data) => offersModel.setOffers(data));
};

const loadPoints = () => {
  return apiWithProvider.getPoints()
    .then((data) => pointsModel.setPoints(data));
};

const loadData = () => {
  return Promise.all([
    loadDestinations(),
    loadOffers(),
    loadPoints()
  ]);
};

loadData()
  .then(() => tripController.init());
