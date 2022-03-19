import TripInfoComponent from "../components/trip-info";
import {render, replace, remove} from "../utils/render";
import {extendObject} from "../utils/common";
import {UpdateType} from "../const";

export default class TripInfoController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._tripInfoComponent = null;

    this._handlePointsModelChange = this._handlePointsModelChange.bind(this);

    this._pointsModel.addObserver(this._handlePointsModelChange);
  }

  init() {
    const tripInfo = this._getTripInfoData();

    let prevComponent = this._tripInfoComponent;
    this._tripInfoComponent = new TripInfoComponent(tripInfo);

    if (prevComponent === null) {
      render(this._container, this._tripInfoComponent);
      return;
    }

    replace(this._tripInfoComponent, prevComponent);

    remove(prevComponent);

    prevComponent = null;
  }

  _getTripInfoData() {
    const points = this._pointsModel.getPoints()
      .sort((pointA, pointB) => pointA.dateFrom - pointB.dateFrom);

    const tripInfo = points.reduce((acc, point, index) => {
      const price = acc.totalCost + point.basePrice;

      const newArr = [...acc.cities];
      const newCity = point.destination.name;

      if (newArr[newArr.length - 1] !== newCity) {
        newArr.push(newCity);
      }

      return extendObject(acc, {
        totalCost: price,
        cities: newArr,
      });

    }, {
      totalCost: 0,
      cities: [],
    });


    let dateFrom = null;
    let dateTo = null;

    if (points.length > 0) {
      dateFrom = points[0].dateFrom;
      dateTo = points[points.length - 1].dateTo;
    }

    return {
      cities: tripInfo.cities,
      totalCost: tripInfo.totalCost,
      dateFrom,
      dateTo,
    };
  }

  _handlePointsModelChange(updateType, payload) {
    if (updateType === UpdateType.MAJOR_POINT_UPDATE) {
      this.init();
    }
  }
}
