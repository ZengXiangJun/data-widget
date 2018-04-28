require('./index.less');
var render = require('./render.js');
var dependency = require('../lib/third-party-dependency');
var locale = require('./i18n');
var template = require('./index.html');
var configurator = {
    construct: function() {
        var that = this;
        $('body').html(template({locale: locale()}));
        this.optionsConfigurator = Enhancer.DatasourceManager
        .createConfigurator('sourceWindow',{
            title: locale('title'),
            dataSpecification: locale('dataSpecification'),
            sourceId: $('#sourceWindow').attr('sourceId'),
            onSave : function(src){
                $('#sourceWindow').attr('sourceId', src.id);
            }
        })
        //限制输入
        $('#setSpacing').blur(function() {
            $(this).val(parseInt($(this).val()) <= 0 ? 1 : parseInt($(this).val()));
        });
        $('#perPageNum').blur(function() {
            $(this).val(parseInt($(this).val()) < 1 ? 1 : parseInt($(this).val()));
        });
        //禁用输入
        $('#pagination').click(function() {
            if($(this).prop('checked')) {
                $('#pagerPos,#perPageNum').attr('disabled', false);
            } else {
                $('#pagerPos,#perPageNum').attr('disabled', true);
            }
        })
        //调整模板
        $( ".template" ).resizable({
            containment: ".outerWrap_1",
            minHeight: 100,
            minWidth: 100,
            start: function() {
                var $this = $(this);
                that.___divSync($this.width(), $this.height());
            },
            resize: function() {
                var $this = $(this);
                that.___divSync($this.width(), $this.height());
            },
            stop: function() {
                var $this = $(this);
                that.___divSync($this.width(), $this.height());
            }
        });
        //创建ID
        function createId(type) {
            var t = new Date();
            return type + t.getTime();
        }
        //阻止冒泡
        $(document).on('click', '.edit,.icon-selector', function(e) {
            if (e.stopPropagation) {
                e.stopPropagation(); //w3c标准
            } else {
                e.cancelBubble = true; //兼容IE
            }
        })
        //隐藏编辑框
        $(document).click(function(event) {
            $('.edit').slideUp('fast');
        })
        //删除unite
        function removeUnit($this) {
            var unitId = $this.data().unitId;
            $('.unit[unitId="' + unitId + '"]').remove();
            $('.edit').slideUp('fast');
        }
        $('.deleteUnit').click(function() {
            removeUnit($(this));
        })
        //添加图片
        $('.addPic').click(function() {
            $('.template').append(render('pic', {
                src: 'http://oz98nwten.bkt.clouddn.com/header-1.jpg',
                width: 80,
                height: 80,
                opacity: 1,
                borderRadius: 50,
                left: 5,
                top: 5,
                unitId: createId('pic')
            }));
        })
        //调整图片
        $('.template').on('mouseover', '.picWrap', function() {
            $(this).resizable({
                start: function(){
                    $('.edit').slideUp('fast');
                },
                containment: ".template",
                minHeight: 40,
                minWidth: 40
            }).draggable({
                start: function(){
                    $('.edit').slideUp('fast');
                },
                containment: ".template"
            })
        })
        //调出图片编辑框
        $('.template').on('dblclick', '.picWrap', function() {
            $('.edit').slideUp('fast');
            var data = that.__getTpl('pic', $(this));
            $('.deleteUnit,#savePic').data(data);
            $('#picSrc').val(data.src);
            $('#picWidth').val(data.width);
            $('#picHeight').val(data.height);
            $('#picOpacity').val(data.opacity);
            $('#picBorderRadius').val(data.borderRadius);
            $('.picEdit').slideDown('fast');
        })
        //保存图片
        $('#savePic').click(function() {
            var data = $(this).data();
            data.src = $('#picSrc').val();
            data.width = parseInt($('#picWidth').val());
            data.height = parseInt($('#picHeight').val());
            data.opacity = parseFloat($('#picOpacity').val());
            data.borderRadius = parseInt($('#picBorderRadius').val());
            $('.edit').slideUp('fast');
            removeUnit($(this));
            $('.template').append(render('pic', data));
        })
        //添加标题
        $('.addTitle').click(function() {
            $('.template').append(render('title', {
                src: 'New Title',
                fontFamily: 'arial',
                fontSize: 20,
                letterSpacing: 1,
                fontWeight: 600,
                left: 5,
                top: 5,
                unitId: createId('title')
            }))
        })
        //调整标题
        $('.template').on('mouseover', '.titleWrap', function() {
            $(this).draggable({
                start: function(){
                    $('.edit').slideUp('fast');
                },
                containment: ".template"
            })
        })
        //调出标题编辑框
        $('.template').on('dblclick', '.titleWrap', function() {
            $('.edit').slideUp('fast');
            var data = that.__getTpl('title', $(this));
            $('.deleteUnit,#saveTitle').data(data);
            $('#titleSrc').val(data.src);
            $('#titleFontFamily').val(data.fontFamily);
            $('#titleFontSize').val(data.fontSize);
            $('#titleFontWeight').val(data.fontWeight);
            $('#titleSpacing').val(data.letterSpacing);
            $('.titleEdit').slideDown('fast');
        })
        //保存标题
        $('#saveTitle').click(function() {
            var data = $(this).data();
            data.src = $('#titleSrc').val();
            data.fontFamily = $('#titleFontFamily').val();
            data.fontSize = parseInt($('#titleFontSize').val());
            data.letterSpacing = parseFloat($('#titleSpacing').val());
            data.fontWeight = parseInt($('#titleFontWeight').val());
            $('.edit').slideUp('fast');
            removeUnit($(this));
            $('.template').append(render('title', data));
        })
        //添加段落
        $('.addPara').click(function() {
            $('.template').append(render('para', {
                src: 'New Para',
                width: 200,
                height: 180,
                fontFamily: 'arial',
                fontSize: 20,
                lineSpacing: 1,
                hasBorder: true,
                fontWeight: 600,
                opacity: 1,
                left: 5,
                top: 5,
                unitId: createId('para')
            }))
        })
        //调整段落
        $('.template').on('mouseover', '.paraWrap', function() {
            $(this).resizable({
                start: function(){
                    $('.edit').slideUp('fast');
                },
                containment: ".template",
                minHeight: 80,
                minWidth: 100
            }).draggable({
                start: function(){
                    $('.edit').slideUp('fast');
                },
                containment: ".template"
            })
        })
        //调出段落编辑框
        $('.template').on('dblclick', '.paraWrap', function() {
            $('.edit').slideUp('fast');
            var data = that.__getTpl('para', $(this));
            $('.deleteUnit,#savePara').data(data);
            $('#paraSrc').val(data.src);
            $('#paraFontFamily').val(data.fontFamily);
            $('#paraFontSize').val(data.fontSize);
            $('#paraSpacing').val(data.lineSpacing);
            $('#paraBorder').prop('checked', data.hasBorder);
            $('#paraFontWeight').val(data.fontWeight);
            $('#paraOpacity').val(data.opacity);
            $('.paraEdit').slideDown('fast');
        })
        //保存段落
        $('#savePara').click(function() {
            var data = $(this).data();
            data.src = $('#paraSrc').val();
            data.fontFamily = $('#paraFontFamily').val();
            data.fontSize = parseInt($('#paraFontSize').val());
            data.lineSpacing = parseFloat($('#paraSpacing').val());
            data.hasBorder = $('#paraBorder').prop('checked');
            data.fontWeight = parseInt($('#paraFontWeight').val());
            data.opacity = parseFloat($('#paraOpacity').val());
            $('.edit').slideUp('fast');
            removeUnit($(this));
            $('.template').append(render('para', data));
        })
        //添加图标
        $('.addIcon').click(function() {
            $('.template').append(render('icon', {
                src: 'fas fa-wrench',
                fontSize: 20,
                left: 5,
                top: 5,
                unitId: createId('icon')
            }))
        })
        //调整图标
        $('.template').on('mouseover', '.iconWrap', function() {
            $(this).draggable({
                start: function(){
                    $('.edit').slideUp('fast');
                },
                containment: ".template"
            })
        })
        //调出图标编辑框
        $('.template').on('dblclick', '.iconWrap', function() {
            $('.edit').slideUp('fast');
            var data = that.__getTpl('icon', $(this));
            $('.deleteUnit,#saveIcon').data(data);
            $('#iconSrc').attr('class', data.src);
            $('#iconFontSize').val(data.fontSize);
            $('.iconEdit').slideDown('fast');
        })
        //选择图标
        $('#iconSrc').click(function() {
            Enhancer.IconSelector.openFor($(this), function() {});
        })
        //保存图标
        $('#saveIcon').click(function() {
            var data = $(this).data();
            data.src = $('#iconSrc').attr('class');
            data.fontSize = parseInt($('#iconFontSize').val());
            $('.edit').slideUp('fast');
            removeUnit($(this));
            $('.template').append(render('icon', data));
        })
        //添加按钮
        $('.addButton').click(function() {
            $('.outerWrap_2').append(render('button', {
                showIcon: true,
                icon: 'fab fa-twitter',
                text: 'New button',
                unitId: createId('button')
            }))
            $('.buttonWrap').button().find('.ui-button-text').css('padding', 0);
        })
        //调整按钮
        $('.outerWrap_2').sortable({ 
            start: function(){
                $('.edit').slideUp('fast');
            },
            axis: "x",
            containment: ".outerWrap_2"
        });
        //调出按钮编辑框
        $('.outerWrap_2').on('dblclick', '.buttonWrap', function() {
            $('.edit').slideUp('fast');
            var data = that.__getTpl('button', $(this));
            $('.deleteUnit,#saveButton').data(data);
            $('#showIcon').prop('checked', data.showIcon);
            $('#buttonIcon').attr('class', data.icon);
            $('#buttonText').val(data.text);
            $('.buttonEdit').slideDown('fast');
        })
        //选择按钮图标
        $('#buttonIcon').click(function() {
            Enhancer.IconSelector.openFor($(this), function() {});
        })
        //保存按钮
        $('#saveButton').click(function() {
            var data = $(this).data();
            data.showIcon = $('#showIcon').prop('checked') ? true:false;
            data.icon = $('#buttonIcon').attr('class');
            data.text = $('#buttonText').val();
            $('.edit').slideUp('fast');
            removeUnit($(this));
            $('.outerWrap_2').append(render('button', data));
            $('.buttonWrap').button().find('.ui-button-text').css('padding', 0);
        })
    },
    setProfile: function(profile) {
        profile = $.extend({
            setSpacing: 10,
            selectHighlight: true,
            hoverHighlight: true,
            sortable: true,
            pagination: false,
            pagerPos: 'right',
            perPageNum: 6,
            tpl: {
                width: 300,
                height: 200,
                imgs: [],
                titles: [],
                paras: [],
                icons: [],
                buttons: []
            }
        }, profile);
        var that = this;
        Enhancer.DatasourceManager
        .getDatasource(parseInt(profile.sourceId), function(ds) {
            if (ds) {
                that.optionsConfigurator.setConfig(ds);
            }
        });
        //赋值
        $('#setSpacing').val(profile.setSpacing);
        $('#selectHighlight').prop('checked', profile.selectHighlight);
        $('#hoverHighlight').prop('checked', profile.hoverHighlight);
        $('#sortable').prop('checked', profile.sortable);
        $('#pagination').prop('checked', profile.pagination);
        $('#pagerPos').val(profile.pagerPos);
        $('#perPageNum').val(profile.perPageNum);
        if (!profile.pagination) {
            $('#pagerPos,#perPageNum').attr('disabled', true);
        };
        $('.template').css({
            'width': profile.tpl.width + 'px',
            'height': profile.tpl.height + 'px'
        });
        that.___divSync(profile.tpl.width, profile.tpl.height);
        //模板回填
        var str = '';
        profile.tpl.imgs.forEach(function(val) {
            str += render('pic', val);
        })
        profile.tpl.titles.forEach(function(val) {
            str += render('title', val);
        })
        profile.tpl.paras.forEach(function(val) {
            str += render('para', val);
        })
        profile.tpl.icons.forEach(function(val) {
            str += render('icon', val);
        })
        $('.template').append(str);
        var str_2 = '';
        profile.tpl.buttons.forEach(function(val) {
            str_2 += render('button', val);
        })
        $('.outerWrap_2').append(str_2);
        $('.buttonWrap').button().find('.ui-button-text').css('padding', 0);
    },
    getProfile: function() {
        var that = this;
        if($('#sourceWindow').attr('sourceId')){
            var imgs = [];
            $('.picWrap').map(function() {
                imgs.push(that.__getTpl('pic', $(this)));
            });
            var titles = [];
            $('.titleWrap').map(function() {
                titles.push(that.__getTpl('title', $(this)));
            })
            var paras = [];
            $('.paraWrap').map(function() {
                paras.push(that.__getTpl('para', $(this)));
            })
            var icons = [];
            $('.iconWrap').map(function() {
                icons.push(that.__getTpl('icon', $(this)));
            })
            var buttons = [];
            $('.buttonWrap').map(function() {
                buttons.push(that.__getTpl('button', $(this)));
            })
            return {
                sourceId: $('#sourceWindow').attr('sourceId'),
                setSpacing: parseInt($('#setSpacing').val()),
                selectHighlight: $('#selectHighlight').prop('checked'),
                hoverHighlight: $('#hoverHighlight').prop('checked'),
                sortable: $('#sortable').prop('checked'),
                pagination: $('#pagination').prop('checked'),
                pagerPos: $('#pagerPos').val(),
                perPageNum: parseInt($('#perPageNum').val()),
                tpl: {
                    width: $('.template').width(),
                    height: $('.template').height(),
                    imgs: imgs,
                    titles: titles,
                    paras: paras,
                    icons: icons,
                    buttons: buttons
                }
            };
        } else {
            alert('ERR : Data not set  请设置数据  !');
            return false;
        }
    },
    getSupportedEventList: function(profile) {
        var data = [{
            'id': 'onUnitClick',
            'name': locale('onUnitClick'),
            'des': "Triggered when Unit click"
        }, {
            'id': 'onUnitSelected',
            'name': locale('onUnitSelected'),
            'des': "Triggered when Unit selected"
        }, {
            'id': 'onSelectedUnitsChange',
            'name': locale('onSelectedUnitsChange'),
            'des': "Triggered when selected Units change"
        }];
        if (profile.sortable) {
            data = data.concat([{
                id: 'onUnitIndexChange',
                name: locale('onUnitIndexChange'),
                des: "Triggered when on Unit index change"
            }])
        }
        var buttonEvent = [];
        $('.outerWrap_2 .buttonWrap').map(function() {
            buttonEvent.push({
                id: $(this).attr('unitid'),
                name: $(this).attr('text'),
                des: "Triggered when " + $(this).attr('text')
            });
        });
        return data.concat(buttonEvent);
    },
    getSupportedVariableList: function(profile) {
        return [{
                name: 'Units',
                type: 'array',
                des: locale('Units')
            }, {
                name: 'CURR_UNIT_INDEX',
                type: 'number',
                des: locale('CURR_UNIT_INDEX')
            }, {
                name: 'CURR_UNIT_DATA',
                type: 'object',
                des: locale('CURR_UNIT_DATA')
            }, {
                name: 'SELECTED_UNITS_INDEX',
                type: 'array',
                des: locale('SELECTED_UNITS_INDEX')
            }, {
                name: 'LAST_SELECTED_UNIT_INDEX',
                type: 'number',
                des: locale('LAST_SELECTED_UNIT_INDEX')
            }, {
                name: 'BUTTON_EVENT_ID',
                type: 'string',
                des: locale('BUTTON_EVENT_ID')
            }, {
                name: 'BUTTON_EVENT_NAME',
                type: 'string',
                des: locale('BUTTON_EVENT_NAME')
            }]
    },
    getDependentVariableList: function(profile) {
    return [];
    },
    getWidth: function(profile) {},
    getHeight: function() {},
    __getTpl: function(type, $this) {
        var tpl = {
            src: $this.attr('src'),
            left: parseInt($this.css('left')),
            top: parseInt($this.css('top')),
            unitId: $this.attr('unitId')
        }
        if (type === 'pic') {
            return $.extend(tpl, {
                width: $this.width(),
                height: $this.height(),
                opacity: parseFloat($this.css('opacity')),
                borderRadius: parseInt($this.css('border-radius'))
            })
        } else if (type === 'title') {
            return $.extend(tpl, {
                fontSize: parseInt($this.css('font-size')),
                fontFamily: $this.css('font-family'),
                fontWeight: parseInt($this.css('font-Weight')),
                letterSpacing: parseFloat($this.css('letter-spacing'))
            })
        } else if (type === 'para') {
            return $.extend(tpl, {
                width: $this.width(),
                height: $this.height(),
                fontSize: parseInt($this.css('font-size')),
                fontFamily: $this.css('font-family'),
                fontWeight: parseInt($this.css('font-Weight')),
                lineSpacing: parseInt($this.attr('lineSpacing')),
                opacity: parseFloat($this.css('opacity')),
                hasBorder: $this.attr('hasborder') === 'true' ? true : false
            })
        } else if (type === 'icon') {
            return $.extend(tpl, {
                fontSize: parseInt($this.css('font-size'))
            })
        } else if (type === 'button') {
            return {
                showIcon: $this.attr('showIcon') === 'true' ? true:false,
                icon: $this.attr('icon'),
                text: $this.attr('text'),
                unitId: $this.attr('unitId')
            }
        }
    },
    
    ___divSync: function(width, height) {
        $('.outerWrap_2').css({
            'position': 'absolute',
            'left': '10px',
            'top': height + 40 + 'px',
            'width': width + 'px'
        })
    }
};
Enhancer.registerWidgetConfigurator(configurator);