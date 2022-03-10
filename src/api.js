
const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const ApiRoute = {
  OFFERS: `offers`,
  POINTS: `points`,
  DESTINATIONS: `destinations`,
};


export default class Api {
  constructor(endpoint, authToken) {
    this._endpoint = endpoint;
    this._authToken = authToken;
  }

  getPoints() {
    return this._load({url: `points`, method: Method.GET})
      .then((response) => response.json());
  }

  updatePoint() {

  }

  deletePoint() {

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
