var GREEN_PENDANT = 4;
var OTHER_PENDANT = 3;
var OTHER_CRYSTAL = 1;
var OJ_CRYSTAL    = 2;
var rowLength     = 7;
var prizes        = [];
var medallions    = [0, 0];
var isMap         = false;
var isOpen        = false;
var selectedTheme = "default";

function $(e) {
  return document.getElementById(e);
}

Element.prototype.prependChild = function(child) { this.insertBefore(child, this.firstChild); };
String.prototype.ucfirst = function () { return this.substr(0,1).toUpperCase() + this.slice(1); }

function getQuery(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function stoopsLonkTheme() {
  return selectedTheme == "" || selectedTheme == "default" || selectedTheme == "retro";
}

function build_img_url(fname,useTheme = selectedTheme) {
  var defaultRoot = "images/";
  var themeRoot   = defaultRoot;

  var checkForSupport         = ["bomb","boss","chest","agahnim","boss","dungeon","medallion0"];
  var supportedByTheme        = [];
  supportedByTheme["retro"]   = ["boss","chest","agahnim","dungeon","medallion0"];
  supportedByTheme["vanilla"] = ["dungeon","medallion0"];

  var hasSupport = true;
  for(var check in checkForSupport) {
    check = checkForSupport[check];
    if(fname.indexOf(check) > -1) {
      hasSupport = false;
      for(var supported in supportedByTheme[useTheme]) {
        supported = supportedByTheme[useTheme][supported];
        if(supported.indexOf(check) > -1) {
          hasSupport = true;
        }
      }
    }
  }
  if(fname == "bombos") {
    hasSupport = true;
  }

  var globalReplace = {
    medallionM: "medallion0",
    medallionT: "medallion0",
    medallion1: "bombos",
    medallion2: "ether",
    medallion3: "quake",
    dungeon4:   "pendant0",
    tunic1:     "tunic",
    ".png":     ""
  };

  for(var replace in globalReplace) {
    fname = fname.replace(replace,globalReplace[replace]);
  }

  var noSupport = ["sword","shield","dungeon0","label","nothing"];
  if(noSupport.indexOf(fname) > -1) {
    hasSupport = false;
  }
  if(fname.indexOf("nothing") > -1) {
    fname = "nothing";
  }

  if(! hasSupport) {
    useTheme = "default";
  }

  switch(useTheme) {
    case "retro":
      themeRoot = "BONUS/DLC%20Icons/Retro/";
      break;
    case "vanilla":
      themeRoot = "BONUS/DLC%20Icons/Vanilla/";
      break;
    default:
      themeRoot = defaultRoot;
      break;
  }

  if(fname.indexOf("chest") > -1) {
    themeRoot += "chests/";
  } else if(fname.indexOf("boss") > -1) {
    themeRoot += "bosses/";
  }

  return themeRoot + fname + ".png";
}

function mini(img) {
  return '<img src="' + build_img_url(img) + '" class="mini ' + img + '" />';
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

selectedTheme = getQuery("theme") != "" ? getQuery("theme") : "default";
isMap         = getQuery("map")   != "";
isOpen        = getQuery("open")  != "";
