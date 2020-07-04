/* flow */

import CRUDStore from './CRUDStore';

const CRUDActions = {

  /**
   * create one record.
   * @param {Object} newRecord
   */
  create(newRecord: Object) {
    let data = CRUDStore.getData();
    data.unshift(newRecord);
    CRUDStore.setData(data);
  },

  /**
   * delete one record.
   * @param {Object} recordId
   */
  delete(recordId: number) {
    let data = CRUDStore.getData();
    data.splice(recordId, 1);
    CRUDStore.setData(data);
  },

  /**
   * update one record.
   * @param {number} recordId
   * @param {Object} newRecord
   */
  updateRecord(recordId: number, newRecord: Object) {
    let data = CRUDStore.getData();
    data[recordId] = newRecord;
    CRUDStore.setData(data);
  },

  /**
   * update only field on one record.
   * @param {number} recordId
   * @param {string} key
   * @param {string | number} value
   */
  updateField(recordId: number, key: string, value: string | number) {
    let data = CRUDStore.getData();
    data[recordId][key] = value;
    CRUDStore.setData(data);
  },

  // -------- Searching and Sorting features -----------

  /**
   * A preservation field for table data on Searching feature.
   */
  _preSearchData: null;

  /**
   * Save the current table data.
   */
  startSearching() {
    this._preSearchData = CRUDStore.getData();
  }



}

export default CRUDActions
