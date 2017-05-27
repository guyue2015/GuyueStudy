angular
  .module('app')
  .factory('$env', [function() {
		var env = location.host;
		return env;
  }])
	.factory('$apiHost', ['$env', function($env) {
//		 return 'http://127.0.0.1:8080/'; // 胡贺东
		 return 'http://192.168.15.75:8881/'; // 胡贺东
    if ($env.indexOf('test') === 0) {
      return 'http://test.mapi.ssls.credit-pomelo.com';
    }
	}])
  .factory('$imgHost', ['$env', function($env) {
 return 'http://192.168.15.75:8881/'; // 胡贺东
    if ($env.indexOf('test') === 0) {
      return 'http://test.mapi.ssls.credit-pomelo.com';
    }
 }])
	.factory('$apiRoot', ['$apiHost', function($apiHost) {
   // return '/assets/data';
		return $apiHost;
	}])
	.factory('$downloadRoot', ['$apiHost', function($apiHost) {
		return $apiHost;
	}])
	/**
	 * 传入接口的path和参数，返回完整URL。
	 * @param  {String} path 如 ssl/payment/toTaste
	 * @param  {Object} params 如 getUrl('invest/toInvest', {rows: 6})
	 * @return {String} 完整的URL，包含GET参数
	 */
	.factory('$getUrl', ['$apiRoot', '$param', function ($apiRoot, $param) {
		return function(path, params) {
			var search = typeof params === 'object' ? ('?' + $param(params)) : '';
			if (path.indexOf('/assets') === 0) {
				return path + '.js' + search;
			} else {
				return $apiRoot + '/' + path + search;
			}
		};
	}])
	/**
	 * 功能等于jQuery的$.param(data)
	 */
	.factory('$param', [function () {
		return function(data) {
			var query = [];
			var encode = encodeURIComponent;
			for (var paramName in data) {
				query.push(encode(paramName) + '=' + encode(data[paramName]));
			}
			return query.join('&');
		};
	}])
	.factory('$val', ['$rootScope', function ($rootScope) {
		return function(input, $scope) {
			$scope = $scope || $rootScope;
			var parts = input.split('.');
			var length = parts.length;
			if (length < 2) {
				return null;
			}

			var cursor = $scope;
			for (var i = 0, len = parts.length, part; i < len; i++) {
				part = parts[i];
				if (i === len - 1) {
					return cursor[part];
				}

				if (angular.isObject(cursor[part]) ||
					angular.isArray(cursor[part])) {
					cursor = cursor[part];
				} else {
					return null;
				}
			}
		};
	}])
	.factory('$api', ['$http', '$rootScope', '$param', '$getUrl', function ($http, $rootScope, $param, $getUrl) {
		var api = {};

		function isEmpty(value) {
		  return angular.isUndefined(value) || value === '' || value === null || value !== value;
		}
		function filterData(data) {
			if (!angular.isObject(data)) {
				return;
			}
			angular.forEach(data, function(item, key) {
				if (isEmpty(item)) {
					delete data[key];
				} else if (angular.isObject(data[key])) {
					filterData(data[key]);
				}
			});
		}

		api.get = function(url, params) {
			var config = {};
			config.withCredentials = true;
			config.cache = false;

			filterData(params);

			return $http.get($getUrl(url, params), config);
		};

		api.post = function(url, data, config) {
			config = config || {};
			config.withCredentials = true;

			filterData(data);

			// 拼接公共参数
			data = data || {};
			data = $param(data);

			config.headers = config.headers || {};
			config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

			return $http.post($getUrl(url), data, config);
		};

		api.postJson = function (url, data, config) {
			config = config || {};
			config.withCredentials = true;

			config.headers = config.headers || {};
			config.headers['Content-Type'] = 'application/json';

			filterData(data);

			return $http.post($getUrl(url), JSON.stringify(data), config);
		};

		api.put = function (url, data, config) {
			config = config || {};
			config.withCredentials = true;

			filterData(data);

			// 拼接公共参数
			data = data || {};
			data = $param(data);

			config.headers = config.headers || {};
			config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

			return $http.put($getUrl(url), data, config);
		};

		api.putJson = function (url, data, config) {
			config = config || {};
			config.withCredentials = true;

			config.headers = config.headers || {};
			config.headers['Content-Type'] = 'application/json';

			filterData(data);

			return $http.put($getUrl(url), JSON.stringify(data), config);
		};

		api.delete = function(url, config) {
			config = config || {};
			config.withCredentials = true;

			return $http.delete($getUrl(url), config);
		};


		return api;
	}]);
