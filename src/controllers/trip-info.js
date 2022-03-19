import TripInfoComponent from "../components/trip-info";
import {render} from "../utils/render";

export default class TripInfoController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._tripInfoComponent = new TripInfoComponent();
  }

  init() {
    this._renderTripInfo();
  }

  _renderTripInfo() {
    render(this._container, this._tripInfoComponent);
  }
}
