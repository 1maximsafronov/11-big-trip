import PointsModel from "../models/points";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};


export default class Api {
  constructor(endpoint, authToken) {
    this._endpoint = endpoint;
    this._authToken = authToken;
  }

  getPoints() {
    return this._load({url: `points`, method: Method.GET})
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON)
    .then((newPoint) => PointsModel.adaptToClient(newPoint));
  }

  deletePoint(point) {
    return this._load({url: `points/${point.id}`, method: Method.DELETE});
  }

  createPoint(newPoint) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(PointsModel.adaptToServer(newPoint)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON)
    .then((response) => PointsModel.adaptToClient(response));

  }

  getOffers() {
    return this._load({url: `offers`, method: Method.GET})
      .then(Api.toJSON);
  }

  getDestinations() {
    return this._load({url: `destinations`, method: Method.GET})
      .then(Api.toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authToken);

    return fetch(`${this._endpoint}/${url}`, {method, body, headers})
      .catch((err)=> {
        throw err;
      });
  }

  static toJSON(response) {
    return response.json();
  }
}
