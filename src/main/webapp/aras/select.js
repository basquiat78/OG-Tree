/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var Select = function () {
    Select.superclass.call(this);
    this.LOAD_CHILD_METHOD = 'DHI_WF_EDITOR_ACTIVITY_STRUCTURE';
};
Select.prototype = new Aras();
Select.superclass = Aras;
Select.prototype.constructor = Select;

Select.prototype.loadChild = function (inout, data, view) {
    var me = this;
    var folderYn = data.type == 'folder' ? 'Y' : 'N';
    var body = '<activity_id>' + view.root + '</activity_id>';
    body += '<std_yn>' + this._stdYN + '</std_yn>';
    body += '<folder_yn>' + folderYn + '</folder_yn>';
    body += '<folder_id>' + data.id + '</folder_id>';
    body += '<inout>' + inout + '</inout>';

    this.body = body;

    if (typeof this._arasObject != 'undefined' || this._arasObject != null) {
        return this.applyMethod(me.LOAD_CHILD_METHOD);
    }
};

Select.prototype.load = function (selectMethodName, inout) {
    var body = '<wf_id>' + this._wfId + '</wf_id>';
    body += '<std_yn>' + this._stdYN + '</std_yn>';
    body += '<inout>' + inout + '</inout>';

    this.body = body;

    if (typeof this._arasObject != 'undefined' || this._arasObject != null) {
        return this.applyMethod(selectMethodName);
    }
};
Select.prototype.reload = function (selectMethodName, wfId, stdYN) {
    var body = '<wf_id>' + wfId + '</wf_id>';
    body += '<std_yn>' + stdYN + '</std_yn>';
    body += '<inout>OUT</inout>';

    this.body = body;

    if (typeof this._arasObject != 'undefined' || this._arasObject != null) {
        return this.applyMethod(selectMethodName);
    }
};
