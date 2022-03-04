import {getRandomInt, getRandomBool, getRandomArrItem} from "../utils/common";
import {generateDestination} from "./destination";
import {nanoid} from "nanoid";

const PointTypes = [
  `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`,
];

const generateOffers = (offers, type) => {
  const arr = offers
    .find((item) => item.type === type)
    .offers
    .slice().sort(()=> getRandomBool());

  return arr.slice(0, getRandomInt(0, arr.length - 1));
};

export const generatePoint = (arr) => {
  const type = getRandomArrItem(PointTypes);
  const offers = generateOffers(arr, type);

  return {
    id: nanoid(),
    type,
    dateTo: ``,
    dateFrom: ``,
    basePrice: getRandomInt(100, 1000),
    isFavorite: getRandomBool(),
    destination: generateDestination(),
    offers,
  };
};

export const generatePoints = (count, offers) => {
  return new Array(count).fill(``).map(() => {
    return generatePoint(offers);
  });
};
