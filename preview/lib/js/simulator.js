/* Variable Manager */
var VariableWhiteList = {
  'CURR_YEAR': true,
  'CURR_MONTH': true,
  'CURR_DATE': true,
  'CURR_TIME': true,
  'CURR_YY': true,
  'CURR_MM': true,
  'CURR_DD': true,
  'CURR_YMD': true,
  'USER_ID': true,
  'USER_NAME': true,
  'ROLES': true,
  'LAST_YEAR': true,
  'LAST_MONTH': true,
  'LAST_MM': true,
  'YESTERDAY': true,
  'YESTERDAY_YMD': true,
  'NEXT_YEAR': true,
  'NEXT_MONTH': true,
  'NEXT_MM': true,
  'TOMORROW': true,
  'TOMORROW_YMD': true,
  '0-CURR_YEAR': true,
  '0-CURR_MONTH': true,
  '0-CURR_DATE': true,
  '0-CURR_TIME': true,
  '0-CURR_YY': true,
  '0-CURR_MM': true,
  '0-CURR_DD': true,
  '0-CURR_YMD': true,
  '0-LAST_YEAR': true,
  '0-LAST_MONTH': true,
  '0-LAST_MM': true,
  '0-YESTERDAY': true,
  '0-YESTERDAY_YMD': true,
  '0-NEXT_YEAR': true,
  '0-NEXT_MONTH': true,
  '0-NEXT_MM': true,
  '0-TOMORROW': true,
  '0-TOMORROW_YMD': true,
  '1-USER_ID': true,
  '1-USER_NAME': true,
  '1-ROLES': true
};

