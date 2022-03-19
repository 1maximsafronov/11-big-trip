import {render} from "./utils/render";
import {UpdateType} from "./const";
import Api from "./api/api.js";
import Store from "./api/store";
import Provider from "./api/provider";

import PointsModel from "./models/points";
import OffersModel from "./models/offers";
import DestinationsModel from "./models/destinations";
import FilterModel from "./models/filter";

import NewEventButtonComponent from "./components/new-event-button";
import TripControlsComponent from "./components/trip-controls";
import SiteMenuComponent from "./components/site-menu";

import TripInfroController from "./controllers/trip-info";
import FilterController from "./controllers/filter";
import TripController from "./controllers/trip";
import {logToConsole} from "./utils/common";

const END_POINT = `https://15.ecmascript.pages.academy/big-trip`;
const AUTH_TOKEN = `Basic 5oDAQcFxqGT1ZpU`;

const STORE_PREFIX = `big-trip-12-localStore`;
const STORE_VERSION = `v1.0.0`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VERSION}`;

const localStorage = window.localStorage;
const api = new Api(END_POINT, AUTH_TOKEN);
const store = new Store(STORE_NAME, localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const pageBodyElement = document.querySelector(`.page-body`);
const pageMainElement = pageBodyElement.querySelector(`.page-main`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

// * Инициализация компонентов
const tripControlsComponent = new TripControlsComponent();
const newEventBtnComponent = new NewEventButtonComponent();
const siteMenuComponent = new SiteMenuComponent(`table`);

// * Инициализация контроллеров
const tripInfoController = new TripInfroController(tripMainElement, pointsModel);
const filterController = new FilterController(tripControlsComponent, filterModel);
const tripController = new TripController(tripEventsElement, apiWithProvider, pointsModel, offersModel, destinationsModel, filterModel);

newEventBtnComponent.setClickHandler(() => {
  tripController.createNewEvent();
});

siteMenuComponent.setChangeTabHahndler((newTab) => {
  logToConsole(`Меняем вкладку меню`, newTab);
});

tripInfoController.init();
// * Рендеринг компоннетов
render(tripMainElement, [
  tripControlsComponent,
  newEventBtnComponent
]);

render(tripControlsComponent, [
  siteMenuComponent,
]);

filterController.init();

tripController.init();

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
    .then((data) => pointsModel.setPoints(UpdateType.INIT, data))
    .catch((err) => {
      pointsModel.setPoints(UpdateType.INIT, []);
      throw new Error(err);
    });
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
