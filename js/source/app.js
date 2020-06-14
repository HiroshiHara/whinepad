/* @flow */

'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Whinepad from './components/Whinepad';
import schema from './schema';

// 表データ読み込み
const localdata = localStorage.getItem('data');
let data;
if (localdata) {
  data = JSON.parse(localdata);
} else {
  // localStrageに保存されているデータがない場合、サンプルデータを読み込む
  data = [{}];
  schema.forEach(item => {
    data[0][item.id] = item.sample
  });
}

ReactDOM.render(
  <div>
    <div className="app-header">
      <Logo /> Whinepad
    </div>
    <Whinepad schema={schema} initialData={data}></Whinepad>
  </div>,
  document.getElementById('pad')
);
