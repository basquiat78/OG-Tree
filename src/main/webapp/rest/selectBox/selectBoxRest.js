/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var SelectBoxRest = function (tree) {
    SelectBoxRest.superclass.call(this);
    this._wfId = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getID() : '';
    this._stdYN = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getType() == 'DHI_WF_WFT' ? 'Y' : 'N' : '';
    this._projectId = "49BEBF8A1CDA4B96BF0A0C31EBB4B449";
    this._tree = tree;
};

SelectBoxRest.prototype = new Rest();
SelectBoxRest.superclass = Rest;
SelectBoxRest.prototype.constructor = SelectBoxRest;

SelectBoxRest.prototype.bindEvent = function () {
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

SelectBoxRest.prototype.load = function () {
    var pDatainitCB = "{kind: 'Init', discLine: '', discSpec: '', bg: '', wf_id: '" + this._wfId + "', stdYN: '" + this._stdYN + "', project_id: '" + this._projectId + "', REL_WF_ID: ''}";

    this._type = 'POST';
    this._url = '/UI_Extends/WEBService/WSUIExtends.asmx/GetSchCombo';
    this._data = pDatainitCB;
    this._callback = this.renderSelectBox;
    this.call();
};

SelectBoxRest.prototype.reload = function () {
    var pDatainitCB = "{kind: '', discLine: '" + $("#discipline").val() + "', discSpec: '" + $("#disciplineSpec").val() + "', bg: '" + $("#bg").val()
        + "', wf_id: '" + this._wfId + "', stdYN: '" + this._stdYN + "', project_id: '" + this._projectId + "', REL_WF_ID: ''}";

    this._type = 'POST';
    this._url = '/UI_Extends/WEBService/WSUIExtends.asmx/GetSchCombo';
    this._data = pDatainitCB;
    this._callback = this.renderOtherWorkFlowBox;
    this.call();
};

SelectBoxRest.prototype.renderOtherWorkFlowBox = function (response) {
    var json = jQuery.parseJSON(response.d);
    if (json.rtn) {
        var otherWorkFlows = jQuery.parseJSON(json.data);
        for (var i in otherWorkFlows.data) {
            this.appendSelectBoxElement($('#targetOtherWorkflow'), otherWorkFlows.data[i].LABEL, otherWorkFlows.data[i].VALUE);
        }
    }
};
SelectBoxRest.prototype.appendSelectBoxElement = function (element, label, value) {
    element.append($('<option>', {
        value: value,
        text: label
    }));
};
SelectBoxRest.prototype.renderSelectBox = function (response) {
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