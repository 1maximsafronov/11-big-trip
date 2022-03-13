import Abstract from "./abstract";

export default class Loading extends Abstract {
  _getTemplate() {
    return `<p class="trip-events__msg">Loading...</p>`;
  }
}
