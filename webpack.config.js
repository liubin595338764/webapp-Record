var webpack = require('webpack');

module.exports = {
    entry: './src/js/entry.js',  // 入口文件
    output: {                    // 输出文件
        path: __dirname + '/dist/js/',
        filename: 'entry.js'
    },
    devtool: 'inline-source-map'  //生成 sourcemap
};