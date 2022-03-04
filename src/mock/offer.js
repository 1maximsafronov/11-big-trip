import {getRandomInt} from "../utils/common";

const offerTypes = [
  `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`,
];


const generateOffer = (item, index) => {
  return {
    title: `Дополнительная опция ${index + 1}`,
    price: getRandomInt(10, 500),
    name: `offer-${index + 1}`,
  };
};

export const generateOffers = () => {
  return offerTypes.map((type) => {
    return {
      type,
      offers: new Array(getRandomInt(2, 6)).fill(``).map(generateOffer),
    };
  });
};
