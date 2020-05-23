'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Excel from './components/Excel';

// 表データ読み込み
let headers = localStorage.getItem('headers');
let data = localStorage.getItem('data');
if (!headers) {
  headers = ['タイトル', '年', '評価', 'コメント'];
  data = [['テスト', '2020', '3', 'あああ']];
}

ReactDOM.render(
  <div>
    <h1>
      <Logo />Welcome to Whinepad!
    </h1>
    <Excel headers={headers} initialData={data} />
  </div>,
  document.getElementById('pad')
);
