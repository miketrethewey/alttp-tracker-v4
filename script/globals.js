var GREEN_PENDANT   = 4;
var OTHER_PENDANT   = 3;
var OTHER_CRYSTAL   = 1;
var OJ_CRYSTAL      = 2;
var BOW_NONE        = 0;
var BOW_WOOD        = 1;
var BOW_SLVR        = 2;
var SILVERS         = 3;

var items			= itemsInit;

for(var i = 0; i < chests.length; i++) {
  chestsopenedInit.push(false);
}
var chestsopened = chestsopenedInit;

function $(e) {
  return document.getElementById(e);
}

Element.prototype.prependChild = function(child) { this.insertBefore(child, this.firstChild); };

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
      $(id + "IMG").innerHTML += '<img src="' + build_img_url(digit) + '" class="countNumber" />';
    }
    $(id + "Value").innerHTML = count;
    change_item_value(id,count);
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

function stoopsLonkTheme() {
  return selectedTheme == "" || selectedTheme == "default" || selectedTheme == "retro";
}

function canEnterAga1() {
  return items.sword >= 2 || items.cape;
}

function canLiftRocks() {
  return items.glove;
}

function canLiftDarkRocks() {
  return items.glove > 1;
}

function canSwim() {
  return items.flippers;
}

function steve() {
  if(!items.moonpearl) {
    return false;
  }
  if(canLiftDarkRocks() || (canLiftRocks() && items.hammer)) {
    return true;
  }
  return items.agahnim && items.hookshot && (items.hammer || canLiftRocks() || canSwim());
}

function stevelight() {
  return items.moonpearl && items.hookshot && (items.hammer || canLiftRocks() || canSwim()) && canEnterAga1();
}

function canDash() {
  return items.boots;
}

function canLightTorches() {
  return items.firerod || items.lantern;
}

function canMeltThings() {
  return items.bombos || items.firerod;
}

function canShootArrows() {
  return items.bow > BOW_NONE && items.bow < SILVERS;
}

function haveLightCone() {
  return items.lantern;
}

function haveMagicalSword() {
  return items.sword >= 2;
}

function deathmountain() {
  return items.flute || (canLiftRocks() && haveLightCone());
}

function deathmountaindarkness() {
  return canLiftRocks();
}

function action_class(ele,className,action) {
  if(typeof ele == "string") {
    ele = $(ele);
  }

  if(ele) {
    className = className.split(' ');
    for(str in className) {
      str = className[str];
      if(action == "add") {
        ele.classList.add(str);
      } else if(action == "remove") {
        ele.classList.remove(str);
      }
    }
  }
}

function add_class(ele,className) {
  action_class(ele,className,"add");
}

function remove_class(ele,className) {
  action_class(ele,className,"remove");
}

function set_class(ele,className) {
  if(typeof ele == "string") {
    ele = $(ele);
  }

  if(ele) {
    ele.className = className;
  }
}

function replace_class(ele,oldClass,newClass) {
  var thisClass = ele;
  if(typeof ele == "string") {
    ele = $(ele);
  }

  oldClass += "";
  newClass += "";

  if(ele) {
    if(oldClass != "") {
      remove_class(ele,oldClass);
    }
    if(newClass != "") {
      add_class(ele,newClass);
    }
  }

  var eles = document.getElementsByClassName(thisClass);
  for(var ele in eles) {
    ele = eles[ele];
    if(ele.className && ele.className != "") {
      if(oldClass != "") {
        remove_class(ele,oldClass);
      }
      if(newClass != "") {
        add_class(ele,newClass);
      }
    }
  }
}

function get_class(ele) {
  var ret = false;
  if(typeof ele == "string") {
    ele = $(ele);
  }
  if(ele) {
    if(ele.className) {
      if(ele.className.length > 0) {
        if(ele.className != "") {
          ret = ele.className;
        }
      }
    }
  }
  return ret;
}

function change_bgimg(ele,fname,miniTheme = selectedTheme) {
  if(typeof ele == "string") {
    ele = $(ele);
  }
  if(ele) {
    ele.style.backgroundImage = "url(" + build_img_url(fname,miniTheme) + ')';
  }
}

function get_bgimg(ele) {
  var bgimg = false;
  if(typeof ele == "string") {
    ele = $(ele);
  }
  if(ele) {
    bgimg = ele.style.backgroundImage;
  }
  return bgimg;
}

function change_title(ele,title) {
  if(typeof ele == "string") {
    ele = $(ele);
  }
  if(ele) {
    ele.title = title;
  }
}

function change_item_value(item,value) {
  items[item] = value;
}

function get_item_value(item) {
  return items[item];
}

