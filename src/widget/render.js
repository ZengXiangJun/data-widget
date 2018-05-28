module.exports = function(type, tpl, data) {
    var content = '';
    var pageStr = '';
    function dataConver(str, data) {
        return str.replace(/@[^@]+@/g, function(e) {
            if (data[e.replace(/@/g, '')]) {
                return data[e.replace(/@/g, '')]
            } else if (Enhancer.ZContext.value(e.replace(/@/g, ''))) {
                return Enhancer.ZContext.value(e.replace(/@/g, ''))
            } else {
                return ''
            }
        })
    }
    function page(data) {
        var page = data.page;
        var maxPage = data.maxPage;
        var arr = [];
        if (maxPage === 1) {
            return '<a class="pageJump" page="1">1</a>'
        }
        [page - 1, page, page + 1].forEach(function(val) {
            if ( val > 1 && val < maxPage) {
                arr.push(val)                        
            }
        })
        var start = [1];
        var end = [maxPage];
        var str = '';
        start.concat(arr).concat(end).forEach(function(val) {
            str += '<a class="pageJump'
            if (val === page) {
                str += ' ui-state-highlight'
            }
            str += `" page="${val}">`
            if (val === 1 && page > 3) {
                str += `${val}...</a>` 
            } else if (val === maxPage && page < (maxPage - 2)) {
                str += `...${val}</a>` 
            } else {
                str += `${val}</a>` 
            }
        })
        return str;
    }
    if (type === 'pic') {
        content = `<div class="picWrap unit" style="width:${tpl.width}px;
        height:${tpl.height}px;border-radius:${tpl.borderRadius}%;overflow:hidden;
        position:absolute;left:${tpl.left}px;top:${tpl.top}px;opacity:${tpl.opacity}" 
        unitId="${tpl.unitId}" src="${dataConver(tpl.src, data)}">
        <img src="${dataConver(tpl.src, data)}" style="width:100%;height:100%"></div>`;
    } else if (type === 'title') {
    	content = `<div class="titleWrap unit" style="position:absolute;left:
    	${tpl.left}px;top:${tpl.top}px;font-size:${tpl.fontSize}px;
    	font-family:${tpl.fontFamily};font-weight:${tpl.fontWeight};
    	letter-spacing:${tpl.letterSpacing}px;white-space:nowrap" unitId="${tpl.unitId}" 
    	src="${dataConver(tpl.src, data)}">${dataConver(tpl.src, data)}</div>`;
    } else if (type === 'para') {
    	content = `<div class="paraWrap unit ui-widget-content" style="position:
    	absolute;left:${tpl.left}px;top:${tpl.top}px;width:${tpl.width}px;
    	height:${tpl.height}px;padding:5px;font-size:${tpl.fontSize}px;
    	font-family:${tpl.fontFamily};font-weight:${tpl.fontWeight};overflow:auto;
    	opacity:${tpl.opacity};border-width:${tpl.hasBorder ? '0.5px' : '0px'}" 
    	lineSpacing="${tpl.lineSpacing}" unitId="${tpl.unitId}" src="${dataConver(tpl.src, data)}" 
    	hasBorder="${tpl.hasBorder}"><p style="margin:0;padding:0;
    	letter-spacing:0.4px;height:${tpl.fontSize + tpl.lineSpacing}px;line-height:
    	${tpl.fontSize + tpl.lineSpacing}px">${dataConver(tpl.src, data)}</p></div>`
    } else if (type === 'icon') {
    	content = `<i class="iconWrap unit ${tpl.src}" style="position:absolute;
    	left:${tpl.left}px;top:${tpl.top}px;font-size:${tpl.fontSize}px" 
    	unitId="${tpl.unitId}" src="${tpl.src}"></i>`;
    } else if (type === 'button') {
    	content = `<span class="buttonWrap unit" style="white-space:nowrap;margin-left:3px;
    	padding:3px 4px;font-size:15px;" showIcon="${tpl.showIcon}" icon="${tpl.icon}" 
    	text="${dataConver(tpl.text, data)}" unitId="${tpl.unitId}">${tpl.showIcon ? 
    	`<i class="${tpl.icon}" style="${tpl.text? 'margin-right:2px':''}"></i>`:''}
        ${dataConver(tpl.text, data)}</span>`
    } else if (type === 'page') {
        pageStr += `<span class="pageWrap">
        <a id="prePage" page="${data.page}">${tpl('prePage')}</a>
        ${page(data)}
        <a id="nextPage" page="${data.page}" maxPage="${data.maxPage}">${tpl('nextPage')}</a>
        <input type="number" id="goToNum" title="大于 1 的整数" value="${data.page}">
        <a id="goToPage" page="${data.page}"  maxPage="${data.maxPage}">${tpl('goTo')}</a>
        </span>`;
    }
    return (content? content:pageStr).replace(/\s+/g, " ").trim();
}