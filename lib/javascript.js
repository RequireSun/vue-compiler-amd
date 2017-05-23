/**
 * Created by kelvinsun on 2017/5/23.
 */
const babel = require('babel-core');

module.exports = (script) => {
    var compiled = babel.transform(script, {
        presets: ['es2015',],
    });

    return compiled.code;
};

