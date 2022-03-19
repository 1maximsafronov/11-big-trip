import FilterComponent from "../components/filter";
import {render} from "../utils/render";
import {UpdateType} from "../const";

export default class FilterController {
  constructor(container, filterModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._filterComponent = null;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  init() {
    const currentFilterType = this._filterModel.getFilterType();
    this._filterComponent = new FilterComponent(currentFilterType);
    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);
    render(this._container, this._filterComponent);
  }

  _filterChangeHandler(filterType) {
    this._filterModel.setFilterType(UpdateType.FILTER_CHANGE, filterType);
  }
}
