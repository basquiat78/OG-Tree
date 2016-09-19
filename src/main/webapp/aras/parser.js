/**
 * Created by MisakaMikoto on 2016. 7. 27..
 */
var Parser = function (tree) {
    this.tree = tree;
};
Parser.prototype = {
    strToJson: function (strObject) {
        return JSON.parse(strObject);
    },
    jsonToStr: function (jsonObject) {
        return JSON.stringify(jsonObject);
    },
    createWorkFlowData: function (resultNodeList, who, inout) {
        var data = [];
        var tree = this.tree;

        var prev;
        for (var i = 0; i < resultNodeList.length; i++) {
            var xmlNode = resultNodeList[i];
            var xmlNodeToString = '<node>' + $(xmlNode).html() + '</node>';
            var xmlNodeStringToJSON = $.xml2json(xmlNodeToString);
            var node = xmlNodeStringToJSON, object;

            if (inout == 'out') {
                if (node.kind == 'A') {
                    object = {
                        type: tree.Constants.TYPE.ACTIVITY,
                        id: node.f_id,
                        name: node.fs_name,
                        position: who == 'other' ? tree.Constants.POSITION.OTHER : tree.Constants.POSITION.MY,
                        parentId: "",
                        expand: true,
                        extData: JSON.parse(JSON.stringify(node))
                    };
                    //전 단계 액티비티가 있다면...
                    if (prev) {
                        object.prev = prev.id;
                        prev.next = object.id;
                    }
                    prev = object;
                } else if (node.kind == 'F') {
                    object = {
                        type: tree.Constants.TYPE.FOLDER,
                        id: node.f_id,
                        name: node.fs_name,
                        position: who == 'other' ? tree.Constants.POSITION.OTHER_OUT : tree.Constants.POSITION.MY_OUT,
                        parentId: node.fs_parent_id,
                        expand: true,
                        extData: JSON.parse(JSON.stringify(node))
                    };
                } else if (node.kind == 'E') {
                    object = {
                        type: tree.Constants.TYPE.ED,
                        id: node.f_id,
                        name: node.fs_name,
                        position: who == 'other' ? tree.Constants.POSITION.OTHER_OUT : tree.Constants.POSITION.MY_OUT,
                        parentId: node.fs_parent_id,
                        expand: true,
                        extData: JSON.parse(JSON.stringify(node))
                    };
                }
            } else if (inout == 'in') {
                // in 일 경우에는 무조건 마이-인 쪽의 매핑 데이터만 온다고 가정
                object = {
                    type: tree.Constants.TYPE.MAPPING,
                    id: node.id + '-mappingId',
                    source: node.id,
                    target: node.fs_parent_id,
                    position: tree.Constants.POSITION.MY_IN,
                    extData: JSON.parse(JSON.stringify(node))
                };
            }
            data.push(object);
        }
        return data;
    },
    createMyWorkFlowData: function (inResultNodeList, outResultNodeList) {
        if (!inResultNodeList) {
            return this.createWorkFlowData(inResultNodeList, 'my', 'in');
        }

        if (!outResultNodeList) {
            return this.createWorkFlowData(outResultNodeList, 'my', 'out');
        }
        return null;
    },
    createOtherWorkFlowData: function (resultNodeList) {
        if (typeof resultNodeList != 'undefined' && resultNodeList != null) {
            return this.createWorkFlowData(resultNodeList, 'other', 'out');
        }
    }

};
Parser.prototype.constructor = Parser;
	