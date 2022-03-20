import PointsModel from "../models/points";
import {createStructureById} from "../utils/common";

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
        const items = createStructureById(points.map(PointsModel.adaptToServer));
        this._store.setItem(NameSpace.POINTS, items);

        return points;
      });
    }

    const storedPoints = this._store.getItem(NameSpace.POINTS);
    const points = Object.values(storedPoints).map(PointsModel.adaptToClient).slice();

    return Promise.resolve(points);
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

  createPoint(newPoint) {
    if (Provider.isOnline()) {
      return this._api.createPoint(newPoint)
        .then((response) => {

          return response;
        });
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

    const offers = this._store.getItem(NameSpace.OFFERS).slice();

    return Promise.resolve(offers);
  }

  getDestinations() {
    if (Provider.isOnline()) {
      return this._api.getDestinations()
      .then((destinations) => {
        this._store.setItem(NameSpace.DESTINATIONS, destinations);

        return destinations;
      });
    }

    const destinations = this._store.getItem(NameSpace.DESTINATIONS).slice();

    return Promise.resolve(destinations);
  }

  sync() {
    if (Provider.isOnline()) {
      const storedPoints = this._store.getItem(NameSpace.POINTS);

      return this._api.sync(storedPoints)
        .then((response) => {

          const createdPoints = response.created;
          const updatedPoints = response.updated;

          const items = createStructureById([...createdPoints, ...updatedPoints]);
          this._store.setItem(NameSpace.POINTS, items);

          return response;
        });
    }

    return Promise.reject(new Error(`Не удалось синхронизировать данные с сервером`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
