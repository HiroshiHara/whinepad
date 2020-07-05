/* @flow */

import { EventEmitter } from 'fbemitter';

let data;
let schema;
const emitter = new EventEmitter();


const CRUDStore = {
  getData(): Array<Object> {
    return data;
  },
  getSchema(): Array<Object> {
    return schema;
  },
  setData(newData: Array<Object>, commit: boolean = true) {
    data = newData;
    if (commit && 'localStrage' in window) {
      localStorage.setItem('data', JSON.stringify(newData));
    }
    emitter.emit('change');
  },

  /**
   * Get record count.
   * @returns record count
   */
  getCount(): number {
    return data.length;
  },

  /**
   * Get a record associated with the ID of an argument.
   * @param {number} recordId
   * @returns a record or null
   */
  getRecord(recordId: number): ?Object {
    return recordId in data ? data[recordId] : null;
  },

  /**
   * Initialize Application Data.
   * If the data is already stored in LocalStrage, load and set it.
   * Else if, set a data of sample.
   * @param {Array<Object>} initialSchema
   */
  init(initialSchema: Array<Object>) {
    schema = initialSchema;
    const storage = 'localStrage' in window
      ? localStorage.getItem('data')
      : null;
    if (!storage) {
      data = [{}];
      schema.forEach(item => data[0][item.id] = item.sample);
    } else {
      data = JSON.parse(storage);
    }
  },

  /**
   * Enter to list of subscription.
   * @param {string} eventType
   * @param {Function} fn
   */
  addListener(eventType: string, fn: Function) {
    emitter.addListener(eventType, fn);
  }
}

export default CRUDStore
