const fs = require('fs');
const dir = fs.readdirSync('./');

const arr = [];

let count = 0;

function hex2rgb(hex) {
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[1] + hex[1];
	}
	const num = parseInt(hex, 16);
	const red = num >> 16;
	const green = (num >> 8) & 255;
	const blue = num & 255;
	return red + ', ' + green + ', ' + blue;
}

const primary = {
  "redmond": "--ui-widget-header-background-color",
  "trontastic": "--ui-widget-header-background-color",
  "ui-darkness": "--ui-state-hover-background-color",
  "start": "--ui-widget-header-background-color",
  "mint-choc": "--ui-widget-header-background-color",
  "blitzer": "--ui-widget-header-background-color",
  "base": "--ui-state-active-background-color",
  "vader": "--ui-state-error-border-color",
  "black-tie": "-ui-state-error-background-color",
  "sunny": "--ui-state-active-color",
  "overcast": "--ui-state-default-color",
  "dot-luv": "--ui-widget-header-background-color",
  "pepper-grinder": "--ui-widget-header-background-color",
  "swanky-purse": "--ui-state-error-border-color",
  "ui-lightness": "--ui-widget-header-background-color",
  "south-street": "--ui-state-default-border-color",
  "le-frog": "--ui-state-error-border-color",
  "dark-hive": "--ui-state-hover-background-color",
  "humanity": "--ui-widget-header-background-color",
  "hot-sneaks": "-ui-state-default-background-color",
  "flick": "--ui-state-hover-background-color",
  "excite-bike": "--ui-widget-header-color",
  "eggplant": "--ui-state-hover-color",
  "cupertino": "--ui-state-active-background-color",
  "smoothness": "--ui-state-error-border-color"
};
const secondary  = {
  "redmond": "--ui-state-highlight-background-color",
  "trontastic": "--ui-state-active-background-color",
  "ui-darkness": "--ui-state-active-background-color",
  "start": "--ui-state-highlight-background-color",
  "mint-choc": "--ui-state-highlight-background-color",
  "blitzer": "--ui-state-highlight-border-color",
  "base": "--ui-state-highlight-background-color",
  "vader": "--ui-state-default-background-color",
  "black-tie": "--ui-state-highlight-background-color",
  "sunny": "--ui-state-highlight-background-color",
  "overcast": "--ui-state-active-color",
  "dot-luv": "--ui-state-highlight-background-color",
  "pepper-grinder": "--ui-state-highlight-border-color",
  "swanky-purse": "--ui-state-highlight-color",
  "ui-lightness": "--ui-state-highlight-background-color",
  "south-street": "--ui-state-highlight-background-color",
  "le-frog": "--ui-state-highlight-border-color",
  "dark-hive": "--ui-state-active-border-color",
  "humanity": "--ui-state-highlight-background-color",
  "hot-sneaks": "--ui-state-highlight-background-color",
  "flick": "--ui-state-active-color",
  "excite-bike": "--ui-state-hover-background-color",
  "eggplant": "--ui-state-highlight-border-color",
  "cupertino": "--ui-state-highlight-background-color",
  "smoothness": "--ui-state-highlight-border-color"
};


dir.forEach((theme) => {
	const fPath = `./${theme}/jquery-ui.theme.min.css`;
	const exists = fs.existsSync(fPath);
	if (!exists) {
		return;
	}

	const stat = fs.statSync(fPath);
	if (!stat.isFile()) {
		return
	}
	count++;

	let color = '';
	let file = fs.readFileSync(fPath, 'utf8');

	let index = file.indexOf('.ui-widget.ui-widget-content');
	if (index === -1) { console.log('error'); }
	file = file.substring(index + 1);
	let match = file.match(/border:1px solid #([^};\s]+)/);
	color += `\n  --ui-widget-ui-widget-content-border-color: ${hex2rgb(match[1])};`;
	file = file.substring(match.index);


	const colorMap = {};
	['widget-content', 'widget-header', 'state-default', 'state-hover', 
		'state-active', 'state-highlight', 'state-error'].forEach((key) => {
		index = file.indexOf(`.ui-${key}`);
		if (index === -1) { console.log('error', key); }
		file = file.substring(index + 1);
		match = file.match(/border:1px solid #([^};\s]+)/);
		colorMap[`--ui-${key}-border-color`] = hex2rgb(match[1]);
		color += `\n  --ui-${key}-border-color: ${hex2rgb(match[1])};`
		match = file.match(/background:#([^};\s]+)/);
		colorMap[`--ui-${key}-background-color`] = hex2rgb(match[1]);
		color += `\n  --ui-${key}-background-color: ${hex2rgb(match[1])};`
		match = file.match(/color:#([^};\s]+)/);
		colorMap[`--ui-${key}-color`] = hex2rgb(match[1]);
		color += `\n  --ui-${key}-color: ${hex2rgb(match[1])};`;
	});

	index = file.indexOf(`.ui-widget-overlay`);
	if (index === -1) { console.log('error', 'overlay'); }
	file = file.substring(index + 1);
	match = file.match(/background:#([^};\s]+)/);
	color += `\n  --ui-widget-overlay-background-color: ${hex2rgb(match[1])};`;

	index = file.indexOf(`.ui-widget-shadow`);
	if (index === -1) { console.log('error', 'shadow'); }
	file = file.substring(index + 1);
	match = file.match(/box-shadow:.+#([^};\s]+)/);
	color += `\n  --ui-widget-shadow-color: ${hex2rgb(match[1])};`;


	color += `\n --ui-state-primary: ${colorMap[primary[theme]]};`
	color += `\n --ui-state-secondary: ${colorMap[secondary[theme]]};`

	file = fs.readFileSync(fPath, 'utf8');
	// file = `* \{\n${color}\n\}\n\n ${file}`;
	file = `[theme=${theme}] \{\n${color}\n\}\n\n ${file.substring(file.indexOf('/*!') - 2)}`;
	fs.writeFileSync(fPath, file, 'utf8');
	arr.push(color);
});

arr.forEach((item) => {
	//console.log('\n\n');
	//console.log(item);
});
if (count !== 25) {
	console.log('lack theme !!!!', count);
}
