
import {RenedrPosition} from "./const";

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


export const getRandomInt = (min = 0, max = 1) =>
  (Math.floor(Math.random() * (max - min + 1)) + min);

export const getRandomArrItem = (arr) => arr[getRandomInt(0, arr.length - 1)];


export const getRandomBool = () => {
  return getRandomInt(0, 1) > 0.5;
};


export const capitalizeFirstLetter = (str) => {
  return str[0].toUpperCase() + str.substring(1);
};


export const renderElement = (container, element, place) => {
  switch (place) {
    case RenedrPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenedrPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) =>{
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
