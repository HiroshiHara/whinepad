'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Whinepad from './components/Whinepad';
import schema from './schema';

// 表データ読み込み
let data = JSON.parse(localStorage.getItem('data'));

// localStrageに保存されているデータがない場合、サンプルデータを読み込む
if (!data) {
  data = {};
  schema.forEach(item => {
    data[item.id] = item.sample
  });
  data = [data];
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
