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

            var parentList = me.aras.getEdParentList(id, me.tree.Constants.TYPE.ED == type ? 'Y' : 'N');
            console.log(parentList);

            //1. Workflow - Activity 리스트 칼럼 정보 맞출것.
            var dataSet = [];
            var gridPanel = $('#listRelGrid');
            if (!gridPanel.data('table')) {
                gridPanel.data('table', true);
                $('#listRelGrid').DataTable({
                    data: dataSet,
                    columns: [
                        {title: "Name"},
                        {title: "Position"},
                        {title: "Office"},
                        {title: "Extn."},
                        {title: "Start date"},
                        {title: "Salary"}
                    ]
                });
            }

            //2. Workflow - Activity 리스트를 불러온 후, dataSet 을 작성하도록 한다.
            dataSet = [
                ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
                ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
                ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
                ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
                ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
                ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
                ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
                ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
                ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
                ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
                ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
                ["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"],
                ["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600"],
                ["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500"],
                ["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750"],
                ["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500"],
                ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
                ["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500"],
                ["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000"],
                ["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500"],
                ["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000"],
                ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000"],
                ["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450"],
                ["Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600"],
                ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
                ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
                ["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650"],
                ["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850"],
                ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
                ["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000"],
                ["Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400"],
                ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
                ["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000"],
                ["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500"],
                ["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050"],
                ["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675"]
            ];
            var datatable = $('#listRelGrid').dataTable().api();
            datatable.clear();
            datatable.rows.add(dataSet);
            datatable.draw();

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
                    me.aras.showPropertyWindow(me.tree.Constants.TYPE.ED, data.id);
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
                    me.aras.addFolderEDOutRelation(edItem, folderItem, data, view);
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