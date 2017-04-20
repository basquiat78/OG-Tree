//여기는 데이터를 가지고 오픈그래프에 요리조리 뿌리고, 오픈그래프 컨트롤하는 부분.

var Renderer = function () {
    this.canvas = undefined;
};

Renderer.prototype = {
    
		
	openCanvas: function(canvasId) {
        var me = this;
        var height = $("#"+canvasId).height();
        var width = $("#"+canvasId).width();
        me.canvas = new OG.Canvas(canvasId, [width, height], 'white');
        //me.drawHorizontalArea();
        me.drawTask();
        me.bindEvent();
    },
    
    bindEvent: function() {
    	var me = this;
        me.canvas.onMoveShape(function (event, shapeElement, offset) {
        });
    },

	drawSLabel: function(element) {
		var me = this;
		var boundary = me.canvas.getBoundary(element);
		console.log(boundary);
		var x = boundary.getUpperRight().x - 6;
		var y = boundary.getUpperRight().y - 4;
		var id = 'sLabel_' + element.id;
		var size = [12, 14];
		var offset = [x, y];
		var shape = new OG.SLabel();
		var sLabel = me.canvas.drawShape(offset, shape, size, null, id, element.id);
	},

    drawTask: function() {
    	var me = this;
    	for(var i = 0 ; i < 6; i ++) {

    		var positionX = 50 + (i*10);
    		var positionY = 50;
    		var label = "test_1_"+i;
    		var taskShape = me.canvas.drawShape([positionX, positionY], new OG.TestTask(label), [50, 50], {stroke: '#555', 'stroke-width': 2});
			if(i > 3) {
				me.drawSLabel(taskShape);
			}
		}

    	
    	for(var j = 0 ; j < 5; j ++) {

    		var positionX = 50 + (j*10);
    		var positionY = 150;
    		var label = "test_2_"+j;
			var taskShape = me.canvas.drawShape([positionX, positionY], new OG.TestTask(label), [50, 50], {stroke: '#555', 'stroke-width': 2});
			if(j > 1) {
				me.drawSLabel(taskShape);
			}
    	}
    },
}

;
Renderer.prototype.constructor = Renderer;