/**
 * Created by Seungpil Park on 2016. 9. 6..
 */
var Doosan = function () {
    this.tree = null;
    this.aras = null;
};
Doosan.prototype = {
    init: function () {
        var me = this;
        me.tree = new Tree('canvas');
        me.tree.init();
        me.aras = new Aras(me.tree);
        me.aras.init();

        //셀렉트 박스 이벤트를 걸고 초기데이터를 불러온다.
        me.bindSelectBoxEvent();
        me.aras.getSchCombo('Init', null, null, null, null, function (err, res) {
            if (res) {
                me.renderSelectBox(res);
            }
        });

        me.aras.refreshMyWorkFlow();

        //$.getJSON("doosan/sample/myData.json", function (myData) {
        //
        //    me.tree._INCOLLAPSE = [];
        //    me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY});
        //    me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY_IN});
        //    me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY_OUT});
        //    me.tree.updateData(myData);
        //
        //    $.getJSON("doosan/sample/otherData.json", function (otherData) {
        //        me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER});
        //        me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER_OUT});
        //        me.tree.updateData(otherData);
        //    });
        //});

        //var otherData = randomData('other');
        //var myData = randomData('my');
        //me.tree.updateOtherData(otherData);
        //me.tree.updateMyData(myData);

        /**
         * GUI 상에서 매핑이 되기 전의 핸들러
         * @param source
         * @param target
         * @returns {boolean}
         */
        me.tree.onBeforeMapping = function (source, target) {
            console.log(source, target);

            //아라스에서는 소스와 타겟이 반대
            me.aras.addInRel(target, source);
            return false;
        };

        /**
         * GUI 상에서 매핑이 이루어졌을 때 핸들러
         * @param source
         * @param target
         */
        me.tree.onMapping = function (source, target) {
            console.log(source, target);
        };

        /**
         * GUI 상에서 매핑이 삭제되기 전 핸들러
         * @param sourceId
         * @param targetId
         */
        me.tree.onBeforeDeleteMapping = function (sourceId, sourceType, targetId, targetType) {
            console.log(sourceId, sourceType, targetId, targetType);

            //아라스에서는 소스와 타겟이 반대
            me.aras.deleteInRel(targetId, targetType, sourceId, sourceType);
            return false;
        };

        /**
         * GUI 상에서 매핑이 삭제되었을 때의 핸들러
         * @param sourceId
         * @param targetId
         */
        me.tree.onDeleteMapping = function (sourceId, sourceType, targetId, targetType) {
            console.log(sourceId, sourceType, targetId, targetType);
        };

        /**
         * 세이브 버튼 클릭시
         */
        $('#saveBtn').click(function () {
            //전체 데이터 불러오기
            me.tree.load();

            //매핑 데이터 불러오기
            me.tree.loadByFilter({type: me.tree.Constants.TYPE.MAPPING});

            //아더 액티비티 불러오기
            me.tree.loadByFilter({type: me.tree.Constants.POSITION.OTHER});

            //아더 폴더,ED 불러오기
            me.tree.loadByFilter({type: me.tree.Constants.POSITION.OTHER_OUT});

            //마이 액티비티 불러오기
            me.tree.loadByFilter({type: me.tree.Constants.POSITION.MY});

            //마이 폴더,ED 불러오기
            me.tree.loadByFilter({type: me.tree.Constants.POSITION.MY_OUT});
        });

        /**
         * 프로퍼티 보기 콘텍스트 클릭시
         * @param data
         * @param view
         */
        me.tree.onShowProperties = function (data, view) {
            console.log('onShowProperties', data, view);
            var id, type;
            if (data.type == me.tree.Constants.TYPE.MAPPING) {
                id = data.source;
                type = data.sourceType;
            } else {
                id = data.id;
                type = data.type;
            }
            me.aras.showPropertyWindow(type, id);
        };
        /**
         * Ed 생성 콘텍스트 클릭시
         * @param data
         * @param view
         */
        me.tree.onMakeEd = function (data, view, edType) {
            me.aras.createEd(data, view, edType);
        };

        /**
         * 폴더 생성 콘텍스트 클릭시
         * @param data
         * @param view
         */
        me.tree.onMakeFolder = function (data, view) {
            me.aras.createFolder(data, view);
        };

        /**
         * 액티비티 생성 콘텍스트 버튼 클릭시
         */
        $('#newActivity').click(function () {
            me.aras.createActivity();
        });

        /**
         * 리프레쉬 버튼 클릭시
         */
        $('#refresh').click(function () {
            me.aras.refreshMyWorkFlow();
        });
        /**
         * 폴더 또는 ED 또는 액티비티 삭제 콘텍스트 클릭시
         * @param data
         * @param view
         */
        me.tree.onDelete = function (data, view) {
            me.aras.deleteOutItem(data, view);
        };
        /**
         * 폴더 또는 ED 를 input 으로 쓰는 모든 Workflow - Activity 리스트를 보여주기
         * @param data
         * @param view
         */
        me.tree.onListRelation = function (data, view) {
            console.log('onListRelation', data, view);

            var id, type;
            if (data.type == me.tree.Constants.TYPE.MAPPING) {
                id = data.source;
                type = data.sourceType;
            } else {
                id = data.id;
                type = data.type;
            }

            var dataSet = me.aras.getEdParentList(id, me.tree.Constants.TYPE.ED == type ? 'Y' : 'N');
            //listRelGrid
            //listRelModal
            console.log(dataSet);

            for (var i = 0; i < dataSet.length; i++) {
                dataSet[i]['label'] = '<a href="#" name="listRelObj" data-index="' + i + '">' + dataSet[i]['name'] + '</a>';
            }

            var gridPanel = $('#listRelGrid');
            if (!gridPanel.data('table')) {
                gridPanel.data('table', true);
                gridPanel.DataTable({
                    data: dataSet,
                    columns: [
                        {data: 'process_id', title: 'Process ID'},
                        {data: 'wf_name', title: 'Workflow Name'},
                        {data: 'item_number', title: 'Activity ID'},
                        {data: 'label', title: 'Activity Name'},
                        {data: 'activity_owner', title: 'Activity Owner'},
                        {data: 'eng_funtion_structure', title: 'Eng Func Struct'}
                    ]
                });
            }

            var nameClickEvent = function (element, relData) {
                element.unbind('click');
                element.click(function (event) {
                    event.stopPropagation();
                    me.aras.showPropertyWindow(me.tree.Constants.TYPE.ACTIVITY, relData.id);
                });
            };

            // page event
            gridPanel.on('draw.dt', function () {
                var listRelObj = $("[name=listRelModal]");
                listRelObj.each(function (index, aTag) {
                    var element = $(aTag);
                    var dataIndex = element.data('index');
                    var relData = dataSet[parseInt(dataIndex)];
                    nameClickEvent(element, relData);
                });
                blockStop();
            });

            var dataTable = gridPanel.dataTable().api();
            dataTable.clear();
            dataTable.rows.add(dataSet);
            dataTable.draw();

            var modal = $('#listRelModal');
            modal.find('[name=close]').unbind('click');
            modal.find('[name=close]').bind('click', function () {
                modal.find('.close').click();
            });
            modal.modal({
                show: true
            })
        };
        /**
         * 선택 된 폴더에 연결할 ED 리스트를 불러오기(Pick ed) 콘텍스트 클릭시
         * @param data
         * @param view
         */
        me.tree.onPickEd = function (data, view) {
            console.log('onPickEd', data, view);
            var dataSet = me.aras.getPickEd();
            for (var i = 0; i < dataSet.length; i++) {
                dataSet[i]['label'] =
                    '<input type="checkbox" name="pickEdObj" data-index="' + i + '"/>&nbsp;' +
                    '<a href="#">' + dataSet[i]['name'] + '</a>';

                dataSet[i]['detail'] = '<button class="btn btn-xs rounded btn-primary" name="statusBtn">Detail</button>'
            }

            var gridPanel = $('#pickEdGrid');
            if (!gridPanel.data('table')) {
                gridPanel.data('table', true);
                gridPanel.DataTable({
                    data: dataSet,
                    columns: [
                        {data: 'label', title: 'Name'},
                        {data: '_rel_project', title: 'Project'},
                        {data: 'state', title: 'State'},
                        {data: 'detail', title: 'Detail'}
                    ]
                });
            }

            var bindStatusEvent = function (btn, edData) {
                btn.unbind('click');
                btn.click(function (event) {
                    event.stopPropagation();
                    me.aras.showPropertyWindow(me.tree.Constants.TYPE.ED, edData.id);
                });
            };

            var trClickEvent = function (tr, edData) {
                tr.unbind('click');
                tr.click(function () {
                    var checkbox = tr.find('input:checkbox');
                    if (checkbox.prop('checked')) {
                        checkbox.prop('checked', false);
                    } else {
                        checkbox.prop('checked', true);
                    }
                })
            };

            // page event
            gridPanel.on('draw.dt', function () {
                var pickEdObj = $("[name=pickEdObj]");
                pickEdObj.each(function (index, check) {
                    var checkbox = $(check);
                    var td = checkbox.parent();
                    var tr = td.parent();
                    var dataIndex = checkbox.data('index');
                    var edData = dataSet[parseInt(dataIndex)];
                    var statusBtn = tr.find('[name=statusBtn]');
                    bindStatusEvent(statusBtn, edData);
                    trClickEvent(tr, edData);
                });
                blockStop();
            });

            var dataTable = gridPanel.dataTable().api();
            dataTable.clear();
            dataTable.rows.add(dataSet);
            dataTable.draw();

            var modal = $('#pickEdModal');
            modal.find('[name=action]').unbind('click');
            modal.find('[name=close]').unbind('click');
            modal.find('[name=close]').bind('click', function () {
                modal.find('.close').click();
            });
            modal.find('[name=action]').bind('click', function () {
                modal.find('.close').click();
                var pickEdObj = $("[name=pickEdObj]");
                pickEdObj.each(function (index, check) {
                    var checkbox = $(check);
                    var dataIndex = checkbox.data('index');
                    var edData = dataSet[parseInt(dataIndex)];
                    var edItem = me.aras.getItemById(me.aras.TYPE.ED, edData.id);
                    var folderItem = me.aras.getItemById(me.aras.TYPE.FOLDER, data.id);
                    me.aras.addPickEDOutRelation(edItem, folderItem, data, view);
                });
            });
            modal.modal({
                show: true
            })
        };

        $('#labelSwitch').click(function () {
            var swich = $(this);
            if (!swich.data('data')) {
                swich.data('data', 'on');
            }
            if (swich.data('data') == 'on') {
                swich.data('data', 'off');
                me.tree.setShowLabel(false);
            } else {
                swich.data('data', 'on');
                me.tree.setShowLabel(true);
            }
        });
    },
    bindSelectBoxEvent: function () {
        var me = this;
        var reload = function () {
            me.aras.getSchCombo('', $("#discipline").val(), $("#disciplineSpec").val(), $("#bg").val(), '', function (err, res) {
                me.renderOtherWorkFlowBox(res);
            });
        };
        $('#discipline').change(function () {
            reload();
        });

        $('#disciplineSpec').change(function () {
            reload();
        });

        $('#bg').change(function () {
            reload();
        });

        $('#targetOtherWorkflow').change(function () {
            var wfId = $('#targetOtherWorkflow').val();
            var workflowData = me.aras.getWorkflowData(wfId);
            console.log('workflowData', workflowData.node);

            var outResult = me.aras.getWorkflowStructure(wfId, 'OUT');
            var otherWorkFlowData;
            if (outResult) {
                otherWorkFlowData = me.aras.createOtherWorkFlowData(outResult['nodeList']);
                me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER});
                me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER_OUT});
                me.tree.updateData(otherWorkFlowData);
            }
        });
    },
    renderSelectBox: function (data) {
        var me = this;
        var json = JSON.parse(data.d);

        if (json['rtn']) {
            var discipline = JSON.parse(json['data']);
            var disciplineSpec = JSON.parse(json['data1']);
            var bg = JSON.parse(json['data2']);

            for (var key in discipline.data) {
                me.appendSelectBoxElement($('#discipline'), discipline.data[key].LABEL, discipline.data[key]['VALUE']);
            }

            for (var key in disciplineSpec.data) {
                me.appendSelectBoxElement($('#disciplineSpec'), disciplineSpec.data[key].LABEL, disciplineSpec.data[key]['VALUE']);
            }

            for (var key in bg.data) {
                me.appendSelectBoxElement($('#bg'), bg.data[key].LABEL, bg.data[key]['VALUE']);
            }
        }
    },
    renderOtherWorkFlowBox: function (data) {
        var me = this;
        var json = JSON.parse(data.d);
        if (json['rtn']) {
            var otherWorkFlows = JSON.parse(json['data']);
            for (var key in otherWorkFlows.data) {
                me.appendSelectBoxElement($('#targetOtherWorkflow'), otherWorkFlows.data[key]['LABEL'], otherWorkFlows.data[key]['VALUE']);
            }
        }
    },
    appendSelectBoxElement: function (element, label, value) {
        element.append($('<option>', {
            value: value,
            text: label
        }));
    }
}
;
Doosan.prototype.constructor = Doosan;

