OG.shape.Activity = function (label) {
    OG.shape.Activity.superclass.call(this, 'doosan/shape/activity.svg', label);

    this.SHAPE_ID = 'OG.shape.Activity';
    this.LABEL_EDITABLE = false;
    this.label = label;
    this.MOVABLE = true;
    this.RESIZABLE = false;
    this.SELECTABLE = true;
    this.AXIS = 'N';
    this.CONNECTABLE = true;
    this.CONNECT_CLONEABLE = false;
    this.DELETABLE = false;
};
OG.shape.Activity.prototype = new OG.shape.ImageShape();
OG.shape.Activity.superclass = OG.shape.ImageShape;
OG.shape.Activity.prototype.constructor = OG.shape.Activity;
OG.Activity = OG.shape.Activity;