var VariableManager = {
  init: function() {
    var that = this;
    var envVars = JSON.parse(localStorage.getItem('envVars'));
    if (!envVars) {
      var d = new Date();
      var yd = new Date(d.getTime() - 86400000);
      var nd = new Date(d.getTime() + 86400000);
      var dt = d.getDate();
      var m = d.getMonth();
      var lm = m == 0 ? 12 : m;
      var nm = m == 11 ? 1 : (m + 2);
      var xx = function(x) {
        return x < 10 ? ('0' + x) : (x + '');
      };
      var ymd = function(date) {
        return date.toISOString().split('T')[0];
      }
      envVars = {
        'CURR_YEAR': d.getFullYear(),
        'CURR_MONTH': m + 1,
        'CURR_DATE': dt,
        'CURR_TIME': d.getTime(),
        'CURR_YY': d.getFullYear() % 100 + '',
        'CURR_MM': xx(m + 1),
        'CURR_DD': xx(dt),
        'CURR_YMD': ymd(d),
        'USER_ID': 'zhangsan',
        'USER_NAME': 'zhangsan',
        'ROLES': 'admin',
        'LAST_YEAR': d.getFullYear() - 1,
        'LAST_MONTH': lm,
        'LAST_MM': xx(lm),
        'YESTERDAY': yd.getDate(),
        'YESTERDAY_YMD': ymd(yd),
        'NEXT_YEAR': d.getFullYear() + 1,
        'NEXT_MONTH': nm,
        'NEXT_MM': xx(nm),
        'TOMORROW': nd.getDate(),
        'TOMORROW_YMD': ymd(nd),
        '0-CURR_YEAR': d.getFullYear(),
        '0-CURR_MONTH': m + 1,
        '0-CURR_DATE': dt,
        '0-CURR_TIME': d.getTime(),
        '0-CURR_YY': d.getFullYear() % 100 + '',
        '0-CURR_MM': xx(m + 1),
        '0-CURR_DD': xx(dt),
        '0-CURR_YMD': ymd(d),
        '0-LAST_YEAR': d.getFullYear() - 1,
        '0-LAST_MONTH': lm,
        '0-LAST_MM': xx(lm),
        '0-YESTERDAY': yd.getDate(),
        '0-YESTERDAY_YMD': ymd(yd),
        '0-NEXT_YEAR': d.getFullYear() + 1,
        '0-NEXT_MONTH': nm,
        '0-NEXT_MM': xx(nm),
        '0-TOMORROW': nd.getDate(),
        '0-TOMORROW_YMD': ymd(nd),
        '1-USER_ID': 'zhangsan',
        '1-USER_NAME': 'zhangsan',
        '1-ROLES': 'admin'
      };
      localStorage.setItem('envVars', JSON.stringify(envVars));
      window.location.reload();
    }
  },
  open: function() {
    var that = this;

    $('p.vs-error-tips').hide();
    if (that.$dlg) {
      var vars = JSON.parse(localStorage.getItem('envVars'));
      var $vTab = $('.variable-settings>table>tbody').html('');
      for (var i in vars) {
        that.addVar($vTab, i, vars[i]);
      }
      return that.$dlg.dialog('open');
    }

    var html = `<div class="variable-settings">
                <p class="vs-tips ui-state-highlight">
                    <span class="ui-icon ui-icon-info"></span>
                    <span>【客户端变量】必须由数字、下划线、单词组成，比如：1-CURR-YEAR；【服务端变量】必须由单词组成，比如：USER_ID。</span>
                </p>
                <p><i class="fa fa-search"></i>
                    <input class="variable-filter" type="text">
                </p>
                <p class="vs-error-tips ui-state-error"></p>
                <table class="variable-table" class="ui-widget-content">
                    <thead>
                        <tr class="ui-state-default">
                            <td class="name">变量名</td>
                            <td class="value">值</td>
                            <td class="type">类型</td>
                            <td class="scope">域</td>
                            <td class="operations">操作</td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <button class="add-var">添加变量</button>
            </div>`;

    $('body').append(html);

    var vars = JSON.parse(localStorage.getItem('envVars'));
    var $vTab = $('.variable-settings>table>tbody');
    for (var i in vars) {
      that.addVar($vTab, i, vars[i]);
    }
    that.$dlg = $('.variable-settings')
      .dialog({
        title: '环境变量设置',
        modal: true,
        autoOpen: true,
        width: 800,
        height: 600,
        buttons: [{
          text: '取消',
          click: function() {
            $(this).dialog('close');
          }
        }, {
          text: '保存',
          click: function() {
            if ($vTab.find(' tr[editting]').size() > 0) {
              $('p.vs-error-tips')
                .append('<span class="ui-icon ui-icon-alert"></span>')
                .append('有变量未完成编辑')
                .show();
              return;
            }
            $('p.vs-error-tips').hide();
            var vars = that.getVars($(this).find('>table'));
            localStorage.setItem('envVars', JSON.stringify(vars));
            $(this).dialog('close');
            window.location.reload();
          }
        }]
      });
    $('button.add-var')
      .button({
        icons: {
          primary: 'ui-icon-plusthick'
        }
      })
      .click(function() {
        that.editVar(that.addVar($vTab, '', ''));
      })
    $('.variable-filter').on('keyup', function(e) {
      var key = $(this).val().replace(/^\s*|\s*$/g, '').toUpperCase();

      if (!key) {
        return $('.variable-table tbody tr').show();
      }

      $('.variable-table tbody tr').hide();
      $(".variable-table tbody tr[varname*='" + key + "']").show();
    });
  },
  addVar: function($vTab, key, val) {
    return $('<tr class="ui-widget-content">' +
        '<td>' + key + '</td>' +
        '<td>' + (typeof val === 'string' ? val : JSON.stringify(val)) + '</td>' +
        '<td>' + (typeof val) + '</td>' +
        '<td>' + (/^\d+\-/.test(key) ? 'client' : 'server') + '</td>' +
        '</tr>')
      .attr('varname', key.toUpperCase())
      .append(
        $('<td>')
        .append(
          $('<button>').text('编辑')
          .button({
            text: false,
            icons: {
              primary: 'ui-icon-pencil'
            }
          })
          .click(function() {
            var $icon = $(this).find('>span:first');
            if ($icon.hasClass('ui-icon-pencil')) {
              VariableManager.editVar($(this).parent().parent());
            } else {
              if (VariableManager.restoreEdit($(this).parent().parent())) {}
            }
          })
        ).append(
          VariableWhiteList[key] ? '' :
          $('<button>').text('删除')
          .button({
            text: false,
            icons: {
              primary: 'ui-icon-minus'
            }
          })
          .click(function() {
            VariableManager.deleteVar($(this).parent().parent())
          })
        )
      ).dblclick(function() {
        VariableManager.editVar($(this));
      }).appendTo($vTab);
  },
  editVar: function($tr) {
    if ($tr.attr('editting') === 'editting') {
      return;
    }
    var key = $tr.find('>td:eq(0)').text();
    var val = $tr.find('>td:eq(1)').text();
    var type = $tr.find('>td:eq(2)').text();

    var reserved = VariableWhiteList[key.toUpperCase()];

    var $key = $('<input>')
      .addClass(reserved ? 'reserved' : 'ui-widget-content')
      .val(key)
      .prop('readonly', reserved);

    $tr.find('>td:eq(0)').html('')
      .append($key);

    $tr.find('>td:eq(1)').html('')
      .append('<input class="ui-widget-content" value="' + val + '">');

    $tr.find('>td:eq(2)').html('')
      .append('<select class="ui-widget-content">' +
        '<option>string</option>' +
        '<option>number</option>'
        // + '<option>object</option>'
        +
        '</select>');

    $tr.find('>td:last>button>span.ui-icon-pencil')
      .removeClass('ui-icon-pencil')
      .addClass('ui-icon-disk')
      .parent().attr('title', '保存');

    $tr.attr("editting", "editting");
  },
  restoreEdit: function($tr) {
    var $key = $tr.find('>td:eq(0)>input');
    var key = $key.val();
    if (key === '' ||
      (!/^\d-\w+(\.\w+)*$/.test(key) && !/^\w+(\.\w+)*$/.test(key))
    ) {
      $key.addClass('ui-state-error');
      return false;
    }

    var $type = $tr.find('>td:eq(2)>select');
    var type = $type.val();
    var $val = $tr.find('>td:eq(1)>input');
    var val = $val.val();
    if (type === 'number' && !/^((\d+)|(\d+\.\d+))$/.test(val)) {
      $val.addClass('ui-state-error');
      $type.addClass('ui-state-error');
      return false;
    }
    if (type === 'object') {
      try {
        JSON.parse(val);
      } catch (e) {
        $val.addClass('ui-state-error');
        $type.addClass('ui-state-error');
        return false;
      }
    }

    $key.parent().html($key.val());
    $val.parent().html($val.val());
    $type.parent().html($type.val());

    $tr.find('>td:eq(3)')
      .html(/^\d+\-/.test(key) ? 'client' : 'server');

    $tr.find('>td:last>button>span.ui-icon-disk')
      .removeClass('ui-icon-disk')
      .addClass('ui-icon-pencil')
      .parent().attr('title', '编辑');
    $tr.removeAttr("editting");
    return true;
  },
  deleteVar: function($tr) {
    $tr.remove();
  },
  getVars: function($vTab) {
    var vars = {},
      $tr;
    $vTab.find(' tr:not(:first)').each(function() {
      $tr = $(this);
      var key = $tr.find('>td:eq(0)').text();
      var val = $tr.find('>td:eq(1)').text();
      var type = $tr.find('>td:eq(2)').text();
      if (!key) {
        return true;
      }
      if (type === 'object') {
        val = val ? JSON.parse(val) : null;
      } else if (type === 'number') {
        val = val ? (val.match(/\./) ? parseFloat(val) : parseInt(val)) :
          0;
      }
      vars[key] = val;
    });
    return vars;
  },
  getServerVars: function() {
    var vars = JSON.parse(localStorage.getItem('envVars'));
    var serverVars = {};
    for (var i in vars) {
      if (/^\w+(\.\w+)*$/.test(i)) {
        serverVars[i.toUpperCase()] = vars[i];
      }
    }
    return serverVars;
  }
};

