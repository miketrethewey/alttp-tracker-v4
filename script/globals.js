var GREEN_PENDANT = 4;
var OTHER_PENDANT = 3;
var OTHER_CRYSTAL = 1;
var OJ_CRYSTAL    = 2;
var rowLength     = 7;
var prizes        = [];
var medallions    = [0, 0];
var isMap         = false;
var isOpen        = false;
var theme         = "default";

function $(e) {
  return document.getElementById(e);
}

Element.prototype.prependChild = function(child) { this.insertBefore(child, this.firstChild); };

function getQuery(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function build_img_url(fname,useTheme = theme) {
  var defaultRoot = "images/";

  switch(theme) {
    default:
      useTheme = defaultRoot;
      break;
  }

  return useTheme + fname + ".png";
}

function mini(img) {
  return '<img src="' + build_img_url(img) + '" class="mini" />';
}

function steve() {
  if(!items.moonpearl) {
    return false;
  }
  if(items.glove == 2 || (items.glove && items.hammer)) {
    return true;
  }
  return items.agahnim && items.hookshot && (items.hammer || items.glove || items.flippers);
}
