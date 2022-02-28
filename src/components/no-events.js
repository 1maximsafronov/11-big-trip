const createTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

import Abstract from "./abstract";

export default class NoEvents extends Abstract {
  getTemplate() {
    return createTemplate();
  }
}
