/**
 * Created by Seungpil, Park on 2016. 9. 6..
 */
var Aras = function () {
    this._arasObject = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.aras : '';
    this._arasThisItem = (parent.top.thisItem != null && typeof parent.top.thisItem != 'undefined') ? parent.top.thisItem : '';
    this._wfId = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getID() : '';
    this._stdYN = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getType() == 'DHI_WF_WFT' ? 'Y' : 'N' : '';
    this._body = '';
};
Aras.prototype = {
    applyMethod: function (methodName) {
        if(this._arasObject){
            var inn = this._arasObject.newIOMInnovator();
            return inn.applyMethod(methodName, this.body);
        }
        return null;
    }
};
Aras.prototype.constructor = Aras;