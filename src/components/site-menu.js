const createSiteMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
        <a class="trip-tabs__btn" href="#">Stats</a>
      </nav>`
  );
};

import Abstract from "./abstract";

export default class SiteMenu extends Abstract {

  getTemplate() {
    return createSiteMenuTemplate(this._event);
  }
}
