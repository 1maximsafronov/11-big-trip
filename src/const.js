export const eventTypes = [
  `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`,
];

export const RenedrPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const SortType = {
  DEFAULT: `sort-event`,
  BY_TIME: `sort-time`,
  BY_PRICE: `sort-price`,
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`,
};


export const UpdateType = {
  MINOR_POINT_UPDATE: `MINOR_POINT_UPDATE`,
  MAJOR_POINT_UPDATE: `MAJOR_POINT_UPDATE`,
  INIT: `INIT`,
};