VariableManager.init();

/* Hack */
Enhancer.simulatorHack = Enhancer.simulatorHack || {};
Enhancer.simulatorHack.getScriptPath = function (name) {
  if (name.indexOf('/data-widget') !== -1) {
    return location.origin + '/build/widget/zh-cn/index.js';
  }
  return name;
}
Enhancer.simulatorHack.getWidgetName = function () {
  return 'data-widget/0.0.0';
}
//Enhancer.WIDGET_BASE_URL = 'http://widget-assets.enhancer.cc/widget-store/';
Enhancer.WIDGET_BASE_URL = 'http://widget-assets.enhancer.io/';
Enhancer.ZUserData.set((function(vars) {
  for (var i in vars) {
    if (/^\w+(\.\w+)*$/.test(i)) {
      vars[i] = undefined;
    }
  }
  return vars;
})(JSON.parse(window.localStorage.getItem('envVars')) || {}));

Enhancer.getFileUploadUrl = function () {
  return '/upload';
}
Enhancer.ZPageManager.getPageProf = function(pid, callback) {
  var that = this;
  $.ajax({
    url: '/all?id=' + pid
  }).done(function (res) {
    var profStr = JSON.stringify( res.data );
    var profile = that.__handlePageProfileString(pid, profStr);
    callback(profile);
  })  
};

var ZMessage = Enhancer.ZMessage;
Enhancer.IO.getSourceData = function(sourceId, criteria, callback, errCallback) {
  if (!sourceId) {
    return;
  }

  var ids = sourceId.split('_');

  var entity = Enhancer.getEntityById('p' + ids[0] + '-w' + ids[1]) ||
    Enhancer.getEntityById('p' + ids[0] + '-f' + ids[1]);

  var ds = entity.prof.datasources[ids[2]];

  var dsInfo = 'Source Id: ' + ids[2] + ', Window Id: ' + ids[1];

  if (!ds) {
    return ZMessage.alert("[Widget Dev Error] 无效的数据源 ID：  " + dsInfo);
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
        return ZMessage.alert(" " + e.message + ' ' + dsInfo);
      }

      try {
        data = localProcess(data);
      } catch (e) {
        return ZMessage.alert(" " + e.message + ' ' + dsInfo);
      }
    }
    try {
      callback(data);
    } catch (e) {
      Enhancer.ZMessage.alert("[Dev Error] 请求数据源后，执行回调函数发生错误，打开控制台查看更多细节。: " + e.message);
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
      ZMessage.alert("[Dev Error] 静态数据不是一个合法的 JSON： " + dsInfo);
    }
    return;
  }

  if (ds.type === 'variable') {
    finalDataCallback(Enhancer.ZContext.value(ds.query));
    return
  }

  if (!criteria.paged) {
    var data = {
      page: 1,
      paged: false,
      records: 36,
      rows: $.extend(true, {}, SourceData1)
    };
  } else {
    var data = {
      page: criteria.page,
      paged: true,
      rowNum: criteria.rowNum,
      records: 36
    }
    var start = ((parseInt(criteria.page) || 1) - 1) * criteria.rowNum;
    var end = start + criteria.rowNum;
    var rows = [];
    for (var i = start; i < SourceData1.length && i < end; i++) {
      rows.push(SourceData1[i]);
    }
    data.rows = rows;
  }

  finalDataCallback(data);
}

$(function() {
  $('<div>').addClass('ui-state-default var-settings-btn')
    .append('<i class="fas fa-cogs"></i>环境变量设置')
    .appendTo($('#header'))
    .on('click', function() {
      VariableManager.open();
    });
});
