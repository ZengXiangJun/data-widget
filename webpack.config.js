const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const open = require('open');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ROOT_PATH = __dirname;
const BUILD_PATH = path.resolve(__dirname, 'build');
const prod = process.env.NODE_ENV === "production";
const package = require('./package.json');


let ret = [];
['configurator', 'widget'].forEach((key) => {
  const files = fs.readdirSync(path.resolve(ROOT_PATH, `src/${key}/i18n`));
  files.some((file, i) => {
    if (file.indexOf('index') === 0) {
      files.splice(i, 1);
      return true;
    }
  });

  ret = ret.concat(files.map((item) => {
    const lang = item.split('.')[1];

    return {
      stats: {
      },
      entry: {
        index: path.resolve(ROOT_PATH, `src/${key}/index.js`)
      },
      output: {
        path: `${BUILD_PATH}/${key}/${lang}`,
        filename: "[name].js"
      },
      devServer: {
        contentBase: "./src"
      },
      devtool: 'source-map',
      resolve: {
        alias: {
          i18n: path.resolve(ROOT_PATH, `src/${key}/i18n`)
        }
      },
      externals: {
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
        $: 'window.jQuery'
      },
      module: {
        rules: [{
          test: /\.jsx?$/,
          use: 'babel-loader',
          include: path.join(ROOT_PATH, 'src')
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }, {
          test: /\.less$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, { 
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }],
        }, {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 25000,
            }
          }
        }, {
          test: /\.html$/,
          use: {
            loader:'handlebars-loader',
            options: {
              helperDirs: path.join(ROOT_PATH, `src/${key}/helpers`)
            }
          }
        }]
      },
      plugins: [
        new webpack.DefinePlugin({ LANG: "\'" +  lang + "\'"})
      ]
    }
  }));
});



function handleSimulator () {
  const custom = getCustomData();
  let html = fs.readFileSync('./preview/simulator.html', 'utf8');
  html = html.replace(/\/\/menuNodesExtraStart(.|\n)+?\/\/menuNodesExtraEnd/, `//menuNodesExtraStart
    window.menuNodesExtraEnd = ${JSON.stringify(custom)}
    //menuNodesExtraEnd`);
  fs.writeFileSync('./preview/simulator.html', html, 'utf8');

  html = fs.readFileSync('./preview/config.html', 'utf8');
  html = html.replace(/\/\/menuNodesExtraStart(.|\n)+?\/\/menuNodesExtraEnd/, `//menuNodesExtraStart
    window.menuNodesExtraEnd = ${JSON.stringify(custom)}
    //menuNodesExtraEnd`);
  fs.writeFileSync('./preview/config.html', html, 'utf8');
}

function getMockData(id) {
  id = parseInt(id, 10);
  if (!id) {
    process.exit(0);
  }
  const filename = `./preview/lib/js/mock/page-profile-${id}.json`
  
  let profile;
  try {
    delete require.cache[require.resolve(filename)];
    profile = require(filename);
  } catch (e){
  }
  return profile;
}
function getCustomData() {
  const customPath = './preview/lib/js/mock/custom.json';
  delete require.cache[require.resolve(customPath)];
  const custom = require(customPath);
  return custom;
}
function generateMockDate(id, name) {
  id = parseInt(id, 10);
  if (!id) {
    process.exit(0);
  }

  const profileData = require('./preview/lib/js/mock/page-profile.json');
  const win = profileData.frames[10].windows[11];
  win.title = require('./package.json').name;
  win.widgetName = win.title;
  win.widgetVersion = require('./package.json').version;
  const filename = `./preview/lib/js/mock/page-profile-${id}.json`;
  fs.writeFileSync(filename, JSON.stringify(profileData, null, 2), 'utf8');

  const customPath = './preview/lib/js/mock/custom.json';
  delete require.cache[require.resolve(customPath)];
  const custom = getCustomData();
  custom[id - 2] = {
    id: id,
    name: name
  }
  fs.writeFileSync(customPath, JSON.stringify(custom, null, 2), 'utf8');

  return require(filename);
}
function getProfile(req, res) {
  const match = req.url.match(/[&?]id=([^&]+)/);
  if (!match) {
    return res.end(JSON.stringify({success: false}));
  }
  const mockData = getMockData(match[1]);
  if (!mockData) {
    return res.end(JSON.stringify({success: true, data: {
      config: {},
      data: []
    }}));
  }
  const win = mockData.frames[10].windows[11];
  const ret = {
    config: win.widgetProfile,
    data: win.datasources ? Object.keys(win.datasources).map((key) => {
      const item = win.datasources[key];
      item.id = key;
      return item;
    }) : []
  }
  res.end(JSON.stringify({success:true, data: ret}));
}

function uploadFile (req, res) {
  const multiparty = require('multiparty');
  const form = new multiparty.Form({
    uploadDir: './preview/image'
  });
  form.parse(req, function(err, fields, files) {
    const data = [];
    files && Object.keys(files).forEach((key) => {
      files[key].forEach((file) => {
        data.push({
          filename: file.originalFilename,
          url: '/' + file.path
        })
      })
    })
    res.end(JSON.stringify({success:true, data: {files: data}}));
  });
}

