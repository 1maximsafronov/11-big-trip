import Abstract from "./abstract";

const createTemplate = () => {
  return (
    `<div class="trip-main__trip-controls  trip-controls">
      <h2 class="visually-hidden">Switch trip view</h2>
      <!-- Меню -->

      <h2 class="visually-hidden">Filter events</h2>
      <!-- Фильтры -->
    </div>`
  );
};

export default class TripControls extends Abstract {
  _getTemplate() {
    return createTemplate();
  }
}
