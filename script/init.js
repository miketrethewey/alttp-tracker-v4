var rowLength			= 7;
var isMap				= false;
var isOpen				= false;
var selectedTheme		= "default";
var selectedProfile		= "default";
var chestsopenedInit	= [];
var dungeonbeatenInit	= [false,false,false,false,false,false,false,false,false];
var prizesInit			= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var medallionsInit		= [0, 0];
var rootRef				= {};

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

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function build_img_url(fname,useTheme = selectedTheme) {
  var defaultRoot = "images/";
  var themeRoot   = defaultRoot;
  var filext      = "png";

  fname = fname.toLowerCase();

  var checkForSupport           = ["agahnim", "bomb","boss","chest","dungeon","label","medallion0", "mpupgrade",  "pendant"];
  var supportedByTheme          = [];
  supportedByTheme["xmas"]      = ["agahnim",               "chest","dungeon",        "medallion0",               "pendant"];
  supportedByTheme["gbc"]       = ["agahnim", "bomb","boss","chest","dungeon",        "medallion0",               "pendant"];
  supportedByTheme["metroid3"]  = ["agahnim", "bomb",       "chest","dungeon",        "medallion0", "mpupgrade",  "pendant"];
  supportedByTheme["minish"]    = ["agahnim", "bomb",               "dungeon",        "medallion0",               "pendant"];
  supportedByTheme["mm"]        = ["agahnim", "bomb",       "chest",                  "medallion0",];
  supportedByTheme["mmx"]       = ["agahnim",               "chest",];
  supportedByTheme["retro"]     = ["agahnim", "bomb","boss","chest","dungeon",        "medallion0", "mpupgrade",  "pendant"];
  supportedByTheme["zstyle"]    = ["agahnim", "bomb",               "dungeon",                                    "pendant"];
  supportedByTheme["vanilla"]   = ["agahnim", "bomb",               "dungeon",        "medallion0", "mpupgrade",];

  if(useTheme == "gbc") {
    var useRetro = ["boots","chest","firerod","flippers","hookshot","icerod","mirror","numbers","shovel"];
    for(var check in useRetro) {
      check = useRetro[check];
      if(fname.indexOf(check) > -1) {
        useTheme = "retro";
      }
    }
  }

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
    ".png":     "",
  };

  for(var replace in globalReplace) {
    fname = fname.replace(replace,globalReplace[replace]);
  }

  var exactReplace = {
    bomb:       "bomb1",
    boomerang:  "boomerang1",
    glove:      "glove1",
  };
  for(var replace in exactReplace) {
    if(fname == replace) {
      fname = exactReplace[replace];
    }
  }

  var noSupport = [
    "dungeon0",
    "highlighted",
    "poi",
    "shield",
    "sword",
    "transparent",
  ];
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

  if(isNumeric(fname)) {
    var hasNumbers = ["metroid3","retro"];
    hasSupport = hasNumbers.indexOf(useTheme.toLowerCase()) > -1;
  }
  if(! hasSupport) {
    useTheme = "default";
  }

  if(useTheme == "mm") {
    if(["sword1","sword3","sword4","tunicb","tunic2b","tunic3b"].indexOf(fname) > -1) {
      filext = "gif";
    }
  }

  if(useTheme == "mmx") {
    if(["bombos","book","bow","bow1","bow2","bow3","ether","flippers","flute","glove1","glove2","hammer","hookshot","lantern","medallion0","mushroom","net","pendant0","pendant1","pendant2","powder","quake","shovel","somaria"].indexOf(fname) > -1) {
      useTheme = "vanilla";
    }
  } else if(useTheme == "minish") {
    if(["dungeon1","dungeon2"].indexOf(fname) > -1) {
      useTheme = "default";
    }
  }

  switch(useTheme) {
    case "xmas":
      themeRoot = "BONUS/DLC%20Icons/Christmas/";
      break;
    case "gbc":
      themeRoot = "BONUS/DLC%20Icons/GBC/";
      break;
    case "metroid3":
      themeRoot = "BONUS/DLC%20Icons/Super_Metroid/";
      break;
    case "minish":
      themeRoot = "BONUS/DLC%20Icons/Minish_Cap/";
      break;
    case "mm":
      themeRoot = "BONUS/DLC%20Icons/Mega_Man/";
      break;
    case "mmx":
      themeRoot = "BONUS/DLC%20Icons/Mega_Man_X/";
      break;
    case "retro":
      themeRoot = "BONUS/DLC%20Icons/Retro/";
      break;
    case "zstyle":
      themeRoot = "BONUS/DLC%20Icons/Zstyle/";
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
  return themeRoot + fname + '.' + filext;
}

function mini(img) {
  return '<img src="' + build_img_url(img) + '" class="mini ' + img + '" />';
}

selectedTheme   = getQuery("theme")   != "" ? getQuery("theme")   : "default";
selectedProfile = getQuery("profile") != "" ? getQuery("profile") : "default";
isMap           = getQuery("map")     != "";
isOpen          = getQuery("open")    != "";
