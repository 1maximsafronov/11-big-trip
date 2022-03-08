import {render, remove} from "../utils/render";
import {SortType} from "../const";
import moment from "moment";

import NoEventsComponent from "../components/no-events";
import SortComponent from "../components/sort";
import TripDaysListComponent from "../components/trip-days";
import TripDayItemComponent from "../components/trip-day-item";

import PointController from "./point";

const getDateWithoutTime = (date) => {
  // const newDate = new Date(moment(date).format(`YYYY-MM-DD`));
  // return newDate;
  return moment(date).format(`YYYY-MM-DD`);
};

export default class Trip {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._offers = [];
    this._currentSortType = SortType.DEFAULT;
    this._pointController = {};

    this._noEventsComponent = null;
    this._sortComponent = null;
    this._tripDaysListComponent = null;

    this._handleSortChange = this._handleSortChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleDataChange = this._handleDataChange.bind(this);
  }

  init(offers) {
    this._offers = offers;

    if (this._getPoints().length <= 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderTripDays();
  }

  _renderNoEvents() {
    this._noEventsComponent = new NoEventsComponent();
    render(this._container, this._noEventsComponent);
  }

  _renderSort() {
    this._sortComponent = new SortComponent();
    render(this._container, this._sortComponent);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortChange);
  }

  _renderTripDays() {
    this._tripDaysListComponent = new TripDaysListComponent();
    render(this._container, this._tripDaysListComponent);

    if (this._currentSortType === SortType.DEFAULT) {
      this._getPointsByDays().forEach((day) => {
        this._renderDayPoints(day.dayInfo, day.points);
      });
    } else {
      this._renderDayPoints(null, this._getPoints());
    }
  }

  _renderPointsByDays(days) {
    days.forEach((dayInfo) => {
      this._renderDayPoints(dayInfo);
    });
  }

  _renderDayPoints(dayInfo, dayPoints) {
    const tripDayItemComponent = new TripDayItemComponent(dayInfo);
    render(this._tripDaysListComponent, tripDayItemComponent);

    const pointsList = tripDayItemComponent.getElement().querySelector(`.trip-events__list`);

    this._renderPoints(pointsList, dayPoints);
  }

  _renderPoints(container, points) {
    for (const point of points) {
      const pointController = new PointController(container, this._handleModeChange, this._handleDataChange);
      pointController.init(point, this._offers);
      this._pointController[point.id] = pointController;
    }
  }

  _clearPointsList() {
    Object
      .values(this._pointController)
      .forEach((controller) => controller.destroy());
    remove(this._tripDaysListComponent);
    this._tripDaysListComponent = null;
  }

  _getPoints() {
    const points = this._pointsModel.getPoints();

    switch (this._currentSortType) {
      case SortType.BY_PRICE:
        points.sort((pointA, pointB) => pointB.basePrice - pointA.basePrice);
        break;
      case SortType.BY_TIME:
        // сортировка point по времени
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
  }

  _getPointsByDays() {
    const points = this._getPoints();
    const unicDays = new Set();

    points.forEach((point) => {
      unicDays.add(getDateWithoutTime(point.dateFrom));
    });

    let days = [];

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

  _handleDataChange(updatetPoint) {
    // this._pointController[updatetPoint.id].init(updatetPoint, this._offers);

    // console.log(updatetPoint.isFavorite ? `Фаворит` : `Не фаворит`);
  }

  _handleModeChange() {
    Object
      .values(this._pointController)
      .forEach((controller) => controller.resetView());
  }
}
