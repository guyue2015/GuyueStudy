angular
  .module('app')
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      // Now set up the states
      $stateProvider
        // 用户登录
        .state('testEncry', {
          url: '/testEncry',
          views: {
            '': {
              controller: 'TestEncryController',
              templateUrl: 'app/components/testEncry/testEncry.html'
            }
          }
        });
    }]);
