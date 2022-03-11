import Observer from "../utils/observer";

export default class Point extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  getPoints() {
    return this._points.slice();
  }

  updatePoint(action, payload) {
    const index = this._points.findIndex((observer) => observer.id === payload.id);

    if (index === -1) {
      throw new Error(`Невозмонжно обновить токчку которой не существует`);
    }

    this._points = [
      ...this._points.slice(0, index),
      payload,
      ...this._points.slice(index + 1, 0)
    ];
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
