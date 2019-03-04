var EnhancerHack;
var lang = $.cookie('lang') || $('body').attr('lang');
function registerWidget (prototype) {
  var info;
  try {
    var err = new Error('Widget path error');
    throw err;
  } catch (e) {
    info = e.stack.split(/[\r\n]/);
  }

  // # In case a null line is matched in firefox.
  info = info.filter(function(l) {
    return !!l;
  });
  var last = info[info.length - 1];
  last = last.replace(' at ', '').replace(/(^\s*)|(\s*$)/g, '');
  var widgetName = last.match(/\w+(-|\w)+\w+\/widget\/\d+\.\d+\.\d+/g);
  if (!widgetName) {
    return Enhancer.ZWidget.register(Enhancer.simulatorHack.getWidgetName(), prototype);
  }
  if (widgetName) {
    widgetName = widgetName[0].replace(/\/widget\//, '/');
  } else {
    return console.error(err);
  }
  Enhancer.ZWidget.register(widgetName, prototype);
}
Object.defineProperty(window, 'Enhancer', {
  configurable: true,
  get: function () {
    return EnhancerHack;
  },
  set: function(val) {
    EnhancerHack = val;
    Object.defineProperty(EnhancerHack, 'registerWidget', {
      get: function (){
        return  registerWidget
      },
      set: function (val) {
      }
    })
    Object.defineProperty(EnhancerHack, 'LANG', {
      get: function (){
        return  lang
      },
      set: function (val) {
      }
    })
  }
})