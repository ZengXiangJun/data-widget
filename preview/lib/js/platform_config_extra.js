$(window).on('load', function () {
	setTimeout(function () {
		$('.source-type-static').click();
	}, 500);
	var themeName = (document.cookie || '').match(/theme=([^;]+)/);
  themeName = themeName ? themeName[1] : 'base';
  if (themeName) {
    var $theme = $('#theme')
    $theme.attr('href', '/preview/lib/css/themes/' + themeName + '/jquery-ui.theme.min.css?' + Date.now())
    .attr('themename', themeName);
    $("body").attr("theme", themeName);
  }
})	