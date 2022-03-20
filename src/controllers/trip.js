import moment from "moment";
import SortComponent from "../components/sort";
import PointController, {State as PointViewState} from "./point";
import NewPointController from "./new-point";
import LoadingComponent from "../components/loading";
import NoPointsComponent from "../components/no-points";
import TripDayItemComponent from "../components/trip-day-item";
import TripDaysListComponent from "../components/trip-days";
import {render, remove, replace} from "../utils/render";
import {SortType, FilterType, UserAction, UpdateType} from "../const";
import {logToConsole} from "../utils/common";

const sortPoints = (sortType, points) => {
  switch (sortType) {
    case SortType.BY_PRICE:
      points.sort((pointA, pointB) => pointB.basePrice - pointA.basePrice);
      break;
    case SortType.BY_TIME:
      points.sort((pointA, pointB) => {
        const diffA = moment(pointA.dateFrom).diff(pointA.dateTo);
        const diffB = moment(pointB.dateFrom).diff(pointB.dateTo);
        return diffA - diffB;
      });
      break;
    default:
      points.sort((pointA, pointB) => pointA.dateFrom - pointB.dateFrom);
  }

  return points;
};

const filterPoints = (filterType, points) => {
  const dateNow = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return points.filter((point) => point.dateFrom > dateNow);
    case FilterType.PAST:
      return points.filter((point) => point.dateTo < dateNow);
  }

  return points;
};

export default class Trip {
  constructor(container, api, pointsModel, offersModel, destinationsModel, filterModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._filterModel = filterModel;
    this._destinationsModel = destinationsModel;
    this._api = api;
    this._pointController = {};
    this._currentSortType = SortType.DEFAULT;

    this._isLoading = true;

    this._sortComponent = null;
    this._tripDaysListComponent = null;
    this._loadingComponent = new LoadingComponent();
    this._noPointsComponent = new NoPointsComponent();

    this._handleSortChange = this._handleSortChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelsEvent = this._handleModelsEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelsEvent);
    this._filterModel.addObserver(this._handleModelsEvent);

    this._newPointController = null;
  }

  init() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    remove(this._loadingComponent);

    if (this._getPoints().length <= 0) {
      this._renderNoPoints();
      return;
    }

    remove(this._noPointsComponent);

    this._renderSort();
    this._renderTripDays();
  }

  createNewEvent() {
    logToConsole(`Создание новой точки`);
    this._currentSortType = SortType.DEFAULT;


    remove(this._sortComponent);
    this._sortComponent = null;
    this._clearPointsList();
    this._renderSort();
    this._renderNewPoint();
    this._renderTripDays();
  }

  _renderNewPoint() {
    this._newPointController = new NewPointController(this._container, this._offersModel, this._destinationsModel, this._handleViewAction);
    this._newPointController.init();
  }

  // * done!
  _renderNoPoints() {
    render(this._container, this._noPointsComponent);
  }

  // * done!
  _renderLoading() {
    render(this._container, this._loadingComponent);
  }

  // * done
  _renderSort() {
    const prevSortComponent = this._sortComponent;

    this._sortComponent = new SortComponent(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortChange);

    if (prevSortComponent === null) {
      render(this._container, this._sortComponent);
      return;
    }

    replace(this._sortComponent, prevSortComponent);
    remove(prevSortComponent);
  }

  _renderTripDays() {
    this._tripDaysListComponent = new TripDaysListComponent();
    render(this._container, this._tripDaysListComponent);

    if (this._currentSortType === SortType.DEFAULT) {
      this._renderPointsByDays();
    } else {
      this._renderDayPoints(null, this._getPoints());
    }
  }

  // done!
  _renderPointsByDays() {
    this._getPointsByDays().forEach((day) => {
      this._renderDayPoints(day.dayInfo, day.points);
    });
  }

  // done!
  _renderDayPoints(dayInfo, dayPoints) {
    const dayComponent = new TripDayItemComponent(dayInfo);
    render(this._tripDaysListComponent, dayComponent);

    const pointsList = dayComponent.getInnerElement(`.trip-events__list`);

    this._renderPoints(pointsList, dayPoints);
  }

  _renderPoints(container, points) {
    for (const point of points) {
      const pointController = new PointController(container, this._offersModel, this._destinationsModel, this._handleModeChange, this._handleViewAction);
      pointController.init(point);
      this._pointController[point.id] = pointController;
    }
  }

  _clearPointsList() {
    Object.values(this._pointController)
      .forEach((controller) => controller.destroy());
    this._pointController = {};
    remove(this._tripDaysListComponent);
    this._tripDaysListComponent = null;
  }

  _getPoints() {
    const points = this._pointsModel.getPoints();
    const currentFilterType = this._filterModel.getFilterType();
    const sortedPoints = sortPoints(this._currentSortType, points);
    const filteredPoints = filterPoints(currentFilterType, sortedPoints);

    return filteredPoints;
  }

  _getPointsByDays() {
    let days = [];
    const points = this._getPoints();
    const unicDays = new Set();

    points.forEach((point) => {
      unicDays.add(moment(point.dateFrom).format(`YYYY-MM-DD`));
    });

    unicDays.forEach((day) => {
      days.push({
        dayInfo: {
          date: new Date(day),
        },
        points: points.filter((point) => moment(day).isSame(point.dateFrom, `day`))
      });
    });

    days = days.map((day, index) => {
      return {
        dayInfo: Object.assign({}, day.dayInfo, {count: index + 1}),
        points: day.points
      };
    });

    return days;
  }

  _handleSortChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPointsList();
    this._renderTripDays();
  }

  _handleViewAction(userAction, updateType, payload) {
    switch (userAction) {
      case UserAction.UPDATE_POINT:
        this._pointController[payload.id].setViewState(PointViewState.SAVING);
        this._api.updatePoint(payload)
          .then((point) => {
            this._pointsModel.updatePoint(updateType, point);
          });
        break;
      case UserAction.ADD_POINT:
        this._newPointController.setViewState(PointViewState.SAVING);
        this._api.createPoint(payload)
          .then((response) => {
            this._pointsModel.createPoint(updateType, response);
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointController[payload.id].setViewState(PointViewState.DELETING);
        this._api.deletePoint(payload)
          .then(() => this._pointsModel.deletePoint(updateType, payload));
        break;
    }
  }

  _handleModelsEvent(updateType, payload) {
    switch (updateType) {
      case UpdateType.INIT:
        this._isLoading = false;
        break;
      case UpdateType.MINOR_POINT_UPDATE:
        this._pointController[payload.id].init(payload);
        break;
      case UpdateType.MAJOR_POINT_UPDATE:
        this._clearPointsList();
        this._newPointController.destroy();
        this._newPointController = null;
        this._renderTripDays();
        break;
      case UpdateType.FILTER_CHANGE:
        this._clearPointsList();
        this._renderTripDays();
        break;
    }
  }

  _handleModeChange() {
    Object.values(this._pointController)
      .forEach((controller) => controller.resetView());
  }
}
