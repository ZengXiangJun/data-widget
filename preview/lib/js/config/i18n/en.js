!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{configurable:!1,enumerable:!0,get:getter})},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=13)}({13:function(module,exports){window.Enhancer.locale={variable:"Variable",datasourceSettingTitle:"Datasource Settings",chooseSourceType:"Choose source type: ",rdb:"Relational Database",staticData:"Static",inputSQL:"Input SELECT SQL. The retured data structure like: { rows: [ {col1: '...', col2: '', .. }, {...}, ...] }",inputValidHttp:"Input valid http url and make sure the data structure meets requirement of the usage. @variable@ can be used in url and body. ",inputValidJsonp:"Input valid jsonp url make sure the data structure meets requirement of the usage. @variable@ can be used in url",requestMethod:"Request Method: ",contentType:"Content Type: ",text:"Text",bodyContent:"Body Content: ",mockCookie:"mock cookie: ",mockCookieTip:"If the proxied http api requires cookie, you need to mock a cookie which maybe is copied from other valid environment so that this http api responses correctly when previewing your page.",dataType:"Data Type: ",mockData:"Mock Data: ",disable:"Disable",enable:"Enable",mockDataTip:"Replace the real data when debugging and previewing your project.",localProcess:"Local Process: ",localProcessTip:"Set this process to handle the raw data as demand.",cancel:"Cancel",ok:"OK",inputIdentifier:"Please input value for these $identifier$ in SQL so that the sql can be test.",nullDs:"Null datasource",invalidMockJSON:"Invalid mock json",invalidLocalProcFunc:"Invalid local process: ",invalidStaticJSON:"Invalid static json",invalidHttp:"Invalid http url",invalidHttpContentJSON:"The content of http body is not a valid json: ",invalidSQL:"SQL has error: ",customHttpInterface:"custom http(get) interface",inputValidCustomItfName:"Input the custom http(get) interface name, and make sure the data structure meets requirement of the usage.",customQueryStr:"URL query string(@variable@ is allowed)：",invalidCustomItfName:"Interface name is not valid, it must start with letters and consisit of letter, line and undersocre.",inputVariable:"Input client or server side variable name. eg: 11-USER_NAME",invalidVariable:"Invalid variable name",dataSpecification:"Click to see the data specification required by this component",saveDatasource:"Save Datasource",teachMe:"Teach me how to set datasource",sizeExceeded:"Size exceeded. Don not exceed 1m.",connection:"Database Connection:",locale:"Default",queryStrPlaceHolder:"like: a=123&id=@12-ID@"}}});