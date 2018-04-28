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


	function getSource (newId) {
		var source = this.getConfig();
		if (newId) {
			this.__oldId = this.__sid;
		}
		this.__sid = newId ? Date.now() : this.__sid || Date.now();
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
	function doSave ( next) {
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
				return next();
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
		cfg.save = function () {
			doSave.call(this);
		}
		
		var oldSetConfig = cfg.setConfig
		cfg.setConfig = function (source) {
			this.__sid = source.id;
			oldSetConfig.call(this, source);
		}

		$('.config-item.local-process input').prop('disabled', true);
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


	function ajax(opt, success, fail) {
		var match = window.location.href.match(/[&?]id=([^&]+)/);
		var wid = match ? ('?id=' + match[1]) : '';
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

	Enhancer.DatasourceManager.addDatasource = function (source, cb) {
		var id = Date.now();
		source.id = id;
		saveSource('addSource', source, cb);
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
	Enhancer.uploadFile = function (files, name, cb) {
		var formData = new FormData();
		[].slice.call(files, 0).forEach(function (file, i) {
			formData.append('file' + i, file);
		});
		
		var request = new XMLHttpRequest();
		request.onload = function () {
			var res = JSON.parse(this.responseText);
			cb(res.data);
		}
		request.onerror = function (err) {
			console.error(err);
		}
		request.open("POST", "/upload");
		request.send(formData);
	}
	

	function getVariable (type) {
		var envVars = localStorage.getItem('envVars');
		envVars = JSON.parse(envVars || '{}');
		var ret = type === 'list' ? [] : {};
		var test = {
			list: function () { return true;},
			enhancer: function (key) { return !/^\d+-/.test(key); },
			user: function (key) { return /^\d+-/.test(key); }
		};
		Object.keys(envVars).forEach(function (key) {
			if (test[type](key)) {
				key = type === 'list' ? ret.length : key;
				ret[key] = {
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
		cb(getVariable('list'));
	}

	Enhancer.DatasourceManager.setDatasource = function (id, source, cb) {
		source.id = id;
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
			}
			
			submitting = true;
			ajax({
				url: '/profile',
				type: 'POST',
				data: JSON.stringify({type: type, data: profile})
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
		var name = window.prompt("将当前配置保存为:") || '';
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

	var child;
	window.parent.document.getElementById('preview').onclick = function () {
		if (child && !child.closed) {
			child.location.reload();
			child.focus();
		} else {
			var match = window.location.href.match(/[&?]id=([^&]+)/);
			var wid = match ? ('?id=' + match[1]) : '';
			child = window.open('/preview/simulator.html' + wid);
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
})();

