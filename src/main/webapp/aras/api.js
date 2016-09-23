function CreateFolder()
{


    if (parent.thisItem.getLockStatus() == '0') {
        alert('You need to lock.');
        return;
    }
    else if (parent.thisItem.getLockStatus() == '2') {
        alert('This workflow is locked by the other user. Please contact user locked.');
        return;
    }

    if (stdYN == 'Y' && parent.thisItem.getProperty("state", "") != 'In Work')
    {
        alert('This action is only available in "In Work" state.');
        return;
    }

    var tmpSelectData = selectData = $("#" + treeListName).data("kendoTreeList").dataItem($("#" + treeListName).data("kendoTreeList").select()[0]);

    if (selectItem == null)
    {
        alert("Item을 선택하세요.");
        return;
    }

    if (selectData == null || selectData.Kind == "E")
    {
        alert("ED에는 폴더를 추가 할수 없습니다.")
        return;
    }

    if (selectData.hasChildren == true)
    {
        if($("#" + treeListName).data("kendoTreeList").dataSource.childNodes($("#" + treeListName).data("kendoTreeList").dataItem($("#" + treeListName).data("kendoTreeList").select()[0]))[0].Kind == "E")
        {
            // 자식이 ED가 있으면 처리가 않됨
            alert("자식 Node에 ED가 있습니다.");
            return;
        }
    }

    if (chkselectedDataLv('F', selectData.LV, 'Folder는 {0}까지만 생성 가능합니다.', 'EDB는 {0}까지만 생성 가능합니다.') == false)
        return;

    var tmpType = '';
    var targetwfa = '';
    var targetwf = '';
    var target_rel_wf = '';
    // ==================================================================
    if (stdYN == 'Y') {
        if (tmpSelectData.Kind == "A")
            tmpType = "DHI_WF_WFAT";
        else
            tmpType = 'DHI_WF_Folder_Template';

        targetwfa = 'dhi_wf_wfat';
        targetwf = 'dhi_wf_wft';
        target_rel_wf = '_rel_wft';
    }
    else {
        if (tmpSelectData.Kind == "A")
            tmpType = 'DHI_WF_WFA';
        else
            tmpType = 'DHI_WF_Folder';

        targetwfa = 'dhi_wf_wfa';
        targetwf = 'dhi_wf_wf';
        target_rel_wf = '_rel_wf';
    }
    target_rel_wf_com = '_rel_wf';

    var strItemTypeName = "";
    if (tmpType == "DHI_WF_WFAT" || tmpType == "DHI_WF_Folder_Template") {
        strItemTypeName = "DHI_WF_Folder_Template";
    }
    else if (tmpType == "DHI_WF_WFA" || tmpType == "DHI_WF_Folder") {
        strItemTypeName = "DHI_WF_Folder";
    }

    //var body = "<_parent_type>" + tmpType + "</_parent_type>";
    //body += "<_parent_id>" + selectData.F_ID + "</_parent_id>";

    var itmParentItem = inn.newItem(tmpType, "get");
    itmParentItem.setProperty("id", tmpSelectData.F_ID);
    itmParentItem.setAttribute("select", "id,_rel_wfa,_rel_wfat,item_number,_level,owned_by_id");
    itmParentItem = itmParentItem.apply();

    // folder item 생성
    var itmFolder = inn.newItem(strItemTypeName, "add");
    itmFolder.setProperty("_p_id", itmParentItem.getProperty("item_number", ""));
    itmFolder.setProperty("_level", (Number(itmParentItem.getProperty("_level", "0")) + 1));

    if (tmpType == "DHI_WF_WFAT")
        itmFolder.setProperty("_rel_wfat", tmpSelectData.F_ID);
    else if (tmpType == "DHI_WF_WFA")
        itmFolder.setProperty("_rel_wfa", tmpSelectData.F_ID);
    else if (tmpType == "DHI_WF_Folder_Template")
        itmFolder.setProperty("_rel_wfat", itmParentItem.getProperty("_rel_wfat", ""));
    else if (tmpType == "DHI_WF_Folder")
        itmFolder.setProperty("_rel_wfa", itmParentItem.getProperty("_rel_wfa", ""));

    var wfaItem, wfItem;
    // 1.wfa취득
    wfaItem = inn.newItem(targetwfa, "get");
    wfaItem.setProperty("id", activity_id);
    wfaItem = wfaItem.apply();

    // 2.wfa._rel_wf로 wf취득
    wfItem = inn.newItem(targetwf, "get");
    wfItem.setProperty("id", wfaItem.getProperty(target_rel_wf_com, ""));
    wfItem = wfItem.apply();
    itmFolder.setProperty(target_rel_wf, wfItem.getProperty("id", ""));



    // folder 기본 정보 설정
    if (tmpSelectData.Kind == 'A')
    {
        // 액티비티 선택시

        if (wfItem.getItemCount() == 1) {
            itmFolder.setProperty("_eng_func_structure", wfaItem.getProperty("_eng_func_structure", ""));
            itmFolder.setProperty("_eng_func_code", wfaItem.getProperty("_eng_func_code", ""));

            itmFolder.setProperty("_rel_project", wfItem.getProperty("_rel_project", ""));
            itmFolder.setProperty("_bg", wfItem.getProperty("_bg", ""));
            itmFolder.setProperty("_discipline", wfItem.getProperty("_discipline", ""));
            itmFolder.setProperty("_discipline_spec", wfItem.getProperty("_discipline_spec", ""));
            itmFolder.setProperty("_rel_ownedteam", wfItem.getProperty("_rel_ownedteam", ""));
            itmFolder.setProperty("owned_by_id", wfItem.getProperty("owned_by_id", ""));

        }


    }
    else if (tmpSelectData.Kind == 'F')
    {
        // 폴더 선택 시
        var sctItemFolder = inn.newItem(tmpType, "get");
        sctItemFolder.setProperty("id", tmpSelectData.F_ID);
        sctItemFolder = sctItemFolder.apply();

        if (sctItemFolder.getItemCount() == 1)
        {
            itmFolder.setProperty("_eng_func_structure", sctItemFolder.getProperty("_eng_func_structure", ""));
            itmFolder.setProperty("_eng_func_code", sctItemFolder.getProperty("_eng_func_code", ""));

            itmFolder.setProperty("_eng_mat_structure", sctItemFolder.getProperty('_eng_mat_structure', ''));
            itmFolder.setProperty("_eng_mat_code", sctItemFolder.getProperty('_eng_mat_code', ''));

            itmFolder.setProperty("_doc_structure", sctItemFolder.getProperty('_doc_structure', ''));
            itmFolder.setProperty("_doc_code", sctItemFolder.getProperty('_doc_code', ''));

            itmFolder.setProperty("_rel_project", wfItem.getProperty("_rel_project", ""));
            itmFolder.setProperty("_bg", wfItem.getProperty("_bg", ""));
            itmFolder.setProperty("_discipline", wfItem.getProperty("_discipline", ""));
            itmFolder.setProperty("_discipline_spec", wfItem.getProperty("_discipline_spec", ""));
            itmFolder.setProperty("_rel_ownedteam", wfItem.getProperty("_rel_ownedteam", ""));
            itmFolder.setProperty("owned_by_id", wfItem.getProperty("owned_by_id", ""));

            itmFolder.setProperty("_first_p6_act", sctItemFolder.getProperty("_first_p6_act", ""));
            itmFolder.setProperty("_first_pims_act", sctItemFolder.getProperty("_first_pims_act", ""));
            itmFolder.setProperty("_first_act_name", sctItemFolder.getProperty("_first_act_name", ""));
            itmFolder.setProperty("_final_p6_act", sctItemFolder.getProperty("_final_p6_act", ""));
            itmFolder.setProperty("_final_pims_act", sctItemFolder.getProperty("_final_pims_act", ""));
            itmFolder.setProperty("_final_act_name", sctItemFolder.getProperty("_final_act_name", ""));
            itmFolder.setProperty("_class", sctItemFolder.getProperty("_class", ""));
        }

    }

    var asyncResult = parent.top.aras.uiShowItemEx(itmFolder.node, undefined, true);
    asyncResult.then(function (arasWindow) {
            var EventBottomSave = {}
            EventBottomSave.window = window;
            EventBottomSave.handler = function () { AddFolderRel_A_F(itmFolder, itmParentItem, tmpType, tmpSelectData.F_ID); };
            arasWindow.top.commandEventHandlers["aftersave"] = [];
            arasWindow.top.commandEventHandlers["aftersave"].push(EventBottomSave);

            arasWindow.top.commandEventHandlers["afterunlock"] = [];
            arasWindow.top.commandEventHandlers["afterunlock"].push(EventBottomSave);

            //alert('test');
        },
        function(obj)
        {
            alert('Folder를 선택하세요.');
        }

    );


}

