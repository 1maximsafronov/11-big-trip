import Abstract from "./abstract";

const ACTIVE_CLASS = `trip-tabs__btn--active`;

export default class SiteMenu extends Abstract {
  constructor(activeTab) {
    super();

    this._activeTab = activeTab;

    this._changeTabHandler = this._changeTabHandler.bind(this);
  }

  _getTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs trip-tabs">
        <a class="trip-tabs__btn ${this._activeTab === `table` ? ACTIVE_CLASS : ``}" href="#" data-menu-tab="table">Table</a>
        <a class="trip-tabs__btn ${this._activeTab === `stats` ? ACTIVE_CLASS : ``}" href="#" data-menu-tab="stats">Stats</a>
      </nav>`
    );
  }

  _changeTabHandler(evt) {
    if (evt.target.tagName === `A`) {
      evt.preventDefault();
      const newTab = evt.target.dataset.menuTab;
      if (this._activeTab !== newTab) {
        this._callback.changeTab(evt.target.dataset.menuTab);
      }
    }
  }

  setChangeTabHahndler(cb) {
    this._callback.changeTab = cb;

    this.getElement().addEventListener(`click`, this._changeTabHandler);
  }
}
