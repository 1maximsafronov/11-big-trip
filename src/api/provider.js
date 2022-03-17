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
      .then((response) => {

        return response;
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
      .then((response) => {

        return response;
      });
  }

  getDestinations() {
    return this._api.getDestinations()
      .then((response) => {

        return response;
      });
  }
}