function AddFolderRel_A_F(itmFolder, itmParentItem, str_parent_type, str_parent_id)
{
    // parent type에 따라 set property 대상 분기
    var amlbody = '';
    var strOutRelTypeName = '';
    if (str_parent_type == "DHI_WF_WFAT") {
        itmFolder.setProperty("_rel_wfat", str_parent_id);
        strOutRelTypeName = "DHI_WF_WFAT_FDT_OUT_REL";

    }
    else if (str_parent_type == "DHI_WF_WFA") {
        itmFolder.setProperty("_rel_wfa", str_parent_id);
        strOutRelTypeName = "DHI_WF_WFA_FD_OUT_REL";
    }
    else if (str_parent_type == "DHI_WF_Folder_Template") {
        itmFolder.setProperty("_rel_wfat", itmParentItem.getProperty("_rel_wfat", ""));
        strOutRelTypeName = "DHI_WF_FDT_FDT_OUT_REL";
    }
    else if (str_parent_type == "DHI_WF_Folder") {
        itmFolder.setProperty("_rel_wfa", itmParentItem.getProperty("_rel_wfa", ""));
        strOutRelTypeName = "DHI_WF_FD_FD_OUT_REL";
    }

    var path = "";
    var getItem = parent.top.thisItem.newItem(itmParentItem.GetType(), "get");
    getItem.setProperty("id", itmParentItem.getID());
    getItem = getItem.apply();
    if (getItem.getItemCount() > 0)
    {
        if (selectData.Kind == 'A')
            path = getItem.getProperty("item_number", "");
        else if (selectData.Kind == 'F')
            path = getItem.getProperty("_path", "");
    }

    var currentfolder = parent.top.thisItem.newItem(itmFolder.GetType(), "get");
    currentfolder.setProperty("id", itmFolder.getID());
    currentfolder = currentfolder.apply();
    path += '||' + currentfolder.getProperty("item_number", "");


    var chkDup = parent.top.thisItem.newItem(strOutRelTypeName, "get");
    chkDup.setProperty("source_id", str_parent_id);
    chkDup.setProperty("related_id", itmFolder.getID());
    chkDup = chkDup.apply();
    if (chkDup.getItemCount() == 0)
    {
        body = "<sqlString>UPDATE innovator." + itmFolder.GetType() + " SET _PATH = '" + path + "' WHERE id = '" + itmFolder.getID() + "'</sqlString>";
        var cruApply = inn.applyMethod("DHI_APPLY_SQL", body);


        // make output Relationship
        var itmOutRelType = inn.newItem(strOutRelTypeName, "add");
        itmOutRelType.setProperty("source_id", str_parent_id);
        itmOutRelType.setProperty("related_id", itmFolder.getID());
        itmOutRelType.setProperty("owned_by_id", itmParentItem.getProperty("owned_by_id", ""));
        itmOutRelType.apply();


        var body = "<source_id>" + str_parent_id + "</source_id>";
        body += "<related_id>" + itmFolder.getID() + "</related_id>";
        var result = inn.applyMethod("DHI_WF_RESET_STATE_ITEM", body);

        //alert(result);

    }



    var i = 0;

    reload();
}

