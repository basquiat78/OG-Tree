/**
 * Created by Seungpil, Park on 2016. 9. 6..
 */
var Rest = function () {
	this._wfId = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getID() : '';
    this._stdYN = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getType() == 'DHI_WF_WFT' ? 'Y' : 'N' : '';
    this._projectId = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getProperty('_rel_project') ? parent.top.thisItem.getProperty('_rel_project') : '' : '';

    this._type = '';
    this._url = '';
    this._data = '';
    this._contentType = "application/json; charset=utf-8";
    this._dataType = 'json';
    this._callback = function () {};
};
Rest.prototype = {
    call: function(){
        var self = this;
        $.ajax({
            type: this._type,
            url: this._url,
            data: this._data,
            contentType: this._contentType,
            dataType: this._dataType,
            success: function (response) {
                var callback = $.proxy(self._callback, self);
                callback(response);
            }
        });
    }
};
Rest.prototype.constructor = Rest;