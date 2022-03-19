import Abstract from "./abstract";
import moment from "moment";

export default class TripInfo extends Abstract {
  constructor(tripInfo) {
    super();

    this._data = tripInfo;
  }

  _getTemplate() {
    let cities = this._data.cities;

    if (cities.length > 3) {
      cities = [cities[0], `...`, cities[cities.length - 1]];
    }

    const title = cities.join(` &mdash; `);
    const cost = this._data.totalCost;

    let dates = this._formateDates(this._data.dateFrom, this._data.dateTo);

    return (
      `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${title}</h1>
          <p class="trip-info__dates">${dates}</p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
        </p>
      </section>`
    );
  }


  _formateDates(dateFrom, dateTo) {

    if (!dateFrom || !dateTo) {
      return ``;
    }

    let startDate = moment(dateFrom).format(`MMM DD`);
    let endDate = moment(dateTo).format(`MMM DD`);

    const isSameMonth = moment(dateFrom)
      .isSame(dateTo, `month`);

    if (isSameMonth) {
      endDate = moment(dateTo).format(`DD`);
    }

    return `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
  }
}
