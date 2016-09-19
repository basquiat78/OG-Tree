/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var Aras = function () {
    this.arasObject = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.aras : '';
    this._body = '';
};
Aras.prototype = {
    applyMethod: function (methodName) {
        if(this.arasObject){
            var inn = this.arasObject.newIOMInnovator();
            return inn.applyMethod(methodName, this.body);
        }
        return null;
    }
};
Aras.prototype.constructor = Aras;