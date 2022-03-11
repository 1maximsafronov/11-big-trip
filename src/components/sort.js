import Abstract from "./abstract";
import {SortType} from "../const";

const createTemplate = (currentSort) => {

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>

        <div class="trip-sort__item trip-sort__item--event">
          <input class="trip-sort__input visually-hidden"
            id="sort-event"
            type="radio"
            name="trip-sort"
            value="${SortType.DEFAULT}"
            ${currentSort === SortType.DEFAULT ? `checked` : ``}
          >
          <label class="trip-sort__btn" for="sort-event">Event</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--time">
          <input class="trip-sort__input visually-hidden"
            id="sort-time"
            type="radio"
            name="trip-sort"
            value="${SortType.BY_TIME}"
            ${currentSort === SortType.BY_TIME ? `checked` : ``}
          >
          <label class="trip-sort__btn" for="sort-time">
            Time
            <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
            </svg>
          </label>
        </div>

        <div class="trip-sort__item  trip-sort__item--price">
          <input class="trip-sort__input visually-hidden"
            id="sort-price"
            type="radio"
            name="trip-sort"
            value="${SortType.BY_PRICE}"
            ${currentSort === SortType.BY_PRICE ? `checked` : ``}
          >
          <label class="trip-sort__btn" for="sort-price">
            Price
            <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
            </svg>
          </label>
        </div>

        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>`
  );
};

export default class Sort extends Abstract {
  constructor(currentSort) {
    super();
    this._currentSort = currentSort;
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  _getTemplate() {
    return createTemplate(this._currentSort);
  }

  _sortChangeHandler(evt) {
    evt.preventDefault();
    const sortType = evt.target.value;
    this._callback.sortChange(sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortChange = callback;

    this.getElement().addEventListener(`change`, this._sortChangeHandler);
  }
}
