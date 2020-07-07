'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CRUDStore = require('./CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDActions = {

  /**
   * create one record.
   * @param {Object} newRecord
   */
  create: function create(newRecord) {
    var data = _CRUDStore2.default.getData();
    data.unshift(newRecord);
    _CRUDStore2.default.setData(data);
  },


  /**
   * delete one record.
   * @param {Object} recordId
   */
  delete: function _delete(recordId) {
    var data = _CRUDStore2.default.getData();
    data.splice(recordId, 1);
    _CRUDStore2.default.setData(data);
  },


  /**
   * update one record.
   * @param {number} recordId
   * @param {Object} newRecord
   */
  updateRecord: function updateRecord(recordId, newRecord) {
    var data = _CRUDStore2.default.getData();
    data[recordId] = newRecord;
    _CRUDStore2.default.setData(data);
  },


  /**
   * update only field on one record.
   * @param {number} recordId
   * @param {string} key
   * @param {string | number} value
   */
  updateField: function updateField(recordId, key, value) {
    var data = _CRUDStore2.default.getData();
    data[recordId][key] = value;
    _CRUDStore2.default.setData(data);
  },


  // -------- Searching and Sorting features -----------

  /**
   * A preservation field for table data on Searching feature.
   */
  _preSearchData: null,

  /**
   * Save the current table data.
   */
  startSearching: function startSearching() {
    this._preSearchData = _CRUDStore2.default.getData();
  },


  /**
   * This method is called when fired onChange on search window.
   * 1. if search window is blank, the data is rolled back.
   * 2. Generate array of item.id from schema.
   * 3. Search needles from each columns of data rows in _preSearchData.
   * 4. Setting search result data to CRUDStore.
   * @param {Event} e
   */
  search: function search(e) {
    var needle = e.target.value.toLowerCase();
    // 1. if search window is blank, the data is rolled back.
    if (!needle) {
      _CRUDStore2.default.setData(this._preSearchData);
      return;
    }
    var fields = _CRUDStore2.default.getSchema().map(function (item) {
      return item.id;
    });
    if (!this._preSearchData) {
      return;
    }
    var searchData = this._preSearchData.filter(function (row) {
      for (var f = 0; f < fields.length; f++) {
        if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
          return true;
        }
      }
      return false;
    });
    _CRUDStore2.default.setData(searchData, /* commit */false);
  },


  /**
   * This is Callback function for {@link sort}.
   * @param {string | number} a
   * @param {string | number} b
   * @param {boolean} descending
   */
  _sortCallback: function _sortCallback(a, b, descending) {
    var result = 0;
    if (typeof a === 'number' && typeof b === 'number') {
      result = a - b;
    } else {
      result = String(a).localeCompare(String(b));
    }
    return descending ? -1 * result : result;
  },


  /**
   * Sort the data order by clicked column asc or desc.
   * @param {string} key
   * @param {boolean} descending
   */
  sort: function sort(key, descending) {
    var _this = this;

    _CRUDStore2.default.setData(_CRUDStore2.default.getData().sort(function (a, b) {
      return _this._sortCallback(a[key], b[key], descending);
    }));
  }
}; /* flow */

exports.default = CRUDActions;