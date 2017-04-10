angular.
  module('app')
  .directive('tabview', tabview)
  .directive('slider', ['$timeout', '$absoluteUrl', slider])
	.directive('ngMin', ngMin)
	.directive('ngMax', ngMax)
  .directive('cpRequired', cpRequired)
  .directive('cpIdcard', cpIdcard)
  .directive('cpMobile', cpMobile)
	.directive('formLocator', formLocator)
	.directive("progressCircle", ['$rootScope', progressCircle])
	.directive("sideBar", sideBar)
	.directive("loading", loading)
	.directive('fileSelected', fileSelected)
  .directive('backButton', ['$window', backButton])
  .directive('ngVc', ['$api', '$interval', verifyCode])
  .directive('ngDiff', [diff])
  .directive('ngRequireAtLeastOne', [requireAtLeastOne])
  .directive('dateFormat', ['$filter',formateTime]);
	// .directive('placeholder', placeholder);

function backButton($window) {
   return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
          elem.bind('click', function () {
              $window.history.back();
          });
      }
  };
}
function formateTime($filter) {
  var dateFilter = $filter('date');
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      function formatter(value) {
        return dateFilter(value, 'yyyy-MM-dd'); //format
      }

      function parser() {
        return ctrl.$modelValue;
      }

      ctrl.$formatters.push(formatter);
      ctrl.$parsers.unshift(parser);

    }
  };
}

function diff() {
   return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function (scope, elem, attrs) {
        scope.$watch('data', function () {
          var data = scope.data;
          if (!data) {
            return;
          }
          var attr = attrs.ngDiff;
          var oldValue = data[attr];
          var newValue = oldValue;
          var isDifferent = false;
          if (data.updateRecording) {
            newValue = data.updateRecording[attr];
            isDifferent = newValue != oldValue;
          }
          scope.newValue = newValue;
          scope.oldValue = oldValue;
          scope.isDifferent = isDifferent;
          if (attrs.ngTpl) {
            scope.newValue = scope.$eval(attrs.ngTpl, {value: newValue});
            scope.oldValue = scope.$eval(attrs.ngTpl, {value: oldValue});
          }
        });
      },
      template: '<b class="deprecated" ng-if="isDifferent">{{ oldValue }}</b><b>{{ newValue }}</b>'
  };
}

function verifyCode($api, $interval) {
  return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        var input = elem.find('[ng-vc-input]');
        var sendBtn = elem.find('[ng-vc-btn]');
        var normalBtnText = sendBtn.text();
        scope.btnText = normalBtnText;

        sendBtn.on('click', function() {
          if (sendBtn.attr('disabled')) {
            return false;
          }

          sendBtn.attr('disabled', 'disabled');
          $api.get('sendSmsCode').then(function(resp) {
            if (resp.data.code != 200) {
              layer.msg(resp.data.message);
              return;
            }
          });
          startTimer();
        });

        var timePromise = null;
        function startTimer() {
          var timeLeft = 60;
          $interval.cancel(timePromise);
          timePromise = $interval(function() {
            if (--timeLeft <= 0) {
              sendBtn.removeAttr('disabled');
              $interval.cancel(timePromise);
              scope.btnText = normalBtnText;
              sendBtn.removeClass('getVer');
              return;
            }

            scope.btnText = timeLeft + '秒后可重发';
            sendBtn.addClass('getVer');
          }, 1000);
        }

      }
  };
}

function fileSelected() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
        var onChangeHandler = scope.$eval(attrs.fileSelected);
        elem.find('input').on('change', onChangeHandler);
    }
  };
}

function tabview() {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      var tabItems = elem.children().eq(0).children();
      var viewItems = elem.children().eq(1).children();

      // 初始化高亮的标签，只需要一次，单向读取attrs.tabview
      var tabIndex = parseInt(attrs.tabview || 0, 10);
      tabItems.eq(tabIndex).addClass('active');
      viewItems.eq(tabIndex).addClass('active');

      // 一级菜单点击事件
      tabItems.on('click', function () {
        var tabItem = angular.element(this);
        var index = 0;

        for (var i = tabItems.length - 1; i >= 0; i--) {
            if (tabItems[i] == tabItem[0]) {
                index = i;
                break;
            }
        }

        // var index = tabItems.indexOf(tabItem);
        var viewItem = viewItems.eq(index);

        tabItems.removeClass('active');
        tabItem.addClass('active');

        viewItems.removeClass('active');
        viewItem.addClass('active');
      });
    }
  };
}