function CreateED()
{
    //maxid


    if (parent.thisItem.getLockStatus() == '0') {
        alert('You need to lock.');
        return;
    }
    else if (parent.thisItem.getLockStatus() == '2') {
        alert('This workflow is locked by the other user. Please contact user locked.');
        return;
    }

    if (stdYN == 'Y' && parent.thisItem.getProperty("state", "") != 'In Work')
    {
        alert('This action is only available in "In Work" state.');
        return;
    }

    if (selectData.Kind == 'A')
    {
        alert('Activity Node에는 ED를 추가 할 수 없습니다.');
        return;
    }

    if (selectData.hasChildren == true) {
        if ($("#" + treeListName).data("kendoTreeList").dataSource.childNodes($("#" + treeListName).data("kendoTreeList").dataItem($("#" + treeListName).data("kendoTreeList").select()[0]))[0].Kind == "F") {
            // 자식이 ED가 있으면 처리가 않됨
            alert("자식 Node에 Folder가 있습니다.");
            return;
        }
    }

    if (chkselectedDataLv('ED', selectData.LV, 'Folder는 {0}까지만 생성 가능합니다.', 'EDB는 {0}까지만 생성 가능합니다.') == false)
        return;

    OpenEDListPopup(true);
}

function DelItem()
{


    if (parent.thisItem.getLockStatus() == '0') {
        alert('You need to lock.');
        return;
    }
    else if (parent.thisItem.getLockStatus() == '2') {
        alert('This workflow is locked by the other user. Please contact user locked.');
        return;
    }

    if (stdYN == 'Y' && parent.thisItem.getProperty("state", "") != 'In Work')
    {
        alert('This action is only available in "In Work" state.');
        return;
    }

    var r = confirm("정말로 삭제하시겠습니까?");
    if (r == false)
        return;

    // Ajax로 삭제 명령 던지고 정상 처리 되면 해당 ROW를 삭제 처리함

    if (selectData == null)
    {
        alert("Item을 선택하세요.");
        return;
    }

    if(selectData.Kind == 'A')
    {
        alert('Folder 또는 ED만 삭제 가능합니다.');
        return;
    }

    //var body = "<_parent_type>" + tmpType + "</_parent_type>";
    //body += "<_parent_id>" + selectData.F_ID + "</_parent_id>";

    var tmpType_loc = '';
    if (stdYN == 'Y')
    {
        if (selectData.parentId == 0)
        {
            strOutRelTypeName = 'DHI_WF_WFAT_FDT_OUT_REL';
        }
        else if (selectData.Kind == 'F') {
            strOutRelTypeName = 'DHI_WF_FDT_FDT_OUT_REL';
        }
        else if(selectData.Kind == 'E')
        {
            strOutRelTypeName = 'DHI_WF_FDT_EDB_OUT_REL';
        }

    }
    else if (stdYN == 'N')
    {
        if (selectData.parentId == 0) {
            strOutRelTypeName = 'DHI_WF_WFA_FD_OUT_REL';
        }
        else if (selectData.Kind == 'F') {
            strOutRelTypeName = 'DHI_WF_FD_FD_OUT_REL';
        }
        else if(selectData.Kind == 'E')
        {
            strOutRelTypeName = 'DHI_WF_FD_EDB_OUT_REL';
        }
    }

    try{

        var body = "<source_id>" + selectData.FS_PARENT_ID + "</source_id>";
        body += "<related_id>" + selectData.F_ID + "</related_id>";
        var result = inn.applyMethod("DHI_WF_DEL_RELATION_ITEM", body);


        var amlStr = "<AML><Item type=\"" + strOutRelTypeName + "\" action=\"delete\" where=\"source_id = '" + selectData.FS_PARENT_ID + "' and related_id = '" + selectData.F_ID + "'\"></Item></AML>"
        var itmOutRelType = inn.applyAML(amlStr);

        //var itmOutRelType = inn.newItem(strOutRelTypeName, "delete");
        //itmOutRelType.setAttribute("where", "source_id = '" + selectData.FS_PARENT_ID + "' and related_id = '" + selectData.F_ID + "' ");
        //itmOutRelType = itmOutRelType.apply();


    }
    catch(e)
    {
        var ii = 0;
    }

    reload();
    //var i = 0;
    //var treeList = $("#" + treeListName).data("kendoTreeList");
    //treeList.removeRow(selectItem);



    //var itmEDdelete = parent.top.thisItem.newItem(edtypename, "delete");
    //itmEDdelete.setAttribute("where", "id='edID'");
    //itmEDdelete.apply();
}

