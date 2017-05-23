/**
 * Created by kelvinsun on 2017/5/23.
 */
exports.part = (code) => {
    const _t = Date.now();
    //TODO extend
    return {
        code:
`var scripts_${_t} = {
	exports: {},
};
var tmp_${_t} = (function (exports, module) {
${code}
})(scripts_${_t}.exports, scripts_${_t})

if (tmp_${_t}) {
	scripts_${_t} = tmp_${_t}.exports;
}`,
        id: _t
    };
};

exports.all = (options) => {
    const { filename, scopeId, template, script } = options;

    var code = `
define('${filename}', function (require, exports, module) {
    ${template['code']}
    ${script['code']}
    var scopeId = '${scopeId}';

    var scriptExports = (scripts_${script['id']} || {}).exports || {};
    var compiledTemplate = (scripts_${template['id']} || {}).exports || {};

    // Vue.extend constructor export interop
    var options = typeof scriptExports === 'function'
        ? scriptExports.options
        : scriptExports

    // render functions
    if (compiledTemplate) {
        options.render = compiledTemplate.render
        options.staticRenderFns = compiledTemplate.staticRenderFns
    }

    // scopedId
    if (scopeId) {
        options._scopeId = scopeId
    }

    return scriptExports;
});`;

    return code;
};