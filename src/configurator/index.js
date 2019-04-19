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
                src: 'data:image/png;base64,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',
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
                minHeight: 30,
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
            singleSelect: false,
            hoverHighlight: true,
            sortable: true,
            pagination: false,
            pagerPos: 'right',
            perPageNum: 6,
            centerButton: false,
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
        $('#singleSelect').prop('checked', profile.singleSelect);
        $('#hoverHighlight').prop('checked', profile.hoverHighlight);
        $('#sortable').prop('checked', profile.sortable);
        $('#pagination').prop('checked', profile.pagination);
        $('#pagerPos').val(profile.pagerPos);
        $('#perPageNum').val(profile.perPageNum);
        $('#centerButton').prop('checked', profile.centerButton);
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
                singleSelect: $('#singleSelect').prop('checked'),
                hoverHighlight: $('#hoverHighlight').prop('checked'),
                sortable: $('#sortable').prop('checked'),
                pagination: $('#pagination').prop('checked'),
                pagerPos: $('#pagerPos').val(),
                perPageNum: parseInt($('#perPageNum').val()),
                centerButton: $('#centerButton').prop('checked'),
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
        }, {
            'id': 'onDataComplete',
            'name': locale('onDataComplete'),
            'des': "Triggered when data complete"
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