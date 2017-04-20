//여기는 데이터를 가지고 오픈그래프에 요리조리 뿌리고, 오픈그래프 컨트롤하는 부분.

var Renderer = function () {
    this.canvas = undefined;
};

Renderer.prototype = {
    
		
	openCanvs: function(canvasId) {
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
    
    drawTask: function() {
    	var me = this;
    	for(var i = 0 ; i < 3; i ++) {

    		var positionX = 50 + (i*10);
    		var positionY = 50;
    		var label = "test_1_"+i;
    		me.canvas.drawShape([positionX, positionY], new OG.TestTask(label), [50, 50], {stroke: '#555', 'stroke-width': 2});
    	}
    	
    	for(var j = 0 ; j < 3; j ++) {

    		var positionX = 50 + (j*10);
    		var positionY = 150;
    		var label = "test_2_"+j;
    		me.canvas.drawShape([positionX, positionY], new OG.TestTask(label), [50, 50], {stroke: '#555', 'stroke-width': 2});
    	}
    },
}

;
Renderer.prototype.constructor = Renderer;