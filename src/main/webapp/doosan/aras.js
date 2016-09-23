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

    this.TYPE = {
        WORKFLOW: "workflow",
        ACTIVITY: "activity",
        FOLDER: "folder",
        ED: "ed",
        MAPPING: "mapping"
    }
};
Aras.prototype = {
    init: function () {
        this.aras = parent.top.aras;
        this.thisItem = parent.top.thisItem;
        if (!this.aras || !this.thisItem) {
            console.log('Not found Aras or Item.');
            return;
        }
        console.log('thisItem', this.thisItem);
        this.wfId = parent.top.thisItem.getID();
        this.stdYN = parent.top.thisItem.getType() == 'DHI_WF_WFT' ? 'Y' : 'N';
        this.projectId = parent.top.thisItem.getProperty('_rel_project');
        this.body = '';
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
        var me = this, params = {
            std_yn: me.stdYN,
            ed_yn: ed_yn
        };
        return me.applyMethod('DHI_WF_EDITOR_ED_PARENTLIST', me.createBody(params));
    },
    /**
     * PICK ED 에 대한 조회 리스트(Project 에서만 필요)
     * @param prj_id
     * @returns {*}
     */
    getPickEd: function () {
        var me = this, params = {
            prj_id: me.projectId
        };
        return me.applyMethod('DHI_WF_EDITOR_ED_PICK', me.createBody(params));
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

    createFolder: function (data, view) {
        this.data = data;
        this.view = view;

        var me = this;
        var inn = this.aras.newIOMInnovator();
        var target_rel_wf_com = '_rel_wf';

        var parentItemType = me.getItemType(data.type);
        var newItemType = me.getItemType(me.TYPE.FOLDER);

        //부모 아이템(선택된 아이템) 가져오기
        var parentItem = inn.newItem(parentItemType, "get");
        parentItem.setProperty('id', data.extData['f_id']);
        //parentItem.setAttribute('select', 'id,_rel_wfa,_rel_wfat,item_number,_level,owned_by_id');
        parentItem = parentItem.apply();

        //폴더 아이템 생성
        var newItem = inn.newItem(newItemType, "add");
        newItem.setProperty('_p_id', parentItem.getProperty('item_number', ''));
        newItem.setProperty('_level', (Number(parentItem.getProperty('_level', '0')) + 1));

        //연결 액티비티 설정
        newItem.setProperty(me.stdYN == 'Y' ? '_rel_wfat' : '_rel_wfa', view.root);

        //상위 액티비티 아이템 취득
        var activityItem;
        activityItem = inn.newItem(me.getItemType(me.TYPE.ACTIVITY), 'get');
        activityItem.setProperty('id', view.root);
        activityItem = activityItem.apply();

        //워크플로우 아이템 취득
        var workflowItem = inn.newItem(me.getItemType(me.TYPE.WORKFLOW), 'get');
        workflowItem.setProperty('id', activityItem.getProperty(target_rel_wf_com, ''));
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
                newItem.setProperty('owned_by_id', workflowItem.getProperty('owned_by_id', ''));
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
                newItem.setProperty('owned_by_id', parentItem.getProperty('owned_by_id', ''));

                newItem.setProperty('_first_p6_act', parentItem.getProperty('_first_p6_act', ''));
                newItem.setProperty('_first_pims_act', parentItem.getProperty('_first_pims_act', ''));
                newItem.setProperty('_first_act_name', parentItem.getProperty('_first_act_name', ''));
                newItem.setProperty('_final_p6_act', parentItem.getProperty('_final_p6_act', ''));
                newItem.setProperty('_final_pims_act', parentItem.getProperty('_final_pims_act', ''));
                newItem.setProperty('_final_act_name', parentItem.getProperty('_final_act_name', ''));
                newItem.setProperty('_class', parentItem.getProperty('_class', ''));
            }
        }

        // aras callback
        var asyncResult = this.aras.uiShowItemEx(newItem.node, undefined, true);
        asyncResult.then(function (arasWindow) {
            var EventBottomSave = {};
            EventBottomSave.window = window;
            EventBottomSave.handler = function () {
                me.addFolderOutRelation(data, view, newItem, parentItem, data.type, data.extData['f_id'], data.extData['kind']);
            };
            arasWindow.top.commandEventHandlers['aftersave'] = [];
            arasWindow.top.commandEventHandlers['aftersave'].push(EventBottomSave);

            arasWindow.top.commandEventHandlers['afterunlock'] = [];
            arasWindow.top.commandEventHandlers['afterunlock'].push(EventBottomSave);
        });
    },
    addFolderOutRelation: function (parentData, parentView, newItem, parentItem, parentType, parentId) {
        console.log(parentData, parentView, newItem, parentItem, parentType, parentId);
        var me = this;
        var inn = this.aras.newIOMInnovator();
        var parentItemType = me.getItemType(parentType);
        var relType = me.getRelType(parentType, this.TYPE.FOLDER, 'out');

        var path = '';

        //부모 폴더 객체 얻기
        var updatedParentItem = this.thisItem.newItem(parentItemType, 'get');
        updatedParentItem.setProperty('id', parentItem.getID());
        updatedParentItem = updatedParentItem.apply();

        if (updatedParentItem.getItemCount() > 0) {
            if (parentType == this.TYPE.ACTIVITY) {
                path = updatedParentItem.getProperty('item_number', '');

            } else if (parentType == this.TYPE.FOLDER) {
                path = updatedParentItem.getProperty('_path', '');
            }
        }

        //생성된 폴더 정보 얻기
        var createdFolder = this.thisItem.newItem(newItem.GetType(), 'get');
        createdFolder.setProperty('id', newItem.getID());
        createdFolder = createdFolder.apply();
        path += '||' + createdFolder.getProperty('item_number', '');

        //릴레이션이 존재하는지 확인
        var existRelItem = this.thisItem.newItem(relType, 'get');
        existRelItem.setProperty('source_id', parentId);
        existRelItem.setProperty('related_id', newItem.getID());
        existRelItem = existRelItem.apply();

        //릴레이션이 존재하지 않을 경우
        if (existRelItem.getItemCount() < 1) {
            //생성된 폴더의 path 를 업데이트 한다.
            var sql = "<sqlString>UPDATE innovator." + newItem.GetType() + " SET _PATH = '" + path + "' WHERE id = '" + newItem.getID() + "'</sqlString>";
            inn.applyMethod('DHI_APPLY_SQL', sql);

            //아웃풋 릴레이션을 생성한다.
            var relItem = inn.newItem(relType, 'add');
            relItem.setProperty('source_id', parentId);
            relItem.setProperty('related_id', newItem.getID());
            relItem.setProperty('owned_by_id', parentItem.getProperty('owned_by_id', ''));
            relItem = relItem.apply();
            console.log('relItem', relItem.node);

            var body = '<source_id>' + parentId + '</source_id>';
            body += '<related_id>' + newItem.getID() + '</related_id>';
            var result = inn.applyMethod('DHI_WF_RESET_STATE_ITEM', body);
            console.log(result);

            if (result) {
                this.refreshOutFolder(parentData, parentView);
            }
        }
    },
    refreshOutFolder: function (data, view) {
        //이벤트가 발생한 폴더 (부모폴더)
        var tree = this.tree;
        var me = this;

        //자식 폴더 및 ED 를 불러오기
        var refreshData = [];
        var activityStructure = me.getActivityStructure(view.root, data.type == me.TYPE.ACTIVITY ? 'N' : 'Y', data.id, 'OUT');
        var nodeList = activityStructure.nodeList;

        for (var i = 0; i < nodeList.length; i++) {
            var xmlNode = nodeList[i];
            var xmlNodeToString = '<node>' + $(xmlNode).html() + '</node>';
            var xmlNodeStringToJSON = $.xml2json(xmlNodeToString);
            var node = xmlNodeStringToJSON, object;
            if (node.kind == 'F') {
                object = {
                    type: tree.Constants.TYPE.FOLDER,
                    id: node.f_id,
                    name: node.fs_name,
                    position: tree.Constants.POSITION.MY_OUT,
                    parentId: node.fs_parent_id,
                    expand: true,
                    extData: JSON.parse(JSON.stringify(node))
                };
            } else if (node.kind == 'E') {
                object = {
                    type: tree.Constants.TYPE.ED,
                    id: node.f_id,
                    name: node.fs_name,
                    position: tree.Constants.POSITION.MY_OUT,
                    parentId: node.fs_parent_id,
                    expand: true,
                    extData: JSON.parse(JSON.stringify(node))
                };
            }
            if (object) {
                refreshData.push(object);
            }
        }

        tree.updateData(refreshData);
    },
    createEd: function (data, view) {

    }
}
;
Aras.prototype.constructor = Aras;