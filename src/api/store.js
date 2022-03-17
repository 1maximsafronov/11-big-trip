import {extendObject} from "../utils/common";

export default class Store {
  constructor(storeKey, storage) {
    this._storeKey = storeKey;
    this._storage = storage;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  getItem(key) {
    const store = this.getItems();

    return store[key] || {};
  }

  setItems(items) {
    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  setItem(key, value) {
    const store = this.getItems();
    const items = extendObject(store, {[key]: value});

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(items)
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(this._storeKey, JSON.stringify(store));
  }

}
