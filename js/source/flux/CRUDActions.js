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
  _preSearchData: null,

  /**
   * Save the current table data.
   */
  startSearching() {
    this._preSearchData = CRUDStore.getData();
  },

  /**
   * This method is called when fired onChange on search window.
   * 1. if search window is blank, the data is rolled back.
   * 2. Generate array of item.id from schema.
   * 3. Search needles from each columns of data rows in _preSearchData.
   * 4. Setting search result data to CRUDStore.
   * @param {Event} e
   */
  search(e: Event) {
    const needle: string = e.target.value.toLowerCase();
    // 1. if search window is blank, the data is rolled back.
    if (!needle) {
      CRUDStore.setData(this._preSearchData);
      return;
    }
    const fields = CRUDStore.getSchema().map(item => item.id);
    if (!this._preSearchData) {
      return;
    }
    const searchData = this._preSearchData.filter(row => {
      for (let f = 0; f < fields.length; f++) {
        if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
          return true;
        }
      }
      return false;
    });
    CRUDStore.setData(searchData, /* commit */ false);
  },

  /**
   * This is Callback function for {@link sort}.
   * @param {string | number} a
   * @param {string | number} b
   * @param {boolean} descending
   */
  _sortCallback(a: (string | number), b: (string | number), descending: boolean): number {
    let result: number = 0;
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
  sort(key: string, descending: boolean) {
    CRUDStore.setData(CRUDStore.getData().sort(
      (a, b) => this._sortCallback(a[key], b[key], descending)
    ));
  }

}

export default CRUDActions
