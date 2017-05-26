/**
 * Created by RequireSun on 2017/5/22.
 */
const compiler = require('vue-template-compiler');
const transpile = require('vue-template-es2015-compiler');
const beautify = require('js-beautify').js_beautify;
const transformRequire = require('vue-loader/lib/template-compiler/modules/transform-require');

module.exports = (html, options = {}) => {
    /**
     * userModules 更不清楚咋整
     * transformToRequire 图片 src 编译工具 (不太清楚怎么搞)
     * preserveWhitespace 是否保留空格
     */
    const { userModules = [], transformToRequire = null, preserveWhitespace = true, } = options;

    var defaultModules = [transformRequire(transformToRequire)];

    var compilerOptions = {
        preserveWhitespace: preserveWhitespace,
        modules: defaultModules.concat(userModules || []),
    };

    var compiled = compiler.compile(html, compilerOptions);

    if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(tip => {
            console.warn(tip);
        });
    }

    var code;

    if (compiled.errors && compiled.errors.length) {
        console.error(
            `\n  Error compiling template:\n${pad(html)}\n` +
            compiled.errors.map(e => `  - ${e}`).join('\n') + '\n'
        );
        code = 'module.exports={render:function(){},staticRenderFns:[]}';
    } else {
        code = transpile('module.exports={' +
                'render:' + toFunction(compiled.render) + ',' +
                'staticRenderFns: [' + compiled.staticRenderFns.map(toFunction).join(',') + ']' +
                '}', undefined) + `\nmodule.exports.render._withStripped = true`
    }

    return code;
};

function toFunction (code) {
    return 'function (){' + beautify(code, {
            indent_size: 2 // eslint-disable-line camelcase
        }) + '}';
}

function pad (html) {
    return html.split(/\r?\n/).map(line => `  ${line}`).join('\n')
}