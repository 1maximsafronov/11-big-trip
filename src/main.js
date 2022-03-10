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

import {generatePoints} from "./mock/event";
import {generateOffers} from "./mock/offer";

const END_POINT = `https://15.ecmascript.pages.academy/big-trip`;
const AUTH_TOKEN = `Basic 5oDAQcFxqGT1ZpU`;

const POINTS_COUNT = 10;
const api = new Api(END_POINT, AUTH_TOKEN);
const offers = generateOffers();
const points = generatePoints(POINTS_COUNT, offers);

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

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const tripController = new TripController(tripEventsElement, pointsModel);
tripController.init(offers);

api.getPoints().then((response) => console.log(response));
api.getOffers().then((response) => console.log(response));
api.getDestinations().then((response) => console.log(response));
