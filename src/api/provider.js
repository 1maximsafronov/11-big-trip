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
    return this._api.getPoints()
      .then((points) => {
        this._store.setItem(NameSpace.POINTS, points.map(PointsModel.adaptToServer));

        return points;
      });
  }

  updatePoint(point) {
    return this._api.updatePoint(point)
      .then((response) => {

        return response;
      });
  }

  deletePoint(point) {
    return this._api.deletePoint(point)
      .then((response) => {

        return response;
      });
  }

  createPoint() {

  }

  getOffers() {
    return this._api.getOffers()
      .then((offers) => {
        this._store.setItem(NameSpace.OFFERS, offers);

        return offers;
      });
  }

  getDestinations() {
    return this._api.getDestinations()
      .then((destinations) => {
        this._store.setItem(NameSpace.DESTINATIONS, destinations);

        return destinations;
      });
  }
}
