/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var Add = function (tree) {
    Add.superclass.call(this);
    this.tree = tree;
    this.data = null;
    this.view = null;
};

Add.prototype = new Aras();
Add.superclass = Aras;
Add.prototype.constructor = Add;

Add.prototype.createActivity = function() {
	
};

Add.prototype.createFolder = function (data, view) {
    this.data = data;
    this.view = view;

    var me = this;
    var inn = this._arasObject.newIOMInnovator();
    var tmpType = '';
    var targetwfa = '';
    var targetwf = '';
    var target_rel_wf = '';
    
    if (this._stdYN == 'Y') {
        if (this.data.extData.kind == 'A') {
            tmpType = 'DHI_WF_WFAT';

        } else {
            tmpType = 'DHI_WF_Folder_Template';
        }

        targetwfa = 'dhi_wf_wfat';
        targetwf = 'dhi_wf_wft';
        target_rel_wf = '_rel_wft';

    } else {
        if (this.data.extData.kind == 'A') {
            tmpType = 'DHI_WF_WFA';

        } else {
            tmpType = 'DHI_WF_Folder';
        }

        targetwfa = 'dhi_wf_wfa';
        targetwf = 'dhi_wf_wf';
        target_rel_wf = '_rel_wf';

    }
    target_rel_wf_com = '_rel_wf';

    var strItemTypeName = '';
    if (tmpType == 'DHI_WF_WFAT' || tmpType == 'DHI_WF_Folder_Template') {
        strItemTypeName = 'DHI_WF_Folder_Template';

    } else if (tmpType == 'DHI_WF_WFA' || tmpType == 'DHI_WF_Folder') {
        strItemTypeName = 'DHI_WF_Folder';

    } else {
        ;
    }

    var itmParentItem = inn.newItem(tmpType, "get");
    itmParentItem.setProperty('id', this.data.extData.f_id);
    itmParentItem.setAttribute('select', 'id,_rel_wfa,_rel_wfat,item_number,_level,owned_by_id');
    itmParentItem = itmParentItem.apply();

    // folder item 생성
    var itmFolder = inn.newItem(strItemTypeName, "add");
    itmFolder.setProperty('_p_id', itmParentItem.getProperty('item_number', ''));
    itmFolder.setProperty('_level', (Number(itmParentItem.getProperty('_level', '0')) + 1));

    if (tmpType == 'DHI_WF_WFAT') {
        itmFolder.setProperty('_rel_wfat', this.data.extData.f_id);

    } else if (tmpType == 'DHI_WF_WFA') {
        itmFolder.setProperty('_rel_wfa', this.data.extData.f_id);

    } else if (tmpType == 'DHI_WF_Folder_Template') {
        itmFolder.setProperty('_rel_wfat', itmParentItem.getProperty('_rel_wfat', ''));

    } else if (tmpType == 'DHI_WF_Folder') {
        itmFolder.setProperty('_rel_wfa', itmParentItem.getProperty('_rel_wfa', ''));

    } else {
        ;
    }

    var wfaItem, wfItem;
    // 1.wfa취득
    wfaItem = inn.newItem(targetwfa, 'get');
    wfaItem.setProperty('id', this.view.root);
    wfaItem = wfaItem.apply();

    // 2.wfa._rel_wf로 wf취득
    wfItem = inn.newItem(targetwf, 'get');
    wfItem.setProperty('id', wfaItem.getProperty(target_rel_wf_com, ''));
    wfItem = wfItem.apply();
    itmFolder.setProperty(target_rel_wf, wfItem.getProperty('id', ''));

    // folder 기본 정보 설정
    if (this.data.type == 'activity') {
        // 액티비티 선택시
        if (wfItem.getItemCount() == 1) {
            itmFolder.setProperty('_eng_func_structure', wfaItem.getProperty('_eng_func_structure', ''));
            itmFolder.setProperty('_eng_func_code', wfaItem.getProperty('_eng_func_code', ''));

            itmFolder.setProperty('_rel_project', wfItem.getProperty('_rel_project', ''));
            itmFolder.setProperty('_bg', wfItem.getProperty('_bg', ''));
            itmFolder.setProperty('_discipline', wfItem.getProperty('_discipline', ''));
            itmFolder.setProperty('_discipline_spec', wfItem.getProperty('_discipline_spec', ''));
            itmFolder.setProperty('_rel_ownedteam', wfItem.getProperty('_rel_ownedteam', ''));
            itmFolder.setProperty('owned_by_id', wfItem.getProperty('owned_by_id', ''));
        }

    } else if (this.data.type == 'folder') {
        // 폴더 선택 시
        var sctItemFolder = inn.newItem(tmpType, 'get');
        sctItemFolder.setProperty('id', this.data.extData.f_id);
        sctItemFolder = sctItemFolder.apply();

        if (sctItemFolder.getItemCount() == 1) {
            itmFolder.setProperty('_eng_func_structure', sctItemFolder.getProperty('_eng_func_structure', ''));
            itmFolder.setProperty('_eng_func_code', sctItemFolder.getProperty('_eng_func_code', ''));

            itmFolder.setProperty('_eng_mat_structure', sctItemFolder.getProperty('_eng_mat_structure', ''));
            itmFolder.setProperty('_eng_mat_code', sctItemFolder.getProperty('_eng_mat_code', ''));

            itmFolder.setProperty('_doc_structure', sctItemFolder.getProperty('_doc_structure', ''));
            itmFolder.setProperty('_doc_code', sctItemFolder.getProperty('_doc_code', ''));

            itmFolder.setProperty('_rel_project', wfItem.getProperty('_rel_project', ''));
            itmFolder.setProperty('_bg', wfItem.getProperty('_bg', ''));
            itmFolder.setProperty('_discipline', wfItem.getProperty('_discipline', ''));
            itmFolder.setProperty('_discipline_spec', wfItem.getProperty('_discipline_spec', ''));
            itmFolder.setProperty('_rel_ownedteam', wfItem.getProperty('_rel_ownedteam', ''));
            itmFolder.setProperty('owned_by_id', wfItem.getProperty('owned_by_id', ''));

            itmFolder.setProperty('_first_p6_act', sctItemFolder.getProperty('_first_p6_act', ''));
            itmFolder.setProperty('_first_pims_act', sctItemFolder.getProperty('_first_pims_act', ''));
            itmFolder.setProperty('_first_act_name', sctItemFolder.getProperty('_first_act_name', ''));
            itmFolder.setProperty('_final_p6_act', sctItemFolder.getProperty('_final_p6_act', ''));
            itmFolder.setProperty('_final_pims_act', sctItemFolder.getProperty('_final_pims_act', ''));
            itmFolder.setProperty('_final_act_name', sctItemFolder.getProperty('_final_act_name', ''));
            itmFolder.setProperty('_class', sctItemFolder.getProperty('_class', ''));
        }
    }

    // aras callback
    var asyncResult = this._arasObject.uiShowItemEx(itmFolder.node, undefined, true);
    asyncResult.then(function (arasWindow) {
        var EventBottomSave = {};
        EventBottomSave.window = window;
        EventBottomSave.handler = function () {
            me.addRelation(itmFolder, itmParentItem, tmpType, me.data.extData.f_id, me.data.extData.kind);
        }
        arasWindow.top.commandEventHandlers['aftersave'] = [];
        arasWindow.top.commandEventHandlers['aftersave'].push(EventBottomSave);

        arasWindow.top.commandEventHandlers['afterunlock'] = [];
        arasWindow.top.commandEventHandlers['afterunlock'].push(EventBottomSave);
    });
};

