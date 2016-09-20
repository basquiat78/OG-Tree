/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var Add = function () {
	Add.superclass.call(this);
};

Add.prototype = new Aras();
Add.superclass = Aras;
Add.prototype.constructor = Add;

Add.prototype.open = function(itemType, type) {
	var inn = this._arasObject.newIOMInnovator();
	var newObject = inn.newItem(itemType, type);
	
	// aras callback
	var asyncResult = this._arasObject.uiShowItemEx(newObject.node, undefined, true);
    asyncResult.then((arasWindow) => {
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

Add.prototype.alert = function() {
	alert(1);
};
