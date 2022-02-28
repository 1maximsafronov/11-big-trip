import {getRandomInt, getRandomBool, getRandomArrItem} from "../utils";
import {generateDestination} from "./destination";

const eventTypes = [
  `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`,
];

export const generateEvent = () => {
  return {
    id: ``,
    type: getRandomArrItem(eventTypes),
    dateTo: ``,
    dateFrom: ``,
    basePrice: getRandomInt(100, 1000),
    isFavorite: getRandomBool(),
    destination: generateDestination(),
    offers: [
      {
        title: `Первое чтото`,
        price: getRandomInt(20, 250),
      },
      {
        title: `И чтото второе`,
        price: getRandomInt(20, 250),
      },
    ],
  };
};

export const generateEvents = (count) => {
  return new Array(count).fill(``).map(generateEvent);
};
