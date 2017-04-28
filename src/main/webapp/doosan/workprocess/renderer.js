//여기는 데이터를 가지고 오픈그래프에 요리조리 뿌리고, 오픈그래프 컨트롤하는 부분.

var Renderer = function () {
    this.canvas = undefined;
	this.STYLE = {
		NEXT_ACTIVITY: {
			color 	: 'rgb(91,192,222)',
			stroke	: 'rgb(0,0,0)'
		},

		PREV_ACTIVITY: {
			color 	: 'rgb(255,0,255)',
			stroke	: 'rgb(0,0,0)'
		}
	};
	this.selectedShape = null;
};

Renderer.prototype = {

	openCanvas: function(canvasId) {
        var me = this;
        var height = $("#"+canvasId).height();
        var width = $("#"+canvasId).width();
        me.canvas = new OG.Canvas(canvasId, [width, height], 'white');
		me.canvas.initConfig({
			selectable: true,
			dragSelectable: true,
			movable: true,
			resizable: false,
			connectable: true,
			selfConnectable: false,
			connectCloneable: false,
			connectRequired: true,
			labelEditable: false,
			groupDropable: true,
			collapsible: true,
			enableHotKey: false,
			enableContextMenu: false,
			useSlider: true,
			stickGuide: false,
			checkBridgeEdge: false
		});
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
				me.attachALabel(activity);
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
				me.attachALabel(activity);
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
				me.attachALabel(activity);
			}
			me.bindHoverActivity(activity);
		}

		for(var l = 0 ; l < 5; l ++) {

			var positionX = 50 + (l*10);
			var positionY = 350;
			var label = "test_4_"+l;
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
			if(l > 3) {
				me.attachALabel(activity);
			}
			me.bindHoverActivity(activity);
		}
	},

    bindEvent: function() {
    	var me = this;
        me.canvas.onMoveShape(function (event, shapeElement, offset) {
			var id = "aLabel_"+shapeElement.id;
			//$(shapeElement).find('svg').remove();
			var targetElement = me.canvas.getElementById(id);
			if(targetElement != null) {
				me.canvas.removeShape(targetElement);
				me.attachALabel(shapeElement);
			}
        });

		me.canvas.onConnectShape(function (event, edgeElement, fromElement, toElement) {
		});

		/**
		 * contextMenu Binding
		 */
		me.enableShapeContextMenu();
    },

	/**
	 * TODO
	 * 차후 알람 액티비티로 바꿔야 함
	 * @param parentElement
	 */
	attachALabel: function(parentElement) {
		var me = this;
		var boundary = me.canvas.getBoundary(parentElement);
		var x = boundary.getUpperLeft().x + 10;
		var y = boundary.getUpperLeft().y + 6;
		var id = 'aLabel_' + parentElement.id;
		var size = [12, 14];
		var offset = [x, y];
		var shape = new OG.ALabel();
		//me.canvas.drawShape(offset, shape, size, null, id, parentElement.id);
		me.canvas.drawShape(offset, shape, size, null, id);
	},

	removeALabel: function(parentElement) {
		var me = this;
		var id = "aLabel_"+parentElement.id;
		var targetElement = me.canvas.getElementById(id);
		me.canvas.removeShape(targetElement);
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
						//var nextActivity = me.canvas.getRelatedElementsFromEdge(nextEdge).to;
						//me.updateImageShapeStatus(nextActivity, me.STYLE.NEXT_ACTIVITY);
					});

					_.forEach(prevEdges, function(prevEdge){
						me.canvas.setShapeStyle(prevEdge, {
							"stroke": "RGB(255,0,255)",
							"stroke-width": "1.5",
							"opacity": "1"
						});
						var root = $(me.canvas.getRootGroup());
						root[0].appendChild(prevEdge);
						//var prevActivity = me.canvas.getRelatedElementsFromEdge(prevEdge).from;
						//me.updateImageShapeStatus(prevActivity, me.STYLE.PREV_ACTIVITY);
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

				/*
				var allShapes = me.canvas.getAllShapes();
				_.forEach(allShapes, function(shapeElement){
					if(shapeElement.shape instanceof OG.shape.Activity) {
						var $svg = $(shapeElement).find('svg')[0];
						if($svg) {
							me.canvas.move(shapeElement, [0, 0]);
						}
					}
				});
				*/
				event.preventDefault();
			}
		});
	},

	/**
	 * 이미지 Shape 의 컬러와 스트로크를 스테이터스에 따라 변경한다.
	 * @param view OG-Tree view data
	 * @param element OG-Tree Dom Element
	 */
	updateImageShapeStatus: function (element, style) {
		var me = this;
		var color = style['color'];
		var stroke = style['stroke'];

		/**
		 * svg 의 path 들에 컬러와 stroke 를 적용시킨다.
		 * @param $svg
		 * @param color
		 * @param stroke
		 */
		var applyPathStyle = function ($svg, color, stroke) {
			$svg.find('path').each(function () {
				//컬러가 없지만 선색상은 변경해야 하는경우
				if (!color && stroke) {
					color = '#fff';
				}
				//컬러 입히기
				if (color) {
					var ignoreColor = false;
					if ($(this).attr('class')) {
						if ($(this).attr('class').indexOf('ignoreColor') != -1) {
							ignoreColor = true;
						}
					}
					if (!ignoreColor) {
						$(this).css('fill', color);
					}
				}
				//라인 색 입히기
				if (stroke) {
					var ignoreStroke = false;
					if ($(this).attr('class')) {
						if ($(this).attr('class').indexOf('ignoreStroke') != -1) {
							ignoreStroke = true;
						}
					}
					if (!ignoreStroke) {
						$(this).css('stroke', stroke);
					}
				}

			});
		};
		var createNewSvg = function (imgURL, attributes) {
			$.get(imgURL, function (data) {
				var $svg = $(data).find('svg');
				$svg = $svg.removeAttr('xmlns:a');

				$.each(attributes, function () {
					$svg.attr(this.name, this.value);
				});
				applyPathStyle($svg, color, stroke);

				// Replace IMG with SVG
				var rElement = me.canvas._RENDERER._getREleById(element.id);
				if (rElement) {
					var childNodes = rElement.node.childNodes;
					for (var i = childNodes.length - 1; i >= 0; i--) {
						if (childNodes[i].tagName == 'IMAGE' || childNodes[i].tagName == 'image') {
							me.canvas._RENDERER._remove( me.canvas._RENDERER._getREleById(childNodes[i].id));
						}
					}
				}
				$(element).append($svg);
			}, 'xml');
		};
		if (!color || color == 'none' || color == '') {
			color = undefined;
		}
		if (!stroke || stroke == 'none' || stroke == '') {
			stroke = undefined;
		}
		if (color || stroke) {
			var $img = $(element).find('image');
			var imgURL = $img.attr('href');
			var attributes = $img.prop("attributes");
			var $svg = $(element).find('svg');
			//이미지만 존재할 경우
			if (imgURL && attributes && !$svg.length) {
				//console.log('이미지만 존재할 경우');
				createNewSvg(imgURL, attributes);
			}
			//이미지가 없고 svg 가 존재할 경우
			else if (!imgURL && $svg.length) {
				//console.log('이미지가 없고 svg 가 존재할 경우', $svg.length);
				applyPathStyle($svg, color, stroke);
			}
			//이미지와 svg 둘 다 있을 경우
			else if (imgURL && attributes && $svg.length) {
				if ($svg.length && attributes) {
					// Remove Duplicate SVG
					//console.log('이미지와 svg 둘 다 있을 경우', $svg.length);
					if ($svg.length > 1) {
						$svg.remove();
						createNewSvg(imgURL, attributes);
					} else {
						$.each(attributes, function () {
							$svg.attr(this.name, this.value);
						});
						applyPathStyle($svg, color, stroke);

						// Remove IMG
						var rElement = me.canvas._RENDERER._getREleById(element.id);
						if (rElement) {
							var childNodes = rElement.node.childNodes;
							for (var i = childNodes.length - 1; i >= 0; i--) {
								if (childNodes[i].tagName == 'IMAGE' || childNodes[i].tagName == 'image') {
									me.canvas._RENDERER._remove(me.canvas._RENDERER._getREleById(childNodes[i].id));
								}
							}
						}
					}
				}
			} else {
				//console.log('그 이외의 경우');
			}
		}
	},

	/**
	 * OG Tree Dom Element 에 마우스 우클릭 메뉴를 가능하게 한다.
	 * 기존 기능 수정
	 */
	enableShapeContextMenu: function () {

		var me = this;
		$.contextMenu({
			position: function (opt, x, y) {
				opt.$menu.css({top: y + 10, left: x + 10});
			},
			selector: '#' + me.canvas._RENDERER.getRootElement().id + ' [_type=SHAPE]',
			build: function ($trigger, event) {
				var items = {};
				$(me.canvas._RENDERER.getContainer()).focus();
				var element = $trigger[0];
				//선택된 엘리먼트 셀렉트
				if ($(element).attr("_selected") === "true") {
					me.canvas._HANDLER.deselectShape(element);
					me.canvas._HANDLER.selectShape(element);
				} else {
					me.canvas._HANDLER.selectShape(element);
				}
				me.selectedShape = element;
				//공통
				if(me.isALabel(element)) {
					items.removeALabel = me.makeRemoveALabel();
				} else {
					items.attatchALabel = me.makeAttatchALabel();
				}
				items.showProperties = me.makeShowProperties();
				return {
					items: items
				};
			}
		});
	},

	/**
	 * 컨텍스트 메뉴 생성시 해당 Shape에 ALabel이 있는지 없는지 체크
	 * @param element
	 */
	isALabel: function(element) {
		var me = this;
		var isALabel = false;
		var id = "aLabel_"+element.id;
		var targetElement = me.canvas.getElementById(id);
		if(targetElement != null) {
			isALabel = true;
		}
		return isALabel;
	},

	/**
	 * Attach ALabel Context Menu
	 * @returns {{name: string, icon: string, callback: Function}}
	 */
	makeAttatchALabel: function () {
		var me = this;
		return {
			name: 'attach ALabel',
			icon: '',
			callback: function () {
				me.attachALabel(me.selectedShape);
			}
		}
	},

	/**
	 * Remove ALabel Context Menu
	 * @returns {{name: string, icon: string, callback: Function}}
	 */
	makeRemoveALabel: function () {
		var me = this;
		return {
			name: 'remove ALabel',
			icon: '',
			callback: function () {
				me.removeALabel(me.selectedShape);
			}
		}
	},

	/**
	 * 프로퍼티 보기 콘텍스트 메뉴를 생성한다. 테스트
	 * @returns {{name: string, icon: string, callback: Function}}
	 */
	makeShowProperties: function () {
		var me = this;
		return {
			name: 'test',
			icon: '',
			callback: function () {
				console.log(me.selectedShape);
			}
		}
	},
}

;
Renderer.prototype.constructor = Renderer;