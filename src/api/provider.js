import PointsModel from "../models/points";

const NameSpace = {
  POINTS: `points`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`,
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (Provider.isOnline()) {
      return this._api.getPoints()
      .then((points) => {
        this._store.setItem(NameSpace.POINTS, points.map(PointsModel.adaptToServer));

        return points;
      });
    }

    return Promise.reject(`Не описаны действия в режиме offline`);
  }

  updatePoint(point) {
    if (Provider.isOnline()) {
      return this._api.updatePoint(point)
      .then((response) => {

        return response;
      });
    }

    return Promise.reject(`Не описаны действия в режиме offline`);
  }

  deletePoint(point) {
    if (Provider.isOnline()) {
      return this._api.deletePoint(point)
      .then((response) => {

        return response;
      });
    }

    return Promise.reject(`Не описаны действия в режиме offline`);
  }

  createPoint() {
    if (Provider.isOnline()) {
      // тут будет запрос на создание точки маршрута
    }

    return Promise.reject(`Не описаны действия в режиме offline`);
  }

  getOffers() {
    if (Provider.isOnline()) {
      return this._api.getOffers()
      .then((offers) => {
        this._store.setItem(NameSpace.OFFERS, offers);

        return offers;
      });
    }

    return Promise.reject(`Не описаны действия в режиме offline`);
  }

  getDestinations() {
    if (Provider.isOnline()) {
      return this._api.getDestinations()
      .then((destinations) => {
        this._store.setItem(NameSpace.DESTINATIONS, destinations);

        return destinations;
      });
    }

    return Promise.reject(`Не описаны действия в режиме offline`);
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