$(function () {
    var doosan = new Doosan();
    doosan.init();
});

var randomData = function (type) {
    var data = {};
    var randomCount = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var randomType = function () {
        var number = Math.floor(Math.random() * (2));
        if (number == 0) {
            return 'folder';
        } else {
            return 'ed';
        }
    };

    //var random = randomCount() + 1;
    for (var i = 0; i < 10; i++) {
        console.log('=====Activity : ' + i + ' ===========');

        var id = type + "-ac-" + i;
        var activity = {
            "type": "activity",
            "id": id,
            "name": type + "-ac-" + i + "-Activity",
            "position": type,
            "parentId": "",
            "expand": true,
            "extData": {}
        };
        if (i < 9) {
            activity.next = type + "-ac-" + (i + 1);
        }
        if (i > 0) {
            activity.prev = type + "-ac-" + (i - 1);
        }
        data[id] = activity;
        var maxDepth = 7;
        var createdData = [activity];
        for (var c = 0; c < maxDepth; c++) {
            var copyData = JSON.parse(JSON.stringify(createdData));
            createdData = [];
            for (var g = 0; g < copyData.length; g++) {
                var child, childId;
                var parent = copyData[g];
                var childType = randomType();
                if (c == 0) {
                    childType = 'folder';
                }
                var randomChildNum = randomCount(1, 3);
                if (childType != 'folder') {
                    randomChildNum = randomCount(1, 5);
                }
                for (var m = 0; m < randomChildNum; m++) {
                    if (childType == 'folder') {
                        childId = type + "-fd-" + i + '-' + c + '-' + g + '-' + m;
                        child = {
                            "type": childType,
                            "id": childId,
                            "name": type + "-fd-" + i + '-' + c + '-' + g + '-' + m + "-Folder",
                            "position": type + "-out",
                            "parentId": parent.id,
                            "expand": true,
                            "extData": {}
                        };
                        createdData.push(child);
                        data[childId] = child;
                    } else {
                        childId = type + "-ed-" + i + '-' + c + '-' + g + '-' + m;
                        child = {
                            "type": childType,
                            "id": childId,
                            "name": type + "-ed-" + i + '-' + c + '-' + g + '-' + m + "-Ed",
                            "position": type + "-out",
                            "parentId": parent.id,
                            "expand": true,
                            "extData": {}
                        };
                        data[childId] = child;
                    }
                }
            }
        }
    }
    return data;
};