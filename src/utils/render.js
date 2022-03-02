import {RenedrPosition} from "../const";
import Abstract from "../components/abstract";

export const createElement = (template) =>{
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const renderTemplate = (container, template, place = RenedrPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

export const render = (container, child, place = RenedrPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenedrPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenedrPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const replace = (newChild, oldChild) => {
  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  const parent = oldChild.parentElement;
  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Удалять можно только комопннеты `);
  }

  component.getElement().remove();
  component.removeElement();
};
