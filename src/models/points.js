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
}
