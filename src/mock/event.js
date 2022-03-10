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

  return arr.slice(0, getRandomInt(1, arr.length - 1));
};

const generateDates = () => {
  const date = new Date();
  date.setDate(date.getDate() + getRandomInt(-5, 5));

  const dateA = new Date(date);
  const dateB = new Date(date);

  dateA.setHours(getRandomInt(0, 23), getRandomInt(0, 59), 0, 0);
  dateB.setHours(getRandomInt(0, 23), getRandomInt(0, 59), 0, 0);
  return [dateA, dateB].sort((a, b) => a - b);
};


export const generatePoint = (arr) => {
  const type = getRandomArrItem(PointTypes);
  const offers = generateOffers(arr, type);

  const [dateFrom, dateTo] = generateDates();
  return {
    id: nanoid(),
    type,
    dateTo,
    dateFrom,
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
