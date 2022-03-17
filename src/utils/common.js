
export const getRandomInt = (min = 0, max = 1) =>
  (Math.floor(Math.random() * (max - min + 1)) + min);

export const getRandomArrItem = (arr) => arr[getRandomInt(0, arr.length - 1)];

export const getRandomBool = () => {
  return getRandomInt(0, 1) > 0.5;
};

export const capitalizeFirstLetter = (str) => {
  return str[0].toUpperCase() + str.substring(1);
};

export const extendObject = (objA, objB) => {
  return Object.assign({}, objA, objB);
};

const transferTypes = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

const activityTypes = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

export const getEventTypePlaceholder = (type) => {
  const isTransfer = transferTypes.some((item) => item === type);
  const isActivity = activityTypes.some((item) => item === type);

  if (isTransfer) {
    return `to`;
  }

  if (isActivity) {
    return `in`;
  }

  return ``;
};

export const logToConsole = (mess, value = ``) => {
  const baseStyles = [
    `color: orange`,
    `font-weight: bold`
  ].join(`; `);
  console.log(`%c/-----------------------------/`, `color: green`);
  console.log(`%c| ${mess}: `, baseStyles);
  console.log(`%c| `, baseStyles, value);
  console.log(`%c/-----------------------------/`, `color: green`);
};
