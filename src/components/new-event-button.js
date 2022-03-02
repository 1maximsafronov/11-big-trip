import Abstract from "./abstract";

export default class NewEventButton extends Abstract {
  _getTemplate() {
    return (
      `<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>`
    );
  }
}
