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

	drawActivity: function() {
		var me = this;
		for(var i = 0 ; i < 6; i ++) {

			var positionX = 50 + (i*10);
			var positionY = 50;
			var label = "testtest_1_"+i;
			var customData = {};
			var newLabel = "";
			if(label.length > 9) {
				newLabel = label.substring(0, 5) + "...";
			} else {
				newLabel = label;
			}
			customData['label'] = label;
			var activity = me.canvas.drawShape([positionX, positionY], new OG.Activity(newLabel), [50, 50], {'font-size': 9, 'vertical-align': 'top'});
			me.canvas.setCustomData(activity, customData);
			if(i > 3) {
				me.drawALabel(activity);
			}
			me.bindHoverActivity(activity);
		}

		for(var j = 0 ; j < 5; j ++) {

			var positionX = 50 + (j*10);
			var positionY = 150;
			var label = "test_2_"+j;
			var customData = {};
			var newLabel = "";
			if(label.length > 9) {
				newLabel = label.substring(0, 5) + "...";
			} else {
				newLabel = label;
			}
			customData['label'] = label;
			var activity = me.canvas.drawShape([positionX, positionY], new OG.Activity(newLabel), [50, 50], {'font-size': 9, 'vertical-align': 'top'});
			me.canvas.setCustomData(activity, customData);
			if(j > 1) {
				me.drawALabel(activity);
			}
			me.bindHoverActivity(activity);
		}

		for(var k = 0 ; k < 8; k ++) {

			var positionX = 50 + (k*10);
			var positionY = 250;
			var label = "test_3_"+k;
			var customData = {};
			var newLabel = "";
			if(label.length > 9) {
				newLabel = label.substring(0, 5) + "...";
			} else {
				newLabel = label;
			}
			customData['label'] = label;
			var activity = me.canvas.drawShape([positionX, positionY], new OG.Activity(newLabel), [50, 50], {'font-size': 9, 'vertical-align': 'top'});
			me.canvas.setCustomData(activity, customData);
			if(k > 3) {
				me.drawALabel(activity);
			}
			me.bindHoverActivity(activity);
		}
	},

    bindEvent: function() {
    	var me = this;
        me.canvas.onMoveShape(function (event, shapeElement, offset) {
			var id = "sLabel_"+shapeElement.id;
			var targetElement = me.canvas.getElementById(id);
			if(targetElement != null) {
				me.canvas.removeShape(targetElement);
				me.drawALabel(shapeElement);
			}

        });

		me.canvas.onConnectShape(function (event, edgeElement, fromElement, toElement) {
		});
    },

	/**
	 * TODO
	 * 차후 알람 액티비티로 바꿔야 함
	 * @param parentElement
	 */
	drawALabel: function(parentElement) {
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

	drawCanvasFromJSON: function(jsonData) {
		var me = this;
		me.canvas.loadJSON(jsonData);
		var allShapes = me.canvas.getAllShapes();
		_.forEach(allShapes, function(shapeElement){
			if(shapeElement.shape instanceof OG.shape.Activity) {
				me.bindHoverActivity(shapeElement);
			}
		});
	},

	bindHoverActivity: function(element) {

		var me = this;
		$(element).unbind('mouseover');
		$(element).unbind('mouseout');
		$(element).unbind('dblclick');
		$(element).bind({

			dblclick: function(event) {
				//TODO
				// 더블클릭시 aras 화면 호출하는 로직
				console.log(element);
				event.preventDefault();
			},

			mouseover: function(event) {
				$('.og-tooltip').remove();
				var label = me.canvas.getCustomData(element).label;
				var tooltip =
					$('<div class="og-tooltip ui-tooltip ui-widget ui-corner-all" id="' + element.id + '-tooltip">' +
						'<div class="ui-tooltip-content">' + label + '</div>' +
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

				var nextEdges = me.canvas.getNextEdges(element);
				var prevEdges = me.canvas.getPrevEdges(element);
				if(nextEdges.length > 0 || prevEdges.length > 0) {

					var allEdges = me.canvas.getAllEdges();
					_.forEach(allEdges, function(edge){
						me.canvas.setShapeStyle(edge, {
							"stroke": "RGB(0,0,0)",
							"stroke-width": "1.5",
							"opacity": "0.2"
						});
					});

					_.forEach(nextEdges, function(nextEdge){
						me.canvas.setShapeStyle(nextEdge, {
							"stroke": "RGB(66,139,202)",
							"stroke-width": "1.5",
							"opacity": "1"
						});
						var root = $(me.canvas.getRootGroup());
						root[0].appendChild(nextEdge);
					});

					_.forEach(prevEdges, function(prevEdge){
						me.canvas.setShapeStyle(prevEdge, {
							"stroke": "RGB(255,0,255)",
							"stroke-width": "1.5",
							"opacity": "1"
						});
						var root = $(me.canvas.getRootGroup());
						root[0].appendChild(prevEdge);
					});
				}
				event.preventDefault();
			},
			mouseout: function(event) {
				$('.og-tooltip').remove();
				var allEdges = me.canvas.getAllEdges();
				_.forEach(allEdges, function(edge){
					me.canvas.setShapeStyle(edge, {
						"stroke": "RGB(0,0,0)",
						"stroke-width": "1.5",
						"opacity": "1"
					});
				});
				event.preventDefault();
			}
		});
	},

}

;
Renderer.prototype.constructor = Renderer;