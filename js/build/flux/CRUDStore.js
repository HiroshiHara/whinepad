'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fbemitter = require('fbemitter');

var data = void 0;

var schema = void 0;
var emitter = new _fbemitter.EventEmitter();

var CRUDStore = {
  getData: function getData() {
    return data;
  },
  getSchema: function getSchema() {
    return schema;
  },
  setData: function setData(newData) {
    var commit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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
  getCount: function getCount() {
    return data.length;
  },


  /**
   * Get a record associated with the ID of an argument.
   * @param {number} recordId
   * @returns a record or null
   */
  getRecord: function getRecord(recordId) {
    return recordId in data ? data[recordId] : null;
  },


  /**
   * Initialize Application Data.
   * If the data is already stored in LocalStrage, load and set it.
   * Else if, set a data of sample.
   * @param {Array<Object>} initialSchema
   */
  init: function init(initialSchema) {
    schema = initialSchema;
    var storage = 'localStrage' in window ? localStorage.getItem('data') : null;
    if (!storage) {
      data = [{}];
      schema.forEach(function (item) {
        return data[0][item.id] = item.sample;
      });
    } else {
      data = JSON.parse(storage);
    }
  },


  /**
   * Enter to list of subscription.
   * @param {string} eventType
   * @param {Function} fn
   */
  addListener: function addListener(eventType, fn) {
    emitter.addListener(eventType, fn);
  }
};

exports.default = CRUDStore;