import {getRandomInt, getRandomBool, getRandomArrItem} from "../utils/common";
import {generateDestination} from "./destination";
import {nanoid} from "nanoid";

const eventTypes = [
  `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`,
];

export const generateEvent = () => {
  return {
    id: nanoid(),
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
