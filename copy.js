const path = require('path');
const fse = require('fs-extra');
module.exports = function (cb) {
	// fse.copySync(path.resolve(__dirname, 'src/xxx/'), path.resolve(__dirname, 'build/xxx/'));
	cb && cb();
}