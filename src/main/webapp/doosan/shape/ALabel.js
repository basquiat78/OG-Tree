OG.shape.ALabel = function () {
    OG.shape.ALabel.superclass.call(this, 'doosan/shape/alarm.svg');

    this.SHAPE_ID = 'OG.shape.ALabel';
    this.LABEL_EDITABLE = false;
    this.SELECTABLE = false;
    this.MOVABLE = false;
    this.CONNECTABLE = false;
    this.DELETABLE = false;
};
OG.shape.ALabel.prototype = new OG.shape.ImageShape();
OG.shape.ALabel.superclass = OG.shape.ImageShape;
OG.shape.ALabel.prototype.constructor = OG.shape.ALabel;
OG.ALabel = OG.shape.ALabel;