function slider($timeout, $absoluteUrl) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
        banners: '='
    },
    link: function (scope, elem, attrs) {
      scope.$absoluteUrl = $absoluteUrl;

      // 当前显示的图片序号
      scope.currentIndex = 0;
      scope.next = function () {
        scope.currentIndex < scope.banners.length - 1 ?
          scope.currentIndex++ :
          scope.currentIndex = 0;
      };
      scope.prev = function () {
        scope.currentIndex > 0 ?
          scope.currentIndex-- :
          scope.currentIndex = scope.images.length - 1;
      };
      scope.go = function (i) {
        scope.currentIndex = i;
      };
      scope.$watch('currentIndex', function () {
        if (!scope.banners || scope.banners.length === 0) {
          return;
        }

        // make every image invisible
        for (var i = 0, len = scope.banners.length; i < len; i++) {
          scope.banners[i].visible = false;
        }

        // make the current image visible
        var currentBanner = scope.banners[scope.currentIndex];
        currentBanner.visible = true;

        sliderFunc(5000);
      });

      scope.$watch('banners', function (newValue, oldValue) {
        // 有可能 newValue 和 oldValue 都是 undefined
        if (!oldValue && newValue) {
          var currentBanner = scope.banners[scope.currentIndex];
        }
      });

      var timer;
      var sliderFunc = function (time) {
        $timeout.cancel(timer);
        timer = $timeout(function () {
          scope.next();
        }, time);
      };

      sliderFunc(10000);

      scope.$on('$destroy', function () {
        $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
      });
    },
    templateUrl: 'app/shared/slider/sliderView.html'
  };
}

function formLocator() {
  return {
    link: function (scope) {
      scope.$emit('formLocator');
    }
  };
}


function isEmpty(value) {
  return angular.isUndefined(value) || value === '' || value === null || value !== value;
}

function requireAtLeastOne() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attr, ctrl) {
      scope.$watch(attr.ngRequireAtLeastOneOption, function () {
        ctrl.$setViewValue(ctrl.$viewValue);
      });

      var $parent = elem.parents('[ng-require-at-least-one-parent]');
      var options = $parent.find('[ng-require-at-least-one], [ng-require-at-least-one-sibling]');
      var requireAtLeastOneValidator = function () {
        var valid = false;
        angular.forEach(options, function(option) {
          if (option.value.trim() !== '') {
            valid = true;
          }
        });
        ctrl.$setValidity('ngRequireAtLeastOne', valid);
        return undefined;
      };

      ctrl.$parsers.push(requireAtLeastOneValidator);
      ctrl.$formatters.push(requireAtLeastOneValidator);
    }
  };
}

function cpMobile() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attr, ctrl) {
      var mobileValidator = function (value) {
        if (isEmpty(value) || !/^1[34578]\d{9}$/.test(value)) {
          ctrl.$setValidity('cpMobile', false);
          return null;
        } else {
          ctrl.$setValidity('cpMobile', true);
          return value;
        }
      };

      ctrl.$parsers.push(mobileValidator);
      ctrl.$formatters.push(mobileValidator);
    }
  };
}

function cpIdcard() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attr, ctrl) {
      var idcardValidate = function (idcard) {
        if (!idcard) {
          return false;
        }

        idcard = idcard.toUpperCase();
        var area = {
          11: "北京",
          12: "天津",
          13: "河北",
          14: "山西",
          15: "内蒙古",
          21: "辽宁",
          22: "吉林",
          23: "黑龙江",
          31: "上海",
          32: "江苏",
          33: "浙江",
          34: "安徽",
          35: "福建",
          36: "江西",
          37: "山东",
          41: "河南",
          42: "湖北",
          43: "湖南",
          44: "广东",
          45: "广西",
          46: "海南",
          50: "重庆",
          51: "四川",
          52: "贵州",
          53: "云南",
          54: "西藏",
          61: "陕西",
          62: "甘肃",
          63: "青海",
          64: "宁夏",
          65: "新疆",
          71: "台湾",
          81: "香港",
          82: "澳门",
          91: "国外"
        };

        // 身份有效性检查，年份只允许1或2开头的
        if (!/^\d{6}[12]\d{10}[\dX]$/.test(idcard) ||
          !area[idcard.substr(0, 2)]) {
          return false;
        }

        var year = parseInt(idcard.substr(6, 4), 10);
        var month = parseInt(idcard.substr(10, 2), 10) - 1;
        var day = parseInt(idcard.substr(12, 2), 10);
        var now = new Date();
        var date = new Date();
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);

        // 年月日有效性简单检查
        if (year > now.getFullYear() || year < 1900 ||
          month < 0 || month > 11 ||
          day < 1 || day > 31 ||
          date.getMonth() !== month ||
          date.getDate() !== day) {
          return false;
        }

        // ⑤15-17 顺序码，同一地区同年、同月、同日出生人的编号，奇数是男性，偶数是女性
        // ⑥18 校验码，如果是0-9则用0-9表示，如果是10则用X（罗马数字10）表示

        // 18位的加权因子
        var Wi = [
          7, 9, 10, 5, 8, 4, 2, 1, 6,
          3, 7, 9, 10, 5, 8, 4, 2, 1];
        var sum = 0;
        for (i = 0; i < 18; ++i) {
          var mul;
          var char = idcard.charAt(i);
          if (char === 'X') {
            mul = 10;
          } else {
            mul = parseInt(char, 10);
          }
          sum += mul * Wi[i];
        }
        console.log(sum % 11);
        // 身份证校验位检查
        return sum % 11 === 1;
      };

      var idcardValidator = function(value) {
        if (idcardValidate(value)) {
          ctrl.$setValidity('cpIdcard', true);
          return value;
        } else {
          ctrl.$setValidity('cpIdcard', false);
          return value;
        }
      };

      ctrl.$parsers.push(idcardValidator);
      ctrl.$formatters.push(idcardValidator);
    }
  };
}

