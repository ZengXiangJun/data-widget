require('./index.less');
var render = require('./render.js');
var locale = require('./i18n');
var tpl = require('./index.html');
Enhancer.registerWidget({
    construct: function(profile, zContext) {
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
                height: 200
            }
        }, profile);
        var that = this;
        var $container = this.getContainer();
        this.profile = profile;
        this.$container = $container;
        this.currPage = 1;
        that.affected();
        //选中高亮
        $container.on('click', '.singleWrap', function() {
            $container.find('.singleWrap').attr('isCurr', 'false');
            $(this).attr('isCurr', 'true');
            that.trig('onUnitClick');
            if (profile.selectHighlight) {
                if($(this).hasClass('ui-state-highlight')) {
                    $(this).removeClass('ui-state-highlight').removeAttr('seletTime');
                } else {
                    var t = new Date();
                    $(this).addClass('ui-state-highlight').attr('seletTime', t.getTime());
                    that.trig('onUnitSelected');
                }
                that.trig('onSelectedUnitsChange')
            }
        });
        //悬浮高亮
        if (profile.hoverHighlight) {
            $container.on('mouseover', '.singleWrap', function() {
                $(this).addClass('ui-state-hover');
            }).on('mouseout', '.singleWrap', function() {
                $(this).removeClass('ui-state-hover');
            });
        }
        //排序
        if (profile.sortable) {
            $container.find('.content').sortable({
                stop: function() {
                    var hasSelect = false;
                    $container.find('.singleWrap').map(function(index) {
                        $(this).attr('index', index);
                        if (parseInt($(this).attr('seletTime')) ) {
                            hasSelect = true;
                        }
                    })
                    that.trig('onUnitIndexChange');
                    if (hasSelect) {
                        that.trig('onSelectedUnitsChange');
                    }
                }
            });
        }
        //点击按钮
        $container.on('click', '.buttonWrap', function() {
            $container.find('.singleWrap').attr('isCurr', 'false');
            $container.find('.buttonWrap').attr('isCurrButton', 'false');
            $(this).attr('isCurrButton', 'true').parents('.singleWrap').attr('isCurr', 'true');
            that.trig($(this).attr('unitid'));
        })
        //前一页跳转
        $container.on('click', '#prePage', function() {
            var currPage = parseInt($(this).attr('page'));
            if (currPage > 1) {
                that.currPage = currPage - 1;
                that.affected();
            }
        })
        //后一页跳转
        $container.on('click', '#nextPage', function() {
            var currPage = parseInt($(this).attr('page'));
            var maxPage = parseInt($(this).attr('maxPage'));
            if (currPage < maxPage) {
                that.currPage = currPage + 1;
                that.affected();
            }
        })
        //指定页跳转
        $container.on('click', '#goToPage', function() {
            var currPage = parseInt($(this).attr('page'));
            var maxPage = parseInt($(this).attr('maxPage'));
            var goToPage = parseInt($container.find('#goToNum').val());
            if (goToPage < 1) {
                goToPage = 1
            } else if (goToPage > maxPage) {
                goToPage = maxPage
            }
            if (currPage !== goToPage) {
                that.currPage = goToPage;
                that.affected();
            }
        })
        //显示按钮跳转
        $container.on('click', '.pageJump', function() {
            if (!$(this).hasClass('ui-state-highlight')) {
                that.currPage = parseInt($(this).attr('page'));
                that.affected();
            }
        })
        return $container;
    },
    onFrameReady: function(zContext) {},
    getData: function() {
        var $container = this.$container;
        //获取所有数据
        function allData() {
            var data = []
            $container.find('.singleWrap').map(function() {
                data.push($(this).data('eachData'));
            })
            return data;
        }
        //获取所有选中序号
        function selectIndex() {
            var arr = [];
            $container.find('.singleWrap').map(function(index) {
                if (parseInt($(this).attr('seletTime')) ) {
                    arr.push(index);
                }
            })
            return arr;
        }
        //获取最后选中的序号
        function lastSelectIndex() {
            var time = 0;
            var lastIndex = null;
            $container.find('.singleWrap').map(function(index) {
                if (parseInt($(this).attr('seletTime')) > time) {
                    time = parseInt($(this).attr('seletTime'));
                    lastIndex = index;
                }
            })
            return lastIndex;
        }
        return {
            'Units': allData(),
            'CURR_UNIT_INDEX': parseInt($container.find('.singleWrap[isCurr="true"]').attr('index')),
            'CURR_UNIT_DATA': $container.find('.singleWrap[isCurr="true"]').data('eachData'),
            'SELECTED_UNITS_INDEX': selectIndex(),
            'LAST_SELECTED_UNIT_INDEX': lastSelectIndex(),
            'BUTTON_EVENT_ID': $container.find('.buttonWrap[isCurrButton="true"]').attr('unitid'),
            'BUTTON_EVENT_NAME': $container.find('.buttonWrap[isCurrButton="true"]').attr('text')
        };
    },
    isValid: function() {
        var $container = this.$container;
        if (!$container.find('.singleWrap[class~=ui-state-highlight]').length) {
            return false
        } else {
            return true
        }
    },
    affected: function() {
        var that = this;
        var page = this.currPage;
        var $container = this.$container;
        $container.html(tpl({})).addClass('data-widget');
        var profile = this.profile;
        var rule = {};
        if (profile.pagination) {
            rule = {
                "paged": true,
                "page": page,
                "rowNum": profile.perPageNum
            }
        }
        this.getSourceData(profile.sourceId, rule, function(data){
            var records = data.records;
            var maxPage = Math.ceil(records/profile.perPageNum);
            if (!data){
                data = [];
            }
            if (data.rows){
                data = data.rows;
            }
            $container.find('.content').html(that.__content(data)).css({
                'padding-bottom': profile.setSpacing + 'px',
                'padding-right': profile.setSpacing + 'px'
            });
            $container.find('.singleWrap').map(function(index) {
                $(this).data('eachData', data[index]);
            })
            $container.find('.buttonWrap').button();
            if (profile.centerButton) {
                $container.find('.bottomWrap').css('text-align', 'center');
            }
            if (profile.pagination) {
                $container.find('.content').css('max-height', 'calc(100% - 40px)');
                $container.find('.page').html(render('page', locale, {
                    'page': page,
                    'maxPage': maxPage || 1
                })).css('display', 'block');
                $container.find('.pageWrap a').button();
                if (profile.pagerPos === 'left') {
                    $container.find('.pageWrap').css({
                        'float': 'left',
                        'margin-left': '10px'
                    });
                } else if (profile.pagerPos === 'right') {
                    $container.find('.pageWrap').css({
                        'float': 'right',
                        'margin-right': '10px'
                    });  
                }
            }
            that.trig('onDataComplete');
            if (!that.__isWidgetInitialized) { 
                that.__isWidgetInitialized = true;
                that.trig('complete');
            }
        })
    },
    __content: function(data) {
        var $container = this.$container;
        var profile = this.profile;
        var str = '';
        data.forEach(function(eachData, index) {
            str += `<div class="singleWrap ui-widget-content" index="${index}" 
            style="margin-left:${profile.setSpacing}px;margin-top:${profile.setSpacing}px;
            width:${profile.tpl.width}px"><div class="topWrap" 
            style="width:${profile.tpl.width}px;height:${profile.tpl.height}px">`;
            profile.tpl.imgs.forEach(function(eachTpl) {
                str += render('pic', eachTpl, eachData);
            })
            profile.tpl.titles.forEach(function(eachTpl) {
                str += render('title', eachTpl, eachData);
            })
            profile.tpl.paras.forEach(function(eachTpl) {
                str += render('para', eachTpl, eachData);
            })
            profile.tpl.icons.forEach(function(eachTpl) {
                str += render('icon', eachTpl, eachData);
            })
            str += `</div>`;
            if (profile.tpl.buttons.length) {
                str += `<div class="bottomWrap ui-state-hover" style="width:100%;">`;
                profile.tpl.buttons.forEach(function(eachTpl) {
                    str += render('button', eachTpl, eachData);
                })
                str += `</div>`;
            }
            str += `</div>`;
        })
        return str.replace(/\s+/g, " ").trim();
    }
});