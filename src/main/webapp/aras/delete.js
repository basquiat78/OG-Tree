/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var Delete = function () {
	Delete.superclass.call(this);
};

Add.prototype.call = function(itemType, type, id) {
	var inn = this._arasObject.newIOMInnovator();
	var newObject = inn.newItem(itemType, type);
	newObject.setProperty('id', id);
	
	var isSuccess = newObject.apply();
	if(isSuccess) {
		this.alert();
	}
};

Add.prototype.alert = function() {
	alert(1);
};

Delete.prototype = new Aras();
Delete.superclass = Aras;
Delete.prototype.constructor = Delete;