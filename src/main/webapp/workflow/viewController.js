// 요기는 example.html 에 타이틀이라든지, 그리드라든지, html 컨트롤 하면서, 데이터랑, 렌더러랑 서로 연락하는 통로.
// 한마디로 사령탑.

/**
 * ViewContoller html view Handler
 *
 * @class
 *
 * @author <a href="mailto:sppark@uengine.org">Seungpil Park</a>
 */
var ViewController = function (dataController, renderer) {
    this.dataController = dataController;
    this.renderer = renderer;

    this.canvasId = 'canvas';
};
ViewController.prototype = {

    //여기서 뭘할까?
    //챠트 데이터를 불러오고, 그다음 캔버스를 만든다음 캔버스를 데이터대로 조작하자!!
    init: function () {
        var me = this;
        var chartData = me.dataController.getChartData();
        console.log(chartData);

        //여기서, 메소드 안에 어떠한 값을 하드코딩 하는 것보다는, 선언부에서 프로퍼티 식으로 만드는게 좋다.
        me.renderer.openCanvs(me.canvasId);

        //캔버스를 만들었으면, 챠크 데이터대로 도형을 뿌려보자.
        me.renderer.drawChartData(chartData);

        $('#refresh').click(function(){
            me.refresh();
        })
    },

    /**
     * 리프레쉬
     */
    refresh: function(){
        var me = this;
        var chartData = me.dataController.getOtherChartData();
        me.renderer.drawChartData(chartData);
    }
}
;
ViewController.prototype.constructor = ViewController;

$(function () {
    var dataController = new DataController();
    var renderer = new Renderer();
    var viewController = new ViewController(dataController, renderer);
    viewController.init();
});
