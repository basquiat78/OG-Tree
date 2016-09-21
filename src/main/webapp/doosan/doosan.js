$(function () {
    var tree = new Tree('canvas');
    tree.init();

    //// create load aras data
    //var select = new Select();
    //var inResult = select.load('DHI_WF_EDITOR_STRUCTURE', 'IN');
    //var outResult = select.load('DHI_WF_EDITOR_STRUCTURE', 'OUT');
    //
    //// load rest selectbox
    //var selectBox = new SelectBox(tree);
    //selectBox.load();
    //selectBox.bindEvent();
    //
    //// create data
    //var parser = new Parser(tree);
    //var myWorkFlowData = parser.createMyWorkFlowData(inResult.nodeList, outResult.nodeList);
    //var otherWorkFlowData = parser.createOtherWorkFlowData();
    //
    //tree.updateOtherData(otherWorkFlowData);
    //tree.updateMyData(myWorkFlowData);

    $.getJSON("doosan/sample/myData.json", function (myData) {

        tree.updateMyData(myData);

        $.getJSON("doosan/sample/otherData.json", function (otherData) {
            tree.updateOtherData(otherData);

            //전체 데이터 불러오기
            tree.load();

            //매핑 데이터 불러오기
            tree.loadByFilter({type: tree.Constants.TYPE.MAPPING});

            //아더 액티비티 불러오기
            tree.loadByFilter({type: tree.Constants.POSITION.OTHER});

            //아더 폴더,ED 불러오기
            tree.loadByFilter({type: tree.Constants.POSITION.OTHER_OUT});

            //마이 액티비티 불러오기
            tree.loadByFilter({type: tree.Constants.POSITION.MY});

            //마이 폴더,ED 불러오기
            tree.loadByFilter({type: tree.Constants.POSITION.MY_OUT});
        });
    });

    //var otherData = randomData('other');
    //var myData = randomData('my');
    //tree.updateOtherData(otherData);
    //tree.updateMyData(myData);

    /**
     * GUI 상에서 매핑이 되기 전의 핸들러
     * @param event
     * @param source
     * @param target
     * @returns {boolean}
     */
    tree.onBeforeMapping = function (event, source, target) {
        console.log(event, source, target);
        return true;
    };

    /**
     * GUI 상에서 매핑이 이루어졌을 때 핸들러
     * @param event
     * @param mapping
     */
    tree.onMapping = function (event, mapping) {
        console.log(event, mapping);
    };

    /**
     * 세이브 버튼 클릭시
     */
    $('#saveBtn').click(function () {
        //전체 데이터 불러오기
        tree.load();

        //매핑 데이터 불러오기
        tree.loadByFilter({type: tree.Constants.TYPE.MAPPING});

        //아더 액티비티 불러오기
        tree.loadByFilter({type: tree.Constants.POSITION.OTHER});

        //아더 폴더,ED 불러오기
        tree.loadByFilter({type: tree.Constants.POSITION.OTHER_OUT});

        //마이 액티비티 불러오기
        tree.loadByFilter({type: tree.Constants.POSITION.MY});

        //마이 폴더,ED 불러오기
        tree.loadByFilter({type: tree.Constants.POSITION.MY_OUT});
    });

    /**
     * 프로퍼티 보기 콘텍스트 클릭시
     * @param data
     * @param view
     */
    tree.onShowProperties = function (data, view) {
        console.log('onShowProperties', data, view);
    };
    /**
     * Ed 생성 콘텍스트 클릭시
     * @param data
     * @param view
     */
    tree.onMakeEd = function (data, view) {
    	var add = new Add(tree);
        add.createED(data, view);
    };
    /**
     * 폴더 생성 콘텍스트 클릭시
     * @param data
     * @param view
     */
    tree.onMakeFolder = function (data, view) {
        var add = new Add(tree);
        add.createFolder(data, view);
    };
    
    /**
     * 액티비티 생성 콘텍스트 클릭시
     * @param data
     * @param view
     */
    function onMakeActivity() {
        var add = new Add(tree);
        add.createActivity();
    };
    /**
     * 폴더 또는 ED 또는 액티비티 삭제 콘텍스트 클릭시
     * @param data
     * @param view
     */
    tree.onDelete = function (data, view) {
        //주의!!
        //삭제는 실제로 폴더또는 ED 를 삭제하는것이 아니라, 릴레이션만 끊어야 한다.
        //릴레이션을 끊은 후 Aras 에서 제공하는 메소드 호출 시 완료처리가 된다고 함.

        var targetDelete = new Delete(tree);
        if (data.type == 'activity') {
            if (targetDelete._stdYN == 'Y') {
                targetDelete.open(targetDelete._Constants.ITEM_TYPE.FOLDER_STANDARD, targetDelete._Constants.TYPE.DELETE, data, view);

            } else {
                targetDelete.open(targetDelete._Constants.ITEM_TYPE.FOLDER_PROJECT, targetDelete._Constants.TYPE.DELETE, data, view);
            }

        } else if (data.type == 'folder') {

        } else if (data.type == 'ed') {

        } else {
            ;
        }
    };
    /**
     * 폴더 또는 ED 를 input 으로 쓰는 모든 Workflow - Activity 리스트를 보여주기
     * @param data
     * @param view
     */
    tree.onListRelation = function (data, view) {
        console.log('onListRelation', data, view);

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
    tree.onPickEd = function (data, view) {
        console.log('onPickEd', data, view);
    };

    $('#labelSwitch').click(function () {
        var swich = $(this);
        if (!swich.data('data')) {
            swich.data('data', 'on');
        }
        if (swich.data('data') == 'on') {
            swich.data('data', 'off');
            tree.setShowLabel(false);
        } else {
            swich.data('data', 'on');
            tree.setShowLabel(true);
        }
    });
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