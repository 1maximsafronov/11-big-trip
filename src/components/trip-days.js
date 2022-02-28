const createTripDaysTemplate = () => {

  const counter = 1;
  const dateTyme = `2019-03-18`;

  const formatDate = `MAR 18`;

  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${counter}</span>
          <time class="day__date" datetime="${dateTyme}">${formatDate}</time>
        </div>

        <ul class="trip-events__list"></ul>
      </li>
    </ul>`
  );
};


import Abstract from "./abstract";

export default class Sort extends Abstract {

  getTemplate() {
    return createTripDaysTemplate(this._event);
  }
}
