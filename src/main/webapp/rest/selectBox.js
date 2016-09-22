/**
 * Created by Seungpil, Park on 2016. 9. 6..
 */
var SelectBox = function (tree, aras) {
    SelectBox.superclass.call(this);
    this.tree = tree;
    this.aras = aras;
};

SelectBox.prototype = new Rest();
SelectBox.superclass = Rest;
SelectBox.prototype.constructor = SelectBox;

SelectBox.prototype.bindEvent = function () {
    var me = this;
    $('#discipline').change(function () {
        me.reload();
    });

    $('#disciplineSpec').change(function () {
        me.reload();
    });

    $('#bg').change(function () {
        me.reload();
    });

    $('#targetOtherWorkflow').change(function () {
        var wfId = $('#targetOtherWorkflow').val();
        var tree = me._tree;
        var select = new Select();
        var outResult = select.reload('DHI_WF_EDITOR_STRUCTURE', wfId, me._stdYN);
        var parser = new Parser(tree);
        var otherWorkFlowData = parser.createOtherWorkFlowData(outResult.nodeList);

        tree.removeDataByFilter({position: tree.Constants.POSITION.OTHER});
        tree.removeDataByFilter({position: tree.Constants.POSITION.OTHER_OUT});

        tree.updateData(otherWorkFlowData);
        tree.render();
    });
};

SelectBox.prototype.load = function () {
    var pDatainitCB = "{kind: 'Init', discLine: '', discSpec: '', bg: '', wf_id: '" + this._wfId + "', stdYN: '" + this._stdYN + "', project_id: '" + this._projectId + "', REL_WF_ID: ''}";

    this._type = 'POST';
    this._url = '/UI_Extends/WEBService/WSUIExtends.asmx/GetSchCombo';
    this._data = pDatainitCB;
    this._callback = this.renderSelectBox;
    this.call();
};

SelectBox.prototype.reload = function () {
    var pDatainitCB = "{kind: '', discLine: '" + $("#discipline").val() + "', discSpec: '" + $("#disciplineSpec").val() + "', bg: '" + $("#bg").val()
        + "', wf_id: '" + this._wfId + "', stdYN: '" + this._stdYN + "', project_id: '" + this._projectId + "', REL_WF_ID: ''}";

    this._type = 'POST';
    this._url = '/UI_Extends/WEBService/WSUIExtends.asmx/GetSchCombo';
    this._data = pDatainitCB;
    this._callback = this.renderOtherWorkFlowBox;
    this.call();
};

SelectBox.prototype.renderOtherWorkFlowBox = function (response) {
    var json = jQuery.parseJSON(response.d);
    if (json.rtn) {
        var otherWorkFlows = jQuery.parseJSON(json.data);
        for (var i in otherWorkFlows.data) {
            this.appendSelectBoxElement($('#targetOtherWorkflow'), otherWorkFlows.data[i].LABEL, otherWorkFlows.data[i].VALUE);
        }
    }
};
SelectBox.prototype.appendSelectBoxElement = function (element, label, value) {
    element.append($('<option>', {
        value: value,
        text: label
    }));
};
SelectBox.prototype.renderSelectBox = function (response) {
    var json = jQuery.parseJSON(response.d);

    if (json.rtn) {
        var discipline = jQuery.parseJSON(json.data);
        var disciplineSpec = jQuery.parseJSON(json.data1);
        var bg = jQuery.parseJSON(json.data2);

        for (var i in discipline.data) {
            this.appendSelectBoxElement($('#discipline'), discipline.data[i].LABEL, discipline.data[i].VALUE);
        }

        for (var i in disciplineSpec.data) {
            this.appendSelectBoxElement($('#disciplineSpec'), disciplineSpec.data[i].LABEL, disciplineSpec.data[i].VALUE);
        }

        for (var i in bg.data) {
            this.appendSelectBoxElement($('#bg'), bg.data[i].LABEL, bg.data[i].VALUE);
        }
    }
};