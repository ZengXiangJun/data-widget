!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(1),n(3);var r=n(4),a=n(6),i=n(26),o=n(29),s="©2017 - 2018 Wuyuan Inc.",l={init:function(e){if($("body").html(a({locale:r(),isStandalone:window.isStandalone,footer:e.footer||{content:s}})),e.favicon&&$("head").find("link[rel=icon]").attr("href",e.favicon),e.backgroundImgUrl){$("body").css("backgroundImage",'url("'+e.backgroundImgUrl+'")');var t=(0===e.transparency||""===e.transparency||"undefined"==typeof e.transparency?.2:e.transparency,1-e.transparency);$(".bg-mask").css("opacity",t),$("#header").css("opacity",.9),$("#container").css("opacity",.9),$("#bottom").css("opacity",.9)}else $("body").css("backgroundImage","none"),$(".bg-mask").css("opacity",1),$("#header").css("opacity",1),$("#container").css("opacity",1),$("#bottom").css("opacity",1);window.isStandalone?$("body").addClass("standalone"):(i.init(e),o.init(e,window.menuNodes),$("#container").height($(window).height()-$("#header").height()-2),$(window).on("resize",function(){$("#container").height($(window).height()-$("#header").height()-2)}))}};$(function(){l.init(frontSettings)})},function(e,t){},,function(e,t){},function(e,t,n){var r=n(5),a="__lang__";e.exports=function(e,t){return e?a===e?"en":(t=t||{},r[e]?r[e].replace(/\{\{(\w+)\}\}/g,function(e,n){return t[n]}):function(){return console.warn("Key "+e+" is not found in locale"),"<?No Translation>"}()):r}},function(e,t){e.exports={lang:"中文",beforeExit:"Are you sure to exit?",logoutFailedMsg:"Failed to logout, please close window directly.",newWin:"New Window",sessionTimeoutTips:"Your session has been expired, please relogin.",themeSetting:"Theme Setting",theme:"Theme",logout:"Logout",message:"Message",error:"Error",debugInfo:"Debug Info(will not show in production):",invalidVar:"[Dev Error] Invalid variable name: ",noProfileErr:"[Dev Error] Can not create an element without profile.",invalidWinNoCheck:"[Dev Error] Invalid window number for window check, please check whether the window is existed or not. Window No. : ",noValidation:"[Widget Error] No validation result is returned. ",callThenTimeout:"[Widget Dev Error] The then method of promise object is not called or timeout in isValid function which is defined by widget.",invalidJump:"[Dev Error] Can not jump from {{srcId}} to {{tarId}} due to they are not contained in the same frame.",invalidAffect:"[Dev Error] Can not affect target: ",invalidReset:"[Dev Error] Can not reset {{tarId}} due to they are not contained in the same frame.",invalidPop:"[Dev Error] Can not pop target: ",invalidPush:"[Dev Error] Can not push target: ",widgetInitErr:"[Dev Error] Widget [{{name}}] has not been implemented or has error. Instance ID: {{id}}",widgetNoIsValidFunc:"[Widget Dev Error] The isValid function is not implemented by this window widget: ",noSrcId:"[Widget Dev Error] Must specify source id for getSourceData.",invalidSrcId:"[Widget Dev Error] Invalid datasource id: ",reRegWidgetErr:"[Widget Dev Error] Widget [{{name}}] can not be registered again!",lpSyntaxErr:"[Dev Error] Local process function has syntax error: ",lpExeErr:"[Dev Error] Error occured when executing local process: ",invalidStatic:"[Dev Error] Invaild JSON data in static datasource. ",invalidHttpJson:"[Dev Error] Invaild JSON data responsed from http proxy request. ",invalidExportUrl:"[Dev Error] Invaild criteria to get export url.",customInterfaceErr:"[Dev Error] Error occured when request custom interface {{name}}",getServerContextErr:"Failed to get Variable data from server.",noWidget:"This window has no widget set to show.",areUsure:"Are you sure?",yes:"Yes",no:"No",preview:"Preview",save:"Save",saveAs:"Save As",invalidCond:"[Dev Error] Invalid boolean expression: {{exp}}",scriptErr:"[Dev Error] Script error caused by:",dscallbackErr:"[Dev Error] Error occured when executing the callback after getting source data. See more details in console.",befSyntaxErr:"[Dev Error]The before-enter-function has syntax error: {{message}}. See more details in console.",cannotEnter:"Can not enter system, because {{message}}",befExError:"[Dev Error] Error occured when executing before-enter-script {{message}}. See more details in console.",close:"Close",invalidWinNoAff:"[Dev Error] The window {{wno}} not found. Please check if the window number is correct in addition affect settings。Event: {{event}}"}},function(e,t,n){var r=n(7);e.exports=(r.default||r).template({1:function(e,t,n,r,a){return'<div id="header" class="ui-widget-content"></div>'},3:function(e,t,n,r,a){return'<div id="navigator" class="ui-state-default"></div>'},5:function(e,t,n,r,a){var i;return'    \t<iframe id="config-frame"></iframe>\n    \t<div id="bottom" class="ui-widget-content">\n\t\t\t<div id="footer-content">'+e.escapeExpression(e.lambda(null!=(i=null!=t?t.footer:t)?i.content:i,t))+'</div>\n\t\t\t<div class="powered-by ui-state-highlight">\n\t    \t\tPowered by\n\t    \t\t<div class="logo" onclick="window.open(\'https://enhancer.io\')">\n\t    \t\t\t <span></span><c>nhancer 3.1</c>\n\t    \t\t</div>\n\t    \t</div>\n\t\t</div>\n'},compiler:[7,">= 4.0.0"],main:function(e,t,n,r,a){var i,o=null!=t?t:e.nullContext||{},s=e.lambda,l=e.escapeExpression;return(null!=(i=n.unless.call(o,null!=t?t.isStandalone:t,{name:"unless",hash:{},fn:e.program(1,a,0),inverse:e.noop,data:a}))?i:"")+'\n<div id="container">\n    '+(null!=(i=n.unless.call(o,null!=t?t.isStandalone:t,{name:"unless",hash:{},fn:e.program(3,a,0),inverse:e.noop,data:a}))?i:"")+'\n    <div id="page-container">\n'+(null!=(i=n.unless.call(o,null!=t?t.isStandalone:t,{name:"unless",hash:{},fn:e.program(5,a,0),inverse:e.noop,data:a}))?i:"")+'    </div>\n</div>\n<div class="bottom ui-widget-content">\n  <div class="toolbar">\n      <i id="preview" title="'+l(s(null!=(i=null!=t?t.locale:t)?i.preview:i,t))+'" class="preview fa fa-play ui-corner-all ui-state-default"></i>\n      <i id="saveProfile" title="'+l(s(null!=(i=null!=t?t.locale:t)?i.save:i,t))+'" class="save fa fa-save ui-corner-all ui-state-default"></i>\n      <i id="saveAs" title="'+l(s(null!=(i=null!=t?t.locale:t)?i.saveAs:i,t))+'" class="save fa fa-file-alt ui-corner-all ui-state-default"></i>\n  </div>\n</div>\n<div class="bg-mask"></div>'},useData:!0})},function(e,t,n){e.exports=n(8).default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function i(){var e=new s.HandlebarsEnvironment;return p.extend(e,s),e.SafeString=u.default,e.Exception=c.default,e.Utils=p,e.escapeExpression=p.escapeExpression,e.VM=v,e.template=function(t){return v.template(t,e)},e}t.__esModule=!0;var o=n(9),s=a(o),l=n(23),u=r(l),d=n(11),c=r(d),f=n(10),p=a(f),h=n(24),v=a(h),g=n(25),m=r(g),w=i();w.create=i,m.default(w),w.default=w,t.default=w,e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){this.helpers=e||{},this.partials=t||{},this.decorators=n||{},l.registerDefaultHelpers(this),u.registerDefaultDecorators(this)}t.__esModule=!0,t.HandlebarsEnvironment=a;var i=n(10),o=n(11),s=r(o),l=n(12),u=n(20),d=n(22),c=r(d),f="4.0.11";t.VERSION=f;var p=7;t.COMPILER_REVISION=p;var h={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};t.REVISION_CHANGES=h;var v="[object Object]";a.prototype={constructor:a,logger:c.default,log:c.default.log,registerHelper:function(e,t){if(i.toString.call(e)===v){if(t)throw new s.default("Arg not supported with multiple helpers");i.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){if(i.toString.call(e)===v)i.extend(this.partials,e);else{if("undefined"==typeof t)throw new s.default('Attempting to register a partial called "'+e+'" as undefined');this.partials[e]=t}},unregisterPartial:function(e){delete this.partials[e]},registerDecorator:function(e,t){if(i.toString.call(e)===v){if(t)throw new s.default("Arg not supported with multiple decorators");i.extend(this.decorators,e)}else this.decorators[e]=t},unregisterDecorator:function(e){delete this.decorators[e]}};var g=c.default.log;t.log=g,t.createFrame=i.createFrame,t.logger=c.default},function(e,t){"use strict";function n(e){return d[e]}function r(e){for(var t=1;t<arguments.length;t++)for(var n in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],n)&&(e[n]=arguments[t][n]);return e}function a(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1}function i(e){if("string"!=typeof e){if(e&&e.toHTML)return e.toHTML();if(null==e)return"";if(!e)return e+"";e=""+e}return f.test(e)?e.replace(c,n):e}function o(e){return!e&&0!==e||!(!v(e)||0!==e.length)}function s(e){var t=r({},e);return t._parent=e,t}function l(e,t){return e.path=t,e}function u(e,t){return(e?e+".":"")+t}t.__esModule=!0,t.extend=r,t.indexOf=a,t.escapeExpression=i,t.isEmpty=o,t.createFrame=s,t.blockParams=l,t.appendContextPath=u;var d={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},c=/[&<>"'`=]/g,f=/[&<>"'`=]/,p=Object.prototype.toString;t.toString=p;var h=function(e){return"function"==typeof e};h(/x/)&&(t.isFunction=h=function(e){return"function"==typeof e&&"[object Function]"===p.call(e)}),t.isFunction=h;var v=Array.isArray||function(e){return!(!e||"object"!=typeof e)&&"[object Array]"===p.call(e)};t.isArray=v},function(e,t){"use strict";function n(e,t){var a=t&&t.loc,i=void 0,o=void 0;a&&(i=a.start.line,o=a.start.column,e+=" - "+i+":"+o);for(var s=Error.prototype.constructor.call(this,e),l=0;l<r.length;l++)this[r[l]]=s[r[l]];Error.captureStackTrace&&Error.captureStackTrace(this,n);try{a&&(this.lineNumber=i,Object.defineProperty?Object.defineProperty(this,"column",{value:o,enumerable:!0}):this.column=o)}catch(e){}}t.__esModule=!0;var r=["description","fileName","lineNumber","message","name","number","stack"];n.prototype=new Error,t.default=n,e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){o.default(e),l.default(e),d.default(e),f.default(e),h.default(e),g.default(e),w.default(e)}t.__esModule=!0,t.registerDefaultHelpers=a;var i=n(13),o=r(i),s=n(14),l=r(s),u=n(15),d=r(u),c=n(16),f=r(c),p=n(17),h=r(p),v=n(18),g=r(v),m=n(19),w=r(m)},function(e,t,n){"use strict";t.__esModule=!0;var r=n(10);t.default=function(e){e.registerHelper("blockHelperMissing",function(t,n){var a=n.inverse,i=n.fn;if(t===!0)return i(this);if(t===!1||null==t)return a(this);if(r.isArray(t))return t.length>0?(n.ids&&(n.ids=[n.name]),e.helpers.each(t,n)):a(this);if(n.data&&n.ids){var o=r.createFrame(n.data);o.contextPath=r.appendContextPath(n.data.contextPath,n.name),n={data:o}}return i(t,n)})},e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(10),i=n(11),o=r(i);t.default=function(e){e.registerHelper("each",function(e,t){function n(t,n,i){u&&(u.key=t,u.index=n,u.first=0===n,u.last=!!i,d&&(u.contextPath=d+t)),l+=r(e[t],{data:u,blockParams:a.blockParams([e[t],t],[d+t,null])})}if(!t)throw new o.default("Must pass iterator to #each");var r=t.fn,i=t.inverse,s=0,l="",u=void 0,d=void 0;if(t.data&&t.ids&&(d=a.appendContextPath(t.data.contextPath,t.ids[0])+"."),a.isFunction(e)&&(e=e.call(this)),t.data&&(u=a.createFrame(t.data)),e&&"object"==typeof e)if(a.isArray(e))for(var c=e.length;s<c;s++)s in e&&n(s,s,s===e.length-1);else{var f=void 0;for(var p in e)e.hasOwnProperty(p)&&(void 0!==f&&n(f,s-1),f=p,s++);void 0!==f&&n(f,s-1,!0)}return 0===s&&(l=i(this)),l})},e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(11),i=r(a);t.default=function(e){e.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new i.default('Missing helper: "'+arguments[arguments.length-1].name+'"')})},e.exports=t.default},function(e,t,n){"use strict";t.__esModule=!0;var r=n(10);t.default=function(e){e.registerHelper("if",function(e,t){return r.isFunction(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||r.isEmpty(e)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(t,n){return e.helpers.if.call(this,t,{fn:n.inverse,inverse:n.fn,hash:n.hash})})},e.exports=t.default},function(e,t){"use strict";t.__esModule=!0,t.default=function(e){e.registerHelper("log",function(){for(var t=[void 0],n=arguments[arguments.length-1],r=0;r<arguments.length-1;r++)t.push(arguments[r]);var a=1;null!=n.hash.level?a=n.hash.level:n.data&&null!=n.data.level&&(a=n.data.level),t[0]=a,e.log.apply(e,t)})},e.exports=t.default},function(e,t){"use strict";t.__esModule=!0,t.default=function(e){e.registerHelper("lookup",function(e,t){return e&&e[t]})},e.exports=t.default},function(e,t,n){"use strict";t.__esModule=!0;var r=n(10);t.default=function(e){e.registerHelper("with",function(e,t){r.isFunction(e)&&(e=e.call(this));var n=t.fn;if(r.isEmpty(e))return t.inverse(this);var a=t.data;return t.data&&t.ids&&(a=r.createFrame(t.data),a.contextPath=r.appendContextPath(t.data.contextPath,t.ids[0])),n(e,{data:a,blockParams:r.blockParams([e],[a&&a.contextPath])})})},e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){o.default(e)}t.__esModule=!0,t.registerDefaultDecorators=a;var i=n(21),o=r(i)},function(e,t,n){"use strict";t.__esModule=!0;var r=n(10);t.default=function(e){e.registerDecorator("inline",function(e,t,n,a){var i=e;return t.partials||(t.partials={},i=function(a,i){var o=n.partials;n.partials=r.extend({},o,t.partials);var s=e(a,i);return n.partials=o,s}),t.partials[a.args[0]]=a.fn,i})},e.exports=t.default},function(e,t,n){"use strict";t.__esModule=!0;var r=n(10),a={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(e){if("string"==typeof e){var t=r.indexOf(a.methodMap,e.toLowerCase());e=t>=0?t:parseInt(e,10)}return e},log:function(e){if(e=a.lookupLevel(e),"undefined"!=typeof console&&a.lookupLevel(a.level)<=e){var t=a.methodMap[e];console[t]||(t="log");for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];console[t].apply(console,r)}}};t.default=a,e.exports=t.default},function(e,t){"use strict";function n(e){this.string=e}t.__esModule=!0,n.prototype.toString=n.prototype.toHTML=function(){return""+this.string},t.default=n,e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function i(e){var t=e&&e[0]||1,n=m.COMPILER_REVISION;if(t!==n){if(t<n){var r=m.REVISION_CHANGES[n],a=m.REVISION_CHANGES[t];throw new g.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+r+") or downgrade your runtime to an older version ("+a+").")}throw new g.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}}function o(e,t){function n(n,r,a){a.hash&&(r=h.extend({},r,a.hash),a.ids&&(a.ids[0]=!0)),n=t.VM.resolvePartial.call(this,n,r,a);var i=t.VM.invokePartial.call(this,n,r,a);if(null==i&&t.compile&&(a.partials[a.name]=t.compile(n,e.compilerOptions,t),i=a.partials[a.name](r,a)),null!=i){if(a.indent){for(var o=i.split("\n"),s=0,l=o.length;s<l&&(o[s]||s+1!==l);s++)o[s]=a.indent+o[s];i=o.join("\n")}return i}throw new g.default("The partial "+a.name+" could not be compiled when running in runtime-only mode")}function r(t){function n(t){return""+e.main(a,t,a.helpers,a.partials,o,l,s)}var i=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=i.data;r._setup(i),!i.partial&&e.useData&&(o=c(t,o));var s=void 0,l=e.useBlockParams?[]:void 0;return e.useDepths&&(s=i.depths?t!=i.depths[0]?[t].concat(i.depths):i.depths:[t]),(n=f(e.main,n,a,i.depths||[],o,l))(t,i)}if(!t)throw new g.default("No environment passed to template");if(!e||!e.main)throw new g.default("Unknown template object: "+typeof e);e.main.decorator=e.main_d,t.VM.checkRevision(e.compiler);var a={strict:function(e,t){if(!(t in e))throw new g.default('"'+t+'" not defined in '+e);return e[t]},lookup:function(e,t){for(var n=e.length,r=0;r<n;r++)if(e[r]&&null!=e[r][t])return e[r][t]},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:h.escapeExpression,invokePartial:n,fn:function(t){var n=e[t];return n.decorator=e[t+"_d"],n},programs:[],program:function(e,t,n,r,a){var i=this.programs[e],o=this.fn(e);return t||a||r||n?i=s(this,e,o,t,n,r,a):i||(i=this.programs[e]=s(this,e,o)),i},data:function(e,t){for(;e&&t--;)e=e._parent;return e},merge:function(e,t){var n=e||t;return e&&t&&e!==t&&(n=h.extend({},t,e)),n},nullContext:Object.seal({}),noop:t.VM.noop,compilerInfo:e.compiler};return r.isTop=!0,r._setup=function(n){n.partial?(a.helpers=n.helpers,a.partials=n.partials,a.decorators=n.decorators):(a.helpers=a.merge(n.helpers,t.helpers),e.usePartial&&(a.partials=a.merge(n.partials,t.partials)),(e.usePartial||e.useDecorators)&&(a.decorators=a.merge(n.decorators,t.decorators)))},r._child=function(t,n,r,i){if(e.useBlockParams&&!r)throw new g.default("must pass block params");if(e.useDepths&&!i)throw new g.default("must pass parent depths");return s(a,t,e[t],n,0,r,i)},r}function s(e,t,n,r,a,i,o){function s(t){var a=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],s=o;return!o||t==o[0]||t===e.nullContext&&null===o[0]||(s=[t].concat(o)),n(e,t,e.helpers,e.partials,a.data||r,i&&[a.blockParams].concat(i),s)}return s=f(n,s,e,o,r,i),s.program=t,s.depth=o?o.length:0,s.blockParams=a||0,s}function l(e,t,n){return e?e.call||n.name||(n.name=e,e=n.partials[e]):e="@partial-block"===n.name?n.data["partial-block"]:n.partials[n.name],e}function u(e,t,n){var r=n.data&&n.data["partial-block"];n.partial=!0,n.ids&&(n.data.contextPath=n.ids[0]||n.data.contextPath);var a=void 0;if(n.fn&&n.fn!==d&&!function(){n.data=m.createFrame(n.data);var e=n.fn;a=n.data["partial-block"]=function(t){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return n.data=m.createFrame(n.data),n.data["partial-block"]=r,e(t,n)},e.partials&&(n.partials=h.extend({},n.partials,e.partials))}(),void 0===e&&a&&(e=a),void 0===e)throw new g.default("The partial "+n.name+" could not be found");if(e instanceof Function)return e(t,n)}function d(){return""}function c(e,t){return t&&"root"in t||(t=t?m.createFrame(t):{},t.root=e),t}function f(e,t,n,r,a,i){if(e.decorator){var o={};t=e.decorator(t,o,n,r&&r[0],a,i,r),h.extend(t,o)}return t}t.__esModule=!0,t.checkRevision=i,t.template=o,t.wrapProgram=s,t.resolvePartial=l,t.invokePartial=u,t.noop=d;var p=n(10),h=a(p),v=n(11),g=r(v),m=n(9)},function(e,t){(function(n){"use strict";t.__esModule=!0,t.default=function(e){var t="undefined"!=typeof n?n:window,r=t.Handlebars;e.noConflict=function(){return t.Handlebars===e&&(t.Handlebars=r),e}},e.exports=t.default}).call(t,function(){return this}())},function(e,t,n){n(27);var r=n(28),a=n(4);e.exports={init:function(e){this.__settings=e.header||{},$("#header").html(r({locale:a(),projectTitle:e.projectTitle,themeSwitchable:e.themeSwitchable,userInfo:{name:"",roles:""}}));var t=(this.__settings.height||46)+"px";$("#header").css({height:t,lineHeight:t}),e.logoUrl&&($("#header a.menu-button").hide(),$("#header .logo").attr("src",e.logoUrl).show()),$("#header .project-title").css({fontSize:(this.__settings.projectTitleFontSize||"16")+"px",fontWeight:this.__settings.projectTitleFontWeight||"bold"}),this.__settings.backgroundImgUrl&&$("#header").css({backgroundImage:'url("'+this.__settings.backgroundImgUrl+"?t="+(new Date).getTime()+'")',backgroundSize:"100% 100%"}),$("#header").tooltip(),this.__bindEvent()},__bindEvent:function(){}}},function(e,t){},function(e,t,n){var r=n(7);e.exports=(r.default||r).template({compiler:[7,">= 4.0.0"],main:function(e,t,n,r,a){var i,o,s=e.escapeExpression,l=e.lambda;return'<a class="menu-button">\n    <span class="pref"></span>\n</a>\n<img class="logo" src="">\n<a class="project-title">\n'+s((o=null!=(o=n.projectTitle||(null!=t?t.projectTitle:t))?o:n.helperMissing,"function"==typeof o?o.call(null!=t?t:e.nullContext||{},{name:"projectTitle",hash:{},data:a}):o))+'\n</a>\n<div class="path"></div>\n<div class="toolbar ui-widget-content">\n    <span class="logout"><i class="fas fa fa-globe"></i>'+s(l(null!=(i=null!=t?t.locale:t)?i.lang:i,t))+'</span>\n</div>\n<a class="user-info" title="'+s(l(null!=(i=null!=t?t.userInfo:t)?i.roles:i,t))+'">\n    <span class="user-name">\n        <i class="fa fa-user"></i>\n        <label>\n            '+s(l(null!=(i=null!=t?t.userInfo:t)?i.name:i,t))+"\n        </label>\n    </span>\n</a>"},useData:!0})},function(e,t,n){n(30);var r=n(31),a={init:function(e,t){function n(e,t){if(!e)return!1;if("Y"!==e.hidden){var r=$("<li>"),i=$("<a>").append('<i class="'+e.icon+'"></i>').append($("<label>").text(e.node_name)).css("padding-left",24+22*t+"px");if(r.attr("navTo",e.id).attr("isLeaf",e.is_leaf),r.append(i),"none"===a.__settings.itemBorder&&r.css("border","none"),"N"===e.is_leaf){var o=$("<ul>");for(var s in e.children){var l=n(e.children[s],t+1);o.append(l?l:null)}return i.click(function(e){var t=$(this).next(),n=$(this).find("span.fas");t.is(":visible")?(n.length>0&&n.removeClass("fa-angle-down").addClass("fa-angle-left"),t.hide("blind")):(n.length>0&&n.removeClass("fa-angle-left").addClass("fa-angle-down"),t.show("blind"))}).append($('<span class="fas fa-angle-left">')),r.append(o)}return i.attr("id","menu-node-"+e.page_id).attr("navTo",e.page_id),r}}var a=this,i=this.__transferListToForest(t);a.__settings=e.navigator||{};var o=a.__settings.width||220;$("#navigator").width(o).css("max-width",o);var s=parseInt(a.__settings.fontSize||"14")+parseInt(a.__settings.vSpacing||"12");a.$handle=$(r()).appendTo($("#container")).css("left",o-13),a.__settings.expandToggle&&(a.$toggle=$('<div id="nav-toggle"></div>').addClass("ui-state-active fas fa-expand").css({top:s/2-7+"px"}).appendTo($("#navigator")));var l=$("<ul>").addClass("menu").addClass("root").appendTo($("#navigator"));for(var u in i){var d=n(i[u],0);l.append(d)}a.$menuTree=l,a.$menuTree.width(a.__settings.width||220).find("a").css({fontSize:(a.__settings.fontSize||"14")+"px",lineHeight:s+"px",height:s+"px"}).find("span.fa-angle-left").css({margin:parseInt(a.__settings.vSpacing||"12")/2+"px"}),this.__bindEvent(),a.__settings.expandAll&&(a.$toggle?a.$toggle.click():a.expandAll(!0))},__bindEvent:function(){var e=this;e.__settings.expandToggle&&e.$toggle.on("click",function(){$(this).hasClass("fa-expand")?(e.expandAll(!0),$(this).removeClass("fa-expand").addClass("fa-compress")):(e.expandAll(!1),$(this).removeClass("fa-compress").addClass("fa-expand"))}),e.$handle.on("click",function(){var e=$("#navigator"),t=$("#page-container"),n=0,r=parseInt(e.css("max-width").replace("px","")),a=$(this);e.hasClass("closed")?(a.hide().removeClass("open").addClass("close").find("i.fas").removeClass("fa-angle-double-right").addClass("fa-angle-double-left"),e.removeClass("closed").animate({width:r},300,"easeOutQuad",function(){a.show()}),t.animate({marginLeft:n},300,"easeOutQuad")):(a.hide().removeClass("close").addClass("open").find("i.fas").removeClass("fa-angle-double-left").addClass("fa-angle-double-right"),e.addClass("closed").animate({width:n},300,"easeInQuad",function(){a.show()}),t.animate({marginLeft:n},300,"easeInQuad"))});var t=$("#navigator ul.menu.root");t.on("click","li[isleaf=Y] label",function(){t.find(".ui-state-active").removeClass("ui-state-active");var e=$(this).closest("li");e.addClass("ui-state-active");var n=e.children("a").attr("navto");$("#config-frame").prop("src","/src/configurator/configurator.html?id="+n)}),t.find("li[isleaf=Y]:first label").click()},__transferListToForest:function(e){function t(n){if("N"===n.is_leaf){n.children=[];for(var r in e){var a=e[r];a.parent_node_id===n.node_id&&(a=t(a),n.children.push(a))}n.children=n.children.sort(function(e,t){return e.ord-t.ord})}return n}var n={is_leaf:"N",ord:0,node_id:0};return t(n).children},expandAll:function(e){function t(n){var r=n.children();r.each(function(){if("N"===$(this).attr("isleaf")){var n=$(this).find(">ul"),r=n.is(":visible");r!=e&&$(this).find(">a").click(),t(n)}})}t($("#navigator ul.menu.root"))}};window.Navigator=a,e.exports=a},function(e,t){},function(e,t,n){var r=n(7);e.exports=(r.default||r).template({compiler:[7,">= 4.0.0"],main:function(e,t,n,r,a){return'<div id="nav-handle" class="ui-state-default close">\n\t<i class="fas fa-angle-double-left"></i>\n</div>\n'},useData:!0})}]);
//# sourceMappingURL=home.js.map