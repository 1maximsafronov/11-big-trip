import moment from "moment";
import SortComponent from "../components/sort";
import PointController from "./point";
import LoadingComponent from "../components/loading";
import NoPointsComponent from "../components/no-points";
import TripDayItemComponent from "../components/trip-day-item";
import TripDaysListComponent from "../components/trip-days";
import {render, remove, replace} from "../utils/render";
import {SortType, UserAction} from "../const";

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

export default class Trip {
  constructor(container, pointsModel, offersModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._pointController = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = false;

    this._sortComponent = null;
    this._tripDaysListComponent = null;
    this._loadingComponent = new LoadingComponent();
    this._noPointsComponent = new NoPointsComponent();

    this._handleSortChange = this._handleSortChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleDataChange = this._handleViewAction.bind(this);
  }

  init() {

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getPoints().length <= 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderTripDays();
  }

  // done!
  _renderNoPoints() {
    render(this._container, this._noPointsComponent);
  }

  // done!
  _renderLoading() {
    render(this._container, this._loadingComponent);
  }

  // done
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
      const pointController = new PointController(container, this._handleModeChange, this._handleViewAction);
      const offers = this._offersModel.getOffers();
      pointController.init(point, offers);
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
    const sortedPoints = sortPoints(this._currentSortType, points);
    return sortedPoints;
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

  _handleViewAction(userAction, payload) {
    switch (userAction) {
      case UserAction.UPDATE_POINT:
        console.log(`Пытаемся обновить Точку маршрута`);
        console.log(`payload: `, payload);
        break;
      case UserAction.ADD_POINT:
        console.log(`Пытаемся добавить точку маршрута`);
        console.log(`payload: `, payload);
        break;
      case UserAction.DELETE_POINT:
        console.log(`Пытаемся удалить точку маршрута`);
        console.log(`payload: `, payload);
        break;
    }
  }

  _handleModeChange() {
    Object.values(this._pointController)
      .forEach((controller) => controller.resetView());
  }
}
