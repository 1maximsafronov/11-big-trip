import {getRandomArrItem, getRandomInt} from "../utils/common";

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`,
];

const destinationNames = [
  `Amsterdam`, `Chamonix`, `Geneva`, `Moscow`, `Kiev`,
];

export const generateDestination = () => {
  return {
    name: getRandomArrItem(destinationNames),
    description: descriptions.slice(0, getRandomInt(1, descriptions.length - 1)),
    pictures: [
      {
        src: `http:picsum.photos/248/152?r=${Math.random()}`,
        description: `Описание фото`
      },
      {
        src: `http:picsum.photos/248/152?r=${Math.random()}`,
        description: `Описание фото`
      },
    ]
  };
};
