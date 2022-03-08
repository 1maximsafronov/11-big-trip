import {render} from "../utils/render";
import {SortType} from "../const";

import NoEventsComponent from "../components/no-events";
import TripDaysComponent from "../components/trip-days";
import SortComponent from "../components/sort";

import PointController from "./point";

export default class Trip {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._offers = [];
    this._currentSortType = SortType.DEFAULT;

    this._pointController = {};

    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._tripDaysComponent = new TripDaysComponent();

    this._handleSortChange = this._handleSortChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleDataChange = this._handleDataChange.bind(this);
  }

  init(points, offers) {
    this._offers = offers;

    this._renderTrip();
  }

  _handleDataChange(updatetPoint) {
    this._pointController[updatetPoint.id].init(updatetPoint, this._offers);

    console.log(updatetPoint.isFavorite ? `Фаворит` : `Не фаворит`);
  }

  _renderPoint(container, point) {
    const pointController = new PointController(container, this._handleModeChange, this._handleDataChange);
    pointController.init(point, this._offers);
    this._pointController[point.id] = pointController;
  }

  _renderPoints(container, points) {
    points
    .forEach((point) => this._renderPoint(container, point));
  }

  _handleModeChange() {
    Object
      .values(this._pointController)
      .forEach((controller) => controller.resetView());
  }

  _handleSortChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearPointsList();

    const eventsListElement = this._container.querySelector(`.trip-events__list`);

    this._renderPoints(eventsListElement, this._getPoints());
  }

  _renderSort() {
    render(this._container, this._sortComponent);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortChange);
  }

  _renderNoEvents() {
    render(this._container, this._noEventsComponent);
  }

  _clearPointsList() {
    Object
      .values(this._pointController)
      .forEach((controller) => controller.destroy());
  }

  _renderTrip() {
    if (this._getPoints().length <= 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    render(this._container, this._tripDaysComponent);

    const eventsListElement = this._container.querySelector(`.trip-events__list`);

    this._renderPoints(eventsListElement, this._getPoints());
  }

  _getPoints() {
    const points = this._pointsModel.getPoints();

    switch (this._currentSortType) {
      case SortType.BY_PRICE:
        points.sort((pointA, pointB) => pointB.basePrice - pointA.basePrice);
        break;
      case SortType.BY_TIME:
        // сортировка point по времени
        break;
    }


    return points;
  }
}
