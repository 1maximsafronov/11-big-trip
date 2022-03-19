import Smart from "./smart";
import moment from "moment";

export default class TripInfo extends Smart {
  constructor() {
    super();

    this._data = {
      cities: [`Amsterdam`, `Chamonix`, `Geneva`],
      dateFrom: moment(`2022-03-18`),
      dateTo: moment(`2022-03-20`),
      totalCost: 1230
    };
  }

  _getTemplate() {
    const title = this._data.cities.join(` &mdash; `);
    const cost = this._data.totalCost;

    let startDate = moment(this._data.dateFrom).format(`MMM DD`);
    let endDate = moment(this._data.dateTo).format(`MMM DD`);

    const isSameMonth = moment(this._data.dateFrom)
      .isSame(this._data.dateTo, `month`);

    if (isSameMonth) {
      endDate = moment(this._data.dateTo).format(`DD`);
    }

    let dates = `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;

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
}
