import {extendObject} from "../utils/common";

export default class Offers {
  constructor() {
    this._offers = {};
  }

  setOffers(offers) {
    this._offers = offers.reduce((acc, item) => {
      return extendObject(acc, {[item.type]: item.offers});
    }, {});
  }

  getOffers() {
    return extendObject({}, this._offers);
  }

  getOffersByType(type) {
    return this._offers[type] || [];
  }
}
