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
        me.drawActivity();
        me.bindEvent();
    },
    
    bindEvent: function() {
    	var me = this;
        me.canvas.onMoveShape(function (event, shapeElement, offset) {
			var id = "sLabel_"+shapeElement.id;
			var targetElement = me.canvas.getElementById(id);
			if(targetElement != null) {
				me.canvas.removeShape(targetElement);
				me.drawSLabel(shapeElement);
			}

        });

		me.canvas.onConnectShape(function (event, edgeElement, fromElement, toElement) {
		});
    },

	drawSLabel: function(parentElement) {
		var me = this;
		var boundary = me.canvas.getBoundary(parentElement);
		var x = boundary.getUpperRight().x - 6;
		var y = boundary.getUpperRight().y + 4;
		var id = 'sLabel_' + parentElement.id;
		var size = [12, 14];
		var offset = [x, y];
		var shape = new OG.SLabel();
		//me.canvas.drawShape(offset, shape, size, null, id, parentElement.id);
		me.canvas.drawShape(offset, shape, size, null, id);
	},

	bindHoverActivity: function(element) {

		$(element).unbind('mouseover');
		$(element).unbind('mouseout');

		$(element).bind({
			mouseover: function(event) {
				$('.og-tooltip').remove();
				var tooltip =
					$('<div class="og-tooltip ui-tooltip ui-widget ui-corner-all" id="' + element.id + '-tooltip">' +
						'<div class="ui-tooltip-content">' + element.shape.label + '</div>' +
						'</div>');
				tooltip.css({
					position: 'absolute',
					'top': event.pageY,
					'left': event.pageX + 15,
					'background-color': '#333',
					'color': 'whitesmoke',
					'font-size': '12px'
				});
				$('body').append(tooltip);
				event.preventDefault();
			},
			mouseout: function(event) {
				$('.og-tooltip').remove();
				event.preventDefault();
			}
		});
	},

	drawActivity: function() {
    	var me = this;
    	for(var i = 0 ; i < 6; i ++) {

    		var positionX = 50 + (i*10);
    		var positionY = 50;
    		var label = "test_1_"+i;
    		var activity = me.canvas.drawShape([positionX, positionY], new OG.Activity(label), [50, 50], {stroke: '#555', 'stroke-width': 2});
			if(i > 3) {
				me.drawSLabel(activity);
			}
			me.bindHoverActivity(activity);
		}

    	for(var j = 0 ; j < 5; j ++) {

    		var positionX = 50 + (j*10);
    		var positionY = 150;
    		var label = "test_2_"+j;
			var activity = me.canvas.drawShape([positionX, positionY], new OG.Activity(label), [50, 50], {stroke: '#555', 'stroke-width': 2});
			if(j > 1) {
				me.drawSLabel(activity);
			}
			me.bindHoverActivity(activity);
    	}

		for(var k = 0 ; k < 8; k ++) {

			var positionX = 50 + (k*10);
			var positionY = 250;
			var label = "test_3_"+k;
			var activity = me.canvas.drawShape([positionX, positionY], new OG.Activity(label), [50, 50], {stroke: '#555', 'stroke-width': 2});
			if(k > 3) {
				me.drawSLabel(activity);
			}
			me.bindHoverActivity(activity);
		}
    },
}

;
Renderer.prototype.constructor = Renderer;