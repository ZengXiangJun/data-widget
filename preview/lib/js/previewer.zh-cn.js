/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3)
	__webpack_require__(4);
	
	__webpack_require__(5);
	var locale = __webpack_require__(6);
	var tpl = __webpack_require__(8);
	var Header = __webpack_require__(28);
	var Navigator = __webpack_require__(35);
	var PageManager = __webpack_require__(38);
	var CopyRight = '©2017 - 2018 Wuyuan Inc.';
	var Home = {
	    init: function(frontSettings) {
	        $('body').html(tpl({
	            locale: locale(),
	            isStandalone: window.isStandalone,
	            footer: frontSettings.footer || {content: CopyRight}
	        }));
	
	        // set icon
	        if (frontSettings.favicon) {
	            $('head').find('link[rel=icon]').attr('href', frontSettings.favicon);
	        }
	        // set background
	        if (frontSettings.backgroundImgUrl) {
	            $('body').css('backgroundImage', 'url("' + frontSettings.backgroundImgUrl + '")');
	            var transparency = (frontSettings.transparency === 0 
	                || frontSettings.transparency  === '' 
	                || typeof frontSettings.transparency === 'undefined')
	                ? 0.2 : frontSettings.transparency;
	            var opacity = 1 - frontSettings.transparency;
	            $('.bg-mask').css('opacity', opacity);
	            $('#header').css('opacity', 0.9);
	            $('#container').css('opacity', 0.9);
	            $('#bottom').css('opacity', 0.9);
	        } else {
	            $('body').css('backgroundImage', 'none');
	            $('.bg-mask').css('opacity', 1);
	            $('#header').css('opacity', 1);
	            $('#container').css('opacity', 1);
	            $('#bottom').css('opacity', 1);
	        }
	        if (!window.isStandalone) {
	            Header.init(frontSettings);
	            Navigator.init(frontSettings, window.menuNodes);
	            // Adjust height
	            $('#container').height($(window).height() - $('#header').height() - 2);
	            $(window).on('resize', function() {
	                $('#container').height($(window).height() - $('#header').height() - 2);
	            });
	        } else {
	            $('body').addClass('standalone');
	        }
	
	        PageManager.init(frontSettings);
	    }
	};
	
	// Home Entry
	$(function() {
	    var queryData = {};
	    location.search.replace(/^\?/, '').split(/&/).map(function(s) {
	        if (!s) {
	            return;
	        }
	        var kv = s.split(/=/);
	        queryData['3-' + kv[0]] = kv[1];
	    });
	    Enhancer.ZUserData.set(queryData);
	
	    var frontSettings = window.frontSettings;
	    if (frontSettings.beforeEntering && frontSettings.beforeEntering.enabled) {
	        var beforeFunc;
	        try {
	            beforeFunc = eval('(' + frontSettings.beforeEntering.funcStr + ')');
	        } catch(e) {
	            console.error(e);
	            return Enhancer.ZMessage.alert( 
	                locale('befSyntaxErr', { message: e.message }) );
	        }
	        try {
	            beforeFunc(Enhancer, function(err) {
	                if (err) {
	                    console.log(err);
	                    return Enhancer.ZMessage.alert(locale('cannotEnter', {message: err.message}));
	                }
	                Home.init(frontSettings);
	            });
	        } catch(e) {
	            console.log(e);
	            return Enhancer.ZMessage.alert(locale('befExError', {message: e.message}));
	        }
	    } else {
	        Home.init(frontSettings);
	    }
	    if (window.isStandalone) {
	        Enhancer.openPage = function(pageId) {
	            var url = location.pathname.replace(/\d+$/, pageId);
	            window.open(url);
	        }
	    } else {
	        Enhancer.openPage = function(pageId, data) {
	            Navigator.openPage.apply(Navigator, arguments);
	        };
	    }
	    
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

	/* Simple JavaScript Inheritance
	 * By John Resig http://ejohn.org/
	 * MIT Licensed.
	 */
	
	// Inspired by base2 and Prototype
	(function(){
	  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	  // The base Class implementation (does nothing)
	  window.Class = function(){};
	  
	  // Create a new Class that inherits from this class
	  Class.extend = function(prop) {
	    var _super = this.prototype;
	    
	    // Instantiate a base class (but only create the instance,
	    // don't run the init constructor)
	    initializing = true;
	    var prototype = new this();
	    initializing = false;
	    
	    // Copy the properties over onto the new prototype
	    for (var name in prop) {
	      // Check if we're overwriting an existing function
	      prototype[name] = typeof prop[name] == "function" && 
	        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
	        (function(name, fn){
	          return function() {
	            var tmp = this._super;
	            
	            // Add a new ._super() method that is the same method
	            // but on the super-class
	            this._super = _super[name];
	            
	            // The method only need to be bound temporarily, so we
	            // remove it when we're done executing
	            var ret = fn.apply(this, arguments);        
	            this._super = tmp;
	            
	            return ret;
	          };
	        })(name, prop[name]) :
	        prop[name];
	    }
	    
	    // The dummy class constructor
	    function Class() {
	      // All construction is actually done in the init method
	      if ( !initializing && this.init )
	        this.init.apply(this, arguments);
	    }
	    
	    // Populate our constructed prototype object
	    Class.prototype = prototype;
	    
	    // Enforce the constructor to be what we expect
	    Class.prototype.constructor = Class;
	
	    // And make this class extendable
	    Class.extend = arguments.callee;
	    
	    return Class;
	  };
	})();


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// jquery.jsonp 2.4.0 (c)2012 Julian Aubourg | MIT License
	// https://github.com/jaubourg/jquery-jsonp
	(function(e){function t(){}function n(e){C=[e]}function r(e,t,n){return e&&e.apply&&e.apply(t.context||t,n)}function i(e){return/\?/.test(e)?"&":"?"}function O(c){function Y(e){z++||(W(),j&&(T[I]={s:[e]}),D&&(e=D.apply(c,[e])),r(O,c,[e,b,c]),r(_,c,[c,b]))}function Z(e){z++||(W(),j&&e!=w&&(T[I]=e),r(M,c,[c,e]),r(_,c,[c,e]))}c=e.extend({},k,c);var O=c.success,M=c.error,_=c.complete,D=c.dataFilter,P=c.callbackParameter,H=c.callback,B=c.cache,j=c.pageCache,F=c.charset,I=c.url,q=c.data,R=c.timeout,U,z=0,W=t,X,V,J,K,Q,G;return S&&S(function(e){e.done(O).fail(M),O=e.resolve,M=e.reject}).promise(c),c.abort=function(){!(z++)&&W()},r(c.beforeSend,c,[c])===!1||z?c:(I=I||u,q=q?typeof q=="string"?q:e.param(q,c.traditional):u,I+=q?i(I)+q:u,P&&(I+=i(I)+encodeURIComponent(P)+"=?"),!B&&!j&&(I+=i(I)+"_"+(new Date).getTime()+"="),I=I.replace(/=\?(&|$)/,"="+H+"$1"),j&&(U=T[I])?U.s?Y(U.s[0]):Z(U):(E[H]=n,K=e(y)[0],K.id=l+N++,F&&(K[o]=F),L&&L.version()<11.6?(Q=e(y)[0]).text="document.getElementById('"+K.id+"')."+p+"()":K[s]=s,A&&(K.htmlFor=K.id,K.event=h),K[d]=K[p]=K[v]=function(e){if(!K[m]||!/i/.test(K[m])){try{K[h]&&K[h]()}catch(t){}e=C,C=0,e?Y(e[0]):Z(a)}},K.src=I,W=function(e){G&&clearTimeout(G),K[v]=K[d]=K[p]=null,x[g](K),Q&&x[g](Q)},x[f](K,J=x.firstChild),Q&&x[f](Q,J),G=R>0&&setTimeout(function(){Z(w)},R)),c)}var s="async",o="charset",u="",a="error",f="insertBefore",l="_jqjsp",c="on",h=c+"click",p=c+a,d=c+"load",v=c+"readystatechange",m="readyState",g="removeChild",y="<script>",b="success",w="timeout",E=window,S=e.Deferred,x=e("head")[0]||document.documentElement,T={},N=0,C,k={callback:l,url:location.href},L=E.opera,A=!!e("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;O.setup=function(t){e.extend(k,t)},e.jsonp=O})(jQuery)

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// LANG is a macro defined in webpack.config.js
	
	var locale = __webpack_require__(7);
	var __lang__ = '__lang__';
	
	module.exports = function (key, options) {
	    if (!key) {
	        return locale;
	    }
	
	    if (__lang__ === key) {
	        return ('zh-cn');
	    }
	
	    options = options || {};
	
	    return locale[key]
	        ? locale[key].replace(/\{\{(\w+)\}\}/g, function(s, $1) {
	            return options[$1];
	        })
	        : (function() {
	            console.warn('Key ' + key + ' is not found in locale');
	            return '<?No Translation>';
	        })();
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = {
	    beforeExit: '确定要退出吗？',
	    logoutFailedMsg: '注销失败，请直接关闭窗口。',
	    newWin: '新窗口',
	    sessionTimeoutTips: '您的会话已过期，需要重新登录。',
	    themeSetting: '选择主题',
	    theme: '换肤',
	    logout: '注销',
	    message: '消息',
	    error: '错误',
	    debugInfo: '调试信息（不会出现在产品中）：',
	    invalidVar: '[Dev Error] 无效的变量名: ',
	    noProfileErr: '[Dev Error] 无法初始化窗口实体，因为没有 profile。',
	    invalidWinNoCheck: '[Dev Error] 待检查窗口编号错误，请检查窗口是否存在。窗口编号：',
	    noValidation: '[Widget Dev Error] 组件无校验结果返回。',
	    callThenTimeout: '[Widget Dev Error] 组件 isValid 方法返回的 promise 对象的 then 方法并没有正确执行或者执行超时。',
	    invalidJump: '[Dev Error] 无法从窗口 {{srcId}} 跳转到 {{tarId}} 因为他们隶属于同一个帧内。',
	    invalidAffect: '[Dev Error] 无法影响到目标窗口或者帧： ',
	    invalidReset: '[Dev Error] 无法重置目标 {{tarId}}。',
	    invalidPop: '[Dev Error] 无法弹出目标： ',
	    invalidPush: '[Dev Error] 无法压回目标：',
	    widgetInitErr: '[Dev Error] 组件 [{{name}}] 未实现或者实现有错误。 实例 ID：{{id}}。',
	    widgetNoIsValidFunc:'[Widget Dev Error] 组件 isValid 函数未实现，无法进行校验。 ',
	    noSrcId: '[Widget Dev Error] 获取数据源数据，必须指定 ID。',
	    invalidSrcId: '[Widget Dev Error] 无效的数据源 ID： ',
	    reRegWidgetErr: '[Widget Dev Error] 无法重复注册组件 {{name}}',
	    lpSyntaxErr: '[Dev Error] 本地处理过程有语法错误： ',
	    lpExeErr: '[Dev Error] 执行本地处理过程时发生错误：',
	    invalidStatic: '[Dev Error] 静态数据不是一个合法的 JSON：',
	    invalidHttpJson: '[Dev Error] Http 返回的数据不是一个合法的 JSON：',
	    invalidExportUrl: '[Dev Error] 无法根据 criteria 参数生成合法的数据导出链接。',
	    customInterfaceErr: '[Dev Error] 请求自定义接口{{name}}发生错误',
	    getServerContextErr: '获取服务器变量值失败。',
	    noWidget: '此窗口没有设置组件',
	    areUsure: '确定要继续吗？',
	    yes: '是',
	    no: '否',
	    invalidCond: '[Dev Error] 无效的条件表达式：{{exp}}',
	    scriptErr: '[Dev Error] 脚本执行错误，原因：',
	    dscallbackErr: '[Dev Error] 请求数据源后，执行回调函数发生错误，打开控制台查看更多细节。',
	    befSyntaxErr: '[Dev Error] 进入系统前函数脚本有语法错误：{{message}}。打开控制台查看更多细节。',
	    cannotEnter: '无法进入系统，因为：{{message}}',
	    befExError: '[Dev Error] 执行进入系统前脚本时发生错误：{{message}}。打开控制台查看更多细节。',
	    close: '关闭',
	    invalidWinNoAff: '[Dev Error] 未找到窗口号：{{wno}}。请检查附加影响窗口号是否正确。触发事件：{{event}}'
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(9);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    return "<div id=\"header\" class=\"ui-widget-content\"></div>";
	},"3":function(container,depth0,helpers,partials,data) {
	    return "<div id=\"navigator\" class=\"ui-state-default\"></div>";
	},"5":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "    	<div id=\"bottom\" class=\"ui-widget-content\">\n			<div id=\"footer-content\">"
	    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.footer : depth0)) != null ? stack1.content : stack1), depth0))
	    + "</div>\n			<div class=\"powered-by ui-state-highlight\">\n	    		Powered by\n	    		<div class=\"logo\" onclick=\"window.open('https://enhancer.io')\">\n	    			 <span></span><c>nhancer 3.1</c>\n	    		</div>\n	    	</div>\n		</div>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});
	
	  return ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.isStandalone : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n<div id=\"container\">\n    "
	    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.isStandalone : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n    <div id=\"page-container\">\n"
	    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.isStandalone : depth0),{"name":"unless","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "    </div>\n</div>\n<div class=\"bg-mask\"></div>";
	},"useData":true});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = __webpack_require__(10)['default'];


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// istanbul ignore next
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	var _handlebarsBase = __webpack_require__(11);
	
	var base = _interopRequireWildcard(_handlebarsBase);
	
	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)
	
	var _handlebarsSafeString = __webpack_require__(25);
	
	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
	
	var _handlebarsException = __webpack_require__(13);
	
	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
	
	var _handlebarsUtils = __webpack_require__(12);
	
	var Utils = _interopRequireWildcard(_handlebarsUtils);
	
	var _handlebarsRuntime = __webpack_require__(26);
	
	var runtime = _interopRequireWildcard(_handlebarsRuntime);
	
	var _handlebarsNoConflict = __webpack_require__(27);
	
	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
	
	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();
	
	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;
	
	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };
	
	  return hb;
	}
	
	var inst = create();
	inst.create = create;
	
	_handlebarsNoConflict2['default'](inst);
	
	inst['default'] = inst;
	
	exports['default'] = inst;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OEJBQXNCLG1CQUFtQjs7SUFBN0IsSUFBSTs7Ozs7b0NBSU8sMEJBQTBCOzs7O21DQUMzQix3QkFBd0I7Ozs7K0JBQ3ZCLG9CQUFvQjs7SUFBL0IsS0FBSzs7aUNBQ1Esc0JBQXNCOztJQUFuQyxPQUFPOztvQ0FFSSwwQkFBMEI7Ozs7O0FBR2pELFNBQVMsTUFBTSxHQUFHO0FBQ2hCLE1BQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRTFDLE9BQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLElBQUUsQ0FBQyxVQUFVLG9DQUFhLENBQUM7QUFDM0IsSUFBRSxDQUFDLFNBQVMsbUNBQVksQ0FBQztBQUN6QixJQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNqQixJQUFFLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDOztBQUU3QyxJQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztBQUNoQixJQUFFLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQzNCLFdBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDbkMsQ0FBQzs7QUFFRixTQUFPLEVBQUUsQ0FBQztDQUNYOztBQUVELElBQUksSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUVyQixrQ0FBVyxJQUFJLENBQUMsQ0FBQzs7QUFFakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQzs7cUJBRVIsSUFBSSIsImZpbGUiOiJoYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBiYXNlIGZyb20gJy4vaGFuZGxlYmFycy9iYXNlJztcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcbmltcG9ydCBTYWZlU3RyaW5nIGZyb20gJy4vaGFuZGxlYmFycy9zYWZlLXN0cmluZyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vaGFuZGxlYmFycy9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9oYW5kbGViYXJzL3V0aWxzJztcbmltcG9ydCAqIGFzIHJ1bnRpbWUgZnJvbSAnLi9oYW5kbGViYXJzL3J1bnRpbWUnO1xuXG5pbXBvcnQgbm9Db25mbGljdCBmcm9tICcuL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QnO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgbGV0IGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IFNhZmVTdHJpbmc7XG4gIGhiLkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcbiAgaGIuVXRpbHMgPSBVdGlscztcbiAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgaGIuVk0gPSBydW50aW1lO1xuICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG5sZXQgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbm5vQ29uZmxpY3QoaW5zdCk7XG5cbmluc3RbJ2RlZmF1bHQnXSA9IGluc3Q7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3Q7XG4iXX0=


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utils = __webpack_require__(12);
	
	var _exception = __webpack_require__(13);
	
	var _exception2 = _interopRequireDefault(_exception);
	
	var _helpers = __webpack_require__(14);
	
	var _decorators = __webpack_require__(22);
	
	var _logger = __webpack_require__(24);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var VERSION = '4.0.11';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 7;
	
	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0'
	};
	
	exports.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';
	
	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};
	
	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}
	
	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,
	
	  logger: _logger2['default'],
	  log: _logger2['default'].log,
	
	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },
	
	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },
	
	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  }
	};
	
	var log = _logger2['default'].log;
	
	exports.log = log;
	exports.createFrame = _utils.createFrame;
	exports.logger = _logger2['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7cUJBQTRDLFNBQVM7O3lCQUMvQixhQUFhOzs7O3VCQUNFLFdBQVc7OzBCQUNSLGNBQWM7O3NCQUNuQyxVQUFVOzs7O0FBRXRCLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQzs7QUFDekIsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7OztBQUU1QixJQUFNLGdCQUFnQixHQUFHO0FBQzlCLEdBQUMsRUFBRSxhQUFhO0FBQ2hCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxVQUFVO0FBQ2IsR0FBQyxFQUFFLGtCQUFrQjtBQUNyQixHQUFDLEVBQUUsaUJBQWlCO0FBQ3BCLEdBQUMsRUFBRSxVQUFVO0NBQ2QsQ0FBQzs7O0FBRUYsSUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUM7O0FBRTlCLFNBQVMscUJBQXFCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7QUFDbkUsTUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQzdCLE1BQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQztBQUMvQixNQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7O0FBRW5DLGtDQUF1QixJQUFJLENBQUMsQ0FBQztBQUM3Qix3Q0FBMEIsSUFBSSxDQUFDLENBQUM7Q0FDakM7O0FBRUQscUJBQXFCLENBQUMsU0FBUyxHQUFHO0FBQ2hDLGFBQVcsRUFBRSxxQkFBcUI7O0FBRWxDLFFBQU0scUJBQVE7QUFDZCxLQUFHLEVBQUUsb0JBQU8sR0FBRzs7QUFFZixnQkFBYyxFQUFFLHdCQUFTLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDakMsUUFBSSxnQkFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO0FBQ3RDLFVBQUksRUFBRSxFQUFFO0FBQUUsY0FBTSwyQkFBYyx5Q0FBeUMsQ0FBQyxDQUFDO09BQUU7QUFDM0Usb0JBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM1QixNQUFNO0FBQ0wsVUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDekI7R0FDRjtBQUNELGtCQUFnQixFQUFFLDBCQUFTLElBQUksRUFBRTtBQUMvQixXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDM0I7O0FBRUQsaUJBQWUsRUFBRSx5QkFBUyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3ZDLFFBQUksZ0JBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxvQkFBTyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdCLE1BQU07QUFDTCxVQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRTtBQUNsQyxjQUFNLHlFQUEwRCxJQUFJLG9CQUFpQixDQUFDO09BQ3ZGO0FBQ0QsVUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7S0FDL0I7R0FDRjtBQUNELG1CQUFpQixFQUFFLDJCQUFTLElBQUksRUFBRTtBQUNoQyxXQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDNUI7O0FBRUQsbUJBQWlCLEVBQUUsMkJBQVMsSUFBSSxFQUFFLEVBQUUsRUFBRTtBQUNwQyxRQUFJLGdCQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7QUFDdEMsVUFBSSxFQUFFLEVBQUU7QUFBRSxjQUFNLDJCQUFjLDRDQUE0QyxDQUFDLENBQUM7T0FBRTtBQUM5RSxvQkFBTyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQy9CLE1BQU07QUFDTCxVQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUM1QjtHQUNGO0FBQ0QscUJBQW1CLEVBQUUsNkJBQVMsSUFBSSxFQUFFO0FBQ2xDLFdBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUM5QjtDQUNGLENBQUM7O0FBRUssSUFBSSxHQUFHLEdBQUcsb0JBQU8sR0FBRyxDQUFDOzs7UUFFcEIsV0FBVztRQUFFLE1BQU0iLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlRnJhbWUsIGV4dGVuZCwgdG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdEhlbHBlcnN9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnN9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSAnNC4wLjExJztcbmV4cG9ydCBjb25zdCBDT01QSUxFUl9SRVZJU0lPTiA9IDc7XG5cbmV4cG9ydCBjb25zdCBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz09IDEueC54JyxcbiAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICA2OiAnPj0gMi4wLjAtYmV0YS4xJyxcbiAgNzogJz49IDQuMC4wJ1xufTtcblxuY29uc3Qgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzLCBkZWNvcmF0b3JzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcbiAgdGhpcy5kZWNvcmF0b3JzID0gZGVjb3JhdG9ycyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuICByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKHRoaXMpO1xufVxuXG5IYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZ2dlci5sb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lLCBwYXJ0aWFsKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKGBBdHRlbXB0aW5nIHRvIHJlZ2lzdGVyIGEgcGFydGlhbCBjYWxsZWQgXCIke25hbWV9XCIgYXMgdW5kZWZpbmVkYCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGRlY29yYXRvcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuZGVjb3JhdG9ycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVjb3JhdG9yc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG4gIH1cbn07XG5cbmV4cG9ydCBsZXQgbG9nID0gbG9nZ2VyLmxvZztcblxuZXhwb3J0IHtjcmVhdGVGcmFtZSwgbG9nZ2VyfTtcbiJdfQ==


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.extend = extend;
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.createFrame = createFrame;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};
	
	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;
	
	function escapeChar(chr) {
	  return escape[chr];
	}
	
	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }
	
	  return obj;
	}
	
	var toString = Object.prototype.toString;
	
	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	exports.isFunction = isFunction;
	
	/* eslint-enable func-style */
	
	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};
	
	exports.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.
	
	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}
	
	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }
	
	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }
	
	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}
	
	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}
	
	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}
	
	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}
	
	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLE1BQU0sR0FBRztBQUNiLEtBQUcsRUFBRSxPQUFPO0FBQ1osS0FBRyxFQUFFLE1BQU07QUFDWCxLQUFHLEVBQUUsTUFBTTtBQUNYLEtBQUcsRUFBRSxRQUFRO0FBQ2IsS0FBRyxFQUFFLFFBQVE7QUFDYixLQUFHLEVBQUUsUUFBUTtBQUNiLEtBQUcsRUFBRSxRQUFRO0NBQ2QsQ0FBQzs7QUFFRixJQUFNLFFBQVEsR0FBRyxZQUFZO0lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUM7O0FBRTdCLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN2QixTQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwQjs7QUFFTSxTQUFTLE1BQU0sQ0FBQyxHQUFHLG9CQUFtQjtBQUMzQyxPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6QyxTQUFLLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM1QixVQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDM0QsV0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUM5QjtLQUNGO0dBQ0Y7O0FBRUQsU0FBTyxHQUFHLENBQUM7Q0FDWjs7QUFFTSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzs7Ozs7O0FBS2hELElBQUksVUFBVSxHQUFHLG9CQUFTLEtBQUssRUFBRTtBQUMvQixTQUFPLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQztDQUNwQyxDQUFDOzs7QUFHRixJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNuQixVQUlNLFVBQVUsR0FKaEIsVUFBVSxHQUFHLFVBQVMsS0FBSyxFQUFFO0FBQzNCLFdBQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssbUJBQW1CLENBQUM7R0FDcEYsQ0FBQztDQUNIO1FBQ08sVUFBVSxHQUFWLFVBQVU7Ozs7O0FBSVgsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxVQUFTLEtBQUssRUFBRTtBQUN0RCxTQUFPLEFBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixHQUFHLEtBQUssQ0FBQztDQUNqRyxDQUFDOzs7OztBQUdLLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDcEMsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRCxRQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDdEIsYUFBTyxDQUFDLENBQUM7S0FDVjtHQUNGO0FBQ0QsU0FBTyxDQUFDLENBQUMsQ0FBQztDQUNYOztBQUdNLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0FBQ3ZDLE1BQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFOztBQUU5QixRQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQzNCLGFBQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3hCLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ3pCLGFBQU8sRUFBRSxDQUFDO0tBQ1gsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2xCLGFBQU8sTUFBTSxHQUFHLEVBQUUsQ0FBQztLQUNwQjs7Ozs7QUFLRCxVQUFNLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQztHQUN0Qjs7QUFFRCxNQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUFFLFdBQU8sTUFBTSxDQUFDO0dBQUU7QUFDOUMsU0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUM3Qzs7QUFFTSxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDN0IsTUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQ3pCLFdBQU8sSUFBSSxDQUFDO0dBQ2IsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUMvQyxXQUFPLElBQUksQ0FBQztHQUNiLE1BQU07QUFDTCxXQUFPLEtBQUssQ0FBQztHQUNkO0NBQ0Y7O0FBRU0sU0FBUyxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQ2xDLE1BQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDL0IsT0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDdkIsU0FBTyxLQUFLLENBQUM7Q0FDZDs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLFNBQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRU0sU0FBUyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFO0FBQ2pELFNBQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBSSxFQUFFLENBQUM7Q0FDcEQiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuIl19


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
	
	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;
	
	    message += ' - ' + line + ':' + column;
	  }
	
	  var tmp = Error.prototype.constructor.call(this, message);
	
	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }
	
	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }
	
	  try {
	    if (loc) {
	      this.lineNumber = line;
	
	      // Work around issue under safari where we can't directly set the column value
	      /* istanbul ignore next */
	      if (Object.defineProperty) {
	        Object.defineProperty(this, 'column', {
	          value: column,
	          enumerable: true
	        });
	      } else {
	        this.column = column;
	      }
	    }
	  } catch (nop) {
	    /* Ignore if the browser is very particular */
	  }
	}
	
	Exception.prototype = new Error();
	
	exports['default'] = Exception;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsSUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFbkcsU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUNoQyxNQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUc7TUFDdEIsSUFBSSxZQUFBO01BQ0osTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLEdBQUcsRUFBRTtBQUNQLFFBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUN0QixVQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRTFCLFdBQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7R0FDeEM7O0FBRUQsTUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7O0FBRzFELE9BQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO0FBQ2hELFFBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDOUM7OztBQUdELE1BQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQzNCLFNBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDMUM7O0FBRUQsTUFBSTtBQUNGLFFBQUksR0FBRyxFQUFFO0FBQ1AsVUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Ozs7QUFJdkIsVUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO0FBQ3pCLGNBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNwQyxlQUFLLEVBQUUsTUFBTTtBQUNiLG9CQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7T0FDSixNQUFNO0FBQ0wsWUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7T0FDdEI7S0FDRjtHQUNGLENBQUMsT0FBTyxHQUFHLEVBQUU7O0dBRWI7Q0FDRjs7QUFFRCxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7O3FCQUVuQixTQUFTIiwiZmlsZSI6ImV4Y2VwdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIGxldCBsb2MgPSBub2RlICYmIG5vZGUubG9jLFxuICAgICAgbGluZSxcbiAgICAgIGNvbHVtbjtcbiAgaWYgKGxvYykge1xuICAgIGxpbmUgPSBsb2Muc3RhcnQubGluZTtcbiAgICBjb2x1bW4gPSBsb2Muc3RhcnQuY29sdW1uO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG4gIH1cblxuICBsZXQgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGxvYykge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcblxuICAgICAgLy8gV29yayBhcm91bmQgaXNzdWUgdW5kZXIgc2FmYXJpIHdoZXJlIHdlIGNhbid0IGRpcmVjdGx5IHNldCB0aGUgY29sdW1uIHZhbHVlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbHVtbicsIHtcbiAgICAgICAgICB2YWx1ZTogY29sdW1uLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKG5vcCkge1xuICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcbiJdfQ==


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.registerDefaultHelpers = registerDefaultHelpers;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _helpersBlockHelperMissing = __webpack_require__(15);
	
	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
	
	var _helpersEach = __webpack_require__(16);
	
	var _helpersEach2 = _interopRequireDefault(_helpersEach);
	
	var _helpersHelperMissing = __webpack_require__(17);
	
	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
	
	var _helpersIf = __webpack_require__(18);
	
	var _helpersIf2 = _interopRequireDefault(_helpersIf);
	
	var _helpersLog = __webpack_require__(19);
	
	var _helpersLog2 = _interopRequireDefault(_helpersLog);
	
	var _helpersLookup = __webpack_require__(20);
	
	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
	
	var _helpersWith = __webpack_require__(21);
	
	var _helpersWith2 = _interopRequireDefault(_helpersWith);
	
	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7eUNBQXVDLGdDQUFnQzs7OzsyQkFDOUMsZ0JBQWdCOzs7O29DQUNQLDBCQUEwQjs7Ozt5QkFDckMsY0FBYzs7OzswQkFDYixlQUFlOzs7OzZCQUNaLGtCQUFrQjs7OzsyQkFDcEIsZ0JBQWdCOzs7O0FBRWxDLFNBQVMsc0JBQXNCLENBQUMsUUFBUSxFQUFFO0FBQy9DLHlDQUEyQixRQUFRLENBQUMsQ0FBQztBQUNyQywyQkFBYSxRQUFRLENBQUMsQ0FBQztBQUN2QixvQ0FBc0IsUUFBUSxDQUFDLENBQUM7QUFDaEMseUJBQVcsUUFBUSxDQUFDLENBQUM7QUFDckIsMEJBQVksUUFBUSxDQUFDLENBQUM7QUFDdEIsNkJBQWUsUUFBUSxDQUFDLENBQUM7QUFDekIsMkJBQWEsUUFBUSxDQUFDLENBQUM7Q0FDeEIiLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVyRWFjaCBmcm9tICcuL2hlbHBlcnMvZWFjaCc7XG5pbXBvcnQgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJJZiBmcm9tICcuL2hlbHBlcnMvaWYnO1xuaW1wb3J0IHJlZ2lzdGVyTG9nIGZyb20gJy4vaGVscGVycy9sb2cnO1xuaW1wb3J0IHJlZ2lzdGVyTG9va3VwIGZyb20gJy4vaGVscGVycy9sb29rdXAnO1xuaW1wb3J0IHJlZ2lzdGVyV2l0aCBmcm9tICcuL2hlbHBlcnMvd2l0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJFYWNoKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJJZihpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb29rdXAoaW5zdGFuY2UpO1xuICByZWdpc3RlcldpdGgoaW5zdGFuY2UpO1xufVxuIl19


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _utils = __webpack_require__(12);
	
	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;
	
	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }
	
	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }
	
	      return fn(context, options);
	    }
	  });
	};
	
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBc0QsVUFBVTs7cUJBRWpELFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3ZFLFFBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPO1FBQ3pCLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7QUFDcEIsYUFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakIsTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUMvQyxhQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QixNQUFNLElBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUMzQixVQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFlBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUNmLGlCQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCOztBQUVELGVBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ2hELE1BQU07QUFDTCxlQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN0QjtLQUNGLE1BQU07QUFDTCxVQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixZQUFJLElBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdFLGVBQU8sR0FBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztPQUN4Qjs7QUFFRCxhQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDN0I7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJibG9jay1oZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utils = __webpack_require__(12);
	
	var _exception = __webpack_require__(13);
	
	var _exception2 = _interopRequireDefault(_exception);
	
	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');
	    }
	
	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;
	
	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }
	
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }
	
	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }
	
	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;
	
	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }
	
	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }
	
	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else {
	        var priorKey = undefined;
	
	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey !== undefined) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }
	
	    if (i === 0) {
	      ret = inverse(this);
	    }
	
	    return ret;
	  });
	};
	
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O3FCQUErRSxVQUFVOzt5QkFDbkUsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixZQUFNLDJCQUFjLDZCQUE2QixDQUFDLENBQUM7S0FDcEQ7O0FBRUQsUUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFDZixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU87UUFDekIsQ0FBQyxHQUFHLENBQUM7UUFDTCxHQUFHLEdBQUcsRUFBRTtRQUNSLElBQUksWUFBQTtRQUNKLFdBQVcsWUFBQSxDQUFDOztBQUVoQixRQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixpQkFBVyxHQUFHLHlCQUFrQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQ2pGOztBQUVELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsVUFBSSxHQUFHLG1CQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQzs7QUFFRCxhQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtBQUN6QyxVQUFJLElBQUksRUFBRTtBQUNSLFlBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUN6QixZQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7O0FBRW5CLFlBQUksV0FBVyxFQUFFO0FBQ2YsY0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO09BQ0Y7O0FBRUQsU0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzdCLFlBQUksRUFBRSxJQUFJO0FBQ1YsbUJBQVcsRUFBRSxtQkFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDL0UsQ0FBQyxDQUFDO0tBQ0o7O0FBRUQsUUFBSSxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQzFDLFVBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNwQixhQUFLLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QyxjQUFJLENBQUMsSUFBSSxPQUFPLEVBQUU7QUFDaEIseUJBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1dBQy9DO1NBQ0Y7T0FDRixNQUFNO0FBQ0wsWUFBSSxRQUFRLFlBQUEsQ0FBQzs7QUFFYixhQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRTtBQUN2QixjQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Ozs7QUFJL0IsZ0JBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQiwyQkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDaEM7QUFDRCxvQkFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLGFBQUMsRUFBRSxDQUFDO1dBQ0w7U0FDRjtBQUNELFlBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQix1QkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RDO09BQ0Y7S0FDRjs7QUFFRCxRQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDWCxTQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JCOztBQUVELFdBQU8sR0FBRyxDQUFDO0dBQ1osQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoiZWFjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cbiJdfQ==


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _exception = __webpack_require__(13);
	
	var _exception2 = _interopRequireDefault(_exception);
	
	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	};
	
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozt5QkFBc0IsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsaUNBQWdDO0FBQ3ZFLFFBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O0FBRTFCLGFBQU8sU0FBUyxDQUFDO0tBQ2xCLE1BQU07O0FBRUwsWUFBTSwyQkFBYyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDdkY7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJoZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbigvKiBbYXJncywgXW9wdGlvbnMgKi8pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHJ1Y3QuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb21lb25lIGlzIGFjdHVhbGx5IHRyeWluZyB0byBjYWxsIHNvbWV0aGluZywgYmxvdyB1cC5cbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ01pc3NpbmcgaGVscGVyOiBcIicgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH0pO1xufVxuIl19


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _utils = __webpack_require__(12);
	
	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }
	
	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });
	
	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });
	};
	
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBa0MsVUFBVTs7cUJBRTdCLFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUMzRCxRQUFJLGtCQUFXLFdBQVcsQ0FBQyxFQUFFO0FBQUUsaUJBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQUU7Ozs7O0FBS3RFLFFBQUksQUFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxJQUFLLGVBQVEsV0FBVyxDQUFDLEVBQUU7QUFDdkUsYUFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCLE1BQU07QUFDTCxhQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7R0FDRixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQy9ELFdBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztHQUN2SCxDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJpZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcbn1cbiJdfQ==


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [undefined],
	        options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }
	
	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;
	
	    instance.log.apply(instance, args);
	  });
	};
	
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsa0NBQWlDO0FBQzlELFFBQUksSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5QyxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0MsVUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6Qjs7QUFFRCxRQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZCxRQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtBQUM5QixXQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO0FBQ3JELFdBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM1QjtBQUNELFFBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7O0FBRWhCLFlBQVEsQ0FBQyxHQUFHLE1BQUEsQ0FBWixRQUFRLEVBQVMsSUFBSSxDQUFDLENBQUM7R0FDeEIsQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKC8qIG1lc3NhZ2UsIG9wdGlvbnMgKi8pIHtcbiAgICBsZXQgYXJncyA9IFt1bmRlZmluZWRdLFxuICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIGxldCBsZXZlbCA9IDE7XG4gICAgaWYgKG9wdGlvbnMuaGFzaC5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuaGFzaC5sZXZlbDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmRhdGEubGV2ZWw7XG4gICAgfVxuICAgIGFyZ3NbMF0gPSBsZXZlbDtcblxuICAgIGluc3RhbmNlLmxvZyguLi4gYXJncyk7XG4gIH0pO1xufVxuIl19


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	};
	
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ3JELFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUMxQixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJsb29rdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG4iXX0=


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _utils = __webpack_require__(12);
	
	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }
	
	    var fn = options.fn;
	
	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }
	
	      return fn(context, {
	        data: data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath])
	      });
	    } else {
	      return options.inverse(this);
	    }
	  });
	};
	
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvd2l0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUErRSxVQUFVOztxQkFFMUUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLENBQUMsZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNyQixVQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3hCLFVBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQy9CLFlBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2hGOztBQUVELGFBQU8sRUFBRSxDQUFDLE9BQU8sRUFBRTtBQUNqQixZQUFJLEVBQUUsSUFBSTtBQUNWLG1CQUFXLEVBQUUsbUJBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7T0FDaEUsQ0FBQyxDQUFDO0tBQ0osTUFBTTtBQUNMLGFBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtHQUNGLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6IndpdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.registerDefaultDecorators = registerDefaultDecorators;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _decoratorsInline = __webpack_require__(23);
	
	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
	
	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Z0NBQTJCLHFCQUFxQjs7OztBQUV6QyxTQUFTLHlCQUF5QixDQUFDLFFBQVEsRUFBRTtBQUNsRCxnQ0FBZSxRQUFRLENBQUMsQ0FBQztDQUMxQiIsImZpbGUiOiJkZWNvcmF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZ2lzdGVySW5saW5lIGZyb20gJy4vZGVjb3JhdG9ycy9pbmxpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyhpbnN0YW5jZSkge1xuICByZWdpc3RlcklubGluZShpbnN0YW5jZSk7XG59XG5cbiJdfQ==


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _utils = __webpack_require__(12);
	
	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }
	
	    props.partials[options.args[0]] = options.fn;
	
	    return ret;
	  });
	};
	
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQXFCLFVBQVU7O3FCQUVoQixVQUFTLFFBQVEsRUFBRTtBQUNoQyxVQUFRLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFVBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQzNFLFFBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ25CLFdBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFNBQUcsR0FBRyxVQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRS9CLFlBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsaUJBQVMsQ0FBQyxRQUFRLEdBQUcsY0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxRCxZQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLGlCQUFTLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUM5QixlQUFPLEdBQUcsQ0FBQztPQUNaLENBQUM7S0FDSDs7QUFFRCxTQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUU3QyxXQUFPLEdBQUcsQ0FBQztHQUNaLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVyRGVjb3JhdG9yKCdpbmxpbmUnLCBmdW5jdGlvbihmbiwgcHJvcHMsIGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIGxldCByZXQgPSBmbjtcbiAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG4gICAgICBwcm9wcy5wYXJ0aWFscyA9IHt9O1xuICAgICAgcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcGFydGlhbHMgc3RhY2sgZnJhbWUgcHJpb3IgdG8gZXhlYy5cbiAgICAgICAgbGV0IG9yaWdpbmFsID0gY29udGFpbmVyLnBhcnRpYWxzO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBleHRlbmQoe30sIG9yaWdpbmFsLCBwcm9wcy5wYXJ0aWFscyk7XG4gICAgICAgIGxldCByZXQgPSBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3JpZ2luYWw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByb3BzLnBhcnRpYWxzW29wdGlvbnMuYXJnc1swXV0gPSBvcHRpb25zLmZuO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG4iXX0=


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _utils = __webpack_require__(12);
	
	var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',
	
	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }
	
	    return level;
	  },
	
	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);
	
	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      if (!console[method]) {
	        // eslint-disable-line no-console
	        method = 'log';
	      }
	
	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }
	
	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  }
	};
	
	exports['default'] = logger;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUFzQixTQUFTOztBQUUvQixJQUFJLE1BQU0sR0FBRztBQUNYLFdBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUM3QyxPQUFLLEVBQUUsTUFBTTs7O0FBR2IsYUFBVyxFQUFFLHFCQUFTLEtBQUssRUFBRTtBQUMzQixRQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUM3QixVQUFJLFFBQVEsR0FBRyxlQUFRLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDOUQsVUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBQ2pCLGFBQUssR0FBRyxRQUFRLENBQUM7T0FDbEIsTUFBTTtBQUNMLGFBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO09BQzdCO0tBQ0Y7O0FBRUQsV0FBTyxLQUFLLENBQUM7R0FDZDs7O0FBR0QsS0FBRyxFQUFFLGFBQVMsS0FBSyxFQUFjO0FBQy9CLFNBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVsQyxRQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUU7QUFDL0UsVUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxVQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztBQUNwQixjQUFNLEdBQUcsS0FBSyxDQUFDO09BQ2hCOzt3Q0FQbUIsT0FBTztBQUFQLGVBQU87OztBQVEzQixhQUFPLENBQUMsTUFBTSxPQUFDLENBQWYsT0FBTyxFQUFZLE9BQU8sQ0FBQyxDQUFDO0tBQzdCO0dBQ0Y7Q0FDRixDQUFDOztxQkFFYSxNQUFNIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5kZXhPZn0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSxcbiAgbGV2ZWw6ICdpbmZvJyxcblxuICAvLyBNYXBzIGEgZ2l2ZW4gbGV2ZWwgdmFsdWUgdG8gdGhlIGBtZXRob2RNYXBgIGluZGV4ZXMgYWJvdmUuXG4gIGxvb2t1cExldmVsOiBmdW5jdGlvbihsZXZlbCkge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbGV2ZWxNYXAgPSBpbmRleE9mKGxvZ2dlci5tZXRob2RNYXAsIGxldmVsLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKGxldmVsTWFwID49IDApIHtcbiAgICAgICAgbGV2ZWwgPSBsZXZlbE1hcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldmVsID0gcGFyc2VJbnQobGV2ZWwsIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH0sXG5cbiAgLy8gQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgLi4ubWVzc2FnZSkge1xuICAgIGxldmVsID0gbG9nZ2VyLmxvb2t1cExldmVsKGxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxvb2t1cExldmVsKGxvZ2dlci5sZXZlbCkgPD0gbGV2ZWwpIHtcbiAgICAgIGxldCBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgIGlmICghY29uc29sZVttZXRob2RdKSB7ICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIG1ldGhvZCA9ICdsb2cnO1xuICAgICAgfVxuICAgICAgY29uc29sZVttZXRob2RdKC4uLm1lc3NhZ2UpOyAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiJdfQ==


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	// Build out our basic SafeString type
	'use strict';
	
	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;
	}
	
	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};
	
	exports['default'] = SafeString;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDMUIsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Q0FDdEI7O0FBRUQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUN2RSxTQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQ3pCLENBQUM7O3FCQUVhLFVBQVUiLCJmaWxlIjoic2FmZS1zdHJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2FmZVN0cmluZztcbiJdfQ==


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// istanbul ignore next
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	var _utils = __webpack_require__(12);
	
	var Utils = _interopRequireWildcard(_utils);
	
	var _exception = __webpack_require__(13);
	
	var _exception2 = _interopRequireDefault(_exception);
	
	var _base = __webpack_require__(11);
	
	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;
	
	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}
	
	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }
	
	  templateSpec.main.decorator = templateSpec.main_d;
	
	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);
	
	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }
	
	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);
	
	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }
	
	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }
	
	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },
	
	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,
	
	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },
	
	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },
	
	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;
	
	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }
	
	      return obj;
	    },
	    // An empty object to use as replacement for null-contexts
	    nullContext: Object.seal({}),
	
	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };
	
	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var data = options.data;
	
	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }
	
	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }
	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }
	  ret.isTop = true;
	
	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);
	
	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = container.merge(options.decorators, env.decorators);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	    }
	  };
	
	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');
	    }
	
	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}
	
	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var currentDepths = depths;
	    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
	      currentDepths = [context].concat(depths);
	    }
	
	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }
	
	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);
	
	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}
	
	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}
	
	function invokePartial(partial, context, options) {
	  // Use the current closure context to save the partial-block if this partial
	  var currentPartialBlock = options.data && options.data['partial-block'];
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }
	
	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    (function () {
	      options.data = _base.createFrame(options.data);
	      // Wrapper function to get access to currentPartialBlock from the closure
	      var fn = options.fn;
	      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        // Restore the partial-block from the closure for the execution of the block
	        // i.e. the part inside the block of the partial call.
	        options.data = _base.createFrame(options.data);
	        options.data['partial-block'] = currentPartialBlock;
	        return fn(context, options);
	      };
	      if (fn.partials) {
	        options.partials = Utils.extend({}, options.partials, fn.partials);
	      }
	    })();
	  }
	
	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }
	
	  if (partial === undefined) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}
	
	function noop() {
	  return '';
	}
	
	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}
	
	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQXVCLFNBQVM7O0lBQXBCLEtBQUs7O3lCQUNLLGFBQWE7Ozs7b0JBQzhCLFFBQVE7O0FBRWxFLFNBQVMsYUFBYSxDQUFDLFlBQVksRUFBRTtBQUMxQyxNQUFNLGdCQUFnQixHQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztNQUN2RCxlQUFlLDBCQUFvQixDQUFDOztBQUUxQyxNQUFJLGdCQUFnQixLQUFLLGVBQWUsRUFBRTtBQUN4QyxRQUFJLGdCQUFnQixHQUFHLGVBQWUsRUFBRTtBQUN0QyxVQUFNLGVBQWUsR0FBRyx1QkFBaUIsZUFBZSxDQUFDO1VBQ25ELGdCQUFnQixHQUFHLHVCQUFpQixnQkFBZ0IsQ0FBQyxDQUFDO0FBQzVELFlBQU0sMkJBQWMseUZBQXlGLEdBQ3ZHLHFEQUFxRCxHQUFHLGVBQWUsR0FBRyxtREFBbUQsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNoSyxNQUFNOztBQUVMLFlBQU0sMkJBQWMsd0ZBQXdGLEdBQ3RHLGlEQUFpRCxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNuRjtHQUNGO0NBQ0Y7O0FBRU0sU0FBUyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTs7QUFFMUMsTUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNSLFVBQU0sMkJBQWMsbUNBQW1DLENBQUMsQ0FBQztHQUMxRDtBQUNELE1BQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO0FBQ3ZDLFVBQU0sMkJBQWMsMkJBQTJCLEdBQUcsT0FBTyxZQUFZLENBQUMsQ0FBQztHQUN4RTs7QUFFRCxjQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDOzs7O0FBSWxELEtBQUcs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QUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUYsU0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDM0I7QUFDRCxTQUFPLElBQUksQ0FBQztDQUNiIiwiZmlsZSI6InJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgQ09NUElMRVJfUkVWSVNJT04sIFJFVklTSU9OX0NIQU5HRVMsIGNyZWF0ZUZyYW1lIH0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gIGNvbnN0IGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICAgIGN1cnJlbnRSZXZpc2lvbiA9IENPTVBJTEVSX1JFVklTSU9OO1xuXG4gIGlmIChjb21waWxlclJldmlzaW9uICE9PSBjdXJyZW50UmV2aXNpb24pIHtcbiAgICBpZiAoY29tcGlsZXJSZXZpc2lvbiA8IGN1cnJlbnRSZXZpc2lvbikge1xuICAgICAgY29uc3QgcnVudGltZVZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhbiBvbGRlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgcnVudGltZVZlcnNpb25zICsgJykgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uICgnICsgY29tcGlsZXJWZXJzaW9ucyArICcpLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgY29tcGlsZXJJbmZvWzFdICsgJykuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMsIGVudikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoIWVudikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ05vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZScpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1Vua25vd24gdGVtcGxhdGUgb2JqZWN0OiAnICsgdHlwZW9mIHRlbXBsYXRlU3BlYyk7XG4gIH1cblxuICB0ZW1wbGF0ZVNwZWMubWFpbi5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWMubWFpbl9kO1xuXG4gIC8vIE5vdGU6IFVzaW5nIGVudi5WTSByZWZlcmVuY2VzIHJhdGhlciB0aGFuIGxvY2FsIHZhciByZWZlcmVuY2VzIHRocm91Z2hvdXQgdGhpcyBzZWN0aW9uIHRvIGFsbG93XG4gIC8vIGZvciBleHRlcm5hbCB1c2VycyB0byBvdmVycmlkZSB0aGVzZSBhcyBwc3VlZG8tc3VwcG9ydGVkIEFQSXMuXG4gIGVudi5WTS5jaGVja1JldmlzaW9uKHRlbXBsYXRlU3BlYy5jb21waWxlcik7XG5cbiAgZnVuY3Rpb24gaW52b2tlUGFydGlhbFdyYXBwZXIocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAgIGNvbnRleHQgPSBVdGlscy5leHRlbmQoe30sIGNvbnRleHQsIG9wdGlvbnMuaGFzaCk7XG4gICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgb3B0aW9ucy5pZHNbMF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhcnRpYWwgPSBlbnYuVk0ucmVzb2x2ZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcbiAgICBsZXQgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcblxuICAgIGlmIChyZXN1bHQgPT0gbnVsbCAmJiBlbnYuY29tcGlsZSkge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdID0gZW52LmNvbXBpbGUocGFydGlhbCwgdGVtcGxhdGVTcGVjLmNvbXBpbGVyT3B0aW9ucywgZW52KTtcbiAgICAgIHJlc3VsdCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXShjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBpZiAob3B0aW9ucy5pbmRlbnQpIHtcbiAgICAgICAgbGV0IGxpbmVzID0gcmVzdWx0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpZiAoIWxpbmVzW2ldICYmIGkgKyAxID09PSBsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaW5lc1tpXSA9IG9wdGlvbnMuaW5kZW50ICsgbGluZXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgbGV0IGNvbnRhaW5lciA9IHtcbiAgICBzdHJpY3Q6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgaWYgKCEobmFtZSBpbiBvYmopKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1wiJyArIG5hbWUgKyAnXCIgbm90IGRlZmluZWQgaW4gJyArIG9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgIH0sXG4gICAgbG9va3VwOiBmdW5jdGlvbihkZXB0aHMsIG5hbWUpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY3VycmVudCA9PT0gJ2Z1bmN0aW9uJyA/IGN1cnJlbnQuY2FsbChjb250ZXh0KSA6IGN1cnJlbnQ7XG4gICAgfSxcblxuICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG5cbiAgICBmbjogZnVuY3Rpb24oaSkge1xuICAgICAgbGV0IHJldCA9IHRlbXBsYXRlU3BlY1tpXTtcbiAgICAgIHJldC5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWNbaSArICdfZCddO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgcHJvZ3JhbXM6IFtdLFxuICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICAgIGxldCBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0sXG4gICAgICAgICAgZm4gPSB0aGlzLmZuKGkpO1xuICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzIHx8IGJsb2NrUGFyYW1zIHx8IGRlY2xhcmVkQmxvY2tQYXJhbXMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uKHZhbHVlLCBkZXB0aCkge1xuICAgICAgd2hpbGUgKHZhbHVlICYmIGRlcHRoLS0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5fcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgIGxldCBvYmogPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgKHBhcmFtICE9PSBjb21tb24pKSB7XG4gICAgICAgIG9iaiA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICAvLyBBbiBlbXB0eSBvYmplY3QgdG8gdXNlIGFzIHJlcGxhY2VtZW50IGZvciBudWxsLWNvbnRleHRzXG4gICAgbnVsbENvbnRleHQ6IE9iamVjdC5zZWFsKHt9KSxcblxuICAgIG5vb3A6IGVudi5WTS5ub29wLFxuICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG4gIH07XG5cbiAgZnVuY3Rpb24gcmV0KGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuXG4gICAgcmV0Ll9zZXR1cChvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCAmJiB0ZW1wbGF0ZVNwZWMudXNlRGF0YSkge1xuICAgICAgZGF0YSA9IGluaXREYXRhKGNvbnRleHQsIGRhdGEpO1xuICAgIH1cbiAgICBsZXQgZGVwdGhzLFxuICAgICAgICBibG9ja1BhcmFtcyA9IHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyA/IFtdIDogdW5kZWZpbmVkO1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzKSB7XG4gICAgICBpZiAob3B0aW9ucy5kZXB0aHMpIHtcbiAgICAgICAgZGVwdGhzID0gY29udGV4dCAhPSBvcHRpb25zLmRlcHRoc1swXSA/IFtjb250ZXh0XS5jb25jYXQob3B0aW9ucy5kZXB0aHMpIDogb3B0aW9ucy5kZXB0aHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXB0aHMgPSBbY29udGV4dF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpbihjb250ZXh0LyosIG9wdGlvbnMqLykge1xuICAgICAgcmV0dXJuICcnICsgdGVtcGxhdGVTcGVjLm1haW4oY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICB9XG4gICAgbWFpbiA9IGV4ZWN1dGVEZWNvcmF0b3JzKHRlbXBsYXRlU3BlYy5tYWluLCBtYWluLCBjb250YWluZXIsIG9wdGlvbnMuZGVwdGhzIHx8IFtdLCBkYXRhLCBibG9ja1BhcmFtcyk7XG4gICAgcmV0dXJuIG1haW4oY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0LmlzVG9wID0gdHJ1ZTtcblxuICByZXQuX3NldHVwID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsKSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmhlbHBlcnMsIGVudi5oZWxwZXJzKTtcblxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsKSB7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLnBhcnRpYWxzLCBlbnYucGFydGlhbHMpO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsIHx8IHRlbXBsYXRlU3BlYy51c2VEZWNvcmF0b3JzKSB7XG4gICAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuZGVjb3JhdG9ycywgZW52LmRlY29yYXRvcnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IG9wdGlvbnMuaGVscGVycztcbiAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9wdGlvbnMucGFydGlhbHM7XG4gICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IG9wdGlvbnMuZGVjb3JhdG9ycztcbiAgICB9XG4gIH07XG5cbiAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uKGksIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zICYmICFibG9ja1BhcmFtcykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIGJsb2NrIHBhcmFtcycpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocyAmJiAhZGVwdGhzKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgcGFyZW50IGRlcHRocycpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIHRlbXBsYXRlU3BlY1tpXSwgZGF0YSwgMCwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gIH07XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gIGZ1bmN0aW9uIHByb2coY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGN1cnJlbnREZXB0aHMgPSBkZXB0aHM7XG4gICAgaWYgKGRlcHRocyAmJiBjb250ZXh0ICE9IGRlcHRoc1swXSAmJiAhKGNvbnRleHQgPT09IGNvbnRhaW5lci5udWxsQ29udGV4dCAmJiBkZXB0aHNbMF0gPT09IG51bGwpKSB7XG4gICAgICBjdXJyZW50RGVwdGhzID0gW2NvbnRleHRdLmNvbmNhdChkZXB0aHMpO1xuICAgIH1cblxuICAgIHJldHVybiBmbihjb250YWluZXIsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsXG4gICAgICAgIG9wdGlvbnMuZGF0YSB8fCBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtcyAmJiBbb3B0aW9ucy5ibG9ja1BhcmFtc10uY29uY2F0KGJsb2NrUGFyYW1zKSxcbiAgICAgICAgY3VycmVudERlcHRocyk7XG4gIH1cblxuICBwcm9nID0gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcyk7XG5cbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IGRlcHRocyA/IGRlcHRocy5sZW5ndGggOiAwO1xuICBwcm9nLmJsb2NrUGFyYW1zID0gZGVjbGFyZWRCbG9ja1BhcmFtcyB8fCAwO1xuICByZXR1cm4gcHJvZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgaWYgKCFwYXJ0aWFsKSB7XG4gICAgaWYgKG9wdGlvbnMubmFtZSA9PT0gJ0BwYXJ0aWFsLWJsb2NrJykge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdO1xuICAgIH1cbiAgfSBlbHNlIGlmICghcGFydGlhbC5jYWxsICYmICFvcHRpb25zLm5hbWUpIHtcbiAgICAvLyBUaGlzIGlzIGEgZHluYW1pYyBwYXJ0aWFsIHRoYXQgcmV0dXJuZWQgYSBzdHJpbmdcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJ0aWFsO1xuICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW3BhcnRpYWxdO1xuICB9XG4gIHJldHVybiBwYXJ0aWFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIC8vIFVzZSB0aGUgY3VycmVudCBjbG9zdXJlIGNvbnRleHQgdG8gc2F2ZSB0aGUgcGFydGlhbC1ibG9jayBpZiB0aGlzIHBhcnRpYWxcbiAgY29uc3QgY3VycmVudFBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgb3B0aW9ucy5wYXJ0aWFsID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoID0gb3B0aW9ucy5pZHNbMF0gfHwgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoO1xuICB9XG5cbiAgbGV0IHBhcnRpYWxCbG9jaztcbiAgaWYgKG9wdGlvbnMuZm4gJiYgb3B0aW9ucy5mbiAhPT0gbm9vcCkge1xuICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgLy8gV3JhcHBlciBmdW5jdGlvbiB0byBnZXQgYWNjZXNzIHRvIGN1cnJlbnRQYXJ0aWFsQmxvY2sgZnJvbSB0aGUgY2xvc3VyZVxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG4gICAgcGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBmdW5jdGlvbiBwYXJ0aWFsQmxvY2tXcmFwcGVyKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAvLyBSZXN0b3JlIHRoZSBwYXJ0aWFsLWJsb2NrIGZyb20gdGhlIGNsb3N1cmUgZm9yIHRoZSBleGVjdXRpb24gb2YgdGhlIGJsb2NrXG4gICAgICAvLyBpLmUuIHRoZSBwYXJ0IGluc2lkZSB0aGUgYmxvY2sgb2YgdGhlIHBhcnRpYWwgY2FsbC5cbiAgICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGN1cnJlbnRQYXJ0aWFsQmxvY2s7XG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBpZiAoZm4ucGFydGlhbHMpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHMgPSBVdGlscy5leHRlbmQoe30sIG9wdGlvbnMucGFydGlhbHMsIGZuLnBhcnRpYWxzKTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkICYmIHBhcnRpYWxCbG9jaykge1xuICAgIHBhcnRpYWwgPSBwYXJ0aWFsQmxvY2s7XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gIH0gZWxzZSBpZiAocGFydGlhbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHBhcnRpYWwoY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7IHJldHVybiAnJzsgfVxuXG5mdW5jdGlvbiBpbml0RGF0YShjb250ZXh0LCBkYXRhKSB7XG4gIGlmICghZGF0YSB8fCAhKCdyb290JyBpbiBkYXRhKSkge1xuICAgIGRhdGEgPSBkYXRhID8gY3JlYXRlRnJhbWUoZGF0YSkgOiB7fTtcbiAgICBkYXRhLnJvb3QgPSBjb250ZXh0O1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKSB7XG4gIGlmIChmbi5kZWNvcmF0b3IpIHtcbiAgICBsZXQgcHJvcHMgPSB7fTtcbiAgICBwcm9nID0gZm4uZGVjb3JhdG9yKHByb2csIHByb3BzLCBjb250YWluZXIsIGRlcHRocyAmJiBkZXB0aHNbMF0sIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIFV0aWxzLmV4dGVuZChwcm9nLCBwcm9wcyk7XG4gIH1cbiAgcmV0dXJuIHByb2c7XG59XG4iXX0=