function ngMax() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attr, ctrl) {
      scope.$watch(attr.ngMax, function () {
          ctrl.$setViewValue(ctrl.$viewValue);
      });
      var maxValidator = function (value) {
        // var max = scope.$eval(attr.ngMax) || Infinity;
        // scope.$eval('') => undefined
        var max = scope.$eval(attr.ngMax);
        if (isNaN(max)) {
          max = Infinity;
        }
        if (!isEmpty(value) && value > max) {
          ctrl.$setValidity('ngMax', false);
          return undefined;
        } else {
          ctrl.$setValidity('ngMax', true);
          return value;
        }
      };

      ctrl.$parsers.push(maxValidator);
      ctrl.$formatters.push(maxValidator);
    }
  };
}

function cpRequired() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attr, ctrl) {
      var requiredValidator = function (value) {
        if (angular.isUndefined(value) || value === null) {
            ctrl.$setValidity('cpRequired', false);
            return null;
        } else {
            ctrl.$setValidity('cpRequired', true);
            return value;
        }
      };

      ctrl.$parsers.push(requiredValidator);
      // 会格式化数据
      ctrl.$formatters.push(requiredValidator);
    }
  };
}

function ngMin() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attr, ctrl) {
      scope.$watch(attr.ngMin, function () {
        ctrl.$setViewValue(ctrl.$viewValue);
      });
      var minValidator = function (value) {
        var min = scope.$eval(attr.ngMin) || 0;
        if (!isEmpty(value) && value < min) {
            ctrl.$setValidity('ngMin', false);
            return undefined;
        } else {
            ctrl.$setValidity('ngMin', true);
            return value;
        }
      };

      ctrl.$parsers.push(minValidator);
      ctrl.$formatters.push(minValidator);
    }
  };
}
function progressCircle($rootScope) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      item: '='
    },
    link: function (scope, elem, attrs) {
      scope.ie8 = $rootScope.ie8;
      var svgHeight = attrs.heights;
      var svg_R = svgHeight / 2 + 7;
      var svg_r = svgHeight / 2;
      scope.item.svg_R = svg_R;
      scope.item.svg_r = svg_r;
      var computerX1 = function (progress) {
        if (progress >= 99.99) {
            progress = 99.9999;
        }
        return svg_R - svg_R * ( Math.sin(2 * Math.PI * progress / 100));
      };
      var computerX2 = function (progress) {
        if (progress >= 99.99) {
            progress = 99.9999;
        }
        return svg_R - svg_r * ( Math.sin(2 * Math.PI * progress / 100));
      };
      var computerY1 = function (progress) {
        if (progress >= 99.99) {
            progress = 99.9999;
        }
        return svg_R * (1 + Math.cos(2 * Math.PI * progress / 100));
      };
      var computerY2 = function (progress) {
        if (progress >= 99.99) {
            progress = 99.9999;
        }
        return svg_r * (1 + Math.cos(2 * Math.PI * progress / 100)) + 7;
      };
      scope.item.progress = Math.floor((100 - scope.item.canBidAmount * 100 / scope.item.financeAmount));
      scope.item.x1 = computerX1(scope.item.progress);
      scope.item.y1 = computerY1(scope.item.progress);
      scope.item.x2 = computerX2(scope.item.progress);
      scope.item.y2 = computerY2(scope.item.progress);
    },
    templateUrl: 'app/shared/progress/progressView.html'
  };
}
function sideBar() {
  return {
    restrict: 'AE',
    replace: true,
    link: function(scope, elem, attr) {
      scope.showText = function(className) {

      };
      scope.onscroll = function() {
        $window.scrollTo(0, 0);
      };
    },
    templateUrl: 'app/shared/sideBar/sideBarView.html'
  };
}

function loading() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="loading"><img src="assets/images/loading.gif"/></div>',
    link: function (scope, element, attr) {
        /* scope.$watch('loading', function (val) {

         });*/
    }
  };
}

function placeholder() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.value = attrs.placeholder;
    }
  };
}
