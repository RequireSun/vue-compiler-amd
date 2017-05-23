/**
 * Created by kelvinsun on 2017/5/23.
 */

const amd = require('./amdWrap');
const html = require('./html');
const javascript = require('./javascript');

var filename = 'app';

var template = `
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br/>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>`;


var script = `
//require('mqq2.data')
module.exports = {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}`;

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

console.log(code);