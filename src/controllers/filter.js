import FilterComponent from "../components/filter";
import {render} from "../utils/render";
import {logToConsole} from "../utils/common";

export default class FilterController {
  constructor(container, filterModel) {
    this._container = container;
    this._filterModel = filterModel;

    this._filterComponent = null;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  init() {
    this._filterComponent = new FilterComponent();
    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);
    render(this._container, this._filterComponent);
  }

  _filterChangeHandler(filterType) {
    logToConsole(`Меняем фильтр`, filterType);
  }
}
