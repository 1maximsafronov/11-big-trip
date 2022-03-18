import Observer from "../utils/observer";
import {extendObject, createStructureById} from "../utils/common";

export default class Point extends Observer {
  constructor() {
    super();
    this._points = {};
  }

  setPoints(points) {
    this._points = createStructureById(points);
  }

  getPoints() {
    return Object.values(this._points).slice();
  }

  updatePoint(point) {
    if (!(point.id in this._points)) {
      throw new Error(`Невозмонжно ОБНОВИТЬ токчку которой не существует`);
    }

    const newPoint = extendObject(this._points[point.id], point);

    this._points[point.id] = newPoint;
  }

  deletePoint(point) {
    if (!(point.id in this._points)) {
      throw new Error(`Невозмонжно УДАЛИТЬ токчку которой не существует`);
    }

    delete this._points[point.id];
  }

  static adaptToClient(data) {
    return {
      id: data[`id`],
      type: data[`type`],
      dateTo: new Date(data[`date_to`]),
      dateFrom: new Date(data[`date_from`]),
      basePrice: data[`base_price`],
      isFavorite: data[`is_favorite`],
      destination: data[`destination`],
      offers: data[`offers`],
    };
  }

  static adaptToServer(point) {
    return {
      "id": point.id,
      "type": point.type,
      "date_to": point.dateTo.toISOString(),
      "date_from": point.dateFrom.toISOString(),
      "base_price": point.basePrice,
      "is_favorite": point.isFavorite,
      "destination": point.destination,
      "offers": point.offers,
    };
  }
}
