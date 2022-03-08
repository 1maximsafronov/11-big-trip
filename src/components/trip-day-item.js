import Abstract from "./abstract";
import moment from "moment";

export default class TripDay extends Abstract {
  constructor(dayInfo) {
    super();

    this._dayInfo = dayInfo;
    this._dayCount = 1;
    this._dateTime = `2019-03-18`;
    this._formateDate = `MAR 18`;
  }
  _getTemplate() {

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          ${this._dayInfo !== null ?
        `<span class="day__counter">${this._dayInfo.count}</span>
          <time class="day__date" datetime="${moment(this._dayInfo.date).format()}">${moment(this._dayInfo.date).format(`MMM DD`)}</time>` :
        ``}

        </div>

        <ul class="trip-events__list"></ul>
      </li>`
    );
  }
}
