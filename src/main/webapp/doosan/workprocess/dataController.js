// 여기에는 오직 데이터 통신하는 부분.

var DataController = function () {

};
DataController.prototype = {

    /**
     * 원래는 Aras 에서 주는 챠트 데이터를 불러오는건데, 그냥 샘플로 임의로 데이터 작성해서 리턴해준다.
     */
    getChartData: function () {
        var data = [
            {
                'id': '1111',
                'y': 30,
                'x': 30
            },
            {
                'id': '1111',
                'y': 50,
                'x': 50
            },
            {
                'id': '1111',
                'y': 70,
                'x': 70
            }
        ];
        return data;
    },
    getOtherChartData: function(){
        var data = [
            {
                'id': '1111',
                'y': 50,
                'x': 50
            },
            {
                'id': '1111',
                'y': 150,
                'x': 150
            },
            {
                'id': '1111',
                'y': 270,
                'x': 270
            }
        ];
        return data;
    }
}
;
DataController.prototype.constructor = DataController;