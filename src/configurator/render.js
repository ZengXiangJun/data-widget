module.exports = function(type, data) {
    var str;
    if (type === 'pic') {
        str = `<div class="picWrap unit" style="width:${data.width}px;
        height:${data.height}px;border-radius:${data.borderRadius}%; 
        position:absolute;left:${data.left}px;top:${data.top}px;opacity:${data.opacity}" 
        unitId="${data.unitId}" src="${data.src}" title="双击编辑">
        <img src="${/@[^@]+@/.test(data.src) ? 
        'data:image/png;base64,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'
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