/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var Select = function () {
    Select.superclass.call(this);
    this._selectMethodName = '';
};
Select.prototype = {
    setSelectMethodName: function (selectMethodName) {
        this._selectMethodName = selectMethodName;
    },
    getSelectMethodName: function () {
        return this._selectMethodName;
    },
    load: function (selectMethodName, inout) {
        this._selectMethodName = selectMethodName;

        var wfId = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getID() : '';
        var stdYN = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getType() == 'DHI_WF_WFT' ? 'Y' : 'N' : '';

        var body = '<wf_id>' + wfId + '</wf_id>';
        body += '<std_yn>' + stdYN + '</std_yn>';
        body += '<inout>' + inout + '</inout>';

        this.body = body;

        if (typeof this.arasObject != 'undefined' || this.arasObject != null) {
            return this.applyMethod(this.selectMethodName);
        }
    },
    reload: function (selectMethodName, wfId, stdYN) {
        this._selectMethodName = selectMethodName;

        var body = '<wf_id>' + wfId + '</wf_id>';
        body += '<std_yn>' + stdYN + '</std_yn>';
        body += '<inout>OUT</inout>';

        this.body = body;

        if (typeof this.arasObject != 'undefined' || this.arasObject != null) {
            return this.applyMethod(this._selectMethodName);
        }
    }
};
Select.prototype = new Aras();
Select.superclass = Aras;
Select.prototype.constructor = Select;