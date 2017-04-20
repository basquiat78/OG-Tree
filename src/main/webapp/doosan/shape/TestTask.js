OG.shape.TestTask = function (label) {
    OG.shape.TestTask.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.TestActivity';
    this.LABEL_EDITABLE = false;
    this.label = label;
    this.MOVABLE = true;
    this.RESIZABLE = false;
    this.SELECTABLE = true;
    this.ONLY_MOVE_AXIS = 'X';
    this.CONNECTABLE = true;
    this.CONNECT_CLONEABLE = false;
    this.DELETABLE = false;
};
OG.shape.TestTask.prototype = new OG.shape.bpmn.A_Task();
OG.shape.TestTask.superclass = OG.shape.bpmn.A_Task;
OG.shape.TestTask.prototype.constructor = OG.shape.TestTask;
OG.TestTask = OG.shape.TestTask;