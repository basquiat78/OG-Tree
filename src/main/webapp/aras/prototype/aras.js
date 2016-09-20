/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var Aras = function () {
    this._arasObject = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.aras : '';
    this._wfId = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getID() : '';
    this._stdYN = (parent.top.aras != null && typeof parent.top.aras != 'undefined') ? parent.top.thisItem.getType() == 'DHI_WF_WFT' ? 'Y' : 'N' : '';
    this._body = '';
    
    this._Constants = {
	        ITEM_TYPE: {
	        	ACTIVITY_PROJECT: "DHI_WF_WFA",
	            ACTIVITY_STANDARD: "DHI_WF_WFAT",
	            
	            FOLDER_PROJECT: "DHI_WF_FOLDER",
	            FOLDER_STANDARD: "DHI_WF_FOLDER_TEMPLATE",
	            
	            ED: "ed"
	        },
	        
	        TYPE: {
	        	ADD: "add",
	        	DELETE: "delete"
	        }
	 }
};
Aras.prototype = {
    applyMethod: function (methodName) {
        if(this._arasObject){
            var inn = this._arasObject.newIOMInnovator();
            return inn.applyMethod(methodName, this.body);
        }
        return null;
    }
};
Aras.prototype.constructor = Aras;