Add.prototype.createED = function(data, view) {
	$('#base_popup').show();
};

Add.prototype.refresh = function () {
    //이벤트가 발생한 폴더 (부모폴더)
    var data = this.data;
    var view = this.view;
    var tree = this.tree;

    //parent 의 아이디를 사용해서 아라스를 통해 만들어낸 자식 폴더 및 ED 를 불러오기
    var select = new Select();

    //불러낸 자식 및 폴더 리스트.
    var refreshData = [];
    var apiResult = select.loadChild('OUT', data, view);
    var nodeList = apiResult.nodeList;
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
};

Add.prototype.addRelation = function (itmFolder, itmParentItem, str_parent_type, str_parent_id, dataType) {
    var inn = this._arasObject.newIOMInnovator();

    // parent type에 따라 set property 대상 분기
    var amlbody = '';
    var strOutRelTypeName = '';
    if (str_parent_type == 'DHI_WF_WFAT') {
        itmFolder.setProperty('_rel_wfat', str_parent_id);
        strOutRelTypeName = 'DHI_WF_WFAT_FDT_OUT_REL';

    } else if (str_parent_type == 'DHI_WF_WFA') {
        itmFolder.setProperty('_rel_wfa', str_parent_id);
        strOutRelTypeName = 'DHI_WF_WFA_FD_OUT_REL';

    } else if (str_parent_type == 'DHI_WF_Folder_Template') {
        itmFolder.setProperty('_rel_wfat', itmParentItem.getProperty('_rel_wfat', ''));
        strOutRelTypeName = 'DHI_WF_FDT_FDT_OUT_REL';

    } else if (str_parent_type == 'DHI_WF_Folder') {
        itmFolder.setProperty('_rel_wfa', itmParentItem.getProperty('_rel_wfa', ''));
        strOutRelTypeName = 'DHI_WF_FD_FD_OUT_REL';

    } else {
        ;
    }
    var path = '';
    var getItem = this._arasThisItem.newItem(itmParentItem.GetType(), 'get');
    getItem.setProperty('id', itmParentItem.getID());
    getItem = getItem.apply();

    if (getItem.getItemCount() > 0) {
        if (dataType == 'A') {
            path = getItem.getProperty('item_number', '');

        } else if (dataType == 'F') {
            path = getItem.getProperty('_path', '');
        }
    }

    var currentfolder = this._arasThisItem.newItem(itmFolder.GetType(), 'get');
    currentfolder.setProperty('id', itmFolder.getID());
    currentfolder = currentfolder.apply();
    path += '||' + currentfolder.getProperty('item_number', '');

    var chkDup = this._arasThisItem.newItem(strOutRelTypeName, 'get');
    chkDup.setProperty('source_id', str_parent_id);
    chkDup.setProperty('related_id', itmFolder.getID());
    chkDup = chkDup.apply();

    if (chkDup.getItemCount() == 0) {
        body = "<sqlString>UPDATE innovator." + itmFolder.GetType() + " SET _PATH = '" + path + "' WHERE id = '" + itmFolder.getID() + "'</sqlString>";
        var cruApply = inn.applyMethod('DHI_APPLY_SQL', body);

        // make output Relationship
        var itmOutRelType = inn.newItem(strOutRelTypeName, 'add');
        itmOutRelType.setProperty('source_id', str_parent_id);
        itmOutRelType.setProperty('related_id', itmFolder.getID());
        itmOutRelType.setProperty('owned_by_id', itmParentItem.getProperty('owned_by_id', ''));
        itmOutRelType.apply();

        var body = '<source_id>' + str_parent_id + '</source_id>';
        body += '<related_id>' + itmFolder.getID() + '</related_id>';
        var result = inn.applyMethod('DHI_WF_RESET_STATE_ITEM', body);

        if (result) {
            this.refresh();
        }
    }
};