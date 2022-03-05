import {render} from "../utils/render";
import {SortType} from "../const";

import NoEventsComponent from "../components/no-events";
import TripDaysComponent from "../components/trip-days";
import SortComponent from "../components/sort";

import PointController from "./point";

export default class Trip {
  constructor(container) {
    this._container = container;
    this._points = [];
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

  _updateItem(arr, updatedItem) {
    const index = arr.findIndex((item) => item.id === updatedItem.id);
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

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.BY_PRICE:
        this._points.sort((pointA, pointB) => pointB.basePrice - pointA.basePrice);
        break;
      case SortType.BY_TIME:
        this._points = this._sourcedPoints.slice();
        break;
      default:
        this._points = this._sourcedPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointsList();

    const eventsListElement = this._container.querySelector(`.trip-events__list`);

    this._renderPoints(eventsListElement, this._points);
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
    if (this._points.length <= 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    render(this._container, this._tripDaysComponent);

    const eventsListElement = this._container.querySelector(`.trip-events__list`);

    this._renderPoints(eventsListElement, this._points);
  }

  init(points, offers) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();
    this._offers = offers;

    this._renderTrip();
  }
}
