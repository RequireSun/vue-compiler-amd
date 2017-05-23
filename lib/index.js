/**
 * Created by kelvinsun on 2017/5/23.
 */

const amd = require('./amdWrap');
const html = require('./html');
const javascript = require('./javascript');
const parser = require('vue-loader/lib/parser');

const sourceMap = false;

module.exports = (content, filename = 'vue_template_file.vue') => {
    var parts = parser(content, filename, sourceMap);

    var template = parts['template'];
    var script = parts['script'];

    if (Array.isArray(template)) {
        template = template[0];
    }

    if (Array.isArray(script)) {
        script = script[0];
    }

    template = ((template || {}).content || '');
    script = ((script || {}).content || '');

    template = amd.part(html(template));
    script = amd.part(javascript(script));
    var scopeId = `data-v-${Date.now()}`;

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

    return {
        code,
    };
};