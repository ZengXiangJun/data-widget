module.exports = function (css) {
  return Enhancer.CssVar.transform(css, 'data-widget');
}

