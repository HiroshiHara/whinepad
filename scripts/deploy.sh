# デプロイ用ディレクトリ __deployme を作成するスクリプト
echo "__deployme create start."

# 以前のバージョンのデプロイディレクトリをクリーンアップ
rm -rf __deployme
mkdir __deployme

# ビルド
sh scripts/build.sh

# Javascriptのミニファイ
uglifyjs bundle.js > __deployme/bundle.js

# CSSのミニファイ
cleancss bundle.css > __deployme/bundle.css

# HTMLと画像を開発用ディレクトリからコピー
cp index.html __deployme/index.html
cp -r images/ __deployme/images/

# 完了
date; echo;
echo "__deployme create complete."
