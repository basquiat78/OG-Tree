//여기는 데이터를 가지고 오픈그래프에 요리조리 뿌리고, 오픈그래프 컨트롤하는 부분.

var Renderer = function () {
    this.canvas = undefined;
};
Renderer.prototype = {
    openCanvs: function (canvasId) {
        var me = this;
        me.canvas = new OG.Canvas(canvasId, [1000, 800], 'white', 'url(resources/images/symbol/grid.gif)');
    },

    drawChartData: function (data) {
        var me = this;
        for(var i = 0; i < data.length; i++){
            var drawData = data[i];
            me.canvas.drawShape([drawData['x'], drawData['y']], new OG.CircleShape(), [100, 100]);
        }
    }
}
;
Renderer.prototype.constructor = Renderer;