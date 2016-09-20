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

Add.prototype.open = function (itemType, type, data, view) {
    this.data = data;
    var inn = this._arasObject.newIOMInnovator();
    var newObject = inn.newItem(itemType, type);

    // aras callback
    var asyncResult = this._arasObject.uiShowItemEx(newObject.node, undefined, true);
    asyncResult.then(function (arasWindow) {
        var callback = $.proxy(this.alert, this);

        var EventBottomSave = {};
        EventBottomSave.window = window;
        EventBottomSave.handler = callback;
        arasWindow.top.commandEventHandlers["aftersave"] = [];
        arasWindow.top.commandEventHandlers["aftersave"].push(EventBottomSave);

        arasWindow.top.commandEventHandlers["afterunlock"] = [];
        arasWindow.top.commandEventHandlers["afterunlock"].push(EventBottomSave);
    });
};

Add.prototype.alert = function () {
    //이벤트가 발생한 폴더 (부모폴더)
    var data = this.data;
    var view = this.view;
    var tree = this.tree;
    var parent = this.tree.selectById(data);

    //parent 의 아이디를 사용해서 아라스를 통해 만들어낸 자식 폴더 및 ED 를 불러오기


    //불러낸 자식 및 폴더 리스트.
    var apiResult = [];
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
            data.push(object);
        }
    }

    tree.updateData(data);
};