function check_counters() {
  // Bottles
  var bottleItemCounters  = 0;
  var bottleCountSquare   = 0;

  var checks = ["bottleItemA","bottleItemB","bottleItemC","bottleItemD"];
  for(var check in checks) {
    check = checks[check];
    if($(check) && items[check] && items[check] > 0) {
      bottleItemCounters++;
    }
  }

  if($("countBottles") && $("countBottlesValue")) {
    bottleCountSquare = $("countBottlesValue").innerHTML;
  }

  if(!items.bottle || (items.bottle < bottleItemCounters)) {
	change_item_value("bottle",bottleItemCounters);
    if(items.bottle) {
      change_bgimg("bottle","bottle" + items["bottle"]);
      replace_class("bottle","false","true");
    } else {
      change_bgimg("bottle","bottle");
      replace_class("bottle","true","false");
    }
  }
  if(bottleCountSquare < bottleItemCounters) {
    change_count("countBottles",bottleItemCounters);
  }
}

// Check for GO MODE
function check_gomode() {
  var go      = true;       // Default to GO MODE
  var softGo  = false;      // Default to Hard GO MODE
  var gomode  = new Array(  // Items required for GO MODE
    "hookshot",             // Swamp
    "moonpearl",            // DW Dungeons
    "firerod",              // SkWoods
    "hammer",               // PoD, Swamp, SkWoods, Thieves'
    "somaria"               // Mire, TRock
  );

  // Check if we have required items
  for(var item in gomode) {
    item  = gomode[item];
    go    = go && items[item];
  }

  // Check for at least L2 Sword, wooden arrows and Titans Mitt
  go = go && items.sword >= 2 && items.bow >= BOW_WOOD && items.bow <= BOW_SLVR && items.glove >= 2;

  var availableCrystals     = 0;
  var acquiredCrystals      = 0;
  var acquiredOtherPendants = 0;
  var beatableTotal         = 0;

  // Count crystals and check dungeon status
  for(var i = 0; i < 10; i++) {
    var prizeImg  = $("dungeonPrize" + i);
    var bossImg   = $("boss" + i);

    prizeImg  = prizeImg  != null ? get_bgimg(prizeImg)  : "";
    bossImg   = bossImg   != null ? get_bgimg(bossImg)   : "";

    if(prizeImg != "" && bossImg != "") {
      if(dungeons[i].isBeatable() == "available") {
        beatableTotal++;
      }
      if(dungeons[i].isBeaten()) {
        if(prizeImg.indexOf("dungeon" + GREEN_PENDANT) > -1) {
          var check = check_checkmark("pgreen"); // Check if we have a checkmark for this tracker
          if(check == 3) {
            set_class("pendantsSquarePgreenIMG","true done");
          }
        } else if(prizeImg.indexOf("dungeon" + OTHER_PENDANT) > -1) {
          acquiredOtherPendants++;
          if(acquiredOtherPendants == 2) {
            var others = ["pendant1","pendant2","pblue","pred"];
            for(var check in others) {
              check = others[check];
              var eles = document.getElementsByClassName(check);
              for(var ele in eles) {
                ele = eles[ele];
                if(ele.className && ele.className != "") {
                  ele.classList.remove("false");
                  ele.classList.add("true");
                }
              }
            }
          }
        }
      }

      if(prizeImg.indexOf("dungeon" + OTHER_CRYSTAL) > -1 || prizeImg.indexOf("dungeon" + OJ_CRYSTAL) > -1) {
        if(dungeons[i].isBeaten()) {
          availableCrystals++;
          acquiredCrystals++;
        } else if(dungeons[i].isBeatable() == "available" || dungeons[i].isBeatable() == "possible") {
          availableCrystals++;
          if(dungeons[i].isBeatable() == "possible") {
            softGo = true;
          }
        }
      }
    }

    var id = "countCrystals";
    if(($(id) != null) && ($(id + "Value") != null) && (parseInt($(id + "Value").innerHTML) < acquiredCrystals)) {
      change_count(id,acquiredCrystals);
    }
  }

  // If we do not have 7 in our possession or accessible, we are not GO MODE
  if(!(availableCrystals >= 7 || beatableTotal == 10)) {
    go      = false;
    softGo  = false;
  }

  // If we are GO MODE
  if(go || softGo) {
    var goClass = "";
    // L2 Sword or Silverless is a SOFT GO MODE
    if(items.sword == 2 || items.bow == BOW_WOOD || softGo) {
      goClass = "soft";
    } else {
      // We are 100% GO MODE
      goClass = "hard";
    }
    replace_class("gomode","false", "true");
    replace_class("gomode","hidden","");
    replace_class("gomode","soft",  goClass);
    replace_class("gomode","hard",  goClass);
  } else {
    // If we are NOT GO MODE
    replace_class("gomode","true","false");
    replace_class("gomode","soft","hidden");
    replace_class("gomode","hard","hidden");
  }

  clear_selection();
}
