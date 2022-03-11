import Abstract from "./abstract";

export default class EventContainer extends Abstract {
  _getTemplate() {
    return `<li class="trip-events__item"></li>`;
  }
}
