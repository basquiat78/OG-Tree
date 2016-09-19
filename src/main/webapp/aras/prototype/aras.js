/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var Aras = function () {
    this.arasObject = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.aras : '';
    this._body = '';
};
Aras.prototype = {
    applyMethod: function (methodName) {
        var inn = this.arasObject.newIOMInnovator();
        return inn.applyMethod(methodName, this.body);
    }
};
Aras.prototype.constructor = Aras;