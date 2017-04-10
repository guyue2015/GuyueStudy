angular
    .module('app')
    .controller('TestEncryController', TestEncryController);

TestEncryController.$inject = ['$rootScope','$scope', '$state', '$stateParams', '$api', '$const'];
function TestEncryController($rootScope, $scope, $state, $stateParams, $api, $const) {
   var events = {};
  $scope.events = events;
  // 搜索框字段
  $scope.searchInputs = {};
  $scope.searchInputs.start=0;
  $scope.searchInputs.end=2;
  /**
   * 获取数据
   * @set $scope.data
   */
  function getData() {
  	 // 基于准备好的dom，初始化echarts实例
//	 var mainJquery = $('#main');
//      var myChart = echarts.init(mainJquery[0]);
//
//      // 指定图表的配置项和数据
//      var option = {
//          title: {
//              text: 'ECharts 入门示例'
//          },
//          tooltip: {},
//          legend: {
//              data:['数据']
//          },
//          xAxis: {
//              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
//          },
//          yAxis: {},
//          series: [{
//              name: '数据',
//              type: 'bar',
//              data: [5, 20, 36, 10, 10, 20]
//          }]
//      };
//
//      // 使用刚指定的配置项和数据显示图表。
//      myChart.setOption(option);
//  //此处用定义变量的方式是因为在子控制器使用，不要去掉
    $scope.getData=$api.get('testEncry/getData',$scope.searchInputs).then(function(resp) {
      if (resp.data.code != 200) {
        layer.msg(resp.data.message);
        return;
      }
       $scope.data = resp.data.data;
      //将来源字典值转义显示
      angular.forEach($scope.data, function(obj){
       
      });
       var mainJquery = $('#main');
        var myChart = echarts.init(mainJquery[0]);

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['数据']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '数据',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    });
  }
  events.getData = getData;
  function main() {
    getData();
  }
  main();
}
