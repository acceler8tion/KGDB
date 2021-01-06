/**
 * URLSearchParam의 대용
 */
function Param() {
    this.params = {};
}

/**
 * 한쌍의 key, value를 추가합니다.
 * 
 * @param {String} key key값
 * @param {any} value value값
 */
Param.prototype.add = function(key, value) {
    this.params[key.toString()] = value.toString();
}

/**
 * body값 변환
 * 
 * @returns {String} 최종 body값
 */
Param.prototype.build = function() {
    let ks = Object.keys(this.params);
    let res = [];
    for(k of ks) {
        res.push(k+"="+this.params[k]);
    }
    return res.join("&");
}

module.exports = Param;