function AddItem()
{
    var treeList = $("#" + treeListName).data("kendoTreeList");
    treeList.addRow(selectItem);
}

function PickED()
{


    if (parent.thisItem.getLockStatus() == '0') {
        alert('You need to lock.');
        return;
    }
    else if (parent.thisItem.getLockStatus() == '2') {
        alert('This workflow is locked by the other user. Please contact user locked.');
        return;
    }

    if (stdYN == 'Y' && parent.thisItem.getProperty("state", "") != 'In Work')
    {
        alert('This action is only available in "In Work" state.');
        return;
    }
    //var postData = "{activity_id: '03550A33D5084611808A85A3E81A0F48', stdYN: 'Y', folderYN: 'N', folder_id: '', INOUT: 'OUT'}";


    var args = new Array();
    //args['activity_id'] = activity_id;//"03550A33D5084611808A85A3E81A0F48"
    //args['owned_by_id'] = owned_by_id;
    //args['stdYN'] = stdYN;
    //args['folderYN'] = folderYN;
    //args['folder_id'] = folder_id;
    //args['INOUT'] = INOUT;
    //args['inn'] = inn;

    var project_id;
    if (stdYN == 'N')
        project_id = parent.top.thisItem.getProperty("_rel_project");
    else
        project_id = '';


    var url = '/UI_Extends/Folder/EDSearch.aspx';
    //var popOptions = "dialogWidth: 1050px; dialogHeight: 835px; center: yes; resizable: no; status: no; scroll: no;toolbar: no;menubar: no;location: no;fullscreen: no;directories: no;channelmode: no;titlebar: no";
    var params = "?activity_id=" + activity_id + "&project_id=" + project_id + "&owned_by_id=" + owned_by_id + "&stdYN=" + stdYN + "&folderYN=" + folderYN + "&folder_id=" + folder_id + "&INOUT=" + INOUT
    window.open(url + params, 'edssearch', 'width=1050, height=835, menubar=no, status=no, toolbar=no, location=no, scrollbars=no, resizable=no, fullscreen=no, channelmode=no');
    //return vReturn;
}

