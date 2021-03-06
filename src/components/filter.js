import Abstract from "./abstract";

const createTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input class="trip-filters__filter-input visually-hidden"
            type="radio"
            id="filter-everything"
            name="trip-filter"
            value="everything"
            checked
          >
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
          <input class="trip-filters__filter-input visually-hidden"
            type="radio"
            id="filter-future"
            name="trip-filter"
            value="future"
          >
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input class="trip-filters__filter-input visually-hidden"
            type="radio"
            id="filter-past"
            name="trip-filter"
            value="past"
          >
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};

export default class Filter extends Abstract {
  _getTemplate() {
    return createTemplate();
  }
}
