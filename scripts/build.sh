# ビルドプロセスを実行するスクリプト
# 開発作業前に以下のコマンドを実行し、ディレクトリの内容を監視しておくこと。
# sh scripts/watch.sh
echo "build start."

# ESLintでコーディング規約のチェック(テストコード含める)
eslint js/source js/__tests__

# Flowで型チェック
flow

# jestの実行
npm test

# Javascriptのトランスパイル
# babel --presets react,es2015 js/source -d js/build
babel js/source -d js/build

# Javascriptのパッケージング
browserify js/build/app.js -o bundle.js
browserify js/build/discover.js -o discover-bundle.js

# CSSのパッケージング
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css

# 完了
date; echo;
echo "build complete."
