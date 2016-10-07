/**
 * Created by Seungpil Park on 2016. 9. 6..
 */
var Doosan = function () {
    this.tree = null;
    this.aras = null;
    this.mode = 'sample'; //random,sample
};
Doosan.prototype = {
    init: function () {
        var me = this;
        me.tree = new Tree('canvas');
        if (editorMode) {
            me.tree._CONFIG.MOVE_SORTABLE = true;
            me.tree._CONFIG.MAPPING_ENABLE = true;
            me.tree._CONFIG.CREATE_FOLDER = true;
            me.tree._CONFIG.CREATE_ED = true;
            me.tree._CONFIG.PICK_ED = true;
            me.tree._CONFIG.DELETABLE = true;
            me.tree._CONFIG.AREA.lAc.display = true;
            me.tree._CONFIG.AREA.lOut.display = true;
            me.tree._CONFIG.AREA.rIn.display = true;
            me.tree._CONFIG.AREA.rAc.display = true;
            me.tree._CONFIG.AREA.rOut.display = true;
        } else {
            me.tree._CONFIG.MOVE_SORTABLE = false;
            me.tree._CONFIG.MAPPING_ENABLE = false;
            me.tree._CONFIG.CREATE_FOLDER = false;
            me.tree._CONFIG.CREATE_ED = false;
            me.tree._CONFIG.PICK_ED = false;
            me.tree._CONFIG.DELETABLE = false;
            me.tree._CONFIG.AREA.lAc.display = false;
            me.tree._CONFIG.AREA.lOut.display = false;
            me.tree._CONFIG.AREA.rIn.display = true;
            me.tree._CONFIG.AREA.rAc.display = true;
            me.tree._CONFIG.AREA.rOut.display = true;
        }
        me.tree.init();

        if (parent.top.aras) {
            me.aras = new Aras(me.tree);
            me.aras.init();

            //스탠다드 모드에서는 PICK ED 를 끄도록 한다.
            if (me.aras.stdYN == 'Y') {
                me.tree._CONFIG.PICK_ED = false;
            }

            var innerMode = me.aras.getHtmlParameter('mode');
            if (innerMode) {
                $('.header-info').hide();
                $('.breadcrumbs').hide();
            }

            if (editorMode) {
                //셀렉트 박스 이벤트를 걸고 초기데이터를 불러온다.
                me.bindSelectBoxEvent();
                me.aras.getSchCombo('Init', null, null, null, null, function (err, res) {
                    if (res) {
                        me.renderSelectBox(res);
                    }
                });
            }

            var headerItem = me.aras.getWorkflowHeader(me.aras.wfId);
            if (headerItem.getItemCount() == 1) {
                me.renderHeaders(headerItem, 'my');
            }
            me.aras.refreshMyWorkFlow();

            /**
             * GUI 상에서 액티비티가 이동하기 전의 핸들러
             * @param activities
             */
            me.tree.onBeforeActivityMove = function (activities) {
                console.log(activities);
                var activityIds = [];
                for (var i = 0; i < activities.length; i++) {
                    activityIds.push(activities[i].id);
                }
                me.aras.sortActivities(activityIds);

                return false;
            };
            /**
             * GUI 상에서 액티비티가 이동한 후의 핸들러
             * @param activities
             */
            me.tree.onActivityMove = function (activities) {
                console.log(activities);
            };
            /**
             * GUI 상에서 매핑이 되기 전의 핸들러
             * @param source
             * @param target
             * @returns {boolean}
             */
            me.tree.onBeforeMapping = function (source, target, selectedTargetList) {
                console.log(source, target, selectedTargetList);

                //아라스에서는 소스와 타겟이 반대
                me.aras.addInRel(target, source, selectedTargetList);
                return false;
            };

            /**
             * GUI 상에서 매핑이 이루어졌을 때 핸들러
             * @param source
             * @param target
             */
            me.tree.onMapping = function (source, target, selectedTargetList) {
                console.log(source, target, selectedTargetList);
            };

            /**
             * GUI 상에서 매핑이 삭제되기 전 핸들러
             * @param sourceId
             * @param targetId
             */
            me.tree.onBeforeDeleteMapping = function (sourceId, sourceType, targetId, targetType) {
                console.log(sourceId, sourceType, targetId, targetType);
                var modal = $('#deleteConfirm');
                modal.find('[name=action]').unbind('click');
                modal.find('[name=close]').unbind('click');
                modal.find('[name=close]').bind('click', function () {
                    modal.find('.close').click();
                });
                modal.find('[name=action]').bind('click', function () {
                    modal.find('.close').click();
                    //아라스에서는 소스와 타겟이 반대
                    me.aras.deleteInRel(targetId, targetType, sourceId, sourceType);
                });
                modal.modal({
                    show: true
                });
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
                var modal = $('#deleteConfirm');
                modal.find('[name=action]').unbind('click');
                modal.find('[name=close]').unbind('click');
                modal.find('[name=close]').bind('click', function () {
                    modal.find('.close').click();
                });
                modal.find('[name=action]').bind('click', function () {
                    modal.find('.close').click();
                    me.aras.deleteOutItem(data, view);
                });
                modal.modal({
                    show: true
                });
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

                for (var i = 0; i < dataSet.length; i++) {
                    dataSet[i]['label'] = '<a href="#" name="listRelObj" data-index="' + i + '">' + dataSet[i]['name'] + '</a>';
                    dataSet[i]['process_id'] = dataSet[i]['process_id'] ? dataSet[i]['process_id'] : '';
                    dataSet[i]['wf_name'] = dataSet[i]['wf_name'] ? dataSet[i]['wf_name'] : '';
                    dataSet[i]['item_number'] = dataSet[i]['item_number'] ? dataSet[i]['item_number'] : '';
                    dataSet[i]['activity_owner'] = dataSet[i]['activity_owner'] ? dataSet[i]['activity_owner'] : '';
                    dataSet[i]['eng_funtion_structure'] = dataSet[i]['eng_funtion_structure'] ? dataSet[i]['eng_funtion_structure'] : '';
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
                            {data: 'activity_owner', title: 'Owner'},
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
                    var listRelObj = $("[name=listRelObj]");
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
                if (!me.aras.checkMaxCreateNumber(view.depth)) {
                    return;
                }

                var dataSet = [];
                var renderTable = function () {
                    var pickEdNumber = $('#pickEdNumber').val();
                    var pickEdName = $('#pickEdName').val();

                    dataSet = me.aras.getPickEd(pickEdNumber, pickEdName);
                    for (var i = 0; i < dataSet.length; i++) {
                        dataSet[i]['label'] =
                            '<input type="checkbox" name="pickEdObj" data-index="' + i + '"/>&nbsp;' +
                            '<i class="fa fa-search-plus"></i>&nbsp;<a href="Javascript:void(0)" name="statusBtn">' + dataSet[i]['name'] + '</a>';
                        dataSet[i]['ed_type'] = dataSet[i]['ed_type'] ? dataSet[i]['ed_type'] : '';
                        dataSet[i]['rel_project'] = dataSet[i]['rel_project'] ? dataSet[i]['rel_project'] : '';
                        dataSet[i]['state'] = dataSet[i]['state'] ? dataSet[i]['state'] : '';
                        dataSet[i]['class'] = dataSet[i]['class'] ? dataSet[i]['class'] : '';
                    }

                    var gridPanel = $('#pickEdGrid');
                    if (!gridPanel.data('table')) {
                        gridPanel.data('table', true);
                        gridPanel.DataTable({
                            data: dataSet,
                            columns: [
                                {data: 'label', title: 'Name'},
                                {data: 'ed_type', title: 'Type'},
                                {data: 'rel_project', title: 'Project'},
                                {data: 'state', title: 'State'},
                                {data: 'class', title: 'Class'}
                            ]
                        });
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

                    var dataTable = gridPanel.dataTable().api();
                    dataTable.clear();
                    dataTable.rows.add(dataSet);
                    dataTable.draw();
                };
                renderTable();

                var modal = $('#pickEdModal');
                modal.find('[name=search]').unbind('click');
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
                        if (checkbox.prop('checked')) {
                            me.aras.addPickEDOutRelation(edItem, folderItem, data, view);
                        }
                    });
                });
                modal.find('[name=search]').bind('click', function () {
                    renderTable();
                });
                modal.modal({
                    show: true
                })
            };
        } else {
            if (me.mode == 'random') {
                me.renderRandomData();
            } else {
                me.renderSampleData();
            }
        }

        me.renderStateBox();

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


        $('#zoomIn').click(function () {
            var scale = me.tree.getScale();
            var reScale = scale + 0.1;
            if (reScale > 3) {
                return;
            } else {
                me.tree.setScale(reScale);
            }
        });
        $('#zoomOut').click(function () {
            var scale = me.tree.getScale();
            var reScale = scale - 0.1;
            if (reScale < 0.2) {
                return;
            } else {
                me.tree.setScale(reScale);
            }
        });
        $('#zoomFit').click(function () {
            me.tree.setScale(1);
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
            if (wfId && wfId != '') {
                var headerItem = me.aras.getWorkflowHeader(wfId);
                if (headerItem.getItemCount() == 1) {
                    me.renderHeaders(headerItem, 'other');
                }
                var outResult = me.aras.getWorkflowStructure(wfId, 'OUT');
                var otherWorkFlowData;
                if (outResult) {
                    otherWorkFlowData = me.aras.createOtherWorkFlowData(outResult['nodeList']);
                    me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER});
                    me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER_OUT});
                    me.tree.updateData(otherWorkFlowData);
                }
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
            $('#targetOtherWorkflow').find('option').remove();
            me.appendSelectBoxElement($('#targetOtherWorkflow'), '--select--', '');
            for (var key in otherWorkFlows.data) {
                me.appendSelectBoxElement($('#targetOtherWorkflow'), otherWorkFlows.data[key]['LABEL'], otherWorkFlows.data[key]['VALUE']);
            }
        }
    },
    appendSelectBoxElement: function (element, label, value) {
        element.append('<option value="' + value + '">' + label + '</option>');
    },
    renderHeaders: function (headerItem, myOther) {
        var targetTableClass = myOther == 'other' ? 'other-table' : 'my-table';
        var targetTable = $('.' + targetTableClass);

        var project_code = headerItem.getProperty('project_code', '');
        var process_id = headerItem.getProperty('process_id', '');
        var pjt_name = headerItem.getProperty('pjt_name', '');
        var processname = headerItem.getProperty('processname', '');
        var sub_processname = headerItem.getProperty('sub_processname', '');
        targetTable.find('[name=project_code]').html(project_code);
        targetTable.find('[name=process_id]').html(process_id);
        targetTable.find('[name=pjt_name]').html(pjt_name);
        targetTable.find('[name=processname]').html(processname);
        targetTable.find('[name=sub_processname]').html(sub_processname);
    },
    renderStateBox: function () {
        var me = this;
        var stdYN = 'N';
        var stateJson;
        if (me.aras && me.aras.stdYN) {
            stdYN = me.aras.stdYN;
        }
        $.ajax({
            type: 'GET',
            url: 'doosan/state.json',
            dataType: 'json',
            async: false,
            success: function (data) {
                stateJson = data;
            }
        });
        var stateColorBox = $('.state-color');
        var renderState = function (name, color, stroke) {
            var bar = $('<li><a href="Javascript:void(0)"><div class="state-bar">&nbsp;</div>' + name + '</a></li>');
            stateColorBox.append(bar);
            if (stroke) {
                bar.find('.state-bar').css('border', '1px solid ' + stroke);
            }
            if(color){
                bar.find('.state-bar').css('background-color', color);
            }
        };
        var renderSeparator = function () {
            stateColorBox.append('<li role="separator" class="divider"></li>');
        };
        var renderTitle = function (title) {
            stateColorBox.append('<li><a href="Javascript:void(0)">---' + title + '---</a></li>');
        };
        if (stateJson) {
            stateColorBox.html('');
            var stateList = [];
            if (stdYN == 'Y') {
                stateList = stateJson['Standard'];
                for (var i = 0; i < stateList.length; i++) {
                    renderState(stateList[i]['name'], stateList[i]['color'], stateList[i]['stroke']);
                }
            } else {
                renderTitle('Activity');
                stateList = stateJson['Project']['Activity'];
                for (var i = 0; i < stateList.length; i++) {
                    renderState(stateList[i]['name'], stateList[i]['color'], stateList[i]['stroke']);
                }
                renderSeparator();

                renderTitle('Folder');
                stateList = stateJson['Project']['Folder'];
                for (var i = 0; i < stateList.length; i++) {
                    renderState(stateList[i]['name'], stateList[i]['color'], stateList[i]['stroke']);
                }
                renderSeparator();

                renderTitle('EDB');
                stateList = stateJson['Project']['EDB'];
                for (var i = 0; i < stateList.length; i++) {
                    renderState(stateList[i]['name'], stateList[i]['color'], stateList[i]['stroke']);
                }
                renderSeparator();
            }
        }
    },
    renderSampleData: function () {
        var me = this;
        $.getJSON("doosan/sample/myData.json", function (myData) {

            me.tree._INCOLLAPSE = [];
            me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY});
            me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY_IN});
            me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY_OUT});
            me.tree.updateData(myData, true);

            $.getJSON("doosan/sample/otherData.json", function (otherData) {
                me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER});
                me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER_OUT});
                me.tree.updateData(otherData);
            });
        });
    },
    renderRandomData: function () {
        var me = this;
        var otherData = randomData('other');
        var myData = randomData('my');
        me.tree.updateData(otherData, true);
        me.tree.updateData(myData);
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