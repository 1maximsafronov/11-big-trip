
import PointsModel from "./models/points";

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
      .then((response) => response.json())
      .then((points) => points.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then((response) => response.json())
    .then((newPoint) => PointsModel.adaptToClient(newPoint));
  }

  deletePoint(point) {
    return this._load({url: `points/${point.id}`, method: Method.DELETE});
  }

  createPoint() {

  }

  getOffers() {
    return this._load({url: `offers`, method: Method.GET})
      .then((response) => response.json());
  }

  getDestinations() {
    return this._load({url: `destinations`, method: Method.GET})
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authToken);

    return fetch(`${this._endpoint}/${url}`, {method, body, headers})
      .catch((err)=> {
        throw err;
      });
  }
}
