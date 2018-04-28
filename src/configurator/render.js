module.exports = function(type, data) {
    var str;
    if (type === 'pic') {
        str = `<div class="picWrap unit" style="width:${data.width}px;
        height:${data.height}px;border-radius:${data.borderRadius}%; 
        position:absolute;left:${data.left}px;top:${data.top}px;opacity:${data.opacity}" 
        unitId="${data.unitId}" src="${data.src}" title="双击编辑">
        <img src="${/@[^@]+@/.test(data.src) ? 
        'http://oz98nwten.bkt.clouddn.com/header-1.jpg'
        :data.src}" style="width:100%;height:100%"></div>`;
    } else if (type === 'title') {
    	str = `<div class="titleWrap unit" style="position:absolute;left:
    	${data.left}px;top:${data.top}px;font-size:${data.fontSize}px;
    	font-family:${data.fontFamily};font-weight:${data.fontWeight};
    	letter-spacing:${data.letterSpacing}px;
    	white-space:nowrap" unitId="${data.unitId}" 
    	src="${data.src}" title="双击编辑">${data.src}</div>`;
    } else if (type === 'para') {
    	str = `<div class="paraWrap unit ui-widget-content" style="position:
    	absolute;left:${data.left}px;top:${data.top}px;width:${data.width}px;
    	height:${data.height}px;padding:5px;font-size:${data.fontSize}px;
    	font-family:${data.fontFamily};font-weight:${data.fontWeight};overflow:hidden;
    	opacity:${data.opacity};border-width:${data.hasBorder ? '0.5px' : '0px'}" 
    	lineSpacing="${data.lineSpacing}" unitId="${data.unitId}" src="${data.src}" 
    	hasBorder="${data.hasBorder}" title="双击编辑"><p style="margin:0;padding:0;
    	letter-spacing:0.4px;height:${data.fontSize + data.lineSpacing}px;line-height:
    	${data.fontSize + data.lineSpacing}px">${data.src}</p></div>`
    } else if (type === 'icon') {
    	str = `<i class="iconWrap unit ${data.src}" style="position:absolute;
    	left:${data.left}px;top:${data.top}px;font-size:${data.fontSize}px" 
    	unitId="${data.unitId}" src="${data.src}"></i>`;
    } else if (type === 'button') {
    	str = `<span class="buttonWrap unit" style="white-space:nowrap;margin-left:3px;
    	padding:4px 4px;font-size:15px" showIcon="${data.showIcon}" icon="${data.icon}" 
    	text="${data.text}" unitId="${data.unitId}">${data.showIcon ? 
    	`<i class="${data.icon}" style="${data.text? 'margin-right:2px':''}"></i>`:''}${data.text}</span>`
    }
    return str.replace(/\s+/g, " ").trim();
}