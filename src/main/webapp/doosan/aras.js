/**
 * Created by Seungpil, Park on 2016. 9. 6..
 */
var Aras = function (tree) {

    /**
     * 트리 객체
     */
    this.tree = tree;

    /**
     * 현재 aras 객체
     * @type {null}
     */
    this.aras = null;

    /**
     * 현재 WF 객체
     * @type {null}
     */
    this.thisItem = null;
    this.wfId = null;
    this.stdYN = null;
    this.projectId = null;
    this.inn = null;

    /**
     * 프로젝트, 폴더 5레벨 까지 enable, ed 는 6레벨까지 가능
     * @type {number}
     */
    this.prjMaxDepth = 5;
    /**
     * 스탠다드, 폴더 3레벨 까지 enable, 3레벨 일 경우는 ed 생성 불가
     * @type {number}
     */
    this.stdMaxDepth = 3;

    this.TYPE = {
        WORKFLOW: "workflow",
        ACTIVITY: "activity",
        FOLDER: "folder",
        ED: "ed",
        MAPPING: "mapping"
    };

    /**
     * 스테이트 정의가 저장되어 있는 파일을 불러온다.
     */
    var stateJson;
    $.ajax({
        type: 'GET',
        url: 'doosan/state.json',
        dataType: 'json',
        async: false,
        success: function (data) {
            stateJson = data;
        }
    });
    this.stateJson = stateJson;

};
Aras.prototype = {
    iExmL2jsobj: function (node) {
        var data = {};
        var item;
        if (node && node.childNodes && node.childNodes[0] &&
            node.childNodes[0].childNodes && node.childNodes[0].childNodes[0]) {
            item = node.childNodes[0].childNodes[0];
            if (item) {
                for (var i = 0; i < item.childNodes.length; i++) {
                    data[item.childNodes[i].nodeName] =
                        item.childNodes[i].firstChild ? item.childNodes[i].firstChild.nodeValue : ''
                }
            }
        }
        return data;
    },
    getHtmlParameter: function (val) {
        var result = undefined,
            tmp = [];
        if (location.search && location.search.length) {
            location.search
                .substr(1)
                .split("&")
                .forEach(function (item) {
                    tmp = item.split("=");
                    if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
                });
        }
        return result;
    },
    init: function () {
        var me = this;
        this.aras = parent.top.aras;
        this.thisItem = parent.top.thisItem;
        if (!this.aras || !this.thisItem) {
            msgBox('Failed to load workflow.');
            return;
        }
        this.wfId = parent.top.thisItem.getID();
        this.stdYN = parent.top.thisItem.getType() == 'DHI_WF_WFT' ? 'Y' : 'N';
        this.projectId = parent.top.thisItem.getProperty('_rel_project');
        this.body = '';

        //아라츠 팝업창 상태에 따라 에디터/모니터 화면을 리사이즈 한다.
        var resizeView = function () {
            if (window && window.parent && window.parent.document) {
                var parentDoc;
                try {
                    parentDoc = $(window.parent.document);
                } catch (e) {

                }
                if (parentDoc && parentDoc.length) {
                    var iframes;
                    var parentIframe;
                    var innerMode = me.getHtmlParameter('mode');
                    if (innerMode) {
                        iframes = parentDoc.find('iframe');
                        iframes.each(function () {
                            var src = $(this).attr('src');
                            if (src && src.indexOf('doosanMonitor') != -1) {
                                parentIframe = $(this);
                            }
                        });
                    } else {
                        iframes = parentDoc.find('.dijitDialogPaneContent').find('iframe');
                        iframes.each(function () {
                            var src = $(this).attr('src');
                            if (src && src.indexOf('doosan') != -1) {
                                parentIframe = $(this);
                            }
                        });
                    }

                    //innerMode 일 경우엔 늘 parentIframe 이 존재하고, 그 외의 경우는 처음 한번 존재한다.
                    if (parentIframe && parentIframe.length) {
                        if (innerMode) {
                            parentIframe.css({
                                height: '100%'
                            });
                            var height = parentIframe.height();
                            me.tree._CONFIG.CONTAINER_HEIGHT = height - 50;
                            me.tree._CONTAINER.css({
                                height: me.tree._CONFIG.CONTAINER_HEIGHT + 'px'
                            });
                        } else {
                            if (!parentDoc.find('#doosanIframe').length) {
                                parentIframe.attr('id', 'doosanIframe');
                                parentIframe.css({
                                    width: '100%',
                                    height: '100%',
                                    'z-index': '10000',
                                    position: 'absolute',
                                    top: '0px',
                                    left: '0px'
                                });
                                window.parent.document.body.appendChild(window.parent.document.getElementById('doosanIframe'));
                            }
                        }
                    }

                    //아이프레임이 이동된 후에 로드되었고 innerMode 가 아닌경우
                    if (parentDoc.find('#doosanIframe').length && !innerMode) {

                        //종료 아이콘이 없으면 종료 아이콘 추가. => 이것은 내부페이지에서 만들어 넣도록 한다.
                        try {
                            if (!$('#doosanCloseBtn').length) {
                                var closeBtn = $('<div>X</div>');
                                closeBtn.attr('id', 'doosanCloseBtn');
                                closeBtn.css({
                                    width: '20px',
                                    height: '20px',
                                    'z-index': '10000',
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    cursor: 'pointer',
                                    'font-size': '15px'
                                });
                                closeBtn.click(function () {
                                    parentDoc.find('.dijitDialog').find('.dijitDialogCloseIcon').click();
                                    window.parent.document.body.removeChild(window.parent.document.getElementById('doosanIframe'));
                                });
                            }
                            $('body').append(closeBtn);
                        } catch (e) {
                        }
                    }

                    me.tree.renderViews();
                }
            }
        };

        $(window.parent).resize(function () {
            resizeView();
        });

        //이너 모드일 경우엔 dijitReset 이 클릭된 경우에도 리사이즈 한다.
        var innerMode = me.getHtmlParameter('mode');
        if (window.parent.document && innerMode) {
            if ($(window.parent.document).find('.dijitReset').length) {
                $(window.parent.document).find('.dijitReset').click(function () {
                    resizeView();
                })
            }
        }


        resizeView();
    },
    createBody: function (params) {
        var body = '', value;
        for (var key in params) {
            value = params[key] ? params[key] : '';
            body += '<' + key + '>' + value + '</' + key + '>';
        }
        return body;
    },
    applyMethod: function (methodName, body) {
        this.inn = this.aras.newIOMInnovator();
        return this.inn.applyMethod(methodName, body);
    },
    getUserIdentity: function () {
        var inn = this.aras.newIOMInnovator();
        var userId = inn.getUserID();
        var aliasRelItem = inn.newItem("Alias", "get");
        aliasRelItem.setProperty("source_id", userId);
        aliasRelItem = aliasRelItem.apply();
        var identityId = aliasRelItem.getProperty("related_id");
        return identityId ? identityId : '';
    },
    getUserId: function () {
        var inn = this.aras.newIOMInnovator();
        var userId = inn.getUserID();
        return userId;
    },
    /**
     * WF 하위의 액티비티, 폴더 및 ED 조회
     * @param wf_id
     * @param inout IN/OUT
     * @returns {*}
     * @constructor
     */
    getWorkflowStructure: function (wf_id, inout) {
        var me = this, params = {
            wf_id: wf_id,
            std_yn: me.stdYN,
            inout: inout.toUpperCase()
        };
        return me.applyMethod('DHI_WF_EDITOR_STRUCTURE', me.createBody(params));
    },
    /**
     * 워크플로우 데이터를 반환한다.
     * @param wf_id
     * @returns {*}
     */
    getWorkflowData: function (wf_id) {
        var me = this;
        var inn = this.aras.newIOMInnovator();
        var workflowItem = inn.newItem(me.getItemType(this.TYPE.WORKFLOW), "get");
        workflowItem.setProperty('id', wf_id);
        return workflowItem.apply();
    },
    getWorkflowHeader: function (wf_id) {
        var me = this, params = {
            stype: me.getItemType(me.TYPE.WORKFLOW),
            sid: wf_id
        };
        return me.applyMethod('DHI_getEditorHederInfo', me.createBody(params));
    },
    /**
     * 타입과 아이디와 매칭된 데이터를 반환한다.
     * @param type
     * @param id
     * @returns {*}
     */
    getItemById: function (type, id) {
        var me = this;
        var inn = this.aras.newIOMInnovator();
        var item = inn.newItem(me.getItemType(type), "get");
        item.setProperty('id', id);
        return item.apply();
    },
    /**
     * 하나의 폴더 또는 Activity 를 기준으로 하위 폴더와 ED 조회
     * @param activity_id
     * @param folder_yn Y/N
     * @param folder_id
     * @param inout IN / OUT
     * @returns {*}
     */
    getActivityStructure: function (activity_id, folder_yn, folder_id, inout) {
        var me = this, params = {
            activity_id: activity_id,
            std_yn: me.stdYN,
            folder_yn: folder_yn,
            folder_id: folder_id,
            inout: inout.toUpperCase()
        };
        return me.applyMethod('DHI_WF_EDITOR_ACTIVITY_STRUCTURE', me.createBody(params));
    },

    /**
     * 선택한 폴더 또는 ED 를 input 으로 쓰는 워크플로우 - Activity 리스트 조회
     * @param id
     * @param ed_yn Y/N
     * @returns {*}
     */
    getEdParentList: function (id, ed_yn) {
        var data = [];
        var me = this, params = {
            id: id,
            std_yn: me.stdYN,
            ed_yn: ed_yn
        };
        var list = me.applyMethod('DHI_WF_EDITOR_ED_PARENTLIST', me.createBody(params));
        if (list.getItemCount() == 1) {
            data.push(me.nodeToJson(list.node))
        } else if (list.getItemCount() > 1) {
            for (var i = 0; i < list.nodeList.length; i++) {
                data.push(me.nodeToJson(list.nodeList[i]));
            }
        }
        return data;
    },
    /**
     * PICK ED 에 대한 조회 리스트(Project 에서만 필요)
     * @param prj_id
     * @returns {*}
     */
    getPickEd: function (ed_number, ed_name) {
        var data = [];
        var me = this, params = {
            user_id: me.getUserId(),
            project_id: me.projectId,
            ed_number: ed_number ? ed_number : '',
            ed_name: ed_name ? ed_name : ''
        };
        var nodeList = [];
        var nodeResult = me.applyMethod('DHI_WF_EDITOR_ED_PICK', me.createBody(params));
        if (nodeResult.getItemCount() > 1) {
            nodeList = nodeResult['nodeList'];
        } else if (nodeResult.getItemCount() == 1) {
            nodeList.push(nodeResult['node']);
        }
        if (nodeList && nodeList.length) {
            for (var i = 0; i < nodeList.length; i++) {
                data.push(me.nodeToJson(nodeList[i]));
            }
        }
        return data;
    },
    /**
     * Aras Item 노드를 Json 으로 변환한다.
     * @param xmlNode
     * @returns {*}
     */
    nodeToJson: function (xmlNode) {
        var me = this;
        var xmlNodeToString = '';
        var xmlNodeStringToJSON;
        if (OG.Util.isIE()) {
            xmlNodeToString = '<node>' + xmlNode.xml + '</node>';
            xmlNodeStringToJSON = me.iExmL2jsobj($.parseXML(xmlNodeToString));
        } else {
            xmlNodeToString = '<node>' + $(xmlNode).html() + '</node>';
            xmlNodeStringToJSON = $.xml2json(xmlNodeToString);
        }
        return xmlNodeStringToJSON;
    },
    /**
     * 스키마 콤보를 구한다.
     * @param kind
     * @param discLine
     * @param discSpec
     * @param bg
     * @param wf_id
     * @param stdYN
     * @param project_id
     * @param REL_WF_ID
     * @param callback
     */
    getSchCombo: function (kind, discLine, discSpec, bg, REL_WF_ID, callback) {
        var me = this, params = {
            kind: kind ? kind : '',
            discLine: discLine ? discLine : '',
            discSpec: discSpec ? discSpec : '',
            bg: bg ? bg : '',
            wf_id: me.wfId ? me.wfId : '',
            stdYN: me.stdYN,
            project_id: me.projectId ? me.projectId : '',
            REL_WF_ID: REL_WF_ID ? REL_WF_ID : ''
        };
        $.ajax({
            type: 'POST',
            url: '/UI_Extends/WEBService/WSUIExtends.asmx/GetSchCombo',
            data: JSON.stringify(params),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (response) {
                callback(null, response);
            },
            error: function (xhr, status, errorThrown) {
                callback(errorThrown, null);
            }
        });
    },
    getCurrentItemId: function (itemType, id) {
        var me = this;
        var params = {
            item_id: id,
            item_type: itemType
        };
        var item = me.applyMethod('DHI_getCurrentItemID', me.createBody(params));
        if (!item || !item.getProperty('item_id') || item.getProperty('item_id') == '') {
            msgBox('A node has been deleted by someone. Please refresh.');
            throw new Error("");
        } else {
            return item.getProperty('item_id');
        }
    },
    getItemType: function (type) {
        var itemType;
        if (type == this.TYPE.ACTIVITY) {
            itemType = this.stdYN == 'Y' ? 'DHI_WF_WFAT' : 'DHI_WF_WFA';
        }
        else if (type == this.TYPE.FOLDER) {
            itemType = this.stdYN == 'Y' ? 'DHI_WF_Folder_Template' : 'DHI_WF_Folder';
        }
        else if (type == this.TYPE.ED) {
            itemType = 'DHI_EDB';
        }
        else if (type == this.TYPE.WORKFLOW) {
            itemType = this.stdYN == 'Y' ? 'DHI_WF_WFT' : 'DHI_WF_WF';
        }
        return itemType;
    },
    getRelType: function (sourceType, targetType, inout) {
        var relType;
        if (inout == 'out') {
            if (sourceType == this.TYPE.ACTIVITY && targetType == this.TYPE.FOLDER) {
                relType = this.stdYN == 'Y' ? 'DHI_WF_WFAT_FDT_OUT_REL' : 'DHI_WF_WFA_FD_OUT_REL';
            }
            if (sourceType == this.TYPE.FOLDER && targetType == this.TYPE.FOLDER) {
                relType = this.stdYN == 'Y' ? 'DHI_WF_FDT_FDT_OUT_REL' : 'DHI_WF_FD_FD_OUT_REL';
            }
            if (sourceType == this.TYPE.FOLDER && targetType == this.TYPE.ED) {
                relType = this.stdYN == 'Y' ? 'DHI_WF_FDT_EDB_OUT_REL' : 'DHI_WF_FD_EDB_OUT_REL';
            }
            if (sourceType == this.TYPE.WORKFLOW && targetType == this.TYPE.ACTIVITY) {
                relType = this.stdYN == 'Y' ? 'DHI_WF_WFT_WFAT_REL' : 'DHI_WF_WF_WFA_REL';
            }
        } else {
            if (sourceType == this.TYPE.ACTIVITY && targetType == this.TYPE.FOLDER) {
                relType = this.stdYN == 'Y' ? 'DHI_WF_WFAT_FDT_IN_REL' : 'DHI_WF_WFA_FD_IN_REL';
            }
            if (sourceType == this.TYPE.ACTIVITY && targetType == this.TYPE.ED) {
                relType = this.stdYN == 'Y' ? 'DHI_WF_WFAT_EDB_IN_REL' : 'DHI_WF_WFA_EDB_IN_REL';
            }
        }
        return relType;
    },
    showPropertyWindow: function (type, id) {
        var me = this;
        var itemType = me.getItemType(type);
        var inn = this.aras.newIOMInnovator();
        var item = inn.newItem(itemType, "get");
        item.setProperty('id', me.getCurrentItemId(me.getItemType(type), id));
        item = item.apply();

        this.aras.uiShowItemEx(item.node, undefined, true);
    },
    sortActivities: function (activityIds) {
        var me = this;
        var inn = this.aras.newIOMInnovator();
        var relType = me.getRelType(me.TYPE.WORKFLOW, me.TYPE.ACTIVITY, 'out');
        var workflowId = me.getCurrentItemId(me.getItemType(me.TYPE.WORKFLOW), me.wfId);

        //1. 릴레이션의 activity 들이 존재하는지 확인한다.
        for (var i = 0; i < activityIds.length; i++) {
            var currentItemId = me.getCurrentItemId(me.getItemType(me.TYPE.ACTIVITY), activityIds[i]);
            activityIds[i] = currentItemId;
        }

        //2. 해당 워크플로우의 액티비티 릴레이션 들을 불러온다.
        var activityRels = inn.newItem(relType, "get");
        activityRels.setProperty('source_id', workflowId);
        activityRels = activityRels.apply();

        var rels = [];
        if (activityRels.getItemCount() == 1) {
            rels.push(activityRels.node);
        } else if (activityRels.getItemCount() > 1) {
            for (var c = 0; c < activityRels.getItemCount(); c++) {
                rels.push(activityRels.getItemByIndex(c));
            }
        }

        //3. 릴레이션의 sort 들을 업데이트한다.
        var relItem;
        for (var i = 0; i < activityIds.length; i++) {
            for (var r = 0; r < rels.length; r++) {
                relItem = rels[r];
                if (activityIds[i] == relItem.getProperty('related_id', '')) {
                    var sql = "<sqlString>UPDATE innovator." + relType + " SET SORT_ORDER = '" + (i + 1) + "' WHERE id = '" + relItem.getID() + "'</sqlString>";
                    inn.applyMethod('DHI_APPLY_SQL', sql);
                }
            }
        }
        me.refreshMyWorkFlow();
    },
    /**
     * 최대 생성 개수로 생성 가능 여부를 체크한다.
     * @param depth
     * @returns {boolean}
     */
    checkMaxCreateNumber: function (depth, type) {
        var enable = true;
        if (this.stdYN == 'Y') {
            if (depth >= this.stdMaxDepth) {
                enable = false;
                msgBox('Max depth is ' + this.stdMaxDepth + ' in standard workflow.');
            }
        } else {
            if (depth >= this.prjMaxDepth) {
                enable = false;
                msgBox('Max depth is ' + this.prjMaxDepth + ' in project workflow.');
            }
        }
        return enable;
    }
    ,
    createFolder: function (data, view) {
        if (!this.checkMaxCreateNumber(view.depth, this.TYPE.FOLDER)) {
            return;
        }

        var me = this;
        var inn = this.aras.newIOMInnovator();
        var target_rel_wf_com = '_rel_wf';

        var parentItemType = me.getItemType(data.type);
        var parentId = me.getCurrentItemId(parentItemType, data.id);
        var newItemType = me.getItemType(me.TYPE.FOLDER);

        //부모 아이템(선택된 아이템) 가져오기
        var parentItem = inn.newItem(parentItemType, "get");
        parentItem.setProperty('id', parentId);
        parentItem = parentItem.apply();

        //폴더 아이템 생성
        var newItem = inn.newItem(newItemType, "add");
        newItem.setProperty('_p_id', parentItem.getProperty('item_number', ''));
        newItem.setProperty('_level', (Number(parentItem.getProperty('_level', '0')) + 1));

        //연결 액티비티 설정
        newItem.setProperty(me.stdYN == 'Y' ? '_rel_wfat' : '_rel_wfa', view.root);

        //상위 액티비티 아이템 취득
        var activityId = me.getCurrentItemId(me.getItemType(me.TYPE.ACTIVITY), view.root);
        var activityItem;
        activityItem = inn.newItem(me.getItemType(me.TYPE.ACTIVITY), 'get');
        activityItem.setProperty('id', activityId);
        activityItem = activityItem.apply();

        //워크플로우 아이템 취득
        var workflowId = me.getCurrentItemId(me.getItemType(me.TYPE.WORKFLOW), activityItem.getProperty(target_rel_wf_com, ''));
        var workflowItem = inn.newItem(me.getItemType(me.TYPE.WORKFLOW), 'get');
        workflowItem.setProperty('id', workflowId);
        workflowItem = workflowItem.apply();

        //연결 워크플로우 설정
        newItem.setProperty(me.stdYN == 'Y' ? '_rel_wft' : '_rel_wf', workflowItem.getProperty('id', ''));


        //폴더 기본 정보 설정
        if (data.type == me.TYPE.ACTIVITY) {
            // 액티비티 선택시
            if (workflowItem.getItemCount() == 1) {
                newItem.setProperty('_eng_func_structure', workflowItem.getProperty('_eng_func_structure', ''));
                newItem.setProperty('_eng_func_code', workflowItem.getProperty('_eng_func_code', ''));

                newItem.setProperty('_rel_project', workflowItem.getProperty('_rel_project', ''));
                newItem.setProperty('_bg', workflowItem.getProperty('_bg', ''));
                newItem.setProperty('_discipline', workflowItem.getProperty('_discipline', ''));
                newItem.setProperty('_discipline_spec', workflowItem.getProperty('_discipline_spec', ''));
                newItem.setProperty('_rel_ownedteam', workflowItem.getProperty('_rel_ownedteam', ''));
                newItem.setProperty('owned_by_id', me.getUserIdentity());

                newItem.setProperty("_parent_type", parentItemType);
                newItem.setProperty("_parent_id", parentId);
            }

        } else if (data.type == me.TYPE.FOLDER) {
            // 폴더 선택 시
            if (parentItem.getItemCount() == 1) {
                newItem.setProperty('_eng_func_structure', parentItem.getProperty('_eng_func_structure', ''));
                newItem.setProperty('_eng_func_code', parentItem.getProperty('_eng_func_code', ''));

                newItem.setProperty('_eng_mat_structure', parentItem.getProperty('_eng_mat_structure', ''));
                newItem.setProperty('_eng_mat_code', parentItem.getProperty('_eng_mat_code', ''));

                newItem.setProperty('_doc_structure', parentItem.getProperty('_doc_structure', ''));
                newItem.setProperty('_doc_code', parentItem.getProperty('_doc_code', ''));

                newItem.setProperty('_rel_project', parentItem.getProperty('_rel_project', ''));
                newItem.setProperty('_bg', parentItem.getProperty('_bg', ''));
                newItem.setProperty('_discipline', parentItem.getProperty('_discipline', ''));
                newItem.setProperty('_discipline_spec', parentItem.getProperty('_discipline_spec', ''));
                newItem.setProperty('_rel_ownedteam', parentItem.getProperty('_rel_ownedteam', ''));
                newItem.setProperty('owned_by_id', me.getUserIdentity());

                newItem.setProperty('_first_p6_act', parentItem.getProperty('_first_p6_act', ''));
                newItem.setProperty('_first_pims_act', parentItem.getProperty('_first_pims_act', ''));
                newItem.setProperty('_first_act_name', parentItem.getProperty('_first_act_name', ''));
                newItem.setProperty('_final_p6_act', parentItem.getProperty('_final_p6_act', ''));
                newItem.setProperty('_final_pims_act', parentItem.getProperty('_final_pims_act', ''));
                newItem.setProperty('_final_act_name', parentItem.getProperty('_final_act_name', ''));
                newItem.setProperty('_class', parentItem.getProperty('_class', ''));

                newItem.setProperty("_parent_type", parentItemType);
                newItem.setProperty("_parent_id", parentId);
            }
        }

        // aras callback
        var asyncResult = this.aras.uiShowItemEx(newItem.node, undefined, true);
        asyncResult.then(function (arasWindow) {
            var EventBottomSave = {};
            EventBottomSave.window = window;
            EventBottomSave.handler = function () {
                me.addFolderOutRelation(data, view, newItem, parentItem, data.type, parentId);
            };
            arasWindow.top.commandEventHandlers['aftersave'] = [];
            arasWindow.top.commandEventHandlers['aftersave'].push(EventBottomSave);

            arasWindow.top.commandEventHandlers['afterunlock'] = [];
            arasWindow.top.commandEventHandlers['afterunlock'].push(EventBottomSave);
        });
    },
    addFolderOutRelation: function (parentData, parentView, newItem, parentItem, parentType, parentId) {
        var me = this;
        var inn = this.aras.newIOMInnovator();
        var parentItemType = me.getItemType(parentType);
        var relType = me.getRelType(parentType, this.TYPE.FOLDER, 'out');
        var path = '';


        //부모 폴더 객체 얻기
        parentId = me.getCurrentItemId(parentItemType, parentId);
        var updatedParentItem = this.thisItem.newItem(parentItemType, 'get');
        updatedParentItem.setProperty('id', parentId);
        updatedParentItem = updatedParentItem.apply();

        if (updatedParentItem.getItemCount() > 0) {
            if (parentType == this.TYPE.ACTIVITY) {
                path = updatedParentItem.getProperty('item_number', '');

            } else if (parentType == this.TYPE.FOLDER) {
                path = updatedParentItem.getProperty('_path', '');
            }
        }

        //생성된 폴더 정보 얻기
        var newItemId = me.getCurrentItemId(me.getItemType(me.TYPE.FOLDER), newItem.getID());
        var createdFolder = this.thisItem.newItem(newItem.GetType(), 'get');
        createdFolder.setProperty('id', newItemId);
        createdFolder = createdFolder.apply();

        //패스 에 생성된 폴더 아이템 넘버 추가
        path += '||' + createdFolder.getProperty('item_number', '');

        //릴레이션이 존재하는지 확인
        var existRelItem = this.thisItem.newItem(relType, 'get');
        existRelItem.setProperty('source_id', parentId);
        existRelItem.setProperty('related_id', newItemId);
        existRelItem = existRelItem.apply();

        //릴레이션이 존재하지 않을 경우
        if (existRelItem.getItemCount() < 1) {
            try {
                //생성된 폴더의 path 를 업데이트 한다.
                var sql = "<sqlString>UPDATE innovator." + newItem.GetType() + " SET _PATH = '" + path + "' WHERE id = '" + newItemId + "'</sqlString>";
                inn.applyMethod('DHI_APPLY_SQL', sql);

                //아웃풋 릴레이션을 생성한다.
                var relItem = inn.newItem(relType, 'add');
                relItem.setProperty('source_id', parentId);
                relItem.setProperty('related_id', newItemId);
                relItem.setProperty('owned_by_id', me.getUserIdentity());
                relItem = relItem.apply();

                //스테이터스를 업데이트한다.
                var body = '<source_id>' + parentId + '</source_id>';
                body += '<related_id>' + newItemId + '</related_id>';
                var result = inn.applyMethod('DHI_WF_RESET_STATE_ITEM', body);
            } catch (e) {
                msgBox('Failed to create ' + relType + ' Relation : ' + parentId + ' to ' + newItemId);
            }
        }

        this.refreshOutFolder(parentData, parentView);
    },
    createEd: function (data, view, edType) {

        var me = this;
        var inn = this.aras.newIOMInnovator();
        var parentItemType = me.getItemType(data.type);
        var parentId = me.getCurrentItemId(parentItemType, data.id);

        //부모 정보 가져오기
        var parentItem = inn.newItem(parentItemType, "get");
        parentItem.setProperty("id", parentId);
        parentItem = parentItem.apply();

        // ED 추가 메소드 호출
        var edItem = inn.newItem(edType, "add");
        edItem.setProperty("_p_id", data.extData['fs_id']);

        edItem.setProperty('owned_by_id', me.getUserIdentity());

        edItem.setProperty("_eng_mat_structure", parentItem.getProperty('_eng_mat_structure', ''));
        edItem.setProperty("_eng_mat_code", parentItem.getProperty('_eng_mat_code', ''));

        edItem.setProperty("_eng_func_structure", parentItem.getProperty('_eng_func_structure', ''));
        edItem.setProperty("_eng_func_code", parentItem.getProperty('_eng_func_code', ''));

        edItem.setProperty("_doc_structure", parentItem.getProperty('_doc_structure', ''));
        edItem.setProperty("_doc_code", parentItem.getProperty('_doc_code', ''));

        edItem.setProperty("_rel_project", parentItem.getProperty('_rel_project', ''));
        edItem.setProperty("_rel_ownedteam", parentItem.getProperty('_rel_ownedteam', ''));
        edItem.setProperty("_bg", parentItem.getProperty('_bg', ''));
        edItem.setProperty("_discipline", parentItem.getProperty("_discipline", ""));
        edItem.setProperty("_discipline_spec", parentItem.getProperty('_discipline_spec', ''));

        edItem.setProperty("_first_p6_act", parentItem.getProperty("_first_p6_act", ""));
        edItem.setProperty("_first_pims_act", parentItem.getProperty("_first_pims_act", ""));
        edItem.setProperty("_first_act_name", parentItem.getProperty("_first_act_name", ""));
        edItem.setProperty("_final_p6_act", parentItem.getProperty("_final_p6_act", ""));
        edItem.setProperty("_final_pims_act", parentItem.getProperty("_final_pims_act", ""));
        edItem.setProperty("_final_act_name", parentItem.getProperty("_final_act_name", ""));
        edItem.setProperty("_class", parentItem.getProperty("_class", ""));

        edItem.setProperty("_parent_type", parentItemType);
        edItem.setProperty("_parent_id", parentId);

        // STD
        if (me.stdYN == 'Y')            // STD
        {
            edItem.setProperty("_rel_wfat", view.root);
            edItem.setProperty("_rel_wft", parentItem.getProperty('_rel_wft', ''));
            edItem.setProperty("is_template", "1");
        }
        else                        // template
        {
            edItem.setProperty("_rel_wfa", view.root);
            edItem.setProperty("_rel_wf", parentItem.getProperty('_rel_wf', ''));
        }

        var asyncResult = me.aras.uiShowItemEx(edItem.node, undefined, true);
        asyncResult.then(function (arasWindow) {
                var EventBottomSave = {}
                EventBottomSave.window = window;
                EventBottomSave.handler = function () {
                    me.addFolderEDOutRelation(edItem, parentItem, data, view);
                };
                arasWindow.top.commandEventHandlers["aftersave"] = [];
                arasWindow.top.commandEventHandlers["aftersave"].push(EventBottomSave);

                arasWindow.top.commandEventHandlers["afterunlock"] = [];
                arasWindow.top.commandEventHandlers["afterunlock"].push(EventBottomSave);

                //alert('test');
            },
            function (obj) {
                msgBox('Failed to create Edb');
            }
        );
    },
    addFolderEDOutRelation: function (edItem, parentItem, data, view) {
        var me = this;
        var inn = this.aras.newIOMInnovator();
        var edId = me.getCurrentItemId(edItem.getType(), edItem.getID());
        var parentId = me.getCurrentItemId(parentItem.getType(), parentItem.getID());
        var relType = me.getRelType(me.TYPE.FOLDER, me.TYPE.ED, 'out');
        var existRelItem;
        var relItem;

        var createEDItem = inn.newItem(edItem.getType(), "get");
        createEDItem.setProperty("id", edId);
        createEDItem = createEDItem.apply();

        var path = parentItem.getProperty("_path") + '||' + createEDItem.getProperty("_ed_number", "");

        body = "<sqlString>UPDATE innovator." + createEDItem.getType() + " SET _PATH = '" + path + "' WHERE id = '" + createEDItem.getID() + "'</sqlString>";
        inn.applyMethod("DHI_APPLY_SQL", body);

        existRelItem = inn.newItem(relType, "get");
        existRelItem.setProperty("source_id", parentId);
        existRelItem.setProperty("related_id", edId);
        existRelItem = existRelItem.apply();
        if (existRelItem.getItemCount() < 1) {
            try {
                relItem = inn.newItem(relType, "add");
                relItem.setProperty("source_id", parentId);
                relItem.setProperty("related_id", edId);
                relItem.setProperty("owned_by_id", me.getUserIdentity());
                relItem = relItem.apply();

                //스테이터스를 업데이트한다.
                var body = "<source_id>" + parentId + "</source_id>";
                body += "<related_id>" + edId + "</related_id>";
                var result = inn.applyMethod("DHI_WF_RESET_STATE_ITEM", body);
            }
            catch (e) {
                msgBox('Failed to create ' + relType + ' Relation : ' + parentId + ' to ' + edId);
            }
        }
        this.refreshOutFolder(data, view);
    },
    addPickEDOutRelation: function (edItems, parentItem, data, view) {
        var me = this;
        var inn = this.aras.newIOMInnovator();

        var DDCLEds = [];
        //선택한 ED 들의 _class Property 값이 DDCL 인 것들을 추린다.
        for (var i = 0, leni = edItems.length; i < leni; i++) {
            if (edItems[i].getProperty("_class") == 'DDCL') {
                DDCLEds.push(edItems[i]);
            }
        }

        var parentId = me.getCurrentItemId(parentItem.getType(), parentItem.getID());
        var activityId = me.getCurrentItemId(me.getItemType(me.TYPE.ACTIVITY), view.root);

        //기존 폴더의 DDCL ITEM 의 수를 체크한다.
        var existDDCLItemCount = 0;
        var body = "<_parent_type>" + parentItem.getType() + "</_parent_type>";
        body += "<_parent_id>" + parentItem.getID() + "</_parent_id>";
        var result = inn.applyMethod("DHI_getDDCL_Item", body);
        if (!result) {
            msgBox('No result from DHI_getDDCL_Item');
            return;
        } else {
            existDDCLItemCount = result.getItemCount();
        }

        //기존 폴더의 DDCL이 존재하고 선택한 ED 중 DDCL 인 것이 있을 경우
        if (existDDCLItemCount > 0 && DDCLEds.length > 0) {
            msgBox('DDCL ED is exists.');
            return;
        }

        //연결할 ED 중 DDCL 인 것이 두개 이상일 경우
        if (DDCLEds.length > 1) {
            msgBox('Two or more DDCL are exist in selected ED.');
            return;
        }

        //edItems 들에 대한 릴레이션을 생성한다.
        for (var i = 0, leni = edItems.length; i < leni; i++) {
            var edItem = edItems[i];
            var edType = edItem.getType();
            var edId = me.getCurrentItemId(edType, edItem.getID());
            var relType = me.getRelType(me.TYPE.FOLDER, me.TYPE.ED, 'out');
            var existRelItem;
            var relItem;

            var path = parentItem.getProperty("_path") + '||' + edItem.getProperty("_ed_number", "");

            if (me.stdYN == 'Y') {
                body = "<sqlString>UPDATE innovator." + edType +
                    " SET _PATH = '" + path + "'" +
                    ", _P_ID = '" + data.extData['fs_id'] + "'" +
                    ", _REL_PROJECT = '" + parentItem.getProperty('_rel_project', '') + "'" +
                    ", _REL_OWNEDTEAM = '" + parentItem.getProperty('_rel_ownedteam', '') + "'" +
                    ", _REL_WFAT = '" + activityId + "'" +
                    ", _REL_WFT = '" + parentItem.getProperty('_rel_wft', '') + "'" +
                    ", IS_TEMPLATE = '" + 1 + "'" +
                    " WHERE id = '" + edId + "'</sqlString>";
            } else {
                body = "<sqlString>UPDATE innovator." + edType +
                    " SET _PATH = '" + path + "'" +
                    ", _P_ID = '" + data.extData['fs_id'] + "'" +
                    ", _REL_PROJECT = '" + parentItem.getProperty('_rel_project', '') + "'" +
                    ", _REL_OWNEDTEAM = '" + parentItem.getProperty('_rel_ownedteam', '') + "'" +
                    ", _REL_WFA = '" + activityId + "'" +
                    ", _REL_WF = '" + parentItem.getProperty('_rel_wf', '') + "'" +
                    ", IS_TEMPLATE = '" + 1 + "'" +
                    " WHERE id = '" + edId + "'</sqlString>";
            }
            inn.applyMethod("DHI_APPLY_SQL", body);

            existRelItem = inn.newItem(relType, "get");
            existRelItem.setProperty("source_id", parentId);
            existRelItem.setProperty("related_id", edId);
            existRelItem = existRelItem.apply();
            if (existRelItem.getItemCount() < 1) {
                try {
                    relItem = inn.newItem(relType, "add");
                    relItem.setProperty("source_id", parentId);
                    relItem.setProperty("related_id", edId);
                    relItem.setProperty("owned_by_id", me.getUserIdentity());
                    relItem.apply();

                    //스테이터스를 업데이트한다.
                    var body = "<source_id>" + parentId + "</source_id>";
                    body += "<related_id>" + edId + "</related_id>";
                    inn.applyMethod("DHI_WF_RESET_STATE_ITEM", body);

                    //DDCL 인 경우 _doc_no 를 상속받는다.
                    if (edItem.getProperty("_class") == 'DDCL') {
                        var body = "<_ed_id>" + edId + "</_ed_id>";
                        body += "<_ed_type>" + edType + "</_ed_type>";
                        body += "<_doc_no>" + parentItem.getProperty('_doc_no', '') + "</_doc_no>";
                        inn.applyMethod("DHI_WF_setDocNo", body);
                    }
                }
                catch (e) {
                    msgBox('Failed to create ' + relType + ' Relation : ' + parentId + ' to ' + edId);
                }
            }
        }

        this.refreshOutFolder(data, view);
    },
    deleteOutItem: function (data, view) {
        var me = this;
        var inn = this.aras.newIOMInnovator();
        var relType;
        var parentData;
        var parentView;
        var existRelItem;

        //관계 삭제 전 삭제 가능 여부 체크
        var checkEnableDelete = function (sourceId, relatedId) {
            var body = "<source_id>" + sourceId + "</source_id>";
            body += "<related_id>" + relatedId + "</related_id>";
            return inn.applyMethod("DHI_WF_PARENT_OWNER_CHECK", body);
        };

        //액티비티 삭제일 경우
        if (data.type == me.TYPE.ACTIVITY) {
            var activityId = me.getCurrentItemId(me.getItemType(me.TYPE.ACTIVITY), data.id);
            var workflowId = me.getCurrentItemId(me.getItemType(me.TYPE.WORKFLOW), me.wfId);
            if (!checkEnableDelete(me.wfId, data.id)) {
                msgBox('You do not have permission.');
                return;
            }

            //관계 삭제 전 상위 상태 재설정
            var body = "<source_id>" + workflowId + "</source_id>";
            body += "<related_id>" + activityId + "</related_id>";
            var result = inn.applyMethod("DHI_WF_DEL_RELATION_ITEM_WFA", body);

            if (result) {
                relType = me.getRelType(me.TYPE.WORKFLOW, me.TYPE.ACTIVITY, 'out');
                existRelItem = inn.newItem(relType, 'get');
                existRelItem.setProperty("source_id", workflowId);
                existRelItem.setProperty("related_id", activityId);
                existRelItem = existRelItem.apply();

                if (existRelItem.getItemCount() > 0) {
                    var amlStr = "<AML><Item type=\"" + relType + "\" action=\"delete\" where=\"source_id = '" + workflowId + "' and related_id = '" + activityId + "'\"></Item></AML>"
                    inn.applyAML(amlStr);
                }
                me.refreshMyWorkFlow();
            }
        }
        //폴더,ED 삭제일 경우
        else {
            parentData = me.tree.selectParentById(data.id);
            if (!parentData) {
                msgBox('Failed to delete selected Item.');
            }
            if (parentData) {
                parentView = me.tree.selectViewById(me.tree._VIEWDATA, parentData.id);
            }
            if (!parentView) {
                msgBox('Failed to delete selected Item.');
            }

            if (!checkEnableDelete(parentData.id, data.id)) {
                msgBox('You do not have permission.');
                return;
            }

            var parentId = me.getCurrentItemId(me.getItemType(parentData.type), parentData.id);
            var delId = me.getCurrentItemId(me.getItemType(data.type), data.id);

            //관계 삭제 전 상위 상태 재설정
            var body = "<source_id>" + parentId + "</source_id>";
            body += "<related_id>" + delId + "</related_id>";
            var result = inn.applyMethod("DHI_WF_DEL_RELATION_ITEM", body);

            if (result) {
                relType = me.getRelType(parentData.type, data.type, 'out');
                existRelItem = inn.newItem(relType, 'get');
                existRelItem.setProperty("source_id", parentId);
                existRelItem.setProperty("related_id", delId);
                existRelItem = existRelItem.apply();
                if (existRelItem.getItemCount() > 0) {
                    var amlStr = "<AML><Item type=\"" + relType + "\" action=\"delete\" where=\"source_id = '" + parentId + "' and related_id = '" + delId + "'\"></Item></AML>"
                    inn.applyAML(amlStr);
                }
                me.refreshMyWorkFlow();
            }
        }
    },
    createActivity: function () {
        var me = this;

        //체크 로직
        if (me.stdYN == 'Y' && me.thisItem.getProperty('state', '') != 'In Work') {
            msgBox('This action is only available in "In Work" state.');
            return;
        } else if (me.stdYN == 'N' && me.thisItem.getProperty('state', '') != 'In Planning') {
            msgBox('This action is only available in "In Planning" state.');
            return;
        }

        var inn = this.aras.newIOMInnovator();
        var target_rel_wf_com = '_rel_wf';

        var workflowItemType = me.getItemType(this.TYPE.WORKFLOW);
        var workflowId = me.getCurrentItemId(workflowItemType, me.wfId);
        var newItemType = me.getItemType(me.TYPE.ACTIVITY);

        //워크플로우 아이템 취득
        var workflowItem = inn.newItem(workflowItemType, 'get');
        workflowItem.setProperty('id', workflowId);
        workflowItem = workflowItem.apply();

        //액티비티 아이템 생성
        var newItem = inn.newItem(newItemType, "add");

        //액티비티 기본 정보 설정
        if (workflowItem.getItemCount() == 1) {
            newItem.setProperty('_rel_wf', workflowItem.getProperty('id', ''));
            newItem.setProperty('_eng_func_structure', workflowItem.getProperty('_eng_func_structure', ''));
            newItem.setProperty('_eng_func_code', workflowItem.getProperty('_eng_func_code', ''));

            newItem.setProperty('_rel_ownedteam', workflowItem.getProperty('_rel_ownedteam', ''));

            newItem.setProperty("_parent_type", workflowItemType);
            newItem.setProperty("_parent_id", workflowItem.getProperty('id', ''));

            if (me.stdYN != 'Y') {
                newItem.setProperty('_rel_project', workflowItem.getProperty('_rel_project', ''));
                newItem.setProperty('_discipline', workflowItem.getProperty('_discipline', ''));
                newItem.setProperty('owned_by_id', me.getUserIdentity());
            }
        }

        // aras callback
        var asyncResult = this.aras.uiShowItemEx(newItem.node, undefined, true);
        asyncResult.then(function (arasWindow) {
            var EventBottomSave = {};
            EventBottomSave.window = window;
            EventBottomSave.handler = function () {
                me.refreshMyWorkFlow();
            };
            arasWindow.top.commandEventHandlers['aftersave'] = [];
            arasWindow.top.commandEventHandlers['aftersave'].push(EventBottomSave);

            arasWindow.top.commandEventHandlers['afterunlock'] = [];
            arasWindow.top.commandEventHandlers['afterunlock'].push(EventBottomSave);
        });
    },
    addInRel: function (source, target, selectedTargetList) {
        var me = this;
        var inn = this.aras.newIOMInnovator();
        var relType = me.getRelType(source.type, target.type, 'in');
        var existRelItem;
        var relItem;
        var sourceId = me.getCurrentItemId(me.getItemType(source.type), source.id);
        var targetId = me.getCurrentItemId(me.getItemType(target.type), target.id);

        if (target.type == me.TYPE.ED) {
            existRelItem = inn.newItem(relType, "get");
            existRelItem.setProperty("source_id", sourceId);
            existRelItem.setProperty("related_id", targetId);
            existRelItem = existRelItem.apply();
            if (existRelItem.getItemCount() == 0) {
                try {
                    relItem = inn.newItem(relType, "add");
                    relItem.setProperty("source_id", sourceId);
                    relItem.setProperty("related_id", targetId);
                    relItem.setProperty("owned_by_id", me.getUserIdentity());
                    relItem = relItem.apply();

                    var body = "<source_id>" + sourceId + "</source_id>";
                    body += "<related_id>" + targetId + "</related_id>";
                    var result = inn.applyMethod("DHI_WF_PROCESS_AFTER_ED_COPY", body);
                }
                catch (e) {
                    msgBox('Failed to add ' + relType + ' Relation : ' + sourceId + ' to ' + targetId);
                }
            }
        } else {
            for (var i = 0, leni = selectedTargetList.length; i < leni; i++) {
                var selectargetId = me.getCurrentItemId(me.getItemType(target.type), selectedTargetList[i]);
                existRelItem = inn.newItem(relType, "get");
                existRelItem.setProperty("source_id", sourceId);
                existRelItem.setProperty("related_id", selectargetId);
                existRelItem = existRelItem.apply();
                if (existRelItem.getItemCount() == 0) {
                    try {
                        relItem = inn.newItem(relType, "add");
                        relItem.setProperty("source_id", sourceId);
                        relItem.setProperty("related_id", selectargetId);
                        relItem.setProperty("owned_by_id", me.getUserIdentity());
                        relItem = relItem.apply();

                        var body = "<_parent_type>" + me.getItemType(me.TYPE.ACTIVITY) + "</_parent_type>";
                        body += "<_parent_id>" + sourceId + "</_parent_id>";
                        body += "<_ids>" + selectargetId + "</_ids>";
                        var result = inn.applyMethod("DHI_WF_CREATE_FD_IN_REL", body);
                    }
                    catch (e) {
                        msgBox('Failed to add ' + relType + ' Relation : ' + sourceId + ' to ' + selectargetId);
                    }
                } else {
                    //선택한 타겟일 경우 릴레이션이 없어도 메소드 실행
                    if (targetId == selectargetId) {
                        var body = "<_parent_type>" + me.getItemType(me.TYPE.ACTIVITY) + "</_parent_type>";
                        body += "<_parent_id>" + sourceId + "</_parent_id>";
                        body += "<_ids>" + selectargetId + "</_ids>";
                        var result = inn.applyMethod("DHI_WF_CREATE_FD_IN_REL", body);
                    }
                }
            }
        }
        me.refreshMyWorkFlow();
    },
    deleteInRel: function (sourceId, sourceType, targetId, targetType) {
        var me = this;
        var inn = this.aras.newIOMInnovator();
        var relType = me.getRelType(sourceType, targetType, 'in');
        var existRelItem;
        var relItem;
        sourceId = me.getCurrentItemId(me.getItemType(sourceType), sourceId);
        targetId = me.getCurrentItemId(me.getItemType(targetType), targetId);

        //관계 삭제 전 상위 상태 재설정
        var body = "<source_id>" + sourceId + "</source_id>";
        body += "<related_id>" + targetId + "</related_id>";
        var result = inn.applyMethod("DHI_WF_DEL_RELATION_ITEM_INPUT", body);

        if (result) {
            existRelItem = inn.newItem(relType, 'get');
            existRelItem.setProperty("source_id", sourceId);
            existRelItem.setProperty("related_id", targetId);
            existRelItem = existRelItem.apply();
            if (existRelItem.getItemCount() > 0) {
                var amlStr = "<AML><Item type=\"" + relType + "\" action=\"delete\" where=\"source_id = '" + sourceId + "' and related_id = '" + targetId + "'\"></Item></AML>"
                inn.applyAML(amlStr);
            }
            me.refreshMyWorkFlow();
        }
    },
    currentSortOrder: function () {
        var orderData = {};
        $('.sortBar').find('button').each(function () {
            var btn = $(this);
            if (btn.hasClass('active')) {
                var key = btn.data('key');
                var order = btn.data('order');
                orderData = {
                    key: key,
                    order: order
                }
            }
        });
        return orderData;
    },
    /**
     *
     * @param resultNodeList
     * @param who  other/my
     * @param inout  in/out
     * @returns {Array}
     */
    createWorkFlowData: function (resultNodeList, who, inout) {
        var me = this;
        var data = [];
        var tempData = [], node, object;

        /**
         * 스테이트 컬러를 반환한다. 딜레이 값이 있을 경우 stroke 를 더한다.
         * @param type
         * @param state
         * @param isDelay
         * @returns {Object}
         */
        var getStateColorAndStroke = function (type, state, isDelay) {
            var color = 'none';
            var stroke = 'none';
            var stateList = [];
            if (me.stdYN == 'Y') {
                stateList = me.stateJson['Standard'];
            } else {
                if (type == me.TYPE.ACTIVITY) {
                    stateList = me.stateJson['Project']['Activity'];
                }
                if (type == me.TYPE.FOLDER) {
                    stateList = me.stateJson['Project']['Folder'];
                }
                if (type == me.TYPE.ED) {
                    stateList = me.stateJson['Project']['EDB'];
                }
            }
            if (stateList && stateList.length) {
                for (var i = 0, leni = stateList.length; i < leni; i++) {
                    if (stateList[i]['name'] == state) {
                        color = stateList[i]['color'];
                        stroke = stateList[i]['stroke'];
                    }
                }
                //딜레이 처리.
                if (isDelay) {
                    for (var i = 0, leni = stateList.length; i < leni; i++) {
                        if (stateList[i]['name'] == 'Delay') {
                            stroke = stateList[i]['stroke'];
                        }
                    }
                }
            }
            return {
                color: color,
                stroke: stroke
            };
        };
        /**
         * 월/일/년 형식의 데이터를 년월일 형식으로 교체한다.(ex) 20160901)
         * @param dateStr
         * @returns {*}
         */
        var convertDate = function (dateStr) {
            if (!dateStr) {
                return undefined;
            }
            var split = dateStr.split('/');
            //월/일/년 형식이 아니면 리턴
            if (split.length != 3) {
                return undefined;
            }

            var year = split[2],
                month = split[0],
                date = split[1];
            //월, 일 의 자리수 보정
            if (month.length < 2) {
                month = '0' + month;
            }
            if (date.length < 2) {
                date = '0' + date;
            }
            return year + month + date;
        };

        var checkDelay = function (node) {
            var currentDate = new Date(), compareDate;
            var isDelay = function (dateStr) {
                if (!dateStr) {
                    return false;
                }
                var split = dateStr.split('/');
                //월/일/년 형식이 아니면 리턴
                if (split.length != 3) {
                    return false;
                }
                var year = parseInt(split[2]),
                    month = parseInt(split[0]),
                    date = parseInt(split[1]);

                //당일 자정까지 비교날짜로 정한다.
                compareDate = new Date(year, month - 1, date + 1);
                return compareDate.getTime() < currentDate.getTime();
            };

            var delay = false;
            //ED 의 상태가 Inactive 이고 first_start_date 가 금일보다 이전일 경우 : 시작지연
            if (node.state && node.state == 'Inactive' && isDelay(node['first_start_date'])) {
                delay = true;
            }
            //ED 의 상태가 Approved 가 아니고 final_end_date 가 금일보다 이전일 경우 : 종료 지연
            if (node.state && node.state != 'Approved' && isDelay(node['final_end_date'])) {
                delay = true;
            }
            return delay;
        };

        for (var i = 0; i < resultNodeList.length; i++) {
            var xmlNode = resultNodeList[i];
            var xmlNodeToString = '';
            var xmlNodeStringToJSON;
            if (OG.Util.isIE()) {
                xmlNodeToString = '<node>' + xmlNode.xml + '</node>';
                xmlNodeStringToJSON = me.iExmL2jsobj($.parseXML(xmlNodeToString));
            } else {
                xmlNodeToString = '<node>' + $(xmlNode).html() + '</node>';
                xmlNodeStringToJSON = $.xml2json(xmlNodeToString);
            }
            tempData.push(xmlNodeStringToJSON);
        }

        var colorAndStroke;
        var tooltip;

        for (var i = 0; i < tempData.length; i++) {
            node = tempData[i];
            if (inout == 'out') {
                //스탠다드 일 경우 c_type, name 만
                if (me.stdYN == 'Y') {
                    tooltip = '';
                    if (node['c_type']) {
                        tooltip = tooltip + node['c_type'] + ' ' + node['fs_name'];
                    } else {
                        tooltip = node['fs_name'];
                    }
                }
                //프로젝트 일 경우 c_type, c_c_rev,c_major_rev,_user_name 과 함께
                else {
                    tooltip = '';
                    if (node['c_type']) {
                        tooltip = tooltip + node['c_type'] + ' ' + node['fs_name'];
                    } else {
                        tooltip = node['fs_name'];
                    }
                    if (node['fs_name']) {
                        tooltip = tooltip + ' ' + node['fs_name'];
                    }
                    if (node['c_c_rev']) {
                        tooltip = tooltip + ' ' + node['c_c_rev'];
                    }
                    if (node['c_major_rev']) {
                        tooltip = tooltip + ' ' + node['c_major_rev'];
                    }
                    if (node['_user_name']) {
                        tooltip = tooltip + ' ' + node['_user_name'];
                    }
                }
                if (node.kind == 'A') {
                    colorAndStroke = getStateColorAndStroke(me.tree.Constants.TYPE.ACTIVITY, node.state, checkDelay(node));
                    object = {
                        type: me.tree.Constants.TYPE.ACTIVITY,
                        id: node.f_id,
                        name: node.fs_name,
                        position: who == 'other' ? me.tree.Constants.POSITION.OTHER : me.tree.Constants.POSITION.MY,
                        parentId: "",
                        expand: true,
                        extData: JSON.parse(JSON.stringify(node)),
                        color: colorAndStroke.color,
                        stroke: colorAndStroke.stroke,
                        first_start_date: convertDate(node.first_start_date),
                        final_end_date: convertDate(node.final_end_date),
                        modified_date: convertDate(node.modified_date),
                        tooltip: tooltip
                    };
                } else if (node.kind == 'F') {
                    colorAndStroke = getStateColorAndStroke(me.tree.Constants.TYPE.FOLDER, node.state, checkDelay(node));
                    object = {
                        type: me.tree.Constants.TYPE.FOLDER,
                        id: node.f_id,
                        name: node.fs_name,
                        position: who == 'other' ? me.tree.Constants.POSITION.OTHER_OUT : me.tree.Constants.POSITION.MY_OUT,
                        parentId: node.fs_parent_id,
                        expand: true,
                        extData: JSON.parse(JSON.stringify(node)),
                        color: colorAndStroke.color,
                        stroke: colorAndStroke.stroke,
                        first_start_date: convertDate(node.first_start_date),
                        final_end_date: convertDate(node.final_end_date),
                        modified_date: convertDate(node.modified_date),
                        tooltip: tooltip
                    };
                } else if (node.kind == 'E') {
                    colorAndStroke = getStateColorAndStroke(me.tree.Constants.TYPE.ED, node.state, checkDelay(node));
                    object = {
                        type: me.tree.Constants.TYPE.ED,
                        id: node.f_id,
                        name: node.fs_name,
                        position: who == 'other' ? me.tree.Constants.POSITION.OTHER_OUT : me.tree.Constants.POSITION.MY_OUT,
                        parentId: node.fs_parent_id,
                        expand: true,
                        extData: JSON.parse(JSON.stringify(node)),
                        color: colorAndStroke.color,
                        stroke: colorAndStroke.stroke,
                        first_start_date: convertDate(node.first_start_date),
                        final_end_date: convertDate(node.final_end_date),
                        modified_date: convertDate(node.modified_date),
                        tooltip: tooltip
                    };
                }
            }
            else if (inout == 'in') {
                // in 일 경우에는 무조건 마이-인 쪽의 매핑 데이터만 온다고 가정
                var parentId = '';
                var path = node['_path'] ? node['_path'] : '';
                var split = path.split('||');
                var parentPath = '';
                //부모가 activity 일 경우
                if (split.length == 2) {
                    parentId = split[0];
                }
                //부모가 폴더일 경우
                else if (split.length > 2) {
                    split.splice(split.length - 1, 1);
                    parentPath = split.join('||');

                    for (var c = 0; c < tempData.length; c++) {
                        //같은 액비티티에 연결된 요소 중에서
                        if (tempData[c]['fs_parent_id'] == node['fs_parent_id']) {
                            //예상되는 parentPath 가 같은 경우
                            if (tempData[c]['_path'] == parentPath) {
                                parentId = tempData[c]['id']
                            }
                        }
                    }
                }
                var sourceType = node.kind == 'F' ? me.tree.Constants.TYPE.FOLDER : me.tree.Constants.TYPE.ED;
                colorAndStroke = getStateColorAndStroke(sourceType, node.state, checkDelay(node));
                //스탠다드 일 경우 name 만
                if (me.stdYN == 'Y') {
                    tooltip = node.fs_name;
                }
                //프로젝트 일 경우 사람이름과 함께
                else {
                    tooltip = node['_user_name'] ? node.name + '-' + node['_user_name'] : node.name;
                }
                object = {
                    type: me.tree.Constants.TYPE.MAPPING,
                    id: node.id + '-' + node.fs_parent_id, //소스 + '-' + 타겟
                    sourceType: sourceType,
                    source: node.id,
                    target: node.fs_parent_id,
                    selected: me.tree.emptyString(node.selected) ? false : true,
                    position: me.tree.Constants.POSITION.MY_IN,
                    extData: JSON.parse(JSON.stringify(node)),
                    parentId: parentId,
                    name: node.name,
                    expand: true,
                    color: colorAndStroke.color,
                    stroke: colorAndStroke.stroke,
                    first_start_date: convertDate(node.first_start_date),
                    final_end_date: convertDate(node.final_end_date),
                    modified_date: convertDate(node.modified_date),
                    tooltip: tooltip
                };
            }
            data.push(object);
        }
        return data;
    },
    createMyWorkFlowData: function (resultNodeList, inout) {
        var data = [];
        if (resultNodeList) {
            data = this.createWorkFlowData(resultNodeList, 'my', inout);
        }
        if (!data || !data.length) {
            data = [];
        }
        return data;
    }

    ,
    createOtherWorkFlowData: function (resultNodeList) {
        var data = [];
        if (resultNodeList) {
            data = this.createWorkFlowData(resultNodeList, 'other', 'out');
        }
        if (!data || !data.length) {
            data = [];
        }
        return data;
    },
    refreshOtherWorkflow: function (wfId) {
        var me = this;
        var outResult = me.getWorkflowStructure(wfId, 'OUT');
        var outResultNodes = [];
        if (outResult.getItemCount() == 1) {
            outResultNodes.push(outResult.node);
        } else {
            outResultNodes = outResult['nodeList']
        }
        var otherWorkFlowData;
        if (outResult) {
            otherWorkFlowData = me.createOtherWorkFlowData(outResultNodes);
            me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER});
            me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER_OUT});
            me.tree.updateData(otherWorkFlowData);
        }
    }
    ,
    refreshMyWorkFlow: function () {
        //마이워크플로우 데이터를 불러온다.
        var me = this;
        var inResult = me.getWorkflowStructure(me.wfId, 'IN');
        var outResult = me.getWorkflowStructure(me.wfId, 'OUT');

        var inResultNodes = [];
        var outResultNodes = [];

        if (inResult.getItemCount() == 1) {
            inResultNodes.push(inResult.node);
        } else {
            inResultNodes = inResult['nodeList'];
        }

        if (outResult.getItemCount() == 1) {
            outResultNodes.push(outResult.node);
        } else {
            outResultNodes = outResult['nodeList'];
        }

        // create data
        var myInData = me.createMyWorkFlowData(inResultNodes, 'in');
        var myOutData = me.createMyWorkFlowData(outResultNodes, 'out');
        var concat = myInData.concat(myOutData);
        me.syncExpandDataWithTree(concat);

        //remove My Data
        //me.tree._INCOLLAPSE = [];
        me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY});
        me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY_IN});
        me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY_OUT});

        //update Data
        var sortOrder = me.currentSortOrder();
        if (sortOrder.key) {
            me.tree.updateData(concat, true);
            me.tree.sortData(sortOrder.key,
                [me.tree.Constants.POSITION.OTHER_OUT,
                    me.tree.Constants.POSITION.MY_IN,
                    me.tree.Constants.POSITION.MY_OUT],
                sortOrder.order == 'desc');
        } else {
            me.tree.updateData(concat);
        }
    },
    refreshOutFolder: function (data, view) {
        //이벤트가 발생한 폴더 (부모폴더)
        var tree = this.tree;
        var me = this;

        //자식 폴더 및 ED 를 불러오기
        //var refreshData = [];
        var nodeList = [];
        var activityStructure = me.getActivityStructure(view.root, data.type == me.TYPE.ACTIVITY ? 'N' : 'Y', data.id, 'OUT');
        if (activityStructure.getItemCount() == 0) {
            nodeList.push(activityStructure.node);
        } else {
            nodeList = activityStructure.nodeList;
        }

        var refreshData = me.createWorkFlowData(nodeList, 'my', 'out');

        me.syncExpandDataWithTree(refreshData);

        //update Data
        var sortOrder = me.currentSortOrder();
        if (sortOrder.key) {
            tree.updateData(refreshData, true);
            tree.sortData(sortOrder.key,
                [me.tree.Constants.POSITION.OTHER_OUT,
                    me.tree.Constants.POSITION.MY_IN,
                    me.tree.Constants.POSITION.MY_OUT],
                sortOrder.order == 'desc');
        } else {
            tree.updateData(refreshData);
        }
    }
    ,
    syncExpandDataWithTree: function (data) {
        var existData;
        for (var i = 0, leni = data.length; i < leni; i++) {
            if (data[i].id) {
                existData = this.tree.selectById(data[i].id);
                if (existData && typeof existData.expand == 'boolean') {
                    if (existData.expand) {
                        data[i]['expand'] = true;
                    } else {
                        data[i]['expand'] = false;
                    }
                }
            }
        }
    }
}
;
Aras.prototype.constructor = Aras;