function getConfigurator (req, res) {
  /// hack
  let html = fs.readFileSync('./src/configurator/configurator.html', 'utf8');
  const css = `<link type="text/css" href="/preview/lib/css/jquery-ui.structure.min.css" rel="stylesheet">
    <link id="theme" themename="base" type="text/css" href="/preview/lib/css/themes/base/jquery-ui.theme.min.css" rel="stylesheet" >
    <link type="text/css" href="/preview/lib/css/jquery.ambiance.css" rel="stylesheet">`;

  const js = `<script src="/preview/lib/js/jquery.ambiance.js"></script>
    <script src="/preview/platform_config.js"></script>
    <script src="/build/configurator/zh-cn/index.js"></script>
    <script src="/preview/lib/js/platform_config_extra.js"></script>`;

  html = html.replace(/<\/\s*head>/, css);
  html = html.replace(/<script\s*type="text\/javascript"\s*src="\.\/index\.js"\s*>\s*<\/\s*script>/, js);
  res.end(html);
}

function doSave(res, data, id, custom) {
  if (custom) {
    fs.writeFileSync('./preview/lib/js/mock/custom.json', JSON.stringify(custom, null, 2), 'utf8');
    handleSimulator();
  }
  fs.writeFile(`./preview/lib/js/mock/page-profile-${id}.json`, JSON.stringify(data, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
    }
    
    res.end(JSON.stringify({
      success: !err,
      data: id
    }));
  });
}

function saveProfile (req, res, body) {
  if (body.type === 'list') {
    const custom = getCustomData();
    const id = custom.length + 2;
    const ret = generateMockDate(id, body.data.name);
    const win = ret.frames[10].windows[11];
    win.widgetProfile = body.data.config;
    if (body.data.data && body.data.data.length) {
      win.datasources = {};
      body.data.data.forEach((item) => {
        win.datasources[item.id] = item;
      });
    }
    custom.push({
      id: id,
      name: body.data.name
    });
    return doSave(res, ret, id, custom);
  }

  if (body.type === 'remove') {
    const custom = getCustomData();
    return doSave(res, {}, body.data.id, custom.filter((it) => {
      return !(it.id == body.data.id);
    }));
  } 

  const match = req.url.match(/[&?]id=([^&]+)/);
  if (!match) {
    return res.end(JSON.stringify({success: false}));
  }

  let ret = getMockData(match[1]); 
  if (!ret) {
    return res.end(JSON.stringify({success: false}));
  } 

  if (body.type === 'addSource' || body.type === 'setSource') {
    const win = ret.frames[10].windows[11];
    win.datasources[body.data.id] = body.data;
    return doSave(res, ret, match[1]);
  }

  if (body.type === 'delSource') {
    const win = ret.frames[10].windows[11];
    delete win.datasources[body.data.id];
    return doSave(res, ret, match[1]);
  } 

  if (body.type === 'config') {
    const win = ret.frames[10].windows[11];
    win.widgetProfile = body.data;
    return doSave(res, ret, match[1]);
  }

  if (body.type === 'data') {
    const win = ret.frames[10].windows[11];

    if (!Array.isArray(body.data)) {
      body.data = [body.data];
    }
    win.datasources = win.datasources || {};
    body.data.forEach((item) => {
      win.datasources[item.id] = item;
    });
    return doSave(res, ret, match[1]);
  }
}


const bs = new BrowserSyncPlugin({
  host: '127.0.0.1',
  port: 8001,
  cors: true,
  open: 'external',
  notify: false,
  server: { 
    baseDir: ['.'],
    index: 'preview/config.html',
    files: ['src/**/*.js', 'src/**/*.less', 'src/**/*.html'],
    middleware: function(req, res, next) {
      res.setHeader('set-cookie', 'lang=zh-cn');
      const url = req.url.split('?')[0];
      if (url === '/profile') {
        res.writeHead(200, {
          'Content-Type': 'application/json' 
        });
        
        if (req.method === 'GET') {
          return getProfile(req, res);
        } else if (req.method === 'POST') {
          let body = '';
          req.on('data', function (data) {
             body += data;
          });
          req.on('end', function () {
            body = JSON.parse(body);
            saveProfile(req, res, body);
          });
        }
        return;
      } else if (url === '/upload') {
        return uploadFile(req, res);
      } else if (url === '/src/configurator/configurator.html') {
        return getConfigurator(req, res);
      } else if (url === '/all') {
        res.writeHead(200, {
          'Content-Type': 'application/json' 
        });
        const match = req.url.match(/[&?]id=([^&]+)/);
        res.end(JSON.stringify({
          success: true,
          data: getMockData(match[1])
        }))
      }
      return next();
    }
  }
}, {
  callback: function (err, bs) {
    //const external = bs.getOptions().get('urls').get('external');
    //open(`${external}/preview/widget.html`);
  }
})
ret[0].plugins.push(bs);
module.exports = ret;


