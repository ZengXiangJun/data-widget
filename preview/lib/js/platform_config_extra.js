$(window).on('load', function () {
  var body = window.parent.document.body;
  setTimeout(function () {
    $('.source-type-static').click();

    var str = `<div id="themeSwitcher" class="ui-corner-all ui-dialog-content ui-widget-content" >
      <ul class="ui-helper-clearfix">
        <li class="ui-corner-all black-tie" themename="black-tie"><span>black-tie</span></li>
        <li class="ui-corner-all blitzer" themename="blitzer"><span>blitzer</span></li>
        <li class="ui-corner-all cupertino" themename="cupertino"><span>cupertino</span></li>
        <li class="ui-corner-all dark-hive" themename="dark-hive"><span>dark-hive</span></li>
        <li class="ui-corner-all dot-luv" themename="dot-luv"><span>dot-luv</span></li>
        <li class="ui-corner-all eggplant" themename="eggplant"><span>eggplant</span></li>
        <li class="ui-corner-all excite-bike ui-state-active" themename="excite-bike"><span>excite-bike</span></li>
        <li class="ui-corner-all flick" themename="flick"><span>flick</span></li>
        <li class="ui-corner-all hot-sneaks" themename="hot-sneaks"><span>hot-sneaks</span></li>
        <li class="ui-corner-all humanity" themename="humanity"><span>humanity</span></li>
        <li class="ui-corner-all le-frog" themename="le-frog"><span>le-frog</span></li>
        <li class="ui-corner-all mint-choc" themename="mint-choc"><span>mint-choc</span></li>
        <li class="ui-corner-all overcast" themename="overcast"><span>overcast</span></li>
        <li class="ui-corner-all pepper-grinder" themename="pepper-grinder"><span>pepper-grinder</span></li>
        <li class="ui-corner-all redmond" themename="redmond"><span>redmond</span></li>
        <li class="ui-corner-all smoothness" themename="smoothness"><span>smoothness</span></li>
        <li class="ui-corner-all south-street" themename="south-street"><span>south-street</span></li>
        <li class="ui-corner-all start" themename="start"><span>start</span></li>
        <li class="ui-corner-all sunny" themename="sunny"><span>sunny</span></li>
        <li class="ui-corner-all swanky-purse" themename="swanky-purse"><span>swanky-purse</span></li>
        <li class="ui-corner-all trontastic" themename="trontastic"><span>trontastic</span></li>
        <li class="ui-corner-all ui-darkness" themename="ui-darkness"><span>ui-darkness</span></li>
        <li class="ui-corner-all ui-lightness" themename="ui-lightness"><span>ui-lightness</span></li>
        <li class="ui-corner-all vader" themename="vader"><span>vader</span></li>
      </ul>
      <div class="btn-wrap"><button class="ui-button">OK</button></div>
    </div>`;
    $(body).append(str);
    $('#themeSwitcher', body).on('click', 'li', function (e) {
      var current = $(e.currentTarget);
      setTheme(current);
    });
    

    $('#themeSwitcher', body).on('click', '.btn-wrap', function (e) {
      setTheme($('#themeSwitcher li.ui-state-active', body));
      $('#themeSwitcher', body).hide();
    });
  }, 500);



  function setCookie (name, value, expires, domain, path, secure) {                    
    var date,  
        str = escape(name) + "=" + escape(value);       
        date = new Date();
        
    date.setTime(date.getTime() +  expires );
    str += domain ?   "; domain=" + domain : "";
    str += path ?  "; path=" + path : "";
    str +=  expires ? "; expires=" + date.toGMTString() : "";
    str += secure ? "; secure" : "";
    document.cookie = str;
  }



  function setTheme (current) {
    var themeName;
    if (!current) {
      themeName = (document.cookie || '').match(/ctheme=([^;]+)/);
      themeName = themeName ? themeName[1] : 'base';
    } else {
      themeName = current.attr('themename');
    }
    
    if (themeName) {
      var $theme = $('#theme')
      $theme.attr('href', '/preview/lib/css/themes/' + themeName + '/jquery-ui.theme.min.css?' + Date.now())
      .attr('themename', themeName);
      $("body").attr("theme", themeName);
      $('#themeSwitcher .ui-state-active', body).removeClass('ui-state-active');
      if (current) {
        current.addClass('ui-state-active');
      } else {
        $('#themeSwitcher li[themename="' + themeName  + '"]', body).addClass('ui-state-active');
      }

      $theme = $('#theme', window.parent.document); 
      $theme.attr('href', '/preview/lib/css/themes/' + themeName + '/jquery-ui.theme.min.css?' + Date.now())
      .attr('themename', themeName);
      $(body).attr("theme", themeName);
      setCookie('ctheme', themeName, 365 * 24 * 3600 * 1000, '', '/');
    }
  }
  setTheme();
})  