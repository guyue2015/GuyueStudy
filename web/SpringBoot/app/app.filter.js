angular
  .module('app').filter('enum', ['$const', customEnum]);

function customEnum($const) {
  return function(input, enumName) {
    // 当异步获取的数组/对象还未获取时，input 为 undefined
    if (input === undefined) {
        return null;
    }

    input = 'k' + input;
    var enums = {
      status: $const.status,
      // 业务类型
      optType: $const.optType,
      optStatus: $const.optStatus,
      optStatusAction: $const.optStatusAction
    };

    if (!enums[enumName].hasOwnProperty(input)) {
      if (enums[enumName].hasOwnProperty('__')) {
        return enums[enumName].__;
      }
      console.error('Enum Filter Error: No key "%s" in enum "%s".', input, enumName);
      return '';
    }

    return enums[enumName][input];
  };
}

/*
dwlcServices.filter('encodeURIComponent2', function () {
    return function (input) {
        return encodeURIComponent(encodeURIComponent(input));
    };
});
dwlcServices.filter('maxLenth', function () {
    return function (input) {
        if (!input) {
            return "";
        }
        var width = window.innerWidth;
        if (width >= 360) {
            var maxLength = 32;
        } else {
            var maxLength = 26;
        }
        if (input.length < maxLength / 2) {
            return input;
        }
        return input.substr(0, maxLength / 2) + ".."
    };
});
dwlcServices.filter('redLenth', function () {
    return function (input) {
        if (!input) {
            return "";
        }
        var width = window.innerWidth;
        if (width >= 360) {
            var maxLength = 24;
        } else {
            var maxLength = 18;
        }
        if (input.length < maxLength / 2) {
            return input;
        }
        return input.substr(0, maxLength / 2) + ".."
    };
});
dwlcServices.filter("redPack", function () {
    return function (input) {

        var tempInput = input.toString();
        if (!tempInput.length) {
            return "";
        }
        if (tempInput[tempInput.length - 1] == '0' && tempInput.indexOf(".") > 0) {
            tempInput = tempInput.substr(0, tempInput.length - 1);
        }
        return tempInput;
    }
});
dwlcServices.filter("redPackStyle", function () {
    return function (input) {
        input = input.toString();
        if (input.length < 5) {
            return "";
        } else if (input.length < 8) {
            return "font-size:1.5em"
        } else {
            return "font-size:1.2em"
        }
    }
})
dwlcServices.filter('dwlcNumber', function () {
    return function (input) {
        if (!input) {
            return "";
        }
        if (input < 0.01) {
            return 0.00;
        }
        var output = Math.floor(input * 100);
        output /= 100;
        return output.toFixed(2);
    };
});

dwlcServices.filter('bankCard', function () {
    return function (input) {
        if (!input) {
            return "";
        }
        return input.substr(0, 2) + "****" + input.substr(input.length - 4, 4);
    };
});
dwlcServices.filter('cardId', function () {
    return function (input) {
        if (!input) {
            return "";
        }
        input = input.replace(/(^\s*)|(\s*$)/g, '');
        var output = input.substr(0, 4) + "****" + input.substr(input.length - 4, 4);
        return output
    };
});
*/
