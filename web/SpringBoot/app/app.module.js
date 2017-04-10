angular
  .module('app', [
    'ui.router',
    'ngSanitize',
    'ngToast',
    'angular-drag',
    'ngFileUpload',
    'ui.bootstrap'
  ])
  .config(['ngToastProvider', function(ngToastProvider) {
    ngToastProvider.configure({
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });


    // The default $isEmpty function checks whether the value is undefined, '', null or NaN.
    angular.isEmpty = function(value) {
      return value === undefined || value === '' || value === null || isNaN(value);
    };
    angular.hasEmpty = function() {
      Array.prototype.some.call(arguments, function(item) {
        return angular.isEmpty(item);
      });
    };
    angular.pick = function(/*object, *keys */) {
      var object = Array.prototype.shift.call(arguments);
      if (!angular.isObject(object)) {
        return null;
      }

      var keys = arguments;
      var returnObject = {};

      angular.forEach(keys, function(key) {
        if (!object.hasOwnProperty(key)) {
          return;
        }

        var item = object[key];
        if (angular.isObject(item) || angular.isArray(item)) {
          returnObject[key] = angular.merge(item);
        } else {
          returnObject[key] = item;
        }
      });

      return returnObject;
    };
  }]).directive('dateFormat', ['$filter', function($filter) {
    var dateFilter = $filter('date');
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {

        function formatter(value) {
          return dateFilter(value, 'yyyy-MM-dd HH:mm:ss'); //format
        }

        function parser() {
          return ctrl.$modelValue;
        }

        ctrl.$formatters.push(formatter);
        ctrl.$parsers.unshift(parser);
      }
    };
  }])
  .constant('AUTH_EVENTS', {
      ploginProgressing: 'auth-plogin-progressing',
      ploginSuccess: 'auth-plogin-success',
      ploginFailed: 'auth-plogin-failed',

      loginProgressing: 'auth-login-progressing',
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',

      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
  })
  .controller('ApplicationCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$window', '$location', '$timeout', 'AUTH_EVENTS',
    function($scope, $rootScope, $state,$stateParams, $window, $location, $timeout, AUTH_EVENTS) {
      // 请求数据接口返回 401 表示未登录，跳转到登录页面
      $scope.$on(AUTH_EVENTS.notAuthenticated, function (event, path) {
        if ($location.path() === '/login') {
          return;
        }
        // var url = '/#login?fwd=' + encodeURIComponent(path);
        /*
        $location.url(url);
        $location.replace();
        */
        // $window.location.assign(url);
        // $window.location.reload();
        $state.go('login', {
          fwd: $state.current.name,
          params: JSON.stringify($stateParams)
        });
        console.log('跳转到登录页');
      });

      return;

      // 网络请求时的 loading 状态
      $rootScope.loadingCount = 0;
      $rootScope.$watch('loadingCount', function(newValue, oldValue) {
        if (newValue > 0) {
          $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
          });
        } else {
          $ionicLoading.hide();
        }
      });

      // 网络请求错误，例如 404 ，请求超时(30S)Cancel等
      $scope.$on('responseError', function (event, data) {
          // 稍作延迟，等 loading 的 hide() 调用完毕，再 show() ，否则可能被错误 hide()
          $timeout(function () {
              $ionicLoading.show({template: '<span>网络错误，返回码' + data.status + '</span>'});
          }, 10);
          // 一定时间后消息
          $timeout(function () {
              $ionicLoading.hide();
          }, 3000);
      });
  }])
  .factory('myHttpResponseInterceptor', ['$rootScope', '$q', '$location', 'AUTH_EVENTS',
    function ($rootScope, $q, $location, AUTH_EVENTS) {
      return {
        // 设置请求超时时间为 30S
        request: function(config) {
          config.timeout = 30000;

          return config;
        },
        requestError: function(rejection) {
          return $q.reject(rejection);
        },
        response: function(response) {
          if (!/\/mapi\//.test(response.config.url)) {
            return response;
          }
          if (response.data.code == 402){
            if(response.data.message == '请完成首登验证邮箱'){
              location.href = location.origin + '#/activation/1';
            } else if (response.data.message == '请完成首登修改登录密码'){
              location.href = location.origin + '#/activation/3';
            } else if (response.data.message == '请完成首登设置操作密码'){
              location.href = location.origin + '#/activation/4';
            };
          }
          // 需要登录的接口，但是用户未登录，此时跳转到登录页面
          if (response.data.code == 401) {
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, $location.path());
            return $q.reject(response);
          }
          return response;


        },
        responseError: function(response) {
          // 需要登录的接口，但是用户未登录，此时跳转到登录页面
          if (response.status == 401) {
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, $location.path());
          } else if (response.status != 200) {
            $rootScope.$broadcast('responseError', {
              status: response.status
            });
          }

          return $q.reject(response);
        }
      };
  }])
  // Http Intercpetor to check auth failures for xhr requests
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('myHttpResponseInterceptor');
  }]).run(['$api','$rootScope', '$state', '$stateParams', '$location',
    function($api,$rootScope, $state, $stateParams, $location, $sys) {
      $rootScope.status = true;
      $rootScope.contracts = {};
      $rootScope.singleBus = {};
      $rootScope.batchBus = {};
      document.title = '民盛小贷系统';

      $rootScope.$on('$locationChangeSuccess', function(event, newValue, oldValue) {
      });

      // 翻页初始化参数和默认参数
      // 避免在每个模块重复声明
      $rootScope.page = {
        currentPage: 1, // 当前页，从 1 开始计数
        itemsPerPage: 10, // 每页显示多少条数据
        totalItems: 0, // 总共有多少条数据，由接口来赋值
        // maxSize: 100 // Limit number for pagination size
        ITEMS_PER_PAGE_OPTIONS: [
          {value: 10, name: 10},
          {value: 20, name: 20},
          {value: 50, name: 50},
          {value: 100, name: 100}
        ],
        reset: function() {
        	this.currentPage = 1;
        	this.itemsPerPage = 10;
        	this.totalItems = 0;
        }
      };

      $rootScope.dict = dict;
      $rootScope.area = area;
      angular.forEach(dict, function(item) {
        item.unshift({value: null, text: '请选择'});
      });
      if (dict.check_option||dict.refuse_reason) {
          dict.check_option.shift();
          dict.refuse_reason.shift();
      }

      var areaByCode = {};
      area.unshift({
        code: null,
        name: '请选择'
      });
      angular.forEach(area, function(item) {
        areaByCode[item.code] = item;
        if (item.citys) {
          item.citys.unshift({
            code: null,
            name: '请选择'
          });

          angular.forEach(item.citys, function(item1) {
            areaByCode[item1.code] = item1;
            if (item1.countys) {
              item1.countys.unshift({
                code: null,
                name: '请选择'
              });
              angular.forEach(item1.countys, function(item2) {
                areaByCode[item2.code] = item2;
              });
            }
          });
        }
      });
      $rootScope.areaByCode = areaByCode;
      $rootScope.areaByCodeDefault = [{code: null, name: '请选择'}];
    }
    ]);

  // .run(['$rootScope', '$state', '$stateParams', '$location', '$api',
  //       function($rootScope, $state, $stateParams, $location, $api) {
  //           /*渲染button*/
  //           activeMenuItem();
  //           function activeMenuItem(){
  //             if(location.hash.match(/\/(\d+)/) && location.hash.match(/\/(\d+)/)[1]){
  //               if ($location.$$path != '/login') {
  //                 $api.post('perm/current/menu',{}).then(function(resp){
  //                   if(resp.data.code ==200){
  //                     $scope.menu = resp.data.data;
  //                   }else{
  //                     layer.msg(resp.data.message);
  //                     if(resp.data.code ==401){
  //                       setTimeout(function() {
  //                         $state.transitionTo('login', {reload: true, inherit: false, notify: true});
  //                       },500);
  //                     }
  //                   }
  //                 });
  //               }
  //             }
  //           }
  //       }
  //   ]);
