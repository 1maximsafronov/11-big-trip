import Observer from "../utils/observer";
import {FilterType} from "../const";

export default class FilterModel extends Observer {
  constructor() {
    super();

    this._filterType = FilterType.EVERYTHING;
  }

  setFilterType(updateType, filterType) {
    this._filterType = filterType;

    this._notify(updateType, filterType);
  }

  getFilterType() {
    return this._filterType;
  }
}