$(function () {
    $(".widget input[type=submit], .widget a, .widget button").button();
    $("button, input, a").click(function (event) {

        if (event.delegateTarget.id == "")
            return;

        if (event.delegateTarget.id == "popupclose")
        {
            OpenEDListPopup(false);
            return;
        }
        else
        {
            //event.delegateTarget.id
            //alert('ed 추가 명령 필요!');
            //debugger;

            var f_id = selectData.F_ID;

            var tmpItem_Folder = '';
            if (stdYN == 'Y')
                tmpItem_Folder = 'DHI_WF_FOLDER_TEMPLATE';
            else if (stdYN == 'N')
                tmpItem_Folder = 'DHI_WF_Folder';

            // ED 정보를 가져오기 위한 기본 설정
            var folder_info = parent.top.thisItem.newItem(tmpItem_Folder, "get");
            folder_info.setProperty("id", selectData.F_ID);
            folder_info = folder_info.apply();

            // ED 추가 메소드 호출
            var itmNewED = parent.top.thisItem.newItem(event.delegateTarget.id, "add");
            itmNewED.setProperty("_p_id", selectData.FS_ID);

            itmNewED.setProperty("_eng_mat_structure", folder_info.getProperty('_eng_mat_structure', ''));
            itmNewED.setProperty("_eng_mat_code", folder_info.getProperty('_eng_mat_code', ''));

            itmNewED.setProperty("_eng_func_structure", folder_info.getProperty('_eng_func_structure', ''));
            itmNewED.setProperty("_eng_func_code", folder_info.getProperty('_eng_func_code', ''));

            itmNewED.setProperty("_doc_structure", folder_info.getProperty('_doc_structure', ''));
            itmNewED.setProperty("_doc_code", folder_info.getProperty('_doc_code', ''));

            itmNewED.setProperty("_rel_project", folder_info.getProperty('_rel_project', ''));
            itmNewED.setProperty("_rel_ownedteam", folder_info.getProperty('_rel_ownedteam', ''));
            itmNewED.setProperty("_bg", folder_info.getProperty('_bg', ''));
            itmNewED.setProperty("_discipline", folder_info.getProperty("_discipline", ""));
            itmNewED.setProperty("_discipline_spec", folder_info.getProperty('_discipline_spec', ''));

            itmNewED.setProperty("_first_p6_act", folder_info.getProperty("_first_p6_act", ""));
            itmNewED.setProperty("_first_pims_act", folder_info.getProperty("_first_pims_act", ""));
            itmNewED.setProperty("_first_act_name", folder_info.getProperty("_first_act_name", ""));
            itmNewED.setProperty("_final_p6_act", folder_info.getProperty("_final_p6_act", ""));
            itmNewED.setProperty("_final_pims_act", folder_info.getProperty("_final_pims_act", ""));
            itmNewED.setProperty("_final_act_name", folder_info.getProperty("_final_act_name", ""));
            itmNewED.setProperty("_class", folder_info.getProperty("_class", ""));


            // STD
            if (stdYN == 'Y')            // STD
            {
                itmNewED.setProperty("_rel_wfat", activity_id);
                itmNewED.setProperty("_rel_wft", folder_info.getProperty('_rel_wft', ''));
                itmNewED.setProperty("is_template", "1");
            }
            else                        // template
            {
                itmNewED.setProperty("_rel_wfa", activity_id);
                itmNewED.setProperty("_rel_wf", folder_info.getProperty('_rel_wf', ''));
            }



            //_rel_wfa  == activity.id

            //parent.top.thisItem.getID();


            var asyncResult = parent.top.aras.uiShowItemEx(itmNewED.node, undefined, true);
            asyncResult.then(function (arasWindow) {
                    var EventBottomSave = {}
                    EventBottomSave.window = window;
                    EventBottomSave.handler = function () { AddFolderRel(itmNewED, f_id, folder_info.getProperty("owned_by_id", "")); };
                    arasWindow.top.commandEventHandlers["aftersave"] = [];
                    arasWindow.top.commandEventHandlers["aftersave"].push(EventBottomSave);

                    arasWindow.top.commandEventHandlers["afterunlock"] = [];
                    arasWindow.top.commandEventHandlers["afterunlock"].push(EventBottomSave);

                    //alert('test');
                },
                function(obj)
                {
                    alert('처리중 오류가 발생하였습니다.');
                }
            );

            OpenEDListPopup(false);

            //OpenED(event.delegateTarget.id, id);
        }
    });
});