/***/ }),
/* 27 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';
	
	exports.__esModule = true;
	
	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
	};
	
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUNlLFVBQVMsVUFBVSxFQUFFOztBQUVsQyxNQUFJLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLE1BQU07TUFDdEQsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRWxDLFlBQVUsQ0FBQyxVQUFVLEdBQUcsWUFBVztBQUNqQyxRQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO0FBQ2xDLFVBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0tBQy9CO0FBQ0QsV0FBTyxVQUFVLENBQUM7R0FDbkIsQ0FBQztDQUNIIiwiZmlsZSI6Im5vLWNvbmZsaWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oSGFuZGxlYmFycykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBsZXQgcm9vdCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93LFxuICAgICAgJEhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnM7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEhhbmRsZWJhcnMubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LkhhbmRsZWJhcnMgPT09IEhhbmRsZWJhcnMpIHtcbiAgICAgIHJvb3QuSGFuZGxlYmFycyA9ICRIYW5kbGViYXJzO1xuICAgIH1cbiAgICByZXR1cm4gSGFuZGxlYmFycztcbiAgfTtcbn1cbiJdfQ==
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(29);
	var tpl = __webpack_require__(30);
	var locale = __webpack_require__(6);
	var themeSelector = __webpack_require__(31);
	
	module.exports = {
	    init: function(frontSettings) {
	        this.__settings = frontSettings.header || {};
	        var ZUserData = Enhancer.ZUserData;
	        $('#header').html(tpl({
	            locale: locale(),
	            projectTitle: frontSettings.projectTitle,
	            themeSwitchable: frontSettings.themeSwitchable,
	            userInfo: {
	                name: ZUserData.get('1-USER_NAME') || ZUserData.get('1-USER_ID'),
	                roles: ZUserData.get('1-ROLES')
	            }
	        }));
	        var headHeight = (this.__settings.height || 46) + 'px';
	        $('#header').css({
	            height: headHeight,
	            lineHeight: headHeight
	        });
	
	        if (frontSettings.logoUrl) {
	            $('#header a.menu-button').hide();
	            $('#header .logo').attr('src', frontSettings.logoUrl)
	                .show()
	        }
	        
	        $('#header .project-title').css({
	            fontSize: (this.__settings.projectTitleFontSize || '16') + 'px',
	            fontWeight: this.__settings.projectTitleFontWeight || 'bold'
	        });
	
	        if (this.__settings.backgroundImgUrl) {
	            $('#header').css({
	                backgroundImage: 'url("' 
	                    + this.__settings.backgroundImgUrl
	                    + '?t=' + new Date().getTime()
	                    + '")',
	                backgroundSize: '100% 100%'
	            });
	        }
	
	        $('#header').tooltip();
	        this.__bindEvent();
	    },
	    __bindEvent: function() {
	        $('#header a.menu-button').on('click', function() {
	            
	        });
	
	        $('#header span.theme').on('click', function() {
	            themeSelector.open();
	        });
	    }
	};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(9);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "    <span class=\"theme\"><i class=\"fas fa-paint-brush\"></i>"
	    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.locale : depth0)) != null ? stack1.theme : stack1), depth0))
	    + "</span>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda;
	
	  return "<a class=\"menu-button\">\n    <span class=\"pref\"></span>\n</a>\n<img class=\"logo\" src=\"\">\n<a class=\"project-title\">\n"
	    + alias2(((helper = (helper = helpers.projectTitle || (depth0 != null ? depth0.projectTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"projectTitle","hash":{},"data":data}) : helper)))
	    + "\n</a>\n<div class=\"path\"></div>\n<div class=\"toolbar ui-widget-content\">\n    <span class=\"logout\"><i class=\"fas fa-sign-out-alt\"></i>"
	    + alias2(alias3(((stack1 = (depth0 != null ? depth0.locale : depth0)) != null ? stack1.logout : stack1), depth0))
	    + "</span>\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.themeSwitchable : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</div>\n<a class=\"user-info\" title=\""
	    + alias2(alias3(((stack1 = (depth0 != null ? depth0.userInfo : depth0)) != null ? stack1.roles : stack1), depth0))
	    + "\">\n    <span class=\"user-name\">\n        <i class=\"fa fa-user\"></i>\n        <label>\n            "
	    + alias2(alias3(((stack1 = (depth0 != null ? depth0.userInfo : depth0)) != null ? stack1.name : stack1), depth0))
	    + "\n        </label>\n    </span>\n</a>";
	},"useData":true});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	var locale = __webpack_require__(6);
	var tpl = __webpack_require__(34);
	
	module.exports = {
	    init: function() {
	        this.$selector = $(tpl({
	            locale: locale()
	        })).dialog({
	            width: 720,
	            height: 530,
	            modal: true,
	            buttons:[{
	                text: locale('close'),
	                click: function() {
	                    $(this).dialog('close');
	                }
	            }]
	        });
	        this.$selector.parent().find('.ui-dialog-titlebar').remove();
	        var theme = this.getThemeName();
	        this.$selector.find('.theme-list li[themename='+theme+']').addClass('ui-state-highlight');
	        this.__bindEvent();
	    },
	
	    __bindEvent: function() {
	        var that = this;
	        this.$selector.find('li').on('click', function() {
	            var themeName = $(this).attr('themename');
	            var $theme = $('#theme');
	            var lastThemeName = $theme.attr('themename');
	            if (lastThemeName === themeName) {
	                return;
	            }
	            that.$selector.find('li.ui-state-highlight')
	                .removeClass('ui-state-highlight');
	            var href = $theme.attr('href').replace(lastThemeName, themeName);
	            $theme.attr('href', href)
	                .attr('themename', themeName);
	            $(this).addClass('ui-state-highlight');
	            $.cookie('theme' + (window.projectId || ''), themeName);
	            $('body').attr('theme', themeName);
	        });
	    },
	    open: function() {
	        if (!this.$selector) {
	            this.init();
	        }
	        this.$selector.dialog('open');
	    },
	    close: function() {
	        $('#page-container > #theme-selector').hide();
	    },
	    getThemeName: function() {
	        return $('body').attr('theme');
	    }
	}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(9);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return "<div id=\"theme-selector\">\n	<div class=\"header\">\n		<i class=\"fa fa-paint-brush\"></i>\n		<span>"
	    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.locale : depth0)) != null ? stack1.themeSetting : stack1), depth0))
	    + "</span>\n	</div>\n	<ul class=\"theme-list\">\n		<li class=\"ui-corner-all\" themename=\"redmond\"></li>\n		<li class=\"ui-corner-all\" themename=\"trontastic\"></li>\n		<li class=\"ui-corner-all\" themename=\"ui-darkness\"></li>\n		<li class=\"ui-corner-all\" themename=\"start\"></li>\n		<li class=\"ui-corner-all\" themename=\"mint-choc\"></li>\n		<li class=\"ui-corner-all\" themename=\"blitzer\"></li>\n		<li class=\"ui-corner-all\" themename=\"base\"></li>\n		<li class=\"ui-corner-all\" themename=\"vader\"></li>\n		<li class=\"ui-corner-all\" themename=\"black-tie\"></li>\n		<li class=\"ui-corner-all\" themename=\"sunny\"></li>\n		<li class=\"ui-corner-all\" themename=\"overcast\"></li>\n		<li class=\"ui-corner-all\" themename=\"dot-luv\"></li>\n		<li class=\"ui-corner-all\" themename=\"pepper-grinder\"></li>\n		<li class=\"ui-corner-all\" themename=\"swanky-purse\"></li>\n		<li class=\"ui-corner-all\" themename=\"ui-lightness\"></li>\n		<li class=\"ui-corner-all\" themename=\"south-street\"></li>\n		<li class=\"ui-corner-all\" themename=\"le-frog\"></li>\n		<li class=\"ui-corner-all\" themename=\"dark-hive\"></li>\n		<li class=\"ui-corner-all\" themename=\"humanity\"></li>\n		<li class=\"ui-corner-all\" themename=\"hot-sneaks\"></li>\n		<li class=\"ui-corner-all\" themename=\"flick\"></li>\n		<li class=\"ui-corner-all\" themename=\"excite-bike\"></li>\n		<li class=\"ui-corner-all\" themename=\"eggplant\"></li>\n		<li class=\"ui-corner-all\" themename=\"cupertino\"></li>\n	</ul>\n</div>";
	},"useData":true});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(36);
	var handle = __webpack_require__(37);
	var Navigator = {
	    init: function(frontSettings, menuNodeList) {
	        var that = this;
	        var nodes = this.__transferListToForest(menuNodeList);
	        that.__settings = frontSettings.navigator || {};
	
	        var width = that.__settings.width || 220;
	        $('#navigator').width(width)
	            .css('max-width', width);
	
	        var itemHeight = parseInt(that.__settings.fontSize || '14')
	            + parseInt(that.__settings.vSpacing || '12');
	
	        that.$handle = $(handle()).appendTo($('#container'))
	                        .css('left', width - 13);
	
	        if (that.__settings.expandToggle) {
	            that.$toggle = $('<div id="nav-toggle"></div>')
	                .addClass('ui-state-active fas fa-expand')
	                .css({
	                    top: (itemHeight / 2 - 7) + 'px'
	                })
	                .appendTo($('#navigator'));
	        }
	
	        function generateTree(node, level) {
	            if ( !node ) return false;
	            if (node.hidden === 'Y') {
	                return;
	            }
	            var $li = $('<li>');
	            var $a = $('<a>')
	                        .append('<i class="' + node.icon + '"></i>')
	                        .append($('<label>').text(node.node_name))
	                        .css('padding-left', (24 + (22*level)) + 'px')
	                        .hover(function() {
	                            $(this).addClass('ui-state-hover');
	                        }, function() {
	                            $(this).removeClass('ui-state-hover');
	                        });
	
	            $li.attr('navTo', node.id)
	               .attr('isLeaf', node.is_leaf);
	
	            $li.append($a);
	
	            if (that.__settings.itemBorder === 'none') {
	                $li.css('border', 'none');
	            }
	            if ( node.is_leaf === 'N' ) {
	                var $ul = $('<ul>');
	                for ( var i in node.children ) {
	                    var $subli = generateTree( node.children[i], level+1 );
	                    $ul.append($subli ? $subli : null);
	                }
	                $a.click(function(e) {
	                    var $sub = $(this).next();
	                    var $icon = $(this).find('span.fas');
	                    if ($sub.is(':visible')) {
	                        if ($icon.size() > 0) {
	                            $icon.removeClass('fa-angle-down')
	                                .addClass('fa-angle-left');
	                        }
	                        $sub.hide('blind');
	                    } else {
	                        if ( $icon.size() > 0 ) {
	                            $icon.removeClass( 'fa-angle-left' )
	                                .addClass( 'fa-angle-down' );
	                        }
	                        $sub.show('blind');
	                    }
	                }).append( $('<span class="fas fa-angle-left">') )
	                  // .find('i.fa').addClass('ui-state-default');
	                return $li.append( $ul );
	            } else {
	                $a.attr( 'id', 'menu-node-' + node.page_id )
	                    .attr( 'navTo', node.page_id )
	                    .click( function( e ) {
	                        that.__pushPageStateForNode($(this));
	                        Enhancer.ZPageManager.openPage( $(this).attr('navTo') );
	                    } );
	            }
	            return $li;
	        }
	
	        var $ul = $( '<ul>' ).addClass('menu').addClass('root')
	            .appendTo( $('#navigator') );
	
	        for ( var i in nodes ) {
	            var $li = generateTree( nodes[i], 0 );
	            // $li.addClass( 'ui-widget-content' );
	            $ul.append( $li );
	        }
	        that.$menuTree = $ul;
	
	        that.$menuTree
	            .width(that.__settings.width || 220)
	            .find('a')
	            .css({
	                fontSize: (that.__settings.fontSize || '14') + 'px',
	                lineHeight: itemHeight + 'px',
	                height: itemHeight + 'px'
	            })
	            .find('span.fa-angle-left')
	            .css({
	                margin: parseInt(that.__settings.vSpacing || '12') / 2 + 'px'
	            });
	        
	        setTimeout(function() {
	            // Open page specified in hash or open home page.
	            var pageId = (location.hash.match(/^#(\d+)/) || [])[1]
	            if (pageId) {
	                that.openPage(pageId);
	            } else {
	                homePageNum = (frontSettings.homePage || {}).homePageNum;
	                if (homePageNum) {
	                    that.openPage(homePageNum);
	                }
	            }
	
	            // Expand all initially
	            if (that.__settings.expandAll) {
	                if (that.$toggle) {
	                    that.$toggle.click();
	                } else {
	                    that.expandAll(true);
	                }
	            }
	            var match = window.location.href.match(/[&?]id=([^&]+)/);
	            var id = match ? match[1] : 2;
	            $('.menu li[isleaf=Y] a[navto=' + id + ']').click();
	        }, 1);
	
	        this.__bindEvent();
	    },
	    __bindEvent: function() {
	        var that = this;
	        $(window).on('hashchange', function() {
	            var pageId = (location.hash.match(/^#(\d+)/) || [])[1]
	            that.openPage(pageId);
	        });
	        if (that.__settings.expandToggle) {
	            that.$toggle.on('click', function() {
	                if ($(this).hasClass('fa-expand')) {
	                    that.expandAll(true);
	                    $(this).removeClass('fa-expand').addClass('fa-compress');
	                } else {
	                    that.expandAll(false);
	                    $(this).removeClass('fa-compress').addClass('fa-expand');
	                }
	            });
	        }
	        that.$handle.on('click', function() {
	            var $nav = $('#navigator');
	            var $con = $('#page-container');
	            var min = 0;
	            var max = parseInt($nav.css('max-width').replace('px', ''));
	            var $handle = $(this);
	            if (!$nav.hasClass('closed')) {
	                $handle.hide()
	                    .removeClass('close')
	                    .addClass('open')
	                    .find('i.fas')
	                    .removeClass('fa-angle-double-left')
	                    .addClass('fa-angle-double-right');
	
	                $nav.addClass('closed').animate({
	                    width: min
	                }, 300, 'easeInQuad', function() {
	                    $handle.show()
	                });
	                $con.animate({
	                    marginLeft: min
	                }, 300, 'easeInQuad');
	
	            } else {
	                $handle.hide().removeClass('open')
	                    .addClass('close')
	                    .find('i.fas')
	                    .removeClass('fa-angle-double-right')
	                    .addClass('fa-angle-double-left');
	
	                $nav.removeClass('closed').animate({
	                    width: max
	                }, 300, 'easeOutQuad', function() {
	                    $handle.show();
	                });
	                $con.animate({
	                    marginLeft: min
	                }, 300, 'easeOutQuad');
	            }
	        });
	    },
	    __transferListToForest: function(nodes) {
	        var root = {
	            is_leaf: 'N',
	            ord: 0,
	            node_id: 0
	        };
	        function appendChildren(root) {
	            if (root.is_leaf === 'N') {
	                root.children = [];
	                for (var i in nodes) {
	                    var n = nodes[i];
	                    if (n.parent_node_id === root.node_id) {
	                        n = appendChildren(n);
	                        root.children.push(n);
	                    }
	                }
	                root.children = root.children.sort(function(a, b) {
	                    return a.ord - b.ord;
	                });
	            }
	            return root;
	        }
	        return appendChildren(root).children;
	    },
	    openPage: function(pageId, data) {
	        if (!pageId) {
	            return;
	        }
	        var that = this;
	        Enhancer.ZPageManager.openPage( pageId, data );
	
	        var $a = $('#menu-node-' + pageId);
	        if (!$a.length) {
	            var newHash = '#' + pageId;
	            if (newHash === location.hash) {
	                return;
	            }
	            window.history.pushState(
	                null,
	                'p'+pageId,
	                location.protocol
	                    + '//' + location.hostname
	                    + (location.port ? ':' + location.port : '')
	                    + location.pathname + location.search + newHash
	            );
	            return;
	        }
	        
	        that.__pushPageStateForNode( $a );
	        var $ul = $a.parent().parent();
	        while (!$ul.hasClass('root')) {
	            if (!$ul.is(':visible')) {
	                $ul.show();
	                $ul.prev().find('span.fas')
	                    .removeClass('fa-angle-left')
	                    .addClass('fa-angle-down');
	            }
	            $ul = $ul.parent().parent();
	        }
	        return true;
	    },
	    __pushPageStateForNode: function($a) {
	        if (!$a || $a.parent().hasClass('selected')) {
	            return;
	        }
	        var $path = $('#header div.path').hide().html('');
	
	        $('<label>').addClass('ui-state-active')
	            .text($a.text())
	            .appendTo($path);
	
	        $('<a>').text('/')
	            .prependTo($path);
	
	        var $node = $a.parent();
	        var page_name = $a.text();
	        var page_id = $a.attr('navto');
	
	        var $last = $( '#navigator ul.menu li.ui-state-active' )
	            .removeClass( 'ui-state-active' )
	            .removeClass('selected');
	
	        if ($last.length) {
	            while(!$last.parent().hasClass('root')) {
	                $last = $last.parent().parent();
	            }
	            $last.removeClass('ui-state-hover');
	        }
	
	        while(!$node.parent().hasClass('root')) {
	            $node = $node.parent().parent();
	            $('<span>').addClass('node-name')
	                .text($node.find('>a').text())
	                .prependTo($path);
	
	            $('<a>').text('/')
	                // .addClass('fa fa-angle-right')
	                .prependTo($path);
	        }
	        $node.addClass('ui-state-hover');
	
	        $path.fadeIn(300);
	
	        $a.parent()
	            .addClass( 'ui-state-active' )
	            .addClass('selected');
	
	        var newHash = '#' + page_id;
	        if (newHash === location.hash) {
	            return;
	        }
	        window.history.pushState(
	            null,
	            page_name,
	            location.protocol
	                + '//' + location.hostname
	                + (location.port ? ':' + location.port : '')
	                + location.pathname + location.search + newHash
	        );
	    },
	    expandAll: function(expand) {
	        function traversal($root) {
	            var $lis = $root.children();
	            $lis.each(function() {
	                if ($(this).attr('isleaf') === 'N') {
	                    var $subRoot = $(this).find('>ul');
	                    var isVisible = $subRoot.is(':visible');
	                    if (isVisible != expand) {
	                        $(this).find('>a').click();
	                    }
	                    traversal($subRoot);
	                }
	            })
	        }
	        traversal($('#navigator ul.menu.root'));
	    }
	};
	window.Navigator = Navigator;
	
	module.exports = Navigator;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(9);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div id=\"nav-handle\" class=\"ui-state-default close\">\n	<i class=\"fas fa-angle-double-left\"></i>\n</div>\n";
	},"useData":true});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	
	var Enhancer = __webpack_require__(40);
	module.exports = {
	    init: function(frontSettings) {
	        Enhancer.windowSettings = frontSettings.window;
	        Enhancer.$pageContainer = $('#page-container');
	        if (!window.isStandalone) {
	        	$('#page-container').css('margin-left', frontSettings.navigator.width || 220);
	        } else {
	        	Enhancer.ZPageManager.openPage( window.pageId );
	        }
	    }
	};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var locale = __webpack_require__(6);
	
	var Enhancer = {
	    VERSION: '0.1.8',
	    LANG: 'zh-cn',
	    WIDGET_BASE_URL: './widget/',
	    PAGE_PROFILE_URL: './authorized/page/',
	    RDB_DATA_URL: './authorized/data/rdb/',
	    HTTPPROXY_DATA_URL: './authorized/data/httpproxy/',
	    SUBMIT_URL: './authorized/submit/',
	    FILE_BASE_URL: './file/',
	    SERVER_CONTEXT_URL: './authorized/context/',
	    STANDALONE_PAGE_BASE_URL: '/standalone/page/',
	    LOGIN_URL: '/login'
	};
	
	var E = Enhancer;
	
	E.getLang = function() {
	    return this.LANG;
	};
	
	// Global function to handle unauthorized response when user operated
	// after session timeout.
	E.unauthorized = function() {
	    if (confirm(locale('sessionTimeoutTips'))) {
	        location.href = E.LOGIN_URL
	            + '?redirect=' + encodeURIComponent(location.pathname + location.search + location.hash);
	    }
	};
	
	E.getDataURL = function(sourceId) {
	    return this.RDB_DATA_URL + sourceId;
	};
	E.getWidgetBaseUrl = function(widgetNameVersion) {
	    if (!widgetNameVersion) {
	        return this.WIDGET_BASE_URL;
	    }
	    var name = widgetNameVersion.split('/')[0];
	    var version = widgetNameVersion.split('/')[1]
	    return this.WIDGET_BASE_URL + name + '/widget/' + version;
	};
	E.getCustomInterfaceUrl = function(interfaceName, query) {
	    var url = './custom-interface/call/' + interfaceName;
	    if (typeof query === 'object') {
	        url = url + '?';
	        for (var i in query) {
	            url = url + i + '=' + encodeURIComponent(query[i]) + '&';
	        }
	    }
	    return url;
	};
	
	E.getFileUploadUrl = function() {
	    return this.FILE_BASE_URL + 'upload';
	};
	
	E.getPageContainer = function() {
	    return this.$pageContainer;
	};
	
	E.getStandalonePageUrl = function(id) {
	    return this.STANDALONE_PAGE_BASE_URL + id;
	};
	
	E.openStandalonePage = function(pageId) {
	    if (!pageId) {
	        return alert('Can not open page without id!');
	    } 
	    window.open(this.getStandalonePageUrl(pageId));
	};
	
	E.ZUserData = __webpack_require__(41);
	E.ZMessage = __webpack_require__(43);
	E.ZContext = __webpack_require__(44);
	E.ZFactory = __webpack_require__(46);
	E.ZPageManager = __webpack_require__(47);
	E.Util = __webpack_require__(51);
	E.IO = __webpack_require__(53);
	
	E.resetPage = function() {
	    E.ZPageManager.resetPage.apply(E.ZPageManager, arguments);
	};
	E.resetCurrentPage = function() {
	    E.ZPageManager.resetCurrentPage.apply(E.ZPageManager, arguments);
	}
	
	E.getEntityByNumber = E.ZFactory.getEntityByNumber;
	E.getEntityById = E.ZFactory.getEntityById;
	
	
	window.Enhancer = Enhancer;
	
	module.exports = Enhancer;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	var locale = __webpack_require__(6);
	var ZPattern = __webpack_require__(42);
	var ZMessage = __webpack_require__(43);
	
	/*
	 * ZUserData
	 * This global object is used to manage the user data which is
	 * generated by user action such as login, click and other useful global
	 * vars from server side which are set when page init.
	*/
	var ZUserData = {
	    data: {},
	    set: function( name, val ) {
	        if (arguments.length === 1) {
	            var data = name;
	            for ( var i in data ) {
	                this.data[ i.toUpperCase() ] = data[ i ];
	            }
	            return;
	        }
	        this.data[ name.toUpperCase() ] = val;
	    },
	
	    add: function( key, value ) {
	        this.data[key.toUpperCase()] = value;
	    },
	
	    get: function(name) {
	        if (!name) {
	            return this.data;
	        }
	        return this.data[name.toUpperCase()];
	    },
	    // getData: function() {
	    //     return this.data;
	    // },
	    val: function( keyname ) {
	        if (ZPattern.serverSideVariable.test(keyname)) {
	            return null;
	        }
	        if (!ZPattern.variable.test(keyname)) {
	            ZMessage.alert(locale('invalidVar') + keyname);
	            return null;
	        }
	        var val = this.data[ keyname.toUpperCase() ];
	
	        return val ? val : (typeof val === 'undefined' ? null : val);
	    }
	};
	
	module.exports = ZUserData;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	var ZPattern = {
		variable: /^\d+-\w+(\.\w+)*$/,
		serverSideVariable: /^\w+(\.\w+)*$/
	};
	module.exports = ZPattern;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	var locale = __webpack_require__(6);
	
	var ZMessage = {
	    alert: function ( option ) {
	        if ( typeof option === 'string' ) {
	            option = {
	                content: option
	            }
	        }
	        var op = jQuery.extend( {
	            title: locale('message'),
	            width: 320,
	            content: '',
	            text: 'OK',
	            confirm: function() {}
	        }, option );
	        
	        var $d = $( '<div>' ).css({
	                textAlign: 'center',
	                fontSize: '14px'
	            })
	            .html( op.content );
	
	        $d.dialog( {
	            title: op.title,
	            autoOpen: true,
	            modal: true,
	            closeOnEscape: true,
	            width: op.width,
	            height: 'auto',
	            resizable: true,
	            dialogClass: 'alert',
	            draggable: true,
	            buttons: [{ 
	                text: op.text,
	                click: function() {
	                    $d.dialog( 'destroy' );
	                    op.confirm();
	                }
	            }]
	        } );
	    },
	    confirm: function ( option ) {
	        var op = jQuery.extend( {
	            width: 320,
	            height: 'auto',
	            content: locale('areUsure'),
	            cancelText: locale('no'),
	            confirmText: locale('yes'),
	            cancel: function ( $d ) {},
	            ok: function( $d ) {}
	        }, option );
	
	        var $d = $( '<div style="text-align:center; font-size: 14px">' ).html( op.content );
	        var btns = {};
	
	        btns[ op.cancelText ] = function() {
	            if ( typeof op.cancel === 'function' ) {
	                op.cancel( $d );
	            }
	            $d.dialog( 'destroy' ).remove();
	        };
	
	        btns[ op.confirmText ] = function() {
	            if ( typeof op.ok === 'function' ) {
	                op.ok( $d );
	            }
	            $d.dialog( 'destroy' ).remove();
	        };
	        $d.dialog( {
	            autoOpen: true,
	            modal: true,
	            closeOnEscape: false,
	            width: op.width,
	            height: op.height,
	            minWidth: 240,
	            resizable: false,
	            dialogClass: 'alert',
	            show: {
	                duration: 150
	            },
	            hide: {
	                duration: 150
	            },
	            buttons: btns
	        } ).prev().hide();
	    }
	};
	
	module.exports = ZMessage;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var locale = __webpack_require__(6);
	var ZElement = __webpack_require__(45);
	
	var ZPattern = __webpack_require__(42);
	var ZMessage = __webpack_require__(43);
	var ZUserData = __webpack_require__(41);
	var ZFactory = __webpack_require__(46);
	var ZPageManager = __webpack_require__(47);
	
	/* ZContext */
	var ZContext = ZElement.extend( {
	    creator: ZContext,
	    init: function( data ) {
	        this.data = this.toUpperCase( data );
	    },
	    toUpperCase: function( data ) {
	        data = data || {};
	        var upperData = {};
	        for ( var i in data ) {
	            upperData[i.toUpperCase()] = data[i];
	        }
	        return upperData;
	    },
	    val: function( keyname ) {
	        if (ZPattern.serverSideVariable.test(keyname)) {
	            return null;
	        }
	        if (!ZPattern.variable.test(keyname)) {
	            ZMessage.alert(locale('invalidVar') + keyname );
	            return null;
	        }
	        var val = parseInt( keyname.split( '-' )[ 0 ] ) < 9
	                    ? ZUserData.val( keyname )
	                    : this.data[ keyname.toUpperCase() ];
	
	        return val ? val : ( typeof val === 'undefined' ? null : val);
	    },
	    vals: function( keys ) {
	        if ( !keys || keys.length == 0 ) {
	            return {};
	        }
	        var values = {};
	        for ( i in keys ) {
	            if ( keys[ i ] ) {
	                values[ keys[i].toUpperCase() ] = this.val( keys[ i ] );
	            }
	        }
	        return values;
	    },
	    // merge context, the context can be a map or ZContext
	    merge: function( context ) {
	        this.data = jQuery.extend( this.data, 
	            context instanceof ZContext ? context.data : context );
	
	        return this;
	    },
	    add: function( key, value ) {
	        if ( key ) {
	            this.data[ key.toUpperCase() ] = value;
	        }
	        return this;
	    },
	    parse: function( str, highlight ) {
	        if ( !str || typeof str !== 'string' ) return str;
	        var that = this;
	        return str.replace( /@(\d+-\w+(\.\w+)*)@/g, function( s, $1 ) {
	            var val = that.val( $1 );
	            if (typeof highlight === 'function') {
	                return highlight(val, $1);
	            }
	            // if (typeof val === 'object') {
	            //     val = JSON.stringify(val);
	            // }
	
	            if (highlight) {
	                return !val && val !== false ? ''
	                    : '<span class="ui-state-active highlight-var"><a>'
	                        + val + '</a></span>';
	            }
	            return val;
	        } );
	    },
	    all: function() {
	        return ZContext;
	    },
	    getData: function() {
	        return this.data;
	    },
	    each: function( callback ) {
	        if ( typeof callback !== 'function' ) {
	            throw new Error('A function must be specified to iterate each data');
	        }
	        for ( var i in this.data ) {
	            callback( i, this.data[i] );
	        }
	    }
	} );
	
	ZContext.value = function( name ) {
	    if (ZPattern.serverSideVariable.test(name)) {
	        return null;
	    }
	    if ( !name || typeof name !== 'string' || !ZPattern.variable.test(name) ) {
	        ZMessage.alert(locale('invalidVar') + name );
	        return;
	    }
	    var num = parseInt( name.split( "-" )[ 0 ] );
	    if ( num < 8 ) {
	        return ZUserData.val( name );
	    
	    } else if ( num === 8 ) {
	        var pid = ZPageManager.getPrevPageId();
	        
	        name = name.replace(/^8-(\d+)_/, function(s, $1) {
	            num = $1;
	            return $1 + '-';
	        });
	
	        var zEntity = ZFactory.getEntityById('p' + pid + '-w' + num) 
	                    || ZFactory.getEntityById('p' + pid + '-f' + num);
	
	        return zEntity ? zEntity.context().val( name ): undefined;
	
	    // Get data from curr page context.
	    } else if (num === 9) {
	        var data = ZPageManager.getCurrPageData();
	        name = name.replace(/^9-/, '').toUpperCase();
	        return data[name];
	
	    } else {
	        var zEntity = ZFactory.getEntityByNumber( num );
	        return zEntity ? zEntity.context().val( name ): undefined;
	    }
	};
	
	ZContext.values = function( names ) {
	
	    if ( !names ) return {};
	    if ( !(names instanceof Array) ) {
	        ZMessage.alert(locale('invalidVar') + JSON.striginfy(names) );
	        return {};
	    }
	
	    names = names.map(function(s) {
	        return s.toUpperCase();
	    });
	
	    var values = {};
	
	    var contextMap = {}; // A map of window number to context
	    var name, num, context;
	    for (var i = 0; i < names.length; i++) {
	        name = names[i];
	        if ( !name || typeof name !== 'string' 
	                || !/^(\d+-)?\w+(\.\w+)*$/.test(name) ) {
	            return ZMessage.alert(locale('invalidVar'));
	        }
	        // Deprecate server side variable.
	        if ( ZPattern.serverSideVariable.test(name) ) continue;
	        
	        num = parseInt(name.split('-')[0]);
	
	        // Get data from user data.
	        if ( num < 8) {
	            values[name] = ZUserData.val(name);
	            
	        // Get data from prev page entities(window, frame)
	        } else if (num === 8) {
	            var pid = ZPageManager.getPrevPageId();
	        
	            name = name.replace(/^8-(\d+)_/, function(s, $1) {
	                num = $1;
	                return $1 + '-';
	            });
	            var enId = pid + '-' + num;
	            context = contextMap[enId];
	            if (!context) {
	                var zEntity = ZFactory.getEntityById('p' + pid + '-w' + num)
	                        || ZFactory.getEntityById('p' + pid + '-f' + num);
	
	                if (!zEntity) {
	                    continue;
	                }
	                contextMap[enId] = context = zEntity.context();
	            }
	            values[name] = context.val(name);
	
	        // Get data from curr page context.
	        } else if (num === 9) {
	            var data = ZPageManager.getCurrPageData();
	            values[name] = data[name.replace(/^9-/, '')];
	
	        // Get data from current page entities(window, frame)
	        } else {
	            context = contextMap[num];
	            if (!context) {
	                var zEntity = ZFactory.getEntityByNumber(num);
	                if (!zEntity) {
	                    continue;
	                }
	                contextMap[num] = context = zEntity.context();
	            }
	            values[name] = context.val(name);
	        }
	    }
	
	    return values;
	};
	
	ZContext.parse = function(text, highlight) {
	    return typeof text !== 'string'
	        ? text
	        : text.replace( /@(\d+-\w+(\.\w+)*)@/g, function( s, $1 ) {
	            var val = ZContext.value( $1 );
	            if (typeof highlight === 'function') {
	                return highlight(val, $1);
	            }
	
	            if (highlight) {
	                return !val && val !== false ? ''
	                    : '<span class="ui-state-active highlight-var"><a>'
	                        + val + '</a></span>';
	
	            }
	            return val === null ? '' : val;
	        } );
	};
	
	module.exports = ZContext;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	/****
	 * ZElement Class
	 * The base class of all elements in zmodel including page,
	 * window, button, eventHandler, action, procedure and context
	 */
	
	var ZElement = Class.extend( {
	    _id: 'ZElement',
	    _className: 'ZElement',
	    init: function ( prof ) {}
	} );
	
	module.exports = ZElement;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	// A factory to create various ZElements
	
	var locale = __webpack_require__(6);
	var ZPageManager = __webpack_require__(47);
	
	// A map to store all created ZEntities, the key is entity id and 
	// the value is ZEntity object.
	var zentities = {};
	
	var ZFactory = {
	    addToIndex: function(entity) {
	        zentities[entity.id()] = entity;
	    },
	    getEntityById: function( id ) {
	        return zentities[ id ];
	    },
	
	    getEntityByNumber: function( num ) {
	        
	
	        // Always get the entity from current opened page
	        var pid = ZPageManager.getLastPageId();
	
	        if ( !pid ) {
	            return null;
	        }
	        return zentities[ 'p' + pid + '-w' + num ] || zentities[ 'p' + pid + '-f' + num ];
	    }
	};
	module.exports = ZFactory;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var ZUserData = __webpack_require__(41);
	var ZFactory = __webpack_require__(46);
	var ZPageManager = {
	    lastPage: null,
	    pages: {}, // A cache for opened pages.
	    openPage: function( pid, data ) {
	        if ( this.lastPage ) {
	            this.lastPage.close();
	            this.prevPage = this.lastPage;
	            this.prevPageId = this.lastPageId;
	            ZUserData.set('2-PREV_PAGE_ID', this.lastPageId);
	        }
	        if ( !pid  ) {
	            return;
	        }
	        this.setPageData(pid, data);
	
	        this.lastPageId = pid;
	        var page = this.pages[ pid ];
	        // If page has been created, open it directly
	        if ( page ) {
	            page.open();
	            this.lastPage = page;
	            ZUserData.set( '2-CURR_PAGE_ID', pid );
	            
	            // affect page in case the context changed, if data is passed in.
	            if (data && typeof data === 'object') {
	                page.affected();
	            }
	
	        // Else get page profile from server to create new page and then open it
	        } else {
	            var self = this;
	            this.getPageProf( pid, function( prof ) {
	                var ZPage = __webpack_require__(48);
	
	                var p = new ZPage( prof, 'ENHANCER' );
	                self.pages[ pid ] = p;
	                p.open();
	                self.lastPage = p;
	                ZUserData.set( '2-CURR_PAGE_ID', pid );
	            } );
	         }
	    },
	
	    resetPage: function( pid ) {
	        if ( !pid ) return;
	        var p = this.pages[ pid ];
	        if ( p ) p.reset();
	    },
	    resetCurrentPage: function() {
	        if ( this.lastPage ) {
	            this.lastPage.reset();
	        }
	    },
	    // Get page profile from server
	    getPageProf: function ( pid, callback ) {
	        var that = this;
	        if ( !pid || typeof callback !== 'function' ) {
	            return;
	        }
	        // For standalone view
	        if (window.isStandalone && pid == window.pageId) {
	            var profile = that.__handlePageProfileString(pid, window.pageProfileStr);
	            return callback( profile );
	        }
	        var E = __webpack_require__(40);
	        return $.ajax( {
	            url: E.PAGE_PROFILE_URL + pid,
	            type: 'get',
	            dataType: 'text',
	            success: function( profStr ) {
	                var profile = that.__handlePageProfileString(pid, profStr);
	                callback( profile );
	            },
	            error: function(e) {
	                if (e.status === 401) {
	                    return E.unauthorized();
	                }
	                alert(e.responseText);
	                console.log(e);
	            }
	        } );
	    },
	    __handlePageProfileString: function(pid, profStr) {
	        var prof = JSON.parse( profStr, function( key, val ) {
	            if ( /^(\s*function\s*\(['\)]*\)\s*\{(\s|\S)*\}\s*)$/.test( val ) ) {
	                var f;
	                try {
	                    f = eval( '[' + val + ']' )[ 0 ];
	                } catch ( e ) {
	                    if ( console ) {
	                        console.warn( 'Script has syntax error: ' + val, e );
	                    }
	                    return '';
	                }
	                return f;
	            }
	            return val;
	        } );
	
	        // Generate id for every entities of this page
	        prof.pageId = pid;
	        prof.id = 'page' + pid;
	        prof.no = pid;
	        prof.type = 'page';
	        var f, w;
	        var frames = prof.frames;
	        for (var i in frames) {
	            f = frames[i];
	            f.pageId = pid;
	            f.id = 'p' + pid + '-f' + f.no;
	            f.type = 'frame';
	            var wins = f.windows;
	            if (wins) {
	                for (var j in wins ) {
	                    w = wins[j];
	                    w.pageId = pid;
	                    w.id = 'p' + pid + '-w' + w.no;
	                    w.type = 'window';
	                }
	            }
	        }
	        return prof;
	    },
	    getLastPageId: function() {
	        return this.lastPageId;
	    },
	    getCurrPageId: function() {
	        return this.lastPageId;
	    },
	    getPrevPageId: function() {
	        return this.prevPageId;
	    },
	    setPageData: function(pid, data) {
	        if (data && typeof data === 'object') {
	            var d = {};
	            for (var i in data) {
	                d[i.toUpperCase()] = data[i];
	            }
	            var key = 'page' + pid + '_data'
	            var pdata = JSON.parse(localStorage.getItem(key) || '{}');
	            pdata = $.extend(pdata, d);
	            localStorage.setItem(key, JSON.stringify(pdata));
	        }
	    },
	    getCurrPageData: function() {
	        var key = 'page' + this.lastPageId + '_data';
	        var data = localStorage.getItem(key) || '{}';
	        return JSON.parse(data);
	    }
	};
	
	module.exports = ZPageManager;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	var ZEntity = __webpack_require__(49);
	var ZFrame = __webpack_require__(54);
	
	var ZPage = ZEntity.extend( {
	    construct: function( prof ) {
	        this.$obj = $( '<div>' ).addClass( 'zpage' )
	            .attr( 'id', this._id );
	        var $pageContainer = $('#page-container');
	        $pageContainer.append( this.$obj );
	        this.openFrame( prof.firstFrameNo, null );
	    },
	
	    createFrame: function( no ) {
	        var childProf = this.prof.frames[ no ];
	        if ( childProf ) {
	            return new ZFrame( childProf, this );
	        } else {
	            return null;
	        }
	    },
	
	    // Open child
	    openFrame: function( no ) {
	        var child = this._children[ no ];
	        if ( child instanceof ZEntity ) {
	            // Always reset frame before open it.
	            child.reset().open();
	        } else {
	            this.createFrame( no ).open();
	        }
	    },
	
	    popFrame: function( no ) {
	        var child = this._children[ no ];
	        if ( child instanceof ZEntity ) {
	            // Always reset frame before pop it.
	            child.reset().pop();
	        } else {
	            this.createFrame( no ).pop();
	        }
	    },
	
	    // reset
	    reset: function() {
	        var frames = this.children();
	        for ( var i in frames ) {
	            frames[ i ].close();
	        }
	        this.openFrame( this.prof.firstFrameNo );
	        return this;
	    },
	    affected: function() {
	        var frames = this.children();
	        for ( var i in frames ) {
	            frames[ i ].close();
	        }
	        var first = frames[this.prof.firstFrameNo];
	        debugger;
	        first.affected().open();
	        // this.openFrame( this.prof.firstFrameNo );
	        return this;
	    }
	} );
	
	module.exports = ZPage;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var ZElement = __webpack_require__(45);
	var ZEventHandler = __webpack_require__(50);
	
	var ZContext = __webpack_require__(44);
	var ZFactory = __webpack_require__(46);
	/**
	 * ZEntity Class
	 * The super class of all entities like page, window and button.
	 */
	var ZEntity = ZElement.extend( {
	
	    // Initialize function
	    // All entities exists with parent-child ralationship. So when an
	    // entity is inisialized, its parent should be specifed
	    init: function ( prof, pEntity ) {
	
	        // All Entities should have an id.
	        this._id = prof.id;
	        this._no = prof.no;
	        this._pageId = prof.pageId;
	        
	        // The class name of implementer of this Entity
	        this._className = prof.implementer;
	
	        this._type = prof.type;
	
	        // Refers to parent entity
	        this._parent = pEntity;
	
	        // A map containing all children entites owned by this entity
	        this._children = {};
	
	        // A flag marking the status of this entity
	        this._status = 'initializing';
	
	        this._data = {};
	
	        if ( pEntity instanceof ZEntity ) {
	            pEntity.appendChild( this );
	        }
	        
	        // Register event handlers... to be continued.
	        this._regEventHandlers( prof.ehandlers );
	
	        // Deprecate server side dependent variables
	        var dependentVars = prof.dependencies || [];
	        prof.clientSideDependencies = [];
	        for (var i = 0; i < dependentVars.length; i++) {
	            if (!/^\w+(\.\w+)*$/.test(dependentVars[i])) {
	                prof.clientSideDependencies.push(dependentVars[i]);
	            }
	        }
	        // Extract variables from window dynamic title.
	        if (prof.dTitle) {
	            prof.clientSideDependencies = prof.clientSideDependencies
	                .concat(prof.dTitle.match(/\d+-\w+(\.\w+)*/g) || []);
	        }
	
	        // Extract varibales from window datasources.
	        var datasources = prof.datasources || {};
	        var params, ds;
	        for ( var i in datasources ) {
	
	            ds = datasources[i];
	            // Extract variables in local process.
	            if ( ds.localProcess ) {
	                ds.localProcess.replace( /@(\d+-\w+(\.\w+)*)@/g, function(s) {
	                    ds.params.push( s.split(/@/g)[1] );
	                } );
	            }
	            params = ds.params;
	            for ( var k = 0; k < params.length; k++ ) {
	                if (!/^\w+(\.\w+)*$/.test(params[k])) {
	                    prof.clientSideDependencies.push(params[k]);
	                }
	            }
	        }
	        // Watch the dependency variable changes and affected automatically.
	        if (prof.autoAffected !== false) {
	            ZEntity.watchVariableChanges(prof.pageId, prof.clientSideDependencies, this);
	        }
	        this.prof = prof;
	        var that = this;
	
	        // Index self
	        ZFactory.addToIndex(that);
	
	        // Construct self after the init event has been handled
	        that.construct( prof );
	    },
	
	    // construct: should be overridden
	    construct: function( prof ) {
	        this.trig('init');
	    },
	
	    _regEventHandlers: function( ehandlers ) {
	        if ( !ehandlers ) {
	            return;
	        }
	        for ( var name in ehandlers ) {
	            var h = new ZEventHandler( ehandlers[ name ] );
	            ZEventHandler.add( this.id() + '-' + name, h );
	        }
	    },
	    
	    // get id
	    id: function() {
	        return this._id;
	    },
	
	    // get number
	    no: function() {
	        return this._no;
	    },
	
	    // get profile
	    profile: function() {
	        return this.prof;
	    },
	
	    pageId: function() {
	        return this._pageId;
	    },
	    className: function() {
	        return this._className;
	    },
	    type: function() {
	        return this._type;
	    },
	    // get parent
	    parent: function( parent ) {
	        if ( parent ) {
	            this._parent = parent;
	        } else {
	            return this._parent;
	        }
	    },
	    // get children
	    children: function( no ) {
	        return no ? this._children[ no ] : this._children;
	    },
	
	    // append child
	    appendChild: function ( child ) {
	        this._children[ child.no() ] = child;
	        return this;
	    },
	
	    // remove child
	    removeChild: function( no ) {
	        delete this._children[ no ];
	        return this;
	    },
	
	    // has child
	    hasChild: function( entity ) {
	        if ( entity instanceof ZEntity ) {
	            return this._children[ entity.no() ] == entity ? true : false;
	        }
	        return false;
	    },
	
	    // get or set entity status which can be initializing, active
	    status: function( status ) {
	        if ( status ) {
	            this._status = status;
	        } else {
	            return this._status;
	        }
	    },
	
	    // Is active
	    isActive: function() {
	        return this._status === 'active';
	    },
	
	    // This method returns its corresponding jQuery object
	    jqobj: function() {
	        return this.$obj;
	    },
	
	    getContainer: function() {
	        return this.$obj;
	    },
	
	    /* action methods */
	
	    // open
	    open: function() {
	        // this.trig( 'open' );
	        if (this.$obj) {
	            this.$obj.show();
	        }
	        return this;
	    },
	
	    // close
	    close: function() {
	        // this.trig( 'close' );
	        if (this.$mask) {
	            this.$mask.hide();
	        }
	        this.$obj.hide();
	        return this;
	    },
	    pop: function( enforceEffect ) {
	        var that = this;
	        that.$obj.css( {
	            zIndex: this.profile().zIndex || 9,
	            position: 'absolute'
	        } );
	
	        var $page = $( '#page' + that.pageId() );
	
	        if ( !that.$mask ) {
	            that.$mask = $( '<div class="ui-widget-overlay">' )
	                .css( {
	                    zIndex: 2,
	                    width: '100%',
	                    height: '100%',
	                    position: 'absolute',
	                    top: 0,
	                    left: 0
	                } ).on( 'click', function( e ) {
	                    that.push();
	                } ).attr('id', that.id() + '-mask')
	                .appendTo( $page );
	        }
	
	        that.$mask.show();
	        return that.open(enforceEffect);
	    },
	    push: function() {
	        if (this.$mask) {
	            this.$mask.hide();
	        }
	        return this.close();
	    },
	    // reset
	    reset: function( zcontext ) {
	        return this;
	    },
	
	    // affected
	    affected: function( zcontext ) {
	    },
	
	    // highlight
	    highlight: function( msg ) {
	        this.$obj.effect( 'highlight', {}, 600);
	        return this;
	    },
	
	    // block
	    block: function( msg ) {
	        var $tar = this.$obj;
	        
	        var zIndex = $tar.css( 'z-index' );
	
	        this.$block = $( '<div>' ).attr( 'id', this._id + '-block' )
	            .addClass('ui-widget-overlay')
	            .css( {
	                zIndex: zIndex + 9301,
	                top: 0,
	                left: 0,
	                width: '100%',
	                height: '100%',
	                // width: $tar.width(),
	                // height: $tar.height(),
	                position: 'absolute',
	                display: 'none'
	            } )
	            .appendTo( $tar )
	            .fadeIn(300);
	
	        this.$loading = $('<div class="loading">'
	                  + '<div class="rect1 ui-state-active"></div>'
	                  + '<div class="rect2 ui-state-active"></div>'
	                  + '<div class="rect3 ui-state-active"></div>'
	                  + '<div class="rect4 ui-state-active"></div>'
	                  + '<div class="rect5 ui-state-active"></div>'
	                + '</div>')
	            .css('z-index', zIndex + 9302)
	            .appendTo( $tar );
	
	        return this;
	    },
	
	    // unblock
	    unblock: function() {
	        if ( this.$block ) {
	            this.$block.remove();
	        }
	        if ( this.$loading ) {
	            this.$loading.remove();
	        }
	        return this;
	    },
	
	    // destroy
	    destroy: function() {},
	
	    // disable
	    disable: function() {},
	
	    // enable
	    enable: function( zcontext ) {},
	
	    
	    // This method always return the entity data fetched before.
	    context: function() {
	        var context = new ZContext();
	        for (var i in this._data) {
	            context.add(this.no() + '-' + i, this._data[i]);
	        }
	        return context;
	    },
	    // This method should be implemented by subclass to get the latest data
	    // and always be always called one event triggered.
	    fetchData: function() {
	        return {};
	    },
	
	    // trig
	    trig: function( eventName, callbackForSource ) {
	        var prevData = $.extend({}, this._data);
	        var newData = this.fetchData();
	        for (var i in newData) {
	            this._data[i.toUpperCase()] = newData[i];
	        }
	        var changes = this.__diff( prevData, this._data );
	        ZEntity.notifyVariableChanges( this._pageId, changes );
	        ZEventHandler.trig( this, this._id + '-' + eventName, callbackForSource );
	    },
	    setData: function(name, value) {
	        if (!/^(\w+)(\.\w+)*$/.test(name)) {
	            return;
	        }
	        if (!this._data) {
	            this._data = {};
	        }
	        this._data[name.toUpperCase()] = value;
	    },
	    getData: function(name) {
	        if (typeof name === 'undefined') {
	            return this._data;
	        }
	        if (typeof name !== 'string') {
	            return;
	        }
	        return this._data ? this._data[name.toUpperCase()] : null;
	    },
	    __diff: function(prevData, data) {
	        var changes = [];
	        var prev, now, varname;
	        for (var i in data) {
	            prev = JSON.stringify(prevData[i]);
	            now = JSON.stringify(data[i]);
	            if (now !== prev) {
	                varname = this.no() + '-' + i;
	                changes.push(varname);
	            }
	        }
	        return changes;
	    },
	
	
	    // This method is used to judge whether this entity is ready for its context.
	    // if false, its context is valid. In some proper time, the method should be 
	    // called before getting context from entity. Example: we should select at least
	    // one record of a table before edit it in form. The form will get context from the record
	    // but do not know whether there is aviable selected record in the table, so we 
	    // should ask if the table is ready to provide a record row.
	    isValid: function() {
	        return true || false;
	    },
	
	    toast: function( msg ) {
	        var $msg = $( '<div>' ).text( msg )
	            .addClass( 'ui-widget-content ui-corner-all' )
	            .addClass( 'ui-state-highlight' )
	            .css({
	                height: 32,
	                width: 180,
	                fontSize: '12px',
	                padding: '8px 16px',
	                textAlign: 'center',
	                position: 'absolute',
	                top: '50%',
	                left: '50%',
	                opacity: 0.75,
	                marginTop: '-36px',
	                marginLeft: '-100px'
	            })
	            .appendTo( this.$obj );
	        setTimeout( function() {
	            $msg.remove();
	        }, 1200)
	    },
	
	    getSourceDataParams: function( sourceId ) {
	        var source = (this.prof.datasources || {})[ sourceId ];
	        if (!source) {
	            return {};
	        }
	        return ZContext.values(source.params);
	    },
	    getSourceDataParamNames: function( sourceId ) {
	        var source = (this.prof.datasources || {})[ sourceId ];
	        if (!source) {
	            return [];
	        }
	        return source.params;
	    }
	} );
	
	ZEntity.observerSequences = {};
	ZEntity.watchVariableChanges = function( pageId, varNames, entityObserver ) {
	    if (!varNames || !varNames.length) {
	        return;
	    }
	    var seqs = ZEntity.observerSequences[pageId] || {};
	    var s;
	    varNames.forEach(function(v) {
	        v = v.toUpperCase();
	        
	        if (!seqs[v]) {
	            seqs[v] = [];
	        }
	        seqs[v].push(entityObserver);
	    });
	    ZEntity.observerSequences[pageId] = seqs;
	};
	
	// Note that this is different from event listener, and the case that too
	// many value changes at one time which will casue duplicated affected calls
	// should be taken into consideration.
	ZEntity.notifyVariableChanges = function( pageId, varNames ) {
	    if (!varNames) {
	        return;
	    }
	    if (typeof varNames === 'string') {
	        varNames = [varNames];
	    }
	    var seqs = ZEntity.observerSequences[pageId] || {};
	    varNames.forEach(function(varName) {
	        var s = seqs[varName];
	        // Mark the notified entity in case that there are duplicate entities 
	        // in the one variable wacther list
	        var marks = {};
	        var id;
	        if (s instanceof Array) {
	            s.forEach(function(entity) {
	                id = entity.id();
	                if (!marks[id]) {
	                    entity.affected(varName);
	                    marks[id] = true;
	                }
	            });
	        }
	    });
	};
	
	module.exports = ZEntity;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var locale = __webpack_require__(6);
	var Util = __webpack_require__(51);
	var ZElement = __webpack_require__(45);
	var ZMessage = __webpack_require__(43);
	var ZContext = __webpack_require__(44);
	var ZAction = __webpack_require__(52);
	var ZUserData = __webpack_require__(41);
	var ZFactory = __webpack_require__(46);
	
	var IO = __webpack_require__(53);
	
	var ZEventHandler = ZElement.extend( {
	    init: function( prof ) {
	        this.prof = prof;
	    },
	
	    __prepare: function( src, callbackForSource, callback ) {
	        var prof = this.prof;
	
	        // Precheck whether user made context is valid on current windows. 
	        if ( prof.checkWindow ) {
	            var validations = {};
	            validations[ src.no() ] = {
	                win: src,
	                status: 0,
	                result: false
	            };
	            if ( prof.relatedWindows && prof.relatedWindows.length ) {
	                for ( var i = 0; i < prof.relatedWindows.length; i++ ) {
	                    var win = ZFactory.getEntityByNumber( prof.relatedWindows[i] );
	                    if ( !win ) {
	                        callbackForSource({success: false, message: 'invalidWinNoCheck'});
	                        return ZMessage.alert(locale('invalidWinNoCheck')
	                                 + prof.relatedWindows[i]);
	                    }
	                    validations[ win.no() ] = {
	                        win: win,
	                        status: 0,
	                        result: false
	                    };
	                }
	            }
	
	            var afterCheck = function() {
	                for ( var i in validations ) {
	                    if ( validations[i].result !== true ) {
	                        callbackForSource({success: false, message: 'invalid'});
	                        return;
	                    }
	                }
	                if ( prof.askBeforeExecuting ) {
	                    ZMessage.confirm( {
	                        width: 'auto',
	                        height: 'auto',
	                        content: ZContext.parse( prof.askContent, true ),
	                        ok: function( $d ) {
	                            callback();
	                        },
	                        cancel: function() {
	                            callbackForSource({success: false, message: 'user cancel'});
	                        }
	                    } );
	                    return;
	                }
	                callback();
	            };
	
	            // Validate each windows
	            for ( var i in validations) {
	                (function(win) {
	                    var wno = win.no();
	                    var isValidResult = win.isValid();
	                    if (typeof isValidResult === 'undefined' || isValidResult === null) {
	                        validations[wno].status = 1;
	                        ZMessage.alert(locale('noValidation') 
	                            + 'WidgetName: ' + win.profile().widgetName
	                            + ', WindownNumber: ' + wno);
	
	                        return;
	                    }
	                    if ( typeof isValidResult.then === 'function' ) {
	                        isValidResult.then( function( isValid ) {
	                            validations[wno].status = 1;
	                            validations[wno].result = isValid;
	                            if ( isValid !== true ) {
	                                win.toast( prof.checkWindowTips || isValid );
	                            }
	                            afterCheck();
	                        } );
	                    } else {
	                        validations[wno].status = 1;
	                        validations[wno].result = isValidResult;
	                        if ( isValidResult !== true ) {
	                            win.toast( prof.checkWindowTips || isValidResult );
	                        }
	                        afterCheck();
	                    }
	                })(validations[i].win);
	            }
	
	            // Make sure each validate promise then method is called by widget correctly.
	            setTimeout(function() {
	                for (var i in validations) {
	                    var win = validations[i].win;
	                    if (validations[i].status === 0) {
	                        ZMessage.alert(locale('callThenTimeout')
	                            + 'WidgetName: '+ win.profile().widgetName
	                            + '. WindowNumber: ' + win.no());
	                    }
	                }
	            }, 1000 * 3)
	
	        } else if ( prof.askBeforeExecuting ) {
	            ZMessage.confirm( {
	                width: 'auto',
	                height: 'auto',
	                content: ZContext.parse( prof.askContent, true ),
	                ok: function( $d ) {
	                    callback();
	                },
	                cancel: function() {
	                    callbackForSource({success: false, message: 'user cancel'});
	                }
	            } )
	
	        } else {
	            callback();
	        }
	    },
	
	    // Excute function, when the event lisented by this handler is triggred
	    // this method will be called. The parameter src is the event source.
	    // The callbackForSource is a function specified by event trigger, and will
	    // be called after all event responsing is end.
	    execute: function( src, callbackForSource ) {
	        var prof = this.prof;
	        callbackForSource = typeof callbackForSource === 'function'
	            ? callbackForSource : function() {};
	        var that = this;
	        this.__prepare( src, callbackForSource, function() {
	            // before action script
	            if ( prof.onEvent ) {
	                if ( false === Util.execScript( prof.onEvent ) ) {
	                    callbackForSource({success: false, message: 'canceled'});
	                    return;
	                }
	            }
	
	            var zaction = new ZAction( {
	                actions: prof.actions,
	                srcElem: src
	            } );
	
	            // pre define following actions executor
	            var execFollowActions = function( procResult ) {
	                callbackForSource( procResult );
	                if ( prof.beforeAction ) {
	                    if ( false === Util.execScript( prof.beforeAction, [procResult] ) ) {
	                        return;
	                    }
	                }
	
	                zaction.perform();
	
	                // Additional affect
	                if ( prof.additionalAffect ) {
	                    that.__executeAdditionalAffect(src, prof.additionalAffect);
	                }
	
	                if ( prof.afterAction ) {
	                    setTimeout( function() {
	                        Util.execScript( prof.afterAction, [procResult] );
	                    }, 150);
	                }
	            };
	
	            var showDebugInfo = function(result) {
	                var content = result.message;
	                content += '<br><br>' + locale('debugInfo') + '<br>';
	                content += '<textarea style="border: none; width: 100%; height: 296px; overflow: auto">'
	                        + JSON.stringify( result.debugInfo, null, 2 )
	                        + '</textarea>';
	                ZMessage.alert( {
	                    title: locale('error'),
	                    content: content,
	                    width: 840,
	                    height: 580
	                } );
	                console.log('Original Error Info:', result);
	            };
	
	            // Execute procedure
	            var procProf = prof.procedure;
	            if ( procProf ) {
	                // var proc = new ZProcedure( procProf );
	                if ( !procProf.async ) {
	                    IO.callProcedure(procProf, function(result) {
	                        if ( !result.success ) {
	                            callbackForSource(result);
	                            if (result.debugInfo) {
	                                return showDebugInfo(result);
	                            }
	                            ZMessage.alert( result.message );
	                        } else {
	                            execFollowActions( result );
	                        }
	                    });
	                } else {
	                    IO.callProcedure(procProf, function(result) {
	                        if ( !result.success ) {
	                            if (result.debugInfo) {
	                                return showDebugInfo(result);
	                            }
	                            ZMessage.alert( result.message );
	                        }
	                    });
	                    execFollowActions();
	                }
	            } else {
	                execFollowActions();
	            }
	        } );
	    },
	    __executeAdditionalAffect: function(src, additionalAffect) {
	        if (!additionalAffect) {
	            return;
	        }
	        var that = this;
	        if (additionalAffect instanceof Array) {
	            additionalAffect.forEach(function(wno) {
	                var win = ZFactory.getEntityByNumber(wno);
	                if (win) {
	                    win.affected();
	                } else {
	                    ZMessage.alert(locale('invalidWinNoAff', {
	                        wno: wno,
	                        event: that.prof.id
	                    }));
	                }
	            });
	            return;
	        }
	        var type = src.type();
	
	        if (additionalAffect === 'page') {
	            if (type === 'window') {
	                src.parent().parent().reset();
	            } else if (type === 'frame') {
	                src.parent().reset();
	            }
	            return;
	        }
	
	        if (additionalAffect === 'frame') {
	            if (type === 'window') {
	                frame = src.parent().reset();
	            } else if (type === 'frame') {
	                src.reset();
	            }
	        }
	
	
	    }
	} );
	
	ZEventHandler.ehandlerList = {};
	
	// The handler can be a function or ZEventHanlder object
	ZEventHandler.add = function( eid, handler ) {
	    var handlers = this.ehandlerList[ eid ] || [];
	    handlers.push( handler );
	    this.ehandlerList[ eid ] = handlers;
	};
	
	// Trigger
	ZEventHandler.trig = function( src, eid, callbackForSource ) {
	
	    ZUserData.add( '2-LAST_EVENT_SRC_ID', src.id() );
	    ZUserData.add( '2-LAST_EVENT_SRC_NO', src.no() );
	    ZUserData.add( '2-LAST_EVENT_ID', eid );
	    var handlers = this.ehandlerList[ eid ] || [];
	
	    for ( var i = handlers.length - 1; i >= 0; i-- ) {
	        var h = handlers[ i ];
	        if ( typeof h === 'function' ) {
	            h( src, callbackForSource );
	        } else if ( h instanceof ZEventHandler ) {
	            h.execute( src, callbackForSource );
	        }
	    }
	    if (!handlers.length && typeof callbackForSource === 'function') {
	        callbackForSource();
	    }
	};
	
	ZEventHandler.removeById = function( eid ) {
	    delete this.ehandlerList[ eid ];
	};
	module.exports = ZEventHandler;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	var locale = __webpack_require__(6);
	var ZMessage = __webpack_require__(43);
	var ZContext = __webpack_require__(44);
	var Util = {
	    testCondition: function( cond ) {
	        if ( !cond ) return true;
	        cond = cond
	            .replace( /\sOR\s/gi, function() {
	                return ' || ';
	            } )
	            .replace( /\sAND\s/gi, function() {
	                return ' && ';
	            } )
	            .replace( /<>/g, function() {
	                return '!=';
	            } )
	            .replace( /[^=<>]=[^=]/g, function(s) {
	                return s.replace('=', '==');
	            } )
	            .replace( /@(\d+-\w+(\.\w+)*)@/g, function( s, $1 ) {
	                return  JSON.stringify( ZContext.value($1) );
	            } );
	        if ( !cond ) return true;
	
	        try {
	            return new Function( 'return ' + cond )();
	        } catch ( e ) {
	            ZMessage.alert( locale('invalidCond', {exp: cond}) );
	            return false;
	        }
	    },
	
	    execScript: function( funcScript, args ) {
	        if ( !funcScript ) return null;
	        try {
	            // Parse context
	            funcScript = funcScript.replace(/@(\d+-\w+(\.\w+)*)@/g, function(s, $1) {
	                return  JSON.stringify( ZContext.value($1) );
	            });
	
	            return new Function( funcScript ).apply( this, args );
	        } catch ( e ) {
	            ZMessage.alert( {
	                content: locale('scriptErr')
	                     + '<a class="ui-state-error">'
	                     + e.message
	                     + '</a><br> Script:<br>'
	                     + funcScript,
	                width: 240
	            } );
	            console.error(e);
	            return null;
	        }
	    }
	};
	
	module.exports = Util;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var locale = __webpack_require__(6);
	var Util = __webpack_require__(51);
	var ZElement = __webpack_require__(45);
	var ZMessage = __webpack_require__(43);
	var ZAction = ZElement.extend( {
	    init: function( prof ) {
	        this.prof = prof;
	    },
	    perform: function() {
	        var acts = this.prof.actions;
	        var src = this.prof.srcElem;
	        for ( var i in acts ) {
	            var act = acts[ i ];
	            if ( Util.testCondition( act.cond ) ) {
	                var actName = {
	                    j: '_jump',
	                    a: '_affect',
	                    r: '_reset',
	                    po: '_pop',
	                    pu: '_push'
	                }[ act.type ];
	
	                var exec = this[ actName ];
	
	                if ( typeof exec === 'function' && src && act.tar ) {
	                    exec.apply( this, [ src, act ] );
	                }
	            }
	        }
	    },
	    _jump: function( src, act ) {
	        var tar = act.tar;
	        if ( !tar ) {
	            return;
	        }
	
	        var frame = src.parent()
	          , page = frame.parent();
	        
	        var pre = tar[0];
	        var no = tar.substring(1);
	
	        if ( pre === 'w' ) { // Target is window.
	            var tarWin = frame.children( no );
	            if ( tarWin ) {
	                src.close();
	
	                if (src.isInContainer()) {
	                    var cid = src.id() + '-container';
	                    tarWin.appendToContainer( cid );
	                }
	
	                tarWin.open(!!act.affect);
	            } else {
	                var err = new Error(locale('invalidJump', {
	                    srcId: src.id(),
	                    tarId: tar
	                }));
	                ZMessage.alert(err.message);
	                throw err;
	            }
	        } else if ( pre === 'f' ) { // Target is frame
	            frame.close();
	            page.openFrame( no );
	
	        } else if ( pre === 'p' ) { // Target is page
	            var pj = frame.getPageJump(no);
	            if (!pj) {
	                return ZMessage.alert('[Dev Error] Invalid page id of ' + no + ' to jump.');
	            }
	            var params = {};
	            (pj.params || []).forEach(function(p) {
	                var val = p.value;
	                if (/^\d+\-\w+(\.\w+)*$/.test(val)) {
	                    val = '@' + val + '@';
	                }
	                params[p.name] = Util.execScript('return ' + val);
	            });
	            
	            if (pj.jumpType === 'internal') {
	                return Enhancer.openPage(pj.pageId, params);
	            }
	
	            var pageManager = __webpack_require__(47);
	            pageManager.setPageData(pj.pageId, params);
	            if (pj.jumpType === 'standalone') {
	                window.open(Enhancer.STANDALONE_PAGE_BASE_URL + pj.pageId)
	            } else {
	                window.open(window.location.pathname + '#' + pj.pageId);
	            }
	        }
	    },
	    _affect: function( src, act ) {
	        var tar = act.tar;
	        var pre = tar[0]
	          , no = tar.substring(1)
	          , frame = src.parent()
	          , page = frame.parent();
	        
	        // if ( pre === 'w' ) {
	        var tarWin = frame.children( no );
	        if ( tarWin ) {
	            tarWin.affected();
	        } else {
	            var err = new Error( locale('invalidAffect') + tar );
	            ZMessage.alert(err.message);
	            throw err;
	        }
	    },
	    _reset: function( src, act ) {
	        var tar = act.tar;
	        if ( !tar ) {
	            return;
	        }
	
	        var frame = src.parent()
	          , page = frame.parent();
	        
	        var pre = tar[0];
	        var no = tar.substring(1);
	
	        if ( pre === 'w' ) { // Target is window.
	            var tarWin = frame.children( no );
	            if ( tarWin ) {
	                tarWin.reset();
	            } else {
	                var err = new Error(locale('invalidReset', {
	                    tarId: tar
	                }));
	                ZMessage.alert(err.message);
	                throw err;
	            }
	        } else if ( pre === 'f' ) { // Target is frame
	            var tarFrame = page.children( no );
	            tarFrame.reset();
	        }
	    },
	    _pop: function( src, act ) {
	        var tar = act.tar;
	        var pre = tar[0]
	          , no = tar.substring(1)
	          , frame = src.parent()
	          , page = frame.parent();
	        
	        if ( pre === 'w' ) {
	            var tarWin = frame.children( no );
	            if ( tarWin ) {
	                tarWin.pop(!!act.affect);
	            } else {
	                var err = new Error( locale('invalidPop') + tar );
	                ZMessage.alert(err.message);
	                throw err;
	            }
	        } else if ( pre === 'f' ) {
	            // var tarFrame = page.children( no );
	            page.popFrame( no );
	        }
	    },
	    _push: function( src, act ) {
	        var tar = act.tar;
	        var pre = tar[0]
	          , no = tar.substring(1)
	          , frame = src.parent()
	          , page = frame.parent();
	        
	        if ( pre === 'w' ) {
	            var tarWin = frame.children( no );
	            if ( tarWin ) {
	                src.push();
	                if ( !!act.affect ) {
	                    tarWin.affected();
	                }
	            } else {
	                var err = new Error( locale('invalidPush') + tar );
	                ZMessage.alert(err.message);
	                throw err;
	            }
	        } else if ( pre === 'f' ) {
	            var parentNo = src.parent().no();
	            var tarFrame = page.children( no );
	            if ( parentNo === no ) {
	                src.push();
	            } else {
	                src.parent().push();
	            }
	            if ( !!act.affect ) {
	                tarFrame.reset();
	            }
	        }
	    }
	} );
	
	module.exports = ZAction;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var locale = __webpack_require__(6);
	var ZMessage = __webpack_require__(43);
	var ZContext = __webpack_require__(44);
	var ZFactory = __webpack_require__(46);
	var ZUserData = __webpack_require__(41);
	var IO = {
	    getSourceData: function( sourceId, criteria, callback, errCallback ) {
	        var E = __webpack_require__(40);
	
	        if ( !sourceId ) {
	            return;
	        }
	
	        var ids = sourceId.split('_');
	
	        var entity = ZFactory.getEntityById('p' + ids[0] + '-w' + ids[1])
	            || ZFactory.getEntityById('p' + ids[0] + '-f' + ids[1]);
	
	        var ds = entity.prof.datasources[ids[2]];
	
	        var dsInfo = 'Source Id: '+ ids[2] + ', Window Id: ' + ids[1];
	
	        if (!ds) {
	            return ZMessage.alert(locale('invalidSrcId') + dsInfo);
	        }
	
	        var finalDataCallback = function(data) {
	            var localProcess;
	            if (ds.localProcessEnabled) {
	                try {
	                    localProcess = ds.localProcess.replace(/@(\d+-\w+(\.\w+)*)@/g, function(s, $1) {
	                        return JSON.stringify(ZContext.value($1));
	                    });
	                    localProcess = eval('(' + localProcess + ')');
	                } catch (e) {
	                    return ZMessage.alert(locale('lpSyntaxErr') + e.message + ' ' + dsInfo);
	                }
	
	                try {
	                    data = localProcess(data);
	                } catch(e) {
	                    return ZMessage.alert(locale('lpExeErr') + e.message + ' ' + dsInfo);
	                }
	            }
	            try {
	                callback(data);
	            } catch(e) {
	                Enhancer.ZMessage.alert(locale('dscallbackErr') + e.message);
	                console.error(e);
	            }
	        };
	
	        // STATIC
	        if (ds.type === 'static') {
	            if (ds.dataType === 'text') {
	                finalDataCallback(ds.query);
	                return;
	            }
	            try {
	                var data = JSON.parse(ds.query);
	                finalDataCallback(data);
	            } catch (e) {
	                ZMessage.alert(locale('invalidStatic') + dsInfo);
	            }
	            return;
	        }
	
	        // VARIABLE
	        if (ds.type === 'variable') {
	            // server variable
	            if (/^\w+(\.\w+)*$/.test(ds.query)) {
	                this.getServerContext(ds.query, function(data) {
	                    finalDataCallback(data);
	                });
	                return;
	            } 
	            // client variable
	            else { 
	                var data = ZContext.value(ds.query);
	                return finalDataCallback(data);
	            }
	            
	        }
	        // JSONP
	        if (ds.type === 'jsonp') {
	            var params = criteria.params || {};
	            var url = ds.query.replace(/@(\d+-\w+(\.\w+)*)@/g, function(s, $1) {
	                return params[$1];
	            });
	            $.jsonp({
	                url: url,
	                callbackParameter: 'callback',
	                timeout: 5000,
	                success: function(result) {
	                    finalDataCallback(result);
	                },
	                error: function(e) {
	                    console.error('jsonp calling failed: ' + dsInfo);
	                    console.error('url: ' + url);
	                    console.error(e);
	                }
	            });
	
	            return;
	        }
	
	        // HTTP PROXY
	        if (ds.type === 'http') {
	
	            var params = criteria.params || {};
	            for ( var i in params ) {
	                params[ i.toUpperCase() ] = params[ i ];
	            }
	            criteria.params = params;
	
	            $.ajax( {
	                url: E.HTTPPROXY_DATA_URL + sourceId,
	                dataType: 'json',
	                type: 'post',
	                contentType: 'application/json',
	                data: JSON.stringify(criteria),
	                success: function( result ) {
	                    if (!result.success) {
	                        if (typeof errCallback === 'function') {
	                            return errCallback(result)
	                        }
	                        return ZMessage.alert(result.message);
	                    }
	                    if (ds.dataType === 'text') {
	                        finalDataCallback(result.data);
	                        return;
	                    }
	                    try {
	                        var data = JSON.parse(result.data);
	                        return finalDataCallback(data);
	                    } catch (e) {
	                        ZMessage.alert(locale('invalidHttpJson') + dsInfo);
	                    }
	                    finalDataCallback( result.data );
	                },
	                error: function( e ) {
	                    if (e.status === 401) {
	                        return E.unauthorized();
	                    }
	                    alert( e.responseText );
	                    console.error( e );
	                }
	            } );
	
	            return;
	        }
	
	        // CUSTOM HTTP INTERFACE
	        if (ds.type === 'custom') {
	            var params = criteria.params || {};
	            var url = E.getCustomInterfaceUrl(ds.query);
	            url += '?' + (ds.queryStr || '').replace(/@(\d+-\w+(\.\w+)*)@/g, function(s, $1) {
	                var val = params[$1.toUpperCase()];
	                if (typeof val === 'object') {
	                    val = JSON.stringify(val);
	                }
	                return encodeURIComponent(val);
	            });
	
	            $.ajax({
	                url: url,
	                type: 'get',
	                dataType: ds.dataType,
	                success: function(data) {
	                    finalDataCallback( data );
	                },
	                error: function(err) {
	                    ZMessage.alert(locale('customInterfaceErr', {
	                        name: ds.query} ));
	                    console.log(err);
	                }
	            });
	            return;
	        }
	
	        criteria = $.extend( {
	            params: {},
	            format: 'object',
	            paged: false,
	            page: 1,
	            rowNum: 0,
	            countRecords: false,
	            metaData: false,
	            sortBy: ''
	        }, criteria );
	
	        var params = criteria.params || {};
	        for ( var i in params ) {
	            params[ i.toUpperCase() ] = params[ i ];
	        }
	
	        criteria.params = params;
	
	        if (criteria.filters) {
	            criteria.filters = typeof criteria.filters === 'string' 
	                ? JSON.parse( criteria.filters )
	                : criteria.filters
	        }
	        
	        $.ajax( {
	            url: E.RDB_DATA_URL + sourceId,
	            dataType: 'json',
	            type: 'post',
	            data: JSON.stringify(criteria),
	            contentType: 'application/json',
	            success: function( result ) {
	                if (!result.success) {
	                    if (typeof errCallback === 'function') {
	                        return errCallback(result)
	                    }
	                    return ZMessage.alert(result.message);
	                }
	                var data = result.data;
	                finalDataCallback( data );
	            },
	            error: function( e ) {
	                if (e.status === 401) {
	                    return E.unauthorized();
	                }
	                alert( e.responseText );
	                console.error( e );
	            }
	        } );
	    },
	    exportSourceData: function(sourceId, criteria) {
	        var url = this.getDataExportURL(sourceId, criteria);
	        if (!url) {
	            console.error(locale('invalidExportUrl'));
	            return;
	        }
	        window.open(url);
	    },
	    getDataExportURL: function(sourceId, criteria) {
	        if ( !sourceId || !criteria ) {
	            return;
	        }
	        var E = __webpack_require__(40);
	        criteria = $.extend( {
	            params: {},
	            format: 'object',
	            colModel: [],
	            paged: false,
	            page: 1,
	            rowNum: 0,
	            sortBy: ''
	        }, criteria );
	
	        var params = criteria.params || {};
	        for ( var i in params ) {
	            params[ i.toUpperCase() ] = params[ i ];
	        }
	        
	        criteria.params = params;
	
	        if (criteria.filters) {
	            criteria.filters = typeof criteria.filters === 'string' 
	                ? JSON.parse( criteria.filters )
	                : criteria.filters
	        }
	
	        var url = E.getDataURL(sourceId) 
	                   + "/export?criteria="
	                   + encodeURIComponent(JSON.stringify( criteria ));
	        return url;
	    },
	    getServerContext: function(varName, callback) {
	        var E = __webpack_require__(40);
	
	        $.get(E.SERVER_CONTEXT_URL + varName)
	            .done(function(result) {
	                if (result.success) {
	                    return callback(result.data);
	                }
	                ZMessage.alert(locale('getServerContextErr') + result.message);
	            })
	            .error(function(err) {
	                console.error(err);
	                ZMessage.alert(locale('getServerContextErr'));
	            });
	    },
	    callProcedure: function(prof, callback) {
	        var E = __webpack_require__(40);
	        
	        var applyData;
	        if ( prof.beforeSubmit ) {
	            var applyData = Util.execScript( prof.beforeSubmit );
	            if ( false === applyData ) {
	                return;
	            }
	        }
	        // Prepare parameters to submit
	        var params = ZContext.values( prof.params || [] );
	
	        // Append or override value from applyData into parameters.
	        applyData = applyData || {};
	        for (var i in applyData) {
	            params[i.toUpperCase()] = applyData[i];
	        }
	
	        // Submit to server
	        $.ajax( {
	            url: E.SUBMIT_URL + prof.id,
	            type: 'post',
	            async: prof.async,
	            data: JSON.stringify({
	                params: params
	            }),
	            dataType: 'json',
	            contentType: 'application/json',
	            success: function( result ) {
	                ZUserData.add( '2-LAST_PROCEDURE_RESULT', result );
	                if (result.success && prof.popMsg) {
	                    ZMessage.alert( result.message );
	                }
	                callback && callback(result);
	            },
	            error: function( err ) {
	                if (err.status === 401) {
	                    return E.unauthorized();
	                }
	                ZMessage.alert( err.responseText );
	                console.log(err);
	                result = {
	                    success: false,
	                    message: 'Execution failed'
	                };
	            }
	        } );
	    }
	};
	
	module.exports = IO;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var ZEntity = __webpack_require__(49);
	var ZWindow = __webpack_require__(55);
	
	var ZEventHandler = __webpack_require__(50);
	var containersTpl = __webpack_require__(58);
	
	var isNumeric = /^\d+(\.\d+)?$/;
	
	var ZFrame = ZEntity.extend( {
	    construct: function( prof ) {
	        var that = this;
	        this.$obj = $( '<div>' ).addClass( 'zframe' )
	            .attr( 'id', this._id );
	        this.parent().$obj.append( this.$obj );
	
	        if ( prof.containers && prof.containers.length ) {
	            var containers = prof.containers.map(function(c) {
	                c.isTabs = c.type === 'tabs';
	                c.isAccordion = c.type === 'accordion';
	                if (isNumeric.test(c.width)) {
	                    c.width = c.width + 'px';
	                }
	                if (isNumeric.test(c.height)) {
	                    c.height = c.height + 'px';
	                }
	                if (isNumeric.test(c.y)) {
	                    c.y = c.y + 'px';
	                }
	                if (isNumeric.test(c.x)) {
	                    c.x = c.x + 'px';
	                }
	                return c;
	            });
	            var containersHTML = containersTpl(containers);
	
	            this.$obj.append(containersHTML);
	        }
	        this.$obj.find('.container-tabs').tabs();
	        this.$obj.find('.container-accordion').accordion({
	            heightStyle: 'content'
	        });
	
	        this.trig('init', function() {
	            var winProfs = that.prof.windows;
	            var mainWinNo = that.prof.mainWinNo;
	            var zwindow;
	
	            var prof;
	            for ( var i in winProfs ) {
	                prof = winProfs[i]; 
	                zwindow = new ZWindow( prof, that );
	                if ( mainWinNo && ( mainWinNo == zwindow.no() ) ) {
	                    that.mainWin = zwindow;
	                }
	            }
	            that.activate();
	        });
	    },
	    pop: function( enforceEffect ) {
	        var that = this;
	        that.$obj.css( {
	            zIndex: 9,
	            position: 'absolute',
	            top: 0,
	            left: 0
	        } );
	
	        var $page = $( '#page' + that.pageId() );
	
	        if ( !that.$mask ) {
	            that.$mask = $( '<div class="ui-widget-overlay">' )
	                .css( {
	                    zIndex: 2,
	                    width: '100%',
	                    height: '100%',
	                    position: 'absolute',
	                    top: 0,
	                    left: 0
	                } )
	                .attr('id', this.id() + '-mask')
	                .appendTo( $page );
	
	            that.$close = $('<i class="fa fa-close"></i>')
	                .css({
	                    zIndex: 999,
	                    cursor: 'pointer',
	                    position: 'absolute',
	                    top: '12px',
	                    right: '12px',
	                    fontSize: '18px'
	                })
	                .appendTo(that.$obj)
	                .attr('id', this.id() + '-close')
	                .on('click', function() {
	                    that.push();
	                });
	        }
	        that.$mask.show();
	        return that.open(enforceEffect);
	    },
	    activate: function() {
	        var that = this;
	        var wins = this.children();
	        for ( var i in wins ) {
	            ZEventHandler.add( wins[ i ].id() + '-onComplete', function(src) {
	                if ( that.isAllWinsActive() ) {
	                    that.status( 'active' );
	                    that.trig( 'onComplete' );
	                    if (that.isFrameReady) {
	                        return;
	                    }
	                    that.isFrameReady = true;
	                    for ( var k in wins ) {
	                        wins[k].onFrameReady();
	                    }
	                }
	            } );
	        }
	
	        // If this frame has main window, then activate it firstly
	        if ( this.mainWin ) {
	            // listen onComplete event
	            ZEventHandler.add( this.mainWin.id() + '-onComplete', function(src) {
	                // This event should be only handled only once.
	                if (src.isAllWinsActived) {
	                    return;
	                }
	                src.isAllWinsActived = true;
	                for ( var i in wins ) {
	                    if ( wins[ i ] != that.mainWin ) {
	                        wins[ i ].activate();
	                    }
	                }
	            } );
	            this.mainWin.activate();
	        } else {
	            var wins = this.children();
	            for ( var i in wins ) {
	                wins[ i ].activate();
	            }
	        }
	    },
	    isAllWinsActive: function() {
	        var wins = this.children();
	        for ( var i in wins ) {
	            if ( !wins[i].isActive() ) {
	                return false;
	            }
	        }
	        return true;
	    },
	    affected: function( zContext ) {
	        var zWins = this.children();
	        for ( var i in zWins ) {
	            zWins[ i ].affected( zContext );
	        }
	        return this;
	    },
	    reset: function() {
	        if (this.$mask) {
	            this.$mask.hide();
	        }
	        var zWins = this.children();
	        for ( var i in zWins ) {
	            zWins[ i ].reset();
	        }
	        return this;
	    },
	    getPageJump: function(no) {
	        return (this.profile().pageJump || {})[no];
	    }
	} );
	
	module.exports = ZFrame;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var locale = __webpack_require__(6);
	var E = __webpack_require__(40);
	var ZEntity = __webpack_require__(49);
	var ZButton = __webpack_require__(56);
	var ZEventHandler = __webpack_require__(50);
	var ZContext = __webpack_require__(44);
	var ZWidget = __webpack_require__(57);
	
	var ZWindow = ZEntity.extend( {
	    construct: function( prof ) {
	        var settings = E.windowSettings;
	        prof.titleAlign = prof.titleAlign || settings.titleAlign || 'left';
	        prof.headHeight = prof.headHeight || settings.headHeight || 32;
	        prof.headFontSize = prof.headFontSize || settings.headFontSize || 14;
	        prof.headFontWeight = prof.headFontWeight || settings.headFontWeight || 'bold';
	        prof.topStyle = prof.topStyle || settings.topStyle || 'default';
	        prof.barHeight = prof.barHeight || settings.barHeight || 32;
	        prof.barPadding = prof.barPadding || settings.barPadding || 6;
	        prof.buttonFontSize = prof.buttonFontSize || settings.buttonFontSize || 13;
	        prof.buttonFontWeight = prof.buttonFontWeight || settings.buttonFontWeight || 'normal';
	        prof.buttonAlign = prof.buttonAlign || settings.buttonAlign || 'center';
	        prof.corner = prof.corner || settings.corner || 'square';
	        prof.buttonCorner = prof.buttonCorner || settings.buttonCorner || 'rounded';
	        prof.effect = prof.effect || settings.effect || 'none';
	        prof.paddingLeft = (prof.paddingLeft === '' || typeof prof.paddingLeft === 'undefined') 
	                            ? settings.paddingLeft : prof.paddingLeft;
	        prof.paddingRight = (prof.paddingRight === '' || typeof prof.paddingRight === 'undefined') 
	                            ? settings.paddingRight : prof.paddingRight;
	        prof.paddingTop = (prof.paddingTop === '' || typeof prof.paddingTop === 'undefined') 
	                            ? settings.paddingTop : prof.paddingTop;
	        prof.paddingBottom = (prof.paddingBottom === '' || typeof prof.paddingBottom === 'undefined') 
	                            ? settings.paddingBottom : prof.paddingBottom;
	        
	        var that = this;
	        this.prof = prof;
	
	        // Draw window
	        var wid = this.id();
	        this.$obj = $( '<div>' ).attr( 'id', wid ).addClass( 'zwindow' );
	        var $container = $('#' + wid + '-container');
	
	        if ( !$container.length ) {
	            this.$obj.appendTo( this.parent().$obj )
	                .css( {
	                    visibility: prof.open ? 'visible' : 'hidden',
	                    position: prof.autoHeight ? 'relative' : 'absolute',
	                    zIndex: prof.zIndex || 0,
	                    width: prof.width,
	                    height: prof.autoHeight ? 'auto' : prof.height,
	                    top: /%$/.test(prof.y) ? prof.y : (prof.y + 'px'),
	                    left: /%$/.test(prof.x) ? prof.x : (prof.x + 'px')
	                } );
	
	            // Horizontal & Vertical Center;
	            if (prof.hCenter & prof.vCenter) {
	                this.$obj.css({
	                    left: '50%',
	                    top: '50%',
	                    transform: 'translate(-50%, -50%)'
	                });
	            } else {
	                if (prof.hCenter) {
	                    this.$obj.css('left', '50%')
	                        .css('transform', 'translateX(-50%)');
	                }
	                if (prof.vCenter) {
	                    this.$obj.css('top', '50%')
	                        .css('transform', 'translateY(-50%)');
	                }
	            }
	            if (typeof prof.width === 'string' && prof.width.match(/\%/)) {
	                $('#nav-handle').on('click', function() {
	                    // if (that.widget) {
	                    setTimeout(function() {
	                        that.resize();
	                    }, 320);
	                    // }
	                });
	            }
	        } else {
	            this.$obj.appendTo( $container )
	                .css( {
	                    visibility: prof.open ? 'visible' : 'hidden',
	                    position: 'relative',
	                    width: '100%',
	                    height: $container.hasClass('zwindow-container-tab') ? '100%' : prof.height
	                } );
	            this.__isInContainer = true;
	        }
	
	        this.status( 'initializing' );
	
	        var widgetHeight = 'calc(100% - '
	                + ((prof.top ? (prof.headHeight || 32) + 1 : 0)
	                +   (prof.bar !== 'none' ? (prof.barHeight || 32) + 1 : 0))
	                + 'px)';
	
	        this.$widget = $( '<div>' ).addClass( 'zwindow-body' )
	                .addClass('zwidget')
	                .addClass('ui-widget-content')
	                .attr( 'id', wid + '-widget' )
	                .css( {
	                    width: '100%',
	                    height: widgetHeight,
	                    boxSizing: 'border-box',
	                    position: 'relative',
	                    overflow: 'auto'
	                } )
	                .appendTo( this.$obj );
	
	        if (prof.paddingLeft) {
	            this.$widget.css("padding-left", prof.paddingLeft + 'px');
	        }
	        if (prof.paddingRight) {
	            this.$widget.css("padding-right", prof.paddingRight + 'px');
	        }
	        if (prof.paddingTop) {
	            this.$widget.css("padding-top", prof.paddingTop + 'px');
	        }
	        if (prof.paddingBottom) {
	            this.$widget.css("padding-bottom", prof.paddingBottom + 'px');
	        }
	        // Set top
	        if ( prof.top ) {
	            var style = prof.topStyle === 'transparent' ? '' : {
	                            none: 'ui-widget-content',
	                            highlight: 'ui-widget-header',
	                            default: 'ui-state-default'
	                        }[prof.topStyle] || 'ui-state-default';
	
	            this.$top = $( '<div>' ).addClass( 'zwindow-header' )
	                    .addClass( style )
	                    .attr( 'id', wid + '-top' )
	                    .css( { 
	                        textAlign: prof.titleAlign,
	                        height: prof.headHeight + 'px',
	                        lineHeight: prof.headHeight + 'px'
	                    } )
	                    .insertBefore( this.$widget );
	
	            if (prof.headIcon) {
	                this.$top.append( '<i class="head-icon ' + prof.headIcon + '"></i>' );
	            }
	
	            $('<span class="win-title">' + (prof.title || '') + '</span>')
	                .css({
	                    fontSize: prof.headFontSize + 'px',
	                    fontWeight: prof.fontWeight
	                })
	                .appendTo(this.$top);
	
	            var $btnSet = $('<div>').addClass('win-header-btn-set')
	                .css('float', prof.titleAlign === 'right' ? 'left' : 'right')
	                .appendTo(this.$top);
	
	            var appendMethodName = prof.titleAlign === 'right' ? 'appendTo' : 'prependTo';
	    
	            if (prof.closeBtn) {
	                $('<i>').addClass('ui-state-error fas fa-times')[appendMethodName]($btnSet)
	                    .on('click', function() {
	                        if (that.$mask) {
	                            that.$mask.hide();
	                        }
	                        that.close();
	                    });
	            }
	            if (prof.refreshBtn) {
	                $('<i>').addClass('ui-state-active fas fa-sync-alt')[appendMethodName]($btnSet)
	                    .on('click', function() {
	                        that.affected()
	                    });
	            }
	            if (prof.maximizeBtn) {
	                $('<i>').addClass('ui-state-default fas fa-expand')[appendMethodName]($btnSet)
	                    .on('click', function() {
	                        if ($(this).hasClass('fa-expand')) {
	                            that.maximize();
	                            $(this).removeClass('fa-expand').addClass('fa-compress');
	                        } else {
	                            that.minimize();
	                            $(this).removeClass('fa-compress').addClass('fa-expand');
	                        }
	                    });
	            }
	        }
	        // Set bar
	        if ( prof.bar !== 'none' ) {
	            var $bar = $( '<div>' ).addClass( 'zwindow-bar' )
	                     .addClass( 'ui-widget-content' )
	                     .attr( 'id', wid + '-bar' );
	
	            if ( prof.bar === 'top' ) {
	                $bar.insertBefore( this.$widget );
	            } else {
	                $bar.insertAfter( this.$widget );
	            }
	
	            this.$bar = $bar;
	
	            // Create buttons
	            for ( var i in prof.buttons ) {
	                var zbtn = new ZButton( prof.buttons[i], this );
	                this._children[ zbtn.id() ] = zbtn;
	            }
	            prof.barPadding = prof.barPadding || 4;
	            prof.barHeight = prof.barHeight || 32;
	            $bar.css('text-align', prof.buttonAlign || 'right')
	                .css('height', prof.barHeight + 'px')
	                .css('padding', (prof.barPadding + 'px ' + (prof.barPadding*2) + 'px'))
	        }
	
	        // No left border, Right border, top, bottom
	        if ( prof.noLeftBorder ) {
	            this.$widget.css( 'border-left', 'none' );
	            if ( this.$top ) {
	                this.$top.css( 'border-left', 'none' );
	            }
	            if ( this.$bar ) {
	                this.$bar.css( 'border-left', 'none' );
	            }
	        }
	        if ( prof.noRightBorder ) {
	            this.$widget.css( 'border-right', 'none' );
	            if ( this.$top ) {
	                this.$top.css( 'border-right', 'none' );
	            }
	            if ( this.$bar ) {
	                this.$bar.css( 'border-right', 'none' );
	            }
	        }
	        if ( prof.noTopBorder ) {
	            if ( this.$top ) {
	                this.$top.css( 'border-top', 'none' );
	            } else {
	                this.$widget.css( 'border-top', 'none' );
	            }
	        }
	
	        if ( prof.noBottomBorder ) {
	            if ( this.$bar ) {
	                this.$bar.css( 'border-bottom', 'none' );
	            } else {
	                this.$widget.css( 'border-bottom', 'none' );
	            }
	        }
	
	        // Draggable
	        if ( !$container.length && prof.draggable ) {
	            this.$obj.draggable( { handle: '#' + wid + '-top', cursor: 'move' } );
	        }
	
	        // Corner rounded
	        if (prof.corner === 'rounded' || prof.corner === 'top-rounded') {
	            if (prof.top) {
	                this.$top.css('border-top-right-radius', '4px');
	                this.$top.css('border-top-left-radius', '4px');
	            } else {
	                this.$widget.css('border-top-right-radius', '4px');
	                this.$widget.css('border-top-left-radius', '4px');
	            }
	            if (prof.corner === 'rounded') {
	                if (prof.bar === 'bottom') {
	                    this.$bar.css('border-bottom-right-radius', '4px');
	                    this.$bar.css('border-bottom-left-radius', '4px');
	                } else {
	                    this.$widget.css('border-bottom-right-radius', '4px');
	                    this.$widget.css('border-bottom-left-radius', '4px');
	                }
	            }
	        } else if (prof.corner === 'bottom-rounded') {
	            if (prof.bar === 'bottom') {
	                this.$bar.css('border-bottom-right-radius', '4px');
	                this.$bar.css('border-bottom-left-radius', '4px');
	            } else {
	                this.$widget.css('border-bottom-right-radius', '4px');
	                this.$widget.css('border-bottom-left-radius', '4px');
	            }
	        }
	    },
	    activate: function() {
	        var that = this;
	
	        // this.status( 'binding' );
	        this.block();
	
	        ZEventHandler.add( this.id() + '-widgetComplete', function() {
	            that.unblock();
	            that.status( 'active' );
	
	            // To wait the widget instance is assigned to this window. @see #tag1.
	            setTimeout(function() {
	                that.trig( 'onComplete' );
	                that.startRegularRefresh();
	            }, 1);
	        } );
	        this.trig('init', function() {
	            if ( that.$top && that.prof.dTitle ) {
	                that.$top.find('.win-title').html( ZContext.parse( that.prof.dTitle, that.prof.highlightDTVar ) );
	            }
	            if ( !that.prof.widgetName ) {
	                that.$widget.append( 
	                '<p class="ui-state-error"><i class="fa fa-warning"></i>'
	                  + locale('noWidget') + '</p>' );
	                that.unblock();
	                that.status( 'unavailable' );
	                that.trig( 'onComplete' );
	            }
	
	            // If this window is in container, init the widget until the container is displayed
	            // in case the container dimision is not correct. Else init directly.
	            if (that.isInContainer()) {
	                var $con = that.$obj.parent();
	                if ($con.is(':visible')) {
	                    return that.initWidget();
	                }
	
	                // Watch the display change or not
	                var observer = new MutationObserver(function(mutations) {
	                    mutations.forEach(function(mutationRecord) {
	                        var display = $(mutationRecord.target).css('display');
	                        if (display === 'block') {
	                            that.initWidget();
	                        }
	                    });
	                });
	                observer.observe($con[0], { attributes : true, attributeFilter : ['style'] });
	                return;
	            }
	            if (that.prof.open) {
	                that.initWidget();
	            }
	        });
	    },
	    initWidget: function() {
	        if (this._widgetInitialized) {
	            return;
	        }
	        var that = this;
	        var zcontext = this.getDependentContext();
	        ZWidget.createInstance(
	            this.prof.widgetName
	            , this.prof.widgetVersion
	            , this.prof.widgetProfile
	            , this
	            , zcontext
	            , function( instance ) {
	            // #tag1
	            that.widget = instance;
	        } );
	        this._widgetInitialized = true;
	    },
	    startRegularRefresh: function() {
	        var that = this;
	        if (that.refreshInterval) {
	            return;
	        }
	        if (that.prof.regularRefresh === true && that.prof.refreshInterval) {
	            var interval = that.prof.refreshInterval * 1000;
	            if (interval < 300) {
	                interval = 300;
	            }
	            that.refreshInterval = setInterval(function() {
	                that.affected();
	            },  interval);
	        }
	    },
	    stopRegularRefresh: function() {
	        if (this.refreshInterval) {
	            clearInterval(this.refreshInterval);
	            delete this.refreshInterval;
	        }
	        return this;
	    },
	    getDependentContext: function() {
	        var values = ZContext.values( this.prof.clientSideDependencies );
	        return new ZContext( values );
	    },
	    isIndependent: function() {
	        return this.prof.clientSideDependencies.length === 0;
	    },
	    affected: function(reason) {
	        var reasonNo = reason ? reason.split('-')[0] : null;
	        var that = this;
	        if (that.status() === 'affecting') {
	            return;
	        }
	        that.status('affecting');
	        (function(win) {
	            setTimeout(function() {
	                var zContext = win.getDependentContext();
	                var dTitle = win.prof.dTitle;
	                if ( win.$top && dTitle ) {
	                    win.$top.find('.win-title').html( ZContext.parse( dTitle, win.prof.highlightDTVar ) );
	                }
	                if ( reasonNo != that.no() && win.widget ) {
	                    win.widget.setZContext( zContext );
	                    win.widget.affected( zContext );
	                }
	                var buttons = win.children();
	                for (var i in buttons) {
	                    buttons[i].affected();
	                }
	                win.status('active');
	            }, 1);
	        })(that);
	        return that;
	    },
	    open: function(enforceEffect) {
	        if ( enforceEffect ) {
	            this.affected();
	        }
	        if (!this._widgetInitialized) {
	            this.initWidget();
	        }
	        var effect = this.prof.effect;
	        if ( effect !== 'none' ) {
	            //TODO: workaround for drop slide effect if the window is in center;
	            this.$obj.css('visibility', 'visible').hide().show(effect);
	        } else {
	            this.$obj.css('visibility', 'visible').hide().show();
	        }
	    },
	    close: function() {
	        var effect = this.prof.effect;
	        if ( effect !== 'none' ) {
	            this.$obj.hide( effect );
	        } else {
	            this.$obj.hide();
	        }
	        return this;
	    },
	    isWidgetInitialized: function() {
	        return !!this._widgetInitialized;
	    },
	    reset: function() {
	        if (this.isBinding()) {
	            return;
	        }
	        var that = this;
	        var prof = this.prof;
	
	        this.stopRegularRefresh();
	
	        // Reset position
	        if (!this.isInContainer()) {
	            this.$obj.css( {
	                position: 'absolute',
	                top: prof.y,
	                left: prof.x
	            } );
	        }
	        if (this.$top) {
	            var title = prof.dTitle 
	                 ? ZContext.parse( this.prof.dTitle, true )
	                 : (prof.title ? prof.title : '');
	
	            this.$top.find('.win-title').html( title );
	        }
	
	        if (this.$mask) {
	            this.$mask.hide();
	        }
	        if (!this.profile().open) {
	            this.close();
	        }
	
	        this.__resetWidget();
	
	        // reset buttons
	        for ( var i in this._children ) {
	            this._children[i].reset();
	        }
	        return this;
	    },
	    __resetWidget: function() {
	        var that = this;
	        // Recreate Widget to Reset Widget so that props of widget instance are clear.
	        if (!that._widgetInitialized) {
	            return
	        }
	        if ( that.widget ) {
	            that.widget.destroy();
	            delete that.widget;
	        }
	
	        if ( !that.prof.widgetName ) {
	            return;
	        }
	        // Recreate widget
	        that.$widget.html( '' );
	        var $newWidget = that.$widget.clone();
	        that.$widget.remove();
	        if (that.$top) {
	            $newWidget.insertAfter(that.$top);
	        } else {
	            that.$obj.prepend($newWidget);
	        }
	        that.$widget = $newWidget;
	
	        // this.status( 'binding' );
	        var zcontext = that.getDependentContext();
	        ZWidget.createInstance(
	            that.prof.widgetName
	            , that.prof.widgetVersion 
	            , that.prof.widgetProfile
	            , that
	            , zcontext
	            , function( instance ) {
	                // # tag1
	                that.widget = instance;
	        } );
	    },
	    maximize: function() {
	        this.lastTop = this.$obj.css('top');
	        this.lastLeft = this.$obj.css('left');
	        // this.lastWidth = this.$obj.css('width');
	        // this.lastHeight = this.$obj.css('height');
	        this.lastZIndex = this.$obj.css('z-index');
	        this.lastTransform = this.$obj.css('transform');
	
	        this.$obj.css({
	                top: 0,
	                left: 0,
	                width: '100%',
	                height: '100%',
	                transform: 'none',
	                zIndex: 11,
	                position: 'absolute'
	            })
	            .appendTo($('body'));
	
	        this.resize();
	        return this;
	    },
	    minimize: function() {
	        var prof = this.profile();
	        if (!this.isInContainer()) {
	            this.$obj.css({
	                    top: this.lastTop,
	                    left: this.lastLeft,
	                    width: prof.width,
	                    height: prof.autoHeight ? 'auto' : prof.height,
	                    zIndex: this.lastZIndex,
	                    transform: this.lastTransform,
	                    position: 'absolute'
	                })
	                .appendTo(this.parent().$obj);
	        } else {
	            var $con = $('#' + this.id() + '-container');
	            this.$obj.css({
	                    top: this.lastTop,
	                    left: this.lastLeft,
	                    width: '100%',
	                    height: $con.hasClass('zwindow-container-tab') ? '100%' : prof.height,
	                    zIndex: this.lastZIndex,
	                    transform: this.lastTransform,
	                    position: 'relative'
	                })
	                .appendTo($con);
	        }
	        this.resize();
	    },
	    resize: function() {
	        if (this.widget) {
	            this.widget.onResize();
	        }
	    },
	    isValid: function() {
	        return this.widget.isValid();
	    },
	    isBinding: function() {
	        return this._status === 'binding';
	    },
	    onFrameReady: function() {
	        var zcontext = this.getDependentContext();
	        if (this.widget) {
	            this.widget.onFrameReady( zcontext );
	        }
	    },
	    isInContainer: function() {
	        return !!this.__isInContainer;
	    },
	    appendToContainer: function( containerId ) {
	        if ( this.isInContainer() ) {
	            return;
	        }
	        var $container = $('#' + containerId);
	        this.$obj.css({
	            position: 'relative',
	            top: 0,
	            left: 0,
	            width: '100%',
	            height: $container.hasClass('zwindow-container-tab')
	                ? '100%' : this.prof.height,
	            marginLeft: 0,
	            marginTop: 0
	        }).appendTo( $container );
	        this.__isInContainer = true;
	    },
	    fetchData: function() {
	        if (!this.widget || this.status() === 'initializing' || this.isBinding()) {
	            return this._data;
	        }
	        var data = this.widget.contextData() || {};
	        var d = {};
	        for (var i in data) {
	            d[i.toUpperCase()] = data[i];
	        }
	        return d;
	    },
	    getContainer: function() {
	        return this.$obj;
	    },
	    getWidgetContainer: function() {
	        return this.$widget
	    },
	    __getHalfSize: function(size) {
	        if (!size) {
	            return '0';
	        }
	        var isCalc = /^calc\([1-9](\d*)?(\.\d+)?%\s(\-|\+)\s[1-9](\d*)?(\.\d+)?px\)$/.test(size);
	        if (!isCalc) {
	            return parseFloat((size + '').replace('%', '') || 0) / 2 
	                    + (/%$/.test(size) ? '%' : 'px');
	        }
	
	        var n1 = size.match(/[1-9](\d*)?(\.\d+)?%/)[0];
	        var o = size.match(/\+|\-/)[0];
	        var n2 = size.match(/[1-9](\d*)?(\.\d+)?px/)[0];
	
	        return parseFloat(n1.replace('%', '')) / 2 + '%'
	            + ' ' + o + ' '
	            + parseFloat(n2.replace('px', '')) / 2 + 'px';
	    }
	} );
	
	module.exports = ZWindow;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var locale = __webpack_require__(6);
	var ZUserData = __webpack_require__(41);
	var Util = __webpack_require__(51);
	var ZEventHandler = __webpack_require__(50);
	
	var ZEntity = __webpack_require__(49);
	
	var ZButton = ZEntity.extend( {
	    /**
	     * prof = {
	        id: 'ButtonClick2'
	        name: '删除',
	        icon: 'fa-user-times',
	        available: true,
	        availableCond: '@11-status@ <> 1',
	        unavailableStyle: 'disabled' || 'hidden',
	        unavailableTip: '',
	        updateEvents: ['11-onSelectRow'],
	     } */
	    construct: function( prof ) {
	        this.prof = prof;
	        this._eventId = prof.id;
	        this._type = 'button';
	        var settings = this.parent().profile();
	        var that = this;
	        var btnHeight = settings.barHeight - settings.barPadding*2;
	        this.$obj = $( '<button>' ).addClass( 'zbutton ui-corner-all' )
	              . text( prof.name )
	              . attr( 'eid', this._id )
	              . css( {
	                    fontSize: settings.buttonFontSize + 'px',
	                    fontWeight: settings.buttonFontWeight,
	                    height: btnHeight + 'px',
	                    lineHeight: btnHeight + 'px'
	                } )
	              . appendTo( this.parent().$bar )
	              . addClass( 'zbutton ui-state-default' )
	              . hover(function() {
	                if (!that.isAvailable()) {
	                    return;
	                }
	                $(this).addClass( 'ui-state-hover' );
	              }, function() {
	                $(this).removeClass( 'ui-state-hover' );
	                $(this).removeClass( 'ui-state-active' );
	              } )
	              .on('mousedown', function(e) {
	                if (!that.isAvailable()) {
	                    return;
	                }
	                $(this).addClass( 'ui-state-active' );
	              } )
	              .on('mouseup', function(e) {
	                $(this).removeClass( 'ui-state-active' );
	              } );
	        if ( prof.icon ) {
	            this.$obj.prepend('<i class="' + prof.icon + '"></i>')
	        }
	
	        var buttonCorner = settings.buttonCorner;
	        if ( buttonCorner === 'square' ) {
	            this.$obj.removeClass( 'ui-corner-all' );
	        }
	        that.$obj.bind( 'click', function() {
	            if (!that.isAvailable()) {
	                return;
	            }
	            that.parent().trig( that.prof.id );
	            ZUserData.set( '2-LAST_CLICKED_BTN_ID', that.id() );
	        } );
	
	        // Add lisenter to update button status.
	        var ets = prof.updateEvents || [];
	        for (var i = 0; i < ets.length; i++) {
	            var eid = that.parent().pageId() + '-w' + ets[i];
	
	            ZEventHandler.add(eid, function(e) {
	                var available = Util.testCondition(prof.availableCond)
	                that.setAvailable(available);
	            });
	        }
	        if (prof.availableCond) {
	            that.setAvailable(Util.testCondition(prof.availableCond));
	        } else {
	            that.setAvailable(true);
	        }
	        // Add variable watcher to update button available or false.
	        var pageId = that.parent().pageId()
	        if (prof.availableCond) {
	            var dependencies = prof.availableCond.match(/\d+-\w+(\.\w+)*/g) || [];
	            ZEntity.watchVariableChanges(pageId, dependencies, this);
	        }
	    },
	    id: function() {
	        return this.parent().id() + this._eventId;
	    },
	    setAvailable: function(available) {
	        if (available === false) {
	            this.$obj.addClass('unavailable');
	            if (this.prof.unavailableTip) {
	                this.$obj.attr('title', this.prof.unavailableTip)
	                    .tooltip({
	                        classes: {
	                            'ui-tooltip': 'ui-widget-content'
	                        },
	                        hide: { duration: 150 },
	                        show: { duration: 150 }
	                    });
	            }
	            
	            if (this.prof.unavailableStyle === 'hidden') {
	                this.$obj.hide()
	            }
	
	        } else {
	            this.$obj.removeClass('unavailable');
	            this.$obj.attr('title', '');
	            if (this.prof.unavailableStyle === 'hidden') {
	                this.$obj.show()
	            }
	        }
	    },
	    isAvailable: function() {
	        return !this.$obj.hasClass('unavailable');
	    },
	    affected: function() {
	        var cond = this.prof.availableCond;
	        if (cond) {
	            var available = Util.testCondition(cond);
	            this.setAvailable(available);
	        }
	    },
	    reset: function() {
	        this.affected();
	    }
	} );
	
	module.exports = ZButton;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var locale = __webpack_require__(6);
	var E = __webpack_require__(40);
	var ZMessage = __webpack_require__(43);
	var ZEntity = __webpack_require__(49);
	var IO = __webpack_require__(53);
	
	var ZWidget = ZEntity.extend( {
	    init: function( prof, zwin, zContext ) {
	        this._id = zwin.id() + '-widget';
	        this._wno = zwin.no();
	        this._type = 'widget';
	        this._parent = zwin;
	        this._requestQueue = {};
	        this.$div = zwin.$widget;
	        this.zContext = zContext;
	        this._prof = prof;
	        zwin.widget = this;
	
	        // A map containing last requested source data params of values
	        // which helps to avoid unnecessary request via judging whether
	        // the param of values is changed or not before sending request.
	        this._lastSourceDataParamValues = {};
	
	        prof = $.extend(true, {}, prof);
	        this.construct( prof, zContext );
	        this._$data = {};
	    },
	    // @should be overridden
	    construct: function( prof, zContext ) {
	        var $div = $( '<div>' ).html( '<p class="ui-state-error">'
	                    + locale('widgetInitErr', {name: this._name, id: this._id})
	                    + '</p>' );
	
	        this.$div.append( $div );
	        this.trig( 'complete' );
	    },
	    // @should be overided
	    getData: function() {
	        return {};
	    },
	    getWindowNo: function() {
	        return this._wno;
	    },
	    getContainer: function() {
	        return this.$div;
	    },
	    isInTabContainer: function() {
	        return this.$div.parent().parent().hasClass('zwindow-container-tab');
	    },
	    isInAccordionContainer: function() {
	        return this.$div.parent().parent().hasClass('zwindow-container-panel');
	    },
	    // This method returns all data including these accumulated by widget events triggering
	    // and the result return by getData(). The parent window will call this method.
	    contextData: function() {
	        var data = $.extend(this._$data, this.getData());
	
	        // var wno = this.parent().no()
	        // for ( var i in data ) {
	        //     context.add( wno + '-' + i, data[ i ] );
	        // }
	        return data;
	    },
	    /* setData: function( data ) {}, */
	
	    // @should be overided
	    isValid: function() {
	        return locale('widgetNoIsValidFunc') + this._id;
	    },
	    setZContext: function( zContext ) {
	        this.zContext = zContext;
	    },
	    getZContext: function() {
	        return this.zContext;
	    },
	    setProfile: function( prof ) {
	        this._prof = prof;
	    },
	    getProfile: function() {
	        return this._prof;
	    },
	    // @should be overritten
	    affected: function( zContext ) {
	        this.getContainer().append( '<br>' )
	            .append('<a style="color:red">This window is affected!</a>');
	    },
	    // @should be overritten
	    destroy: function() {
	        this.getContainer().html('');
	    },
	    // All widget instance events will be converted to window events.
	    // The callbackForSource is optional for the widget do some revert things after
	    // event is repsoned.
	    trig: function( eventName, data, callbackForSource ) {
	
	        if (typeof data === 'function') {
	            callbackForSource = data;
	            data = false;
	        }
	
	        if (data) {
	            this._$data = $.extend(this._$data, data);
	        }
	
	        if ( eventName === 'complete' ) {
	            // To avoid the complete event is triggered repeatedly
	            if (this._initialized) {
	                return;
	            }
	            this._initialized = true;
	            this.parent().trig( 'widgetComplete', callbackForSource );
	            
	        } else if (eventName === 'init') {
	            this.parent().trig( 'widgetInit', callbackForSource );
	        } else {
	            this.parent().trig( eventName, callbackForSource );
	        }
	    },
	    // This method whill be called when all windows in this frame is ready.
	    // @should be overritten
	    onFrameReady: function(context) {
	    },
	    // This method will be called when the container resized.
	    // @should be overriten
	    onResize: function() {
	
	    },
	    getSourceData: function( sourceId, criteria, callback, errCallback ) {
	        if (!sourceId) {
	            var err = new Error(locale('noSrcId'));
	            ZMessage.alert(err.message);
	            return console.error(err);
	        }
	
	        // Compatible for the case that no criteria is passed in 
	        // and the second paramter is a callback function.
	        if (typeof arguments[1] === 'function') {
	            callback = criteria;
	            criteria = {};
	        }
	        criteria = criteria || {};
	
	        var win = this.parent();
	        var fullSrcId = win.pageId() + '_' + win.no() + '_' + sourceId;
	
	        var params = win.getSourceDataParams( sourceId );
	        
	        this._lastSourceDataParamValues[sourceId] = JSON.stringify( params );
	
	        // Params can be overritten by caller.
	        if (criteria.params) {
	            var name;
	            for (var i in criteria.params) {
	                name = /^\w+(\.\w+)*$/.test(i) 
	                        ? this._wno + '-' + i.toUpperCase()
	                        : i.toUpperCase();
	                // Override only if datasource params depends it.
	                if (typeof params[name] !== 'undefined') {
	                    params[name] = criteria.params[i];
	                }
	            }
	        }
	        criteria.params = params;
	
	        var key = fullSrcId + '-' + JSON.stringify(criteria);
	
	        if (this._requestQueue[key]) {
	            this._requestQueue[key].push(callback);
	            return;
	        }
	        this._requestQueue[key] = [callback];
	        var that = this;
	        (function(id, cri, key0) {
	            IO.getSourceData(id, cri, function(data) {
	                var queue = that._requestQueue[key0];
	                var len = queue.length;
	                for (var i = 0; i < len; i++) {
	                    queue[i](data);
	                }
	                delete that._requestQueue[key0];
	            }, errCallback);
	        })(fullSrcId, criteria, key);
	    },
	    isSourceDataParamsChanged: function( sourceId ) {
	        var win = this.parent();
	        var values = JSON.stringify(win.getSourceDataParams( sourceId ));
	        return this._lastSourceDataParamValues[sourceId] !== values;
	    },
	    getSourceDataParamsProvidedByThisWidget: function( sourceId ) {
	        if ( !sourceId ) {
	            var err = new Error(locale('noSrcId'));
	            ZMessage.alert( err.message );
	            return console.error( err );
	        }
	        var ds = this.parent().profile().datasources[sourceId];
	        if (!ds) {
	            var err = new Error(locale('invalidSrcId') + sourceId);
	            ZMessage.alert(err.message);
	            return console.error(err);
	        }
	        var params = ds.params || [];
	        var p = [];
	
	        for (var i in params) {
	            if (~params[i].indexOf(this._wno + '-')) {
	                p.push(params[i].split('-')[1]);
	            }
	        }
	        return p;
	    },
	    getSourceDataParamNames: function( sourceId ) {
	        return this.parent().getSourceDataParamNames();
	    },
	    exportSourceData: function( sourceId, criteria, callback ) {
	        if (!sourceId) {
	            var err = new Error(locale('noSrcId'));
	            ZMessage.alert( err.message );
	            return console.error(err);
	        }
	        criteria = criteria || {};
	        
	        var win = this.parent();
	        var fullSrcId = win.pageId() + '_' + win.no() + '_' + sourceId;
	        if (!criteria.params) { // Params can be specified by caller
	            criteria.params = win.getSourceDataParams(sourceId);
	        }
	        IO.exportSourceData(fullSrcId, criteria, callback);
	    },
	    getSourceDataUrl: function(sourceId) {
	        var win = this.parent();
	        var fullSrcId = win.pageId() + '_' + win.no() + '_' + sourceId;
	        return E.getDataURL(fullSrcId);
	    },
	    // shortcut method for trigging widget complete event.
	    complete: function() {
	        this.trig('complete');
	    },
	    getBaseUrl: function() {
	        var win = this.parent();
	        prof = win.profile();
	        return E.getWidgetBaseUrl(prof.widgetName + '/' + prof.widgetVersion) + '/' + E.getLang();
	    }
	} );
	
	ZWidget.ClassSet = {};
	
	ZWidget.register = function( name, prototype ) {
	    if ( !name || !prototype ) {
	        return;
	    } else if ( typeof this.ClassSet[ name ] === 'function' ) {
	        ZMessage.alert(locale('reRegWidgetErr', {name: name}));
	
	    } else {
	        this.ClassSet[ name ] = this.extend( prototype );
	        console.log( 'Widget [' + name + '] is registered.');
	    }
	};
	
	ZWidget.loadingQueue = {};
	
	var queryString = location.search.substr(1);
	var query = {};
	var host = location.hostname.split('.').slice(-2).join('.');
	queryString.split('&').forEach(function(item){
	    item = item.split('=');
	    query[item[0]] = item[1];
	});
	
	ZWidget.load = function( widgetName, widgetVersion, callback ) {
	    var nameVersion = widgetName + '/' + widgetVersion;
	    // If widget has been registered return.
	    if ( this.ClassSet[nameVersion] ) return;
	
	    // If this widget is on loadding, push callback into queue.
	    if ( this.loadingQueue[nameVersion] ) {
	        return this.loadingQueue[nameVersion].push(callback);
	    }
	    var queue = this.loadingQueue[nameVersion] = [callback];
	    (function(q, wnv) {
	        // load script
	        var scriptPath = E.getWidgetBaseUrl(wnv) 
	                       + '/' + E.getLang() + '/index.js';
	
	        if (query.debug === 'true' && query.widgetName === widgetName && query.path) {
	            var tmp = query.path.replace(/https?:\/\//,'').split('/')[0];
	            tmp = tmp.split(':')[0];
	            if (tmp.endsWith(host) || tmp.endsWith('localhost') 
	                || tmp.endsWith('127.0.0.1')) {
	                scriptPath = query.path;
	            }
	        }
	
	
	        var script = document.createElement('script');  
	        script.setAttribute('type', "text/javascript");
	        if (Enhancer.simulatorHack) {
	            scriptPath = Enhancer.simulatorHack.getScriptPath(scriptPath);
	        }
	        script.setAttribute('src', scriptPath);
	        var heads = document.getElementsByTagName('head');  
	        heads[0].appendChild(script);
	        script.onload = script.onreadystatechange = function() {
	            var cb;
	            while (cb = q.pop()) {
	                cb();
	            }
	        };
	    })(queue, nameVersion);
	};
	
	/****
	 * @param name {String} The widget name.
	 * @param version {String} The widget version.
	 * @param profile {Object} The widget profile described in JSON.
	 * @param zWindow {ZEntity} The window to which this widget belongs.
	 * @param zContext {ZContext} The context values needed by this widget for initializing.
	 * @param callback {Function} Considering that the widget implementer code is loaded
	 *      asynchronously.
	 */
	ZWidget.createInstance = function( name, version, profile, zWindow, zContext, callback ) {
	    if ( !profile ) return;
	    if (!name) {
	        zWindow.$widget.html('Widget unbound');
	        return zWindow.trig( 'widgetComplete' );
	    }
	    var WidgetClass = ZWidget.ClassSet[ name + '/' + version ];
	    if ( typeof WidgetClass === 'function' ) {
	        callback( new WidgetClass( profile, zWindow, zContext ) );
	    } else {
	        ZWidget.load( name, version, function() {
	            WidgetClass = ZWidget.ClassSet[name + '/' + version];
	            callback( new WidgetClass( profile, zWindow, zContext ) );
	        } );
	        // return new this( prof, zWindow, zContext );
	    }
	};
	
	E.registerWidget = function( prototype ) {
	    var err = new Error('Widget path error');
	    var info = err.stack.split(/[\r\n]/);
	    // # In case a null line is matched in firefox.
	    info = info.filter(function(l) {
	        return !!l;
	    });
	    var last = info[info.length - 1];
	    last = last.replace(' at ', '').replace(/(^\s*)|(\s*$)/g, '');
	    var widgetName = last.match(/\w+(-|\w)+\w+\/widget\/\d+\.\d+\.\d+/g);
	    if (!widgetName && Enhancer.simulatorHack) {
	        return ZWidget.register(Enhancer.simulatorHack.getWidgetName(), prototype);
	    }
	    if (widgetName) {
	        widgetName = widgetName[0].replace(/\/widget\//, '/');
	    } else {
	        return console.error(err);
	    }
	    ZWidget.register(widgetName, prototype);
	};
	
	
	module.exports = ZWidget;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(9);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});
	
	  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isAccordion : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isTabs : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\n";
	},"2":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;
	
	  return "<div class=\"container-accordion\" style=\"position: absolute; height: "
	    + alias4(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data}) : helper)))
	    + "; width: "
	    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
	    + "; left: "
	    + alias4(((helper = (helper = helpers.x || (depth0 != null ? depth0.x : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"x","hash":{},"data":data}) : helper)))
	    + "; top: "
	    + alias4(((helper = (helper = helpers.y || (depth0 != null ? depth0.y : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"y","hash":{},"data":data}) : helper)))
	    + "; "
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noLeftBorder : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noRightBorder : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noTopBorder : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noBottomBorder : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\">\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.wins : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</div>\n";
	},"3":function(container,depth0,helpers,partials,data) {
	    return "border-left: none;";
	},"5":function(container,depth0,helpers,partials,data) {
	    return "border-right: none;";
	},"7":function(container,depth0,helpers,partials,data) {
	    return "border-top: none;";
	},"9":function(container,depth0,helpers,partials,data) {
	    return "border-bottom: none;";
	},"11":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;
	
	  return "  <h3>"
	    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
	    + "</h3>\n  <div id=\""
	    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\" class=\"zwindow-container-panel\"></div>\n";
	},"13":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;
	
	  return "<div class=\"container-tabs\" style=\"position: absolute; height: "
	    + alias4(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data}) : helper)))
	    + "; width: "
	    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
	    + "; left: "
	    + alias4(((helper = (helper = helpers.x || (depth0 != null ? depth0.x : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"x","hash":{},"data":data}) : helper)))
	    + "; top: "
	    + alias4(((helper = (helper = helpers.y || (depth0 != null ? depth0.y : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"y","hash":{},"data":data}) : helper)))
	    + "; "
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noLeftBorder : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noRightBorder : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noTopBorder : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noBottomBorder : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\">\n  <ul>\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.wins : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "  </ul>\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.wins : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</div>\n";
	},"14":function(container,depth0,helpers,partials,data) {
	    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;
	
	  return "    <li><a href=\"#"
	    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\">"
	    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
	    + "</a></li>\n";
	},"16":function(container,depth0,helpers,partials,data) {
	    var helper;
	
	  return "  <div id=\""
	    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
	    + "\" class=\"zwindow-container-tab\"></div>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"useData":true});

/***/ })
/******/ ]);
//# sourceMappingURL=home.js.map