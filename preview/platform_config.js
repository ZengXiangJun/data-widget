;(function () {
	var submitting = false;
	var cfg;
	var cfgs = [];
	var oldRegisterWidgetConfigurator = window.Enhancer.registerWidgetConfigurator;
	var componentConfig;
	var oldConstuct;
	window.Enhancer.registerWidgetConfigurator = function (config) {
		componentConfig = config;
		if (typeof componentConfig.construct === 'function') {
			oldConstuct = componentConfig.construct.bind(componentConfig);
			componentConfig.construct = function () {};
		}
		oldRegisterWidgetConfigurator.call(window.Enhancer, config);
	}

  Enhancer.getDatabaseConnectionNames = function (cb) {
    console.warn('组件本地开发阶段不支持数据库连接,  请用静态数据源')
    cb([]);
  }
   Enhancer.getDatabaseSettings = function (cb) {
    console.warn('组件本地开发阶段不支持数据库连接,  请用静态数据源')
    cb({});
  }
  Enhancer.VariablePattern = {
    variableAndIdentifier: /(@(\d+-)?\w+(\.\w+)*@)|(\$(\d+-)?\w+(\.\w+)*\$)/g,
    variable: /@(\d+-)?\w+(\.\w+)*@/g,
    clientVariable: /(@\d+-\w+(\.\w+)*@)|(\$\d+-\w+(\.\w+)*\$)/g,
    identifier: /\$(\d+-)?\w+(\.\w+)*\$/g,
    varExp: /(#[^#]+#)|(@(\d+-)?\w+(\.\w+)*@((\.\w+)|(\[\s*\d+\s*\])|(\[\s*'[^']+'\s*\])|(\[\s*"[^"]+"\s*\]))+)/g,
    isVariable: function(s) {
      if (!s || typeof s !== 'string') {
        return false;
      }
      return /(^@(\d+-)?\w+(\.\w+)*@$)|(^\$(\d+-)?\w+(\.\w+)*\$$)/.test(s);
    },
    isClientVariable: function(s) {
      if (!s || typeof s !== 'string') {
        return false;
      }
      return /(^@\d+-\w+(\.\w+)*@$)|(^\$\d+-\w+(\.\w+)*\$$)/.test(s);
    },
    isIdentifier: function(s) {
      if (!s || typeof s !== 'string') {
        return false;
      }
      return /^\$(\d+-)?\w+(\.\w+)*\$$/.test(s);
    },
    extractVariables: function(s) {
      if (!s || typeof s !== 'string') {
        return [];
      }
      var vars = [];
      var set = {};
      s.replace(this.variableAndIdentifier, function(v) {
        var vn = v.replace(/@|\$/g, '').toUpperCase();
        if (!set[vn]) {
          set[vn] = true;
          vars.push(vn);
        }
      });

      return vars
    },
    extractClientVariables: function(s) {
      if (!s || typeof s !== 'string') {
        return [];
      }
      var vars = [];
      var set = {};
      s.replace(this.clientVariable, function(v) {
        var vn = v.replace(/@|\$/g, '').toUpperCase();
        if (!set[vn]) {
          set[vn] = true;
          vars.push(vn);
        }
      });

      return vars
    }
  }


	function getSource (newId) {
		var source = this.getConfig();
		if (newId) {
			this.__oldId = this.__sid;
		}
		this.__sid = newId ? Date.now() : this.__sid || Date.now();
		this.sourceId = this.__sid;
		source.id = this.__sid; 
		source.params = source.params || [];

		if (newId) {
			this.__opt.onSave && this.__opt.onSave(source);
		}

		if (source.type === 'static') {
			if (source.dataType === 'json') {
				var data = source.mockEnabled ? source.mock : source.query;
				if (data) {
					try {
						JSON.parse(data);
					} catch (e) {
						showMessage('json syntax error');
						return
					}
				}
			}
		}

		return source;
	}	
	function doSave (next) {
		var opt = this.__opt;
		var source = getSource.call(this);
		if (!source || submitting) {
			return
		}
		submitting = true;
		ajax({
			url: '/profile',
			type: 'POST',
			data: JSON.stringify({type: 'data', data: source})
		}, function(res) {
			submitting = false;
			opt.onSave && opt.onSave(source);
			if (next) {
				return next(source);
			}
			
			showMessage('save success', 'success');
		}, function () {
			showMessage('fail to save profile');
			submitting = false;
		});
	}
	var oldCreateConfigurator = Enhancer.DatasourceManager.createConfigurator;
	Enhancer.DatasourceManager.createConfigurator = function (id, opt) {
		cfg = oldCreateConfigurator.call(Enhancer.DatasourceManager, id, opt);

		cfg.__opt = opt;
		cfg.save = function (cb) {
			doSave.call(this/*, cb*/);
		}
		
		var oldSetConfig = cfg.setConfig
		cfg.setConfig = function (source) {
			this.__sid = source.id;
			oldSetConfig.call(this, source);
		}

		//$('.config-item.local-process input').prop('disabled', true);
		cfgs.push(cfg);
		return cfg;
	}

	var oldGetDatasource = Enhancer.DatasourceManager.getDatasource
	Enhancer.DatasourceManager.getDatasource = function (id, cb) {
		ajax({
			url: '/profile'
		}, function (res) {
			var sources = res.data.data || [];
			sources.forEach(function (item) {
				item.type = 'static';
			});
			var source;
			if (id) {
				sources.some(function (item) {
					if (item.id == id) {
						source = item;
						source.params = source.params || [];
						return true;
					}
				});
				cb(source);
			} else {
				cb(sources);
			}
		}, function () {
			showMessage('fail to get profile');
		});
	}

	window.enhancerComponentName = "data-widget";
	function ajax(opt, success, fail) {
		var match = window.location.href.match(/[&?]id=([^&]+)/);
		opt.url = opt.url + '?wname=' + window.enhancerComponentName;
		var wid = match ? ('&id=' + match[1]) : '';
		opt.url = opt.url + wid;
		$.ajax(opt).done(function (res) {
			if (res.success) {
				success && success(res);
			} else {
				fail && fail();
			}
		}).fail(fail);
	}

	function saveSource(type, source, cb) {
		ajax({
			url: '/profile',
			type: 'POST',
			data: JSON.stringify({type: type, data: source})
		}, function (res) {
			cb && cb(source.id);
		}, function () {
			showMessage('fail to save datasource');
		});
	}

  Enhancer.DatasourceManager.testSQL = function (sql, cb) {
    console.warn('组件本地开发阶段不支持数据库连接,  请用静态数据源')
    cb({
      success: true,
      metaData: [],
      params: []
    })
  }
	Enhancer.DatasourceManager.addDatasource = function (source, cb) {
		var id = Date.now();
		source.id = id;
		source.params = source.params || [];
		saveSource('addSource', source, cb);
	}
  Enhancer.DatasourceManager.editDatasource = Enhancer.DatasourceManager.editDatasource ||  function (opt) { ///

  }
	Enhancer.DatasourceManager.delDatasource = function (id, cb) {
		saveSource('delSource', {id: id}, cb);
	}
	Enhancer.saveWidgetProfile = function () {
		if (cfgs.length) {
			var index = 0;
			function next() {
				var cfg = cfgs[index++];
				doSave.call(cfg, function () {
					if (index === cfgs.length) {
						saveProfile('config');
					} else {
						next();
					}
				})
			}
			next();
		} else {
			saveProfile('config');
		}
	}
	var staticAssets = {};
	try {
		staticAssets = JSON.parse(localStorage.getItem('staticAssets') || '{}')
	} catch (e) {
	}

	Enhancer.uploadFile = function (files, name, cb) {
		var formData = new FormData();
		[].slice.call(files, 0).forEach(function (file, i) {
			formData.append('file' + i, file);
		});
		
		var request = new XMLHttpRequest();
		request.onload = function () {
			var res = JSON.parse(this.responseText);
			staticAssets[name] = res.data.files[0].url;
			localStorage.setItem('staticAssets', JSON.stringify(staticAssets));
			cb(res.data);
		}
		request.onerror = function (err) {
			console.error(err);
		}
		request.open("POST", "/upload");
		request.send(formData);
	}
	Enhancer.uploadStaticResource = Enhancer.uploadFile;
	Enhancer.getStaticResourceUrl = function (name) {
		return staticAssets[name];
	}
	Enhancer.deleteStaticResource = function (name) {
		delete staticAssets[name];
		localStorage.setItem('staticAssets', JSON.stringify(staticAssets));
	}
	Enhancer.getEnvironment = function () {
		return {
			projectId: 1,
			projectName: 'projectName',
			pageId: 1,
			entityNumber: 1,
			isProduction: false
		}
	}
	

	function getVariable (type) {
		var envVars = localStorage.getItem('envVars');
		envVars = JSON.parse(envVars || '{}');
		var ret = type === 'list' ? [] : {};
		var test = {
			list: function () { return true;},
			all: function () { return true;},
			enhancer: function (key) { key = key.toUpperCase(); return !/^\d+-/.test(key) || /^[012]-/.test(key); },
			user: function (key) { key = key.toUpperCase(); return /^1-/.test(key) || !!(envVars['1-' + key]); }
		};
		Object.keys(envVars).forEach(function (key) {
			key = key.toUpperCase();
			if (test[type](key)) {
				var key1 = type === 'list' ? ret.length : key;
				ret[key1] = {
					name: key,
					type: typeof envVars[key]
				}
			}
		});
		return ret;
	}
	Enhancer.VariableManager.getEnhancerVariables = function (cb) {
		cb(getVariable('enhancer'));
	}
	Enhancer.VariableManager.getUserVariables = function (cb) {
		cb(getVariable('user'));
	}
	Enhancer.VariableManager.getAllCurrSupportedVariables = function (cb) {
		cb(getVariable('all'));
	}
	Enhancer.VariableManager.getAllCurrSupportedVariableList = function (cb) {
		cb(getVariable('list'));
	}
	

	Enhancer.DatasourceManager.setDatasource = function (id, source, cb) {
		source.id = id;
		source.params = source.params || [];
		saveSource('setSource', source, cb);
	}

	function renderList (data) {
		if (!data.length) {
			return;
		}
		$(window.parent.document).find('#list').append(data.map(function(item) {
			return '<li><a target="_blank" href="/?id=' + item.id + '">' + item.name + '</a><a data-id="' + item.id + '" class="close" href="javascript:void(0)">&times</a></li>';
		}).join(''));
	}
	window.onload = function () {
		if (oldConstuct) {
			oldConstuct();
		}

		ajax({
			url: '/profile'
		}, function (res) {
			if (typeof componentConfig.setProfile === 'function') {
				componentConfig.setProfile(res.data.config || {});
			} else {
				showMessage('no setProfile')
			}
			if (res.data.list) {
				renderList(res.data.list);
			}
		}, function () {
			showMessage('fail to get profile');
		});
	}


	function saveProfile (type, data, cb) {
		if (submitting) {
			console.log('submitting.....');
			return;
		}
		
		if (typeof componentConfig.getProfile === 'function') {
			var profile = type === 'remove' ? data : componentConfig.getProfile();
			if (profile === false) {
				return
			}
			var ext;
			if (type === 'list') {
				var sources = [];
				cfgs.forEach(function (cfg) {
					sources.push(getSource.call(cfg, true))
				});
				profile = componentConfig.getProfile();
				cfgs.forEach(function (cfg) {
					var opt = cfg.__opt || {};
					var source = getSource.call(cfg);
					source.id = cfg.__oldId;
					cfg.__sid = cfg.__oldId;
					opt.onSave && opt.onSave(source);
				});
				profile = {
					config: profile,
					name: data.name,
					id: Date.now(),
					data: sources
				}
			} else if (type === 'config') {
				if (componentConfig.getDependentVariableList) {
					ext = {
						dependencies: componentConfig.getDependentVariableList(profile)
					}
				}
				
				if (componentConfig.getSupportedEventList) {
					var eventList = componentConfig.getSupportedEventList(profile);
					if (!Array.isArray(eventList)) {
						showMessage('getSupportedEventList must return an array')
					}
				}
				
				if (componentConfig.getSupportedVariableList) {
					var varList = componentConfig.getSupportedVariableList(profile);
					if (!Array.isArray(varList)) {
						showMessage('getSupportedVariableList must return an array')
					}
				}
			}
			
			submitting = true;
			ajax({
				url: '/profile',
				type: 'POST',
				data: JSON.stringify({type: type, data: profile, ext: ext})
			}, function (res) {
				submitting = false;
				showMessage('profile saved', 'success');
				cb && cb(res);
			}, function () {
				showMessage('fail to save profile');
				submitting = false;
			});
		} else {
			showMessage('no getProfile')
		}
	}
	window.parent.document.getElementById('saveProfile').onclick = function () {
		Enhancer.saveWidgetProfile();
	}

	window.parent.document.getElementById('saveAs').onclick = function () {
		var name = window.prompt("将配置保存成新的测试场景:") || '';
		if (!name.trim()) {
			return
		}
		saveProfile('list', {name: name.trim()}, function (res) {
			var html = '<li isleaf="Y">\
				<a id="menu-node-3" navto="' + res.data + '" style="padding-left: 46px; font-size: 14px; line-height: 48px; height: 48px;">\
					<i class="fas fa-trash-alt"></i>\
					<label>' + name + '</label>\
				</a>\
			</li>';
			var root = $('#navigator ul.menu.root', window.parent.document);
			root.find('ul:first').append(html);
		});
	}

	var previewJSON = $('.bottom .toolbar #previewJSON', window.parent.document);
	if (!previewJSON.length) {
		$('.bottom .toolbar', window.parent.document).append('<i id="previewJSON" title="查看 profile" class="fas fa-database ui-corner-all ui-state-default"></i>')
		$('.bottom .toolbar #previewJSON', window.parent.document).click(function () {
			var str = JSON.stringify(componentConfig.getProfile(), null, 2);
			Enhancer.CodeEditor.edit('var profile = ' + str , {
				mode: 'javascript'
			}, function () {
			});

			var bottom = $('.code-editor-panel .editor-bottom .button');
			bottom.eq(1).hide();
			bottom.eq(0).click(function() {
				bottom.eq(1).show();
			})
		});
	}


	var child;
	window.parent.document.getElementById('preview').onclick = function () {
		if (child && !child.closed) {
			child.location.reload();
			child.focus();
		} else {
			var match = window.location.href.match(/[&?]id=([^&]+)/);
			var wid = match ? ('?id=' + match[1]) : '';
			var preview = '/preview/simulator.html';
			if ( window.top.enhancerEnv) {
				preview = '/preview/simulator-m.html';
			}
			child = window.open(preview + wid);
		}
	}

	$('.menu', window.parent.document).on('click', '.fa-trash-alt', function(e) {
		e.stopPropagation();
		var link = $(e.target).parent();
		var id = link.attr('navto');
		Enhancer.Message.alert({
			width: 280,
			height: 180,
			content: "确定删除该配置吗?",
			cancelText: "取消",
			confirmText: "确定",
			cancel: function ( $d ) {},
			confirm: function( $d ) {
				id && saveProfile('remove', {
					id: id
				}, function () {
					var li = $(link).closest('li');
					if (li.hasClass('ui-state-active')) {
						var root = $('#navigator ul.menu.root', window.parent.document);
						root.find('li[isleaf=Y]:first label').click();
					}
					li.remove();
				});
			}
		});
	});

	function showMessage (msg, type) {
		$.ambiance({
			message: msg,
      type: type || "error",
      permanent: true,
      timeout: 2
    });
	}


	function getCookie(name) {  
    var i, cookie, cookieStr,           
        cookies = document.cookie.split(";");       

    for (i=0; i<cookies.length; i++) {      
      cookie = cookies[i];            
      cookieStr = cookie.split("=");
      //如果子目录和父目录同时设置了同一个cookie, 那么子目录的cookie会在document.cookie中靠前的位置          
      if (cookieStr && cookieStr[0].replace(/^(\s*)|(\s*)$/g, "") == name) {              
          return  decodeURI(cookieStr[1]);        
      }
    }
	}

	function setCookie (name, value, expires, domain, path, secure) {                    
    var date,  
        str = escape(name) + "=" + escape(value);       
        date = new Date();
        
    str += domain ?   "; domain=" + domain : "";
    str += path ?  "; path=" + path : "";
    str +=  expires ? "; expires=" + expires : "";
    str += secure ? "; secure" : "";
    document.cookie = str;
	}


  var lang = getCookie('lang');
  lang = lang || 'zh-cn';
  $('#header .toolbar span.logout', window.parent.document).off('click').click(function () {
    var lang = getCookie('lang');
    lang = lang || 'zh-cn';
    setCookie('lang', lang === 'zh-cn' ? 'en' : 'zh-cn', (new Date('2120-12-01 00:00:00')).toGMTString(), '', '/')
    window.location.reload(true);
  }).html('<i class="fas fa fa-globe"></i>' + (lang === 'zh-cn' ? 'English' : '中文'))
  
  // var themeName = (document.cookie || '').match(/theme=([^;]+)/);
  // themeName = themeName ? themeName[1] : 'base';
  // if (themeName) {
  //   var $theme = $('#theme', window.parent.document)
  //   $theme.attr('href', './preview/lib/css/themes/' + themeName + '/jquery-ui.theme.min.css?' + Date.now())
  //   .attr('themename', themeName);
  //   $("body", window.parent.document).attr("theme", themeName);
  // }

  if ( window.parent.initConfigurator) {
		return;
	}
  $('#header .toolbar', window.parent.document).append('<span class="theme"><i class="fas fa-paint-brush"></i>主题</span>')
  $('#header .toolbar > span', window.parent.document).css('margin-left', 0).find('i').css('margin', 0);
  $('#header .toolbar span.theme', window.parent.document).off('click').click(function () {
  	$('#themeSwitcher', window.parent.document).show();
  });

  window.parent.initConfigurator = true;
})();