function AddFolderRel(itmNewED, folder_id, owned_by_id)
{
    var tmpID = itmNewED.getID();

    var tmpFolderItem = parent.top.thisItem.newItem(stdYN == 'Y' ? "DHI_WF_FOLDER_TEMPLATE" : "DHI_WF_Folder", "get");
    tmpFolderItem.setProperty("id", folder_id);
    tmpFolderItem = tmpFolderItem.apply();

    var tmpEDItem = parent.top.thisItem.newItem(itmNewED.getType(), "get");
    tmpEDItem.setProperty("id", itmNewED.getID());
    tmpEDItem = tmpEDItem.apply();

    var path = tmpFolderItem.getProperty("_path") + '||' + tmpEDItem.getProperty("_ed_number", "");

    body = "<sqlString>UPDATE innovator." + itmNewED.GetType() + " SET _PATH = '" + path + "' WHERE id = '" + itmNewED.getID() + "'</sqlString>";
    var cruApply = inn.applyMethod("DHI_APPLY_SQL", body);



    if (stdYN == 'Y')
    {

        // template
        var chkDup = parent.top.thisItem.newItem("DHI_WF_FDT_EDB_OUT_REL", "get");
        chkDup.setProperty("source_id", folder_id);
        chkDup.setProperty("related_id", tmpID);
        chkDup = chkDup.apply();
        if (chkDup.getItemCount() == 0) {

            try
            {
                alert('ADD REL(STD)');
                // parentFolderItem output rel
                var folderOutRel = parent.top.thisItem.newItem("DHI_WF_FDT_EDB_OUT_REL", "add");
                folderOutRel.setProperty("source_id", folder_id);
                folderOutRel.setProperty("related_id", tmpID);
                folderOutRel.setProperty("owned_by_id", owned_by_id);
                folderOutRel = folderOutRel.apply();

                var iii = 0;

                // parentActivityItem output rel
                //var activityOutRel = parent.top.thisItem.newItem("DHI_WF_WFAT_EDB_OUT_REL", "add");
                //activityOutRel.setProperty("source_id", activity_id);
                //activityOutRel.setProperty("related_id", tmpID);
                //activityOutRel.setProperty("owned_by_id", owned_by_id);
                //activityOutRel.apply();

                var body = "<source_id>" + folder_id + "</source_id>";
                body += "<related_id>" + tmpID + "</related_id>";
                var result = inn.applyMethod("DHI_WF_RESET_STATE_ITEM", body);


            }
            catch(e)
            {
                var ii = 0;
            }


        }

    }
    else
    {

        var chkDup = parent.top.thisItem.newItem("DHI_WF_FD_EDB_OUT_REL", "get");
        chkDup.setProperty("source_id", folder_id);
        chkDup.setProperty("related_id", tmpID);
        chkDup = chkDup.apply();
        if (chkDup.getItemCount() == 0) {

            alert('ADD REL(PROJ)');
            // parentFolderItem output rel
            var folderOutRel = parent.top.thisItem.newItem("DHI_WF_FD_EDB_OUT_REL", "add");
            folderOutRel.setProperty("source_id", folder_id);
            folderOutRel.setProperty("related_id", tmpID);
            folderOutRel.setProperty("owned_by_id", owned_by_id);
            folderOutRel.apply();

            // parentActivityItem output rel
            //var activityOutRel = parent.top.thisItem.newItem("DHI_WF_WFA_EDB_OUT_REL", "add");
            //activityOutRel.setProperty("source_id", activity_id);
            //activityOutRel.setProperty("related_id", tmpID);
            //activityOutRel.setProperty("owned_by_id", owned_by_id);
            //activityOutRel.apply();

            var body = "<source_id>" + folder_id + "</source_id>";
            body += "<related_id>" + tmpID + "</related_id>";
            var result = inn.applyMethod("DHI_WF_RESET_STATE_ITEM", body);
            //alert(result);

        }
    }


    reload();
    //alert('ED창에서 저장버튼을 눌렀습니다.')
}

function OpenED(edType, id)
{
    parent.top.aras.uiShowItem(edType, id);
}

function OpenEDListPopup(flag)
{
    if (flag == true)
        $("#base_popup").show();
    else
        $("#base_popup").hide();
}

