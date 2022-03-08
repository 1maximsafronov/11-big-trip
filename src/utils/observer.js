export default class Obsrver {
  constructor() {
    this._observers = [];
  }

  addObserver(callback) {
    this._observers.push(callback);
  }

  removeObserver(callback) {
    this._observers = this._observers.filter((observer) => observer !== callback);
  }

  _notify(event, payload) {
    this._observers.forEach((observer) => observer(event, payload));
  }
}
