'use strict';

angular.module('app')
    .provider('plUploadService', function() {

        var config = {
            flashPath: '/assets/js/lib/plupload-2.3.1/Moxie.swf',
            silverLightPath: '/assets/js/lib/plupload-2.3.1/Moxie.xap',
            uploadPath: 'http://oss.aliyuncs.com'
        };

        this.setConfig = function(key, val) {
            config[key] = val;
        };

        this.getConfig = function(key) {
            return config[key];
        };

        var that = this;

        this.$get = [function() {

            return {
                getConfig: that.getConfig,
                setConfig: that.setConfig
            };

        }];

    })
    .directive('plUpload', ['$parse', '$log', '$http', 'plUploadService', '$api', function($parse, $log, $http, plUploadService, $api) {
        // plupload中为我们提供了 mOxie 对象
        // 有关mOxie的介绍和说明请看：https://github.com/moxiecode/moxie/wiki/API
        // file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
        function previewImage(file, scope) {
            // 确保文件是图片
            if (!file || !/image\//.test(file.type)) {
                return;
            }

            // gif使用 FileReader 进行预览，因为 mOxie.Image 只支持jpg和png
            if (file.type == 'image/gif') {
                var fr = new mOxie.FileReader();
                fr.onload = function () {
                    // callback && callback(fr.result);
                    scope.$apply(function() {
                        file.imgSrc = fr.result;
                    });
                    // file.imgSrc = fr.result;
                    fr.destroy();
                    fr = null;
                };
                fr.readAsDataURL(file.getSource());
            } else {
                var preloader = new moxie.image.Image();
                preloader.onload = function () {
                    // 先压缩一下要预览的图片,宽300，高300
                    //preloader.downsize(550, 400);
                    // 得到图片src,实质为一个base64编码的数据
                    var imgSrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL();
                    // callback传入的参数为预览图片的url
                    // callback && callback(imgSrc);
                    scope.$apply(function() {
                        file.imgSrc = imgSrc;
                    });
                    // file.imgSrc = imgSrc;
                    preloader.destroy();
                    preloader = null;
                };
                preloader.load(file.getSource());
            }
        }
        function nameFilter(uploader,files,idx,regex){//文件名称过滤
            if(idx>=files.length)
                return false;
            for(;idx<files.length;idx++){
                if(!files[idx].name.substring(0,files[idx].name.lastIndexOf('.')).match(regex)){
                    uploader.removeFile(files[idx]);
                    files.splice(idx,1);//
                    break;
                }
            }
            nameFilter(uploader,files,idx,regex);
        }
        return {
            restrict: 'A',
            scope: {
                'plProgressModel': '=',
                'plFilesModel': '=',
                'plFiltersModel': '=',
                'plMultiParamsModel': '=',
                'plInstance': '=',
                'plFormModel':'=',
                'plFilenameFilter':'='
            },
            link: function(scope, iElement, iAttrs) {

                scope.randomString = function(len, charSet) {
                    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var randomString = '';
                    for (var i = 0; i < len; i++) {
                        var randomPoz = Math.floor(Math.random() * charSet.length);
                        randomString += charSet.substring(randomPoz, randomPoz + 1);
                    }
                    return randomString;
                };

                if (!iAttrs.id) {
                    var randomValue = scope.randomString(5);
                    iAttrs.$set('id', randomValue);
                }
                if (!iAttrs.plAutoUpload) {
                    iAttrs.$set('plAutoUpload', 'true');
                }
                if (!iAttrs.plMultiSelection) {
                    iAttrs.$set('plMultiSelection', 'true');
                }
                if (!iAttrs.plMaxFileSize) {
                    iAttrs.$set('plMaxFileSize', '10mb');
                }
                if (!iAttrs.plUrl) {
                    iAttrs.$set('plUrl', plUploadService.getConfig('uploadPath'));
                }
                if (!iAttrs.plFlashSwfUrl) {
                    iAttrs.$set('plFlashSwfUrl', plUploadService.getConfig('flashPath'));
                }
                if (!iAttrs.plSilverlightXapUrl) {
                    iAttrs.$set('plSilverlightXapUrl', plUploadService.getConfig('silverLightPath'));
                }
                if (typeof scope.plFiltersModel == "undefined") {
                    scope.filters = {
                        mime_types: [{
                            title: "Image files",
                            extensions: "jpg,jpeg,png"
                        }],
                        prevent_duplicates: true
                    };
                } else {
                    scope.filters = scope.plFiltersModel;
                }


                var options = {
                    runtimes: 'html5,flash,silverlight',
                    browse_button: iAttrs.id,
                    multi_selection: iAttrs.plMultiSelection.toLowerCase() == 'true',
                    container: iAttrs.plContainer,
                    max_file_size: iAttrs.plMaxFileSize,
                    url: iAttrs.plUrl,
                    flash_swf_url: iAttrs.plFlashSwfUrl,
                    silverlight_xap_url: iAttrs.plSilverlightXapUrl,
                    filters: scope.filters,
                    drop_element: iAttrs.plDropElement,
                    init: {
                        PostInit: function() {
                            if (iAttrs.plAutoUpload != "true") {
                                document.getElementById('upload-files').onclick = function() {
                                    uploader.start();
                                    return false;
                                };
                            }
                            document.getElementById("delete-files").onclick = function(){
                                angular.forEach($(".file-list").find("[type=checkbox]:checked"),function(obj,idx){
                                    var img = $(obj).parent().parent();
                                    var fileId = $(img).data("id");
                                    // $(img).remove();
                                    angular.forEach(uploader.files,function(file,idx){
                                        if(file.id == fileId){
                                            uploader.files.splice(idx,1);
                                            uploader.removeFile(file);
                                            if(iAttrs.plFilesModel){
                                                scope.$apply(function(){
                                                    scope.plFilesModel.splice(idx,1);
                                                });
                                            }
                                                 
                                             return false;
                                        }
                                    });
                                });
                            }
                        }
                    }
                };

                if (scope.plMultiParamsModel) {
                    options.multipart_params = scope.plMultiParamsModel;
                }

                var uploader = new plupload.Uploader(options);

                uploader.settings.headers = plUploadService.getConfig('headers');

                uploader.init();

                uploader.bind('Error', function(up, err) {
                    if (iAttrs.onFileError) {
                        scope.$parent.$apply(iAttrs.onFileError);
                    }

                    // $log.error("Cannot upload, error: " + err.message + (err.file ? ", File: " + err.file.name : "") + "");
                    layer.msg("上传失败，错误原因：" + err.message + (err.file ? "，文件名：" + err.file.name : "") + "");
                    up.refresh(); // Reposition Flash/Silverlight
                });

                uploader.bind('FilesAdded', function(up, files) {
                    if(iAttrs.plFilenameFilter){//对文件名称进行过滤,对不符合正则表达式的进行提示
                        var length = files.length;
                        nameFilter(up,files,0,scope.plFilenameFilter)
                        if(files.length!=length)
                            layer.msg("部分文件名不符合要求");
                    }
                    
                    scope.$apply(function() {
                        if (iAttrs.plFilesModel) {
                            angular.forEach(files, function(file, key) {//添加文件，文件上传到oss后做对比，将上传的文件保存到表单
                                if (!scope.plFilesModel) scope.plFilesModel = [];
                                file.showBar = false;//初始不显示上传进度条
                                file.showCheckBox = true;//初始显示checkbox
                                scope.plFilesModel.push(file);
                                previewImage(file, scope);

                            });
                        }

                        if (iAttrs.onFileAdded) {
                            var fn = $parse(iAttrs.onFileAdded);
                            fn(scope.$parent, {
                                $files: files
                            });
                        }
                    });

                    if (iAttrs.plAutoUpload == "true") {
                        uploader.start();
                    }
                });

                uploader.bind('BeforeUpload', function(up, file) {
                    angular.forEach(scope.plFilesModel,function($file,idx){
                        if($file.id == file.id){
                            $file.showBar = true;//显示进度条
                            return;
                        }
                    })
                    $api.get('media/policy').then(function(resp) {
                        /*
                        accessid: "wMGOaJpcbDOlf5Mq"
                        callback : "eyJjYWxsYmFja1VybCI6Imh0dHA6Ly8yMjMuMjIzLjE4My40My95enkvbWFwaS9vc3MvY2FsbGJhY2siLCJjYWxsYmFja0hvc3QiOiJvc3MtY24tYmVpamluZy5hbGl5dW5jcy5jb20iLCJjYWxsYmFja0JvZHkiOiJmaWxlbmFtZT0ke29iamVjdH0mc2l6ZT0ke3NpemV9Jm1pbWVUeXBlPSR7bWltZVR5cGV9JmhlaWdodD0ke2ltYWdlSW5mby5oZWlnaHR9JndpZHRoPSR7aW1hZ2VJbmZvLndpZHRofSZ1c2VyaWQ9bnVsbCZpcEhvc3Q9MTkyLjE2OC4xLjEwMyIsImNhbGxiYWNrQm9keVR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0="
                        dir: "tyfq/products/"
                        expire: "1462886609"
                        host: "http://tyiti.oss-cn-beijing.aliyuncs.com"
                        policy: "eyJleHBpcmF0aW9uIjoiMjAxNi0wNS0xMFQxMzoyMzoyOS44NDFaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0eWZxL3Byb2R1Y3RzLyJdXX0="
                        signature: "9JUlTZ5Ju66yMDVxzYNYLG2sdF0="
                        */
                        var data = resp.data;
                        var pos = file.name.lastIndexOf('.');
                        var suffix = '';
                        if (pos != -1) {
                            suffix = file.name.substring(pos);
                        }
                        var now = Math.floor(Date.now() / 1000);
                        if (data.expire < now) {
                            alert('过期了');
                        }
                        var multipartParams = {
                            key: data.dir + file.id.substr(2) + suffix,
                            policy: data.policy,
                            OSSAccessKeyId: data.accessid,
                            success_action_status: 200, // 让服务端返回200,不然，默认会返回204
                            callback: data.callback,
                            signature: data.signature
                        };
                        up.setOption({
                            url: data.host,
                            multipart_params: multipartParams
                        });

                        if (iAttrs.onBeforeUpload) {
                            var fn = $parse(iAttrs.onBeforeUpload);
                            fn(scope.$parent, {
                                $file: file
                            });
                        }
                        up.start();

                        scope.files = scope.files || {};
                        scope.files[file.id] = data.host + '/' + multipartParams.key;
                        // http://stackoverflow.com/questions/22864949/ajax-inside-beforeupload-event-plupload
                        file.status = plupload.UPLOADING;
                        
                        up.trigger("UploadFile", file);
                    });
                    return false;
                });

                uploader.bind('FileUploaded', function(up, file, res) {
                    
                    file.url = scope.files[file.id];
                    // 把域名之前的去除之后存储
                    file.path = file.url.replace(/http:\/\/[^/]+\.com/, '');

                    // We are going to make some refactor here.
                    //The idea behind is always update files with the server response value
                    //And also launch the eventi if neeed
                    
                    //If we have the model...
                    if (iAttrs.plFilesModel) {

                        //Apply on scope...
                        scope.$apply(function() {

                            //All files are uploaded?
                            scope.allUploaded = false;
                            if(iAttrs.plFormModel){//为表单添加数据
                                var filePathName = file.name.substring(0,file.name.lastIndexOf("."));
                                var parentName = filePathName.substring(0,filePathName.indexOf("-"));
                                var hasImg =false;
                                angular.forEach(scope.plFormModel, function(val, idx) {
                                    if(val.filePathName == filePathName){
                                        console.log("修改节点"+file.path)
                                        val.filePath = file.path;
                                        hasImg = true;
                                        console.log(scope.plFormModel);
                                    }
                                });
                                if(!hasImg)
                                    scope.plFormModel.push({parentName:parentName,filePathName:filePathName,filePath:file.path})
                                
                            }
                            angular.forEach(scope.plFilesModel, function($file, key) {

                                //Bug FIX, this logic will set allUploaded right
                                if (file.percent != 100) {
                                    scope.allUploaded = false;
                                } else if (file.id == $file.id) { //If the file is the same that we are reciving...
                                    $file.showBar = false;//隐藏进度条
                                    $file.showCheckBox = false;//上传完成的图片不允许删除

                                    //Set response on the file
                                    $file.response = JSON.parse(res.response);
                                    
                                    //Need throw event? throw it
                                    if (iAttrs.onFileUploaded) {
                                        var fn = $parse(iAttrs.onFileUploaded);
                                        fn(scope.$parent, {
                                            $up: up,
                                            $response: res,
                                            $file: file
                                        });
                                    }
                                }

                            });
                        });
                    }
                    //We doesn't have model but we have the event
                    else if (!iAttrs.plFilesModel && iAttrs.onFileUploaded) {
                        var fn = $parse(iAttrs.onFileUploaded);
                        scope.$apply(function() {
                            fn(scope.$parent, {
                                $response: res,
                                $up: up,
                                $file: file
                            });
                        });
                    }
                });

                uploader.bind('UploadProgress', function(up, file) {
                    file.showBar = true;
                    if (!iAttrs.plProgressModel) {
                        return;
                    }

                    if (iAttrs.plFilesModel) {
                        scope.$apply(function() {
                            scope.sum = 0;

                            angular.forEach(scope.plFilesModel, function(file, key) {
                                scope.sum = scope.sum + file.percent;
                            });

                            scope.plProgressModel = scope.sum / scope.plFilesModel.length;
                        });
                    } else {
                        scope.$apply(function() {
                            scope.plProgressModel = file.percent;
                        });
                    }


                    if (iAttrs.onFileProgress) {
                        var fn = $parse(iAttrs.onFileProgress);
                        scope.$apply(function() {
                            fn(scope.$parent, {
                                $file: file
                            });
                        });
                    }
                });

                if (iAttrs.plInstance) {
                    scope.plInstance = uploader;
                }

                scope.$on("$destroy", function() {
                    uploader.destroy();
                });

            }
        };
    }])
