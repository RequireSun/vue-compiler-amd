/**
 * Created by kelvinsun on 2017/5/23.
 */

const amd = require('./amdWrap');
const html = require('./html');
const javascript = require('./javascript');
const parser = require('vue-loader/lib/parser');

const sourceMap = false;

module.exports = (content, options = {}) => {
    const {
        filename = 'vue_template_file.vue',
        userModules = [],
        transformToRequire = null,
        preserveWhitespace = true,
    } = options;
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

    template = amd.part(html(template, {
        userModules,
        transformToRequire,
        preserveWhitespace,
    }));
    script = amd.part(javascript(script));
    var scopeId = `data-v-${Date.now()}`;

    var code = amd.all({
        filename,
        scopeId,
        template,
        script,
    });

    return {
        code,
    };
};