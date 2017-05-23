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