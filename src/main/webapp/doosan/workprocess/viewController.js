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
        me.renderer.openCanvas(me.canvasId);
        me.bindButtonEvent();
    },

    bindButtonEvent: function() {

        var me = this;

        $('#refresh').click(function () {
            //TODO 리프레쉬 방식은?

            // 임시 테스트 코드
            me.renderer.canvas.clear();
            me.renderer.drawActivity();

        });

        $('#zoomIn').click(function () {
            var scale = me.renderer.canvas.getScale();
            var reScale = scale + 0.1;
            if (reScale > 3) {
                return;
            } else {
                me.renderer.canvas.setScale(reScale);
            }
        });
        $('#zoomOut').click(function () {
            var scale = me.renderer.canvas.getScale();
            var reScale = scale - 0.1;
            if (reScale < 0.2) {
                return;
            } else {
                me.renderer.canvas.setScale(reScale);
            }
        });
        $('#zoomFit').click(function () {
            me.renderer.canvas.setScale(1)
        });

        //데이터 유틸리티
        var dataModal = $('#dataBox');
        dataModal.find('[name=close]').click(function () {
            dataModal.find('.close').click();
        });

        $("li#menu-printJson").bind("click", function(){
            dataModal.find('[name=save]').hide();
            var json = JSON.stringify(me.renderer.canvas.toJSON());
            dataModal.find('textarea').val(json);
            dataModal.modal({
                show: true
            });
        });

        $('li#menu-loadJson').bind('click', function () {
            dataModal.find('[name=save]').show();
            dataModal.find('[name=save]').unbind('click');
            dataModal.find('[name=save]').bind('click', function () {
                var val = dataModal.find('textarea').val();
                var jsonData = JSON.parse(val);
                me.renderer.drawCanvasFromJSON(jsonData);

            });
            dataModal.find('textarea').val('');
            dataModal.modal({
                show: true
            });
        });
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
