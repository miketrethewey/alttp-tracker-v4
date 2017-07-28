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

function plural(input,revert = false) {
  var plural = {
    '(quiz)$'                     : "$1zes",
    '^(ox)$'                      : "$1en",
    '([m|l])ouse$'                : "$1ice",
    '(matr|vert|ind)ix|ex$'       : "$1ices",
    '(x|ch|ss|sh)$'               : "$1es",
    '([^aeiouy]|qu)y$'            : "$1ies",
    '(hive)$'                     : "$1s",
    '(?:([^f])fe|([lr])f)$'       : "$1$2ves",
    '(shea|lea|loa|thie)f$'       : "$1ves",
    'sis$'                        : "ses",
    '([ti])um$'                   : "$1a",
    '(tomat|potat|ech|her|vet)o$' : "$1oes",
    '(bu)s$'                      : "$1ses",
    '(alias)$'                    : "$1es",
    '(octop)us$'                  : "$1i",
    '(ax|test)is$'                : "$1es",
    '(us)$'                       : "$1es",
    '([^s]+)$'                    : "$1s"
  };

  var singular = {
    '(quiz)zes$'              : "$1",
    '(matr)ices$'             : "$1ix",
    '(vert|ind)ices$'         : "$1ex",
    '^(ox)en$'                : "$1",
    '(alias)es$'              : "$1",
    '(octop|vir)i$'           : "$1us",
    '(cris|ax|test)es$'       : "$1is",
    '(shoe)s$'                : "$1",
    '(o)es$'                  : "$1",
    '(bus)es$'                : "$1",
    '([m|l])ice$'             : "$1ouse",
    '(x|ch|ss|sh)es$'         : "$1",
    '(m)ovies$'               : "$1ovie",
    '(s)eries$'               : "$1eries",
    '([^aeiouy]|qu)ies$'      : "$1y",
    '([lr])ves$'              : "$1f",
    '(tive)s$'                : "$1",
    '(hive)s$'                : "$1",
    '(li|wi|kni)ves$'         : "$1fe",
    '(shea|loa|lea|thie)ves$' : "$1f",
    '(^analy)ses$'            : "$1sis",
    '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': "$1$2sis",
    '([ti])a$'                : "$1um",
    '(n)ews$'                 : "$1ews",
    '(h|bl)ouses$'            : "$1ouse",
    '(corpse)s$'              : "$1",
    '(us)es$'                 : "$1",
    's$'                      : ""
  };

  var irregular = {
    'move'   : 'moves',
    'foot'   : 'feet',
    'goose'  : 'geese',
    'sex'    : 'sexes',
    'child'  : 'children',
    'man'    : 'men',
    'tooth'  : 'teeth',
    'person' : 'people'
  };

  var uncountable = [
    'sheep',
    'fish',
    'deer',
    'moose',
    'series',
    'species',
    'money',
    'rice',
    'information',
    'equipment'
  ];

  // save some time in the case that singular and plural are the same
  if(uncountable.indexOf(input.toLowerCase()) >= 0) {
    return input;
  }

  // check for irregular forms
  for(word in irregular) {

    if(revert) {
      var pattern = new RegExp(irregular[word]+'$', 'i');
      var replace = word;
    } else {
      var pattern = new RegExp(word+'$', 'i');
      var replace = irregular[word];
    }
    if(pattern.test(input)) {
      return input.replace(pattern, replace);
    }
  }

  if(revert) {
    var array = singular;
  } else {
    var array = plural;
  }

  // check for matches using regular expressions
  for(reg in array) {
    var pattern = new RegExp(reg, 'i');
    if(pattern.test(input)) {
        return input.replace(pattern, array[reg]);
    }
  }
  return input;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 *
 * @param string $id  Element ID
 * @param string $count count
 *
 * @return    void
 *
 */
function change_count(id,count) {
  if($(id) != null && $(id + "IMG") != null && $(id + "Value") != null) {
    $(id + "IMG").innerHTML = "";
    if(count < 0) {
      count = 0;
    } else if(itemsMax[id] != null && count > itemsMax[id]) {
      count = itemsMax[id];
    } else if(count > 999) {
      count = 999;
    }
    var digits = (count + "").split("");
    for(var digit in digits) {
      digit = digits[digit];
      $(id + "IMG").innerHTML += '<img src="images/numbers/' + digit + '.png" class="countNumber" />';
    }
    $(id + "Value").innerHTML = count;
    items[id] = count;
  }
}

// Clear selection
function clear_selection() {
  if(document.selection) {
    document.selection.empty();
  } else if(window.getSelection) {
    window.getSelection().removeAllRanges();
  }
}

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

  fname = fname.toLowerCase();

  var checkForSupport         = ["bomb","boss","chest","agahnim","boss","dungeon","label","medallion0"];
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
    blumerang:  "boomerang1",
    bluemerang: "boomerang1",
    redmerang:  "boomerang2",
    crystal:    "dungeon1",
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

  var noSupport = ["sword","shield","dungeon0"];
  if(noSupport.indexOf(fname) > -1) {
    hasSupport = false;
  }
  if(fname.indexOf("nothing") > -1) {
    fname       = "nothing";
    hasSupport  = false;
  }

  if(fname.indexOf("bottleitem") > -1) {
    fname = fname.replace('itema',"item");
    fname = fname.replace('itemb',"item");
    fname = fname.replace('itemc',"item");
    fname = fname.replace('itemd',"item");
    if(fname == "bottleitem" || fname == "bottleitem1") {
      fname = "bottle";
      if(useTheme == "retro" || useTheme == "gbc") {
        fname += "item1";
      }
    }
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
  } else if(isNumeric(fname)) {
    themeRoot += "numbers/";
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
