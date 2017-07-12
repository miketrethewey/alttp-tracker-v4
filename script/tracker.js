var rowLength   = 7;
var prizes      = [];
var medallions  = [0, 0];
var isMap       = false;
var isOpen      = false;

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

// Event of clicking on the item tracker
function toggle(label, mode = "advance") {
  if(label.substring(0,5) == "chest") {
    if(mode == "advance") {
      items[label]--;
    } else {
      items[label]++;
    }

    if(items[label] < 0) {
      items[label] = itemsMax[label];
    } else if(items[label] > itemsMax[label]) {
      items[label] = 0;
    }

    $(label).style.backgroundImage = ("url(images/chest" + items[label] + ".png)");
    x = label.substring(5);
    if(isMap) {
      if(items[label] == 0) {
        $("dungeon" + x).className = "dungeon opened";
      } else {
        $("dungeon" + x).className = "dungeon " + dungeons[x].canGetChest();
      }
    }
    return;
  }

  if((typeof items[label]) == "boolean") {
    $(label).className = (items[label] = !items[label]);
  } else {
    if(mode == "advance") {
      items[label]++;
    } else {
      items[label]--;
    }

    if(items[label] > itemsMax[label]) {
      items[label] = itemsMin[label];
    } else if(items[label] < itemsMin[label]) {
      items[label] = itemsMax[label];
    }

    var bossSquare = (label.indexOf("boss") > -1 && label.length == 5);

    if(items[label] > itemsMin[label]) {
      $(label).style.backgroundImage = ("url(images/" + label + items[label] + ".png)");
      if(! bossSquare) {
        $(label).className = ("true");
      }
    } else {
      $(label).style.backgroundImage = ("url(images/" + label + ".png)");
      if(! bossSquare) {
        $(label).className = ("false");
      }
    }
  }

  if(isMap) {
    for(k = 0; k < chests.length; k++) {
      if(!chests[k].isOpened) {
        $(k).className = "chest " + chests[k].isAvailable();
      }
    }
    for(k = 0; k < dungeons.length; k++) {
      if(!dungeons[k].isBeaten) {
        $("bossMap" + k).className = "boss " + dungeons[k].isBeatable();
      }
      if(items["chest"+k]) {
        $("dungeon" + k).className = "dungeon " + dungeons[k].canGetChest();
      }
    }
  }

  // Initiate bunny graphics!
  if(label == "moonpearl" || label == "tunic") {
    togglePearl();
  }

  // Clicking a boss on the tracker will check it off on the map!
  if(isMap) {
    if(label.substring(0,4) == "boss") {
      toggleBoss(label.substring(4));
    }
  }
}

// BUNNY TIME!!!
function togglePearl() {
  var link = "url(images/tunic";
  if(items.tunic > 1) {
    link += items.tunic;
  }
  if(!items.moonpearl) {
    link += "b";
  }

  link += ".png)";

  $("tunic").style.backgroundImage = link;
}

// Event of clicking a chest on the map
function toggleChest(x) {
  chests[x].isOpened = !chests[x].isOpened;
  if(chests[x].isOpened) {
    $(x).className = "chest opened";
  } else {
    $(x).className = "chest " + chests[x].isAvailable();
  }
}

// Event of clicking a dungeon location (not really)
function toggleBoss(x) {
  dungeons[x].isBeaten = !dungeons[x].isBeaten;
  if(dungeons[x].isBeaten) {
    $("bossMap" + x).className = "boss opened";
  } else {
    $("bossMap" + x).className = "boss " + dungeons[x].isBeatable();
  }
}

// Highlights a chest location and shows the name as caption
function highlight(x) {
  $(x).style.backgroundImage = "url(images/highlighted.png)";
  $("caption").innerHTML = chests[x].name;
}

function unhighlight(x) {
  $(x).style.backgroundImage = "url(images/poi.png)";
  $("caption").innerHTML = "&nbsp;";
}

// Highlights a chest location and shows the name as caption (but for dungeons)
function highlightDungeon(x) {
  $("dungeon" + x).style.backgroundImage = "url(images/highlighted.png)";
  $("caption").innerHTML = dungeons[x].name;
}

function unhighlightDungeon(x) {
  $("dungeon" + x).style.backgroundImage = "url(images/poi.png)";
  $("caption").innerHTML = "&nbsp;";
}

// event of clicking on a boss's pendant/crystal subsquare
function toggleDungeon(n, mode = "advance") {
  if(mode == "advance") {
    prizes[n]++;
  } else {
    prizes[n]--;
  }

  var min = 0;
  var max = 4;

  if(prizes[n] < min) {
    prizes[n] = max;
  } else if(prizes[n] > max) {
    prizes[n] = min;
  }

  $("dungeonPrize" + n).style.backgroundImage = "url(images/dungeon" + prizes[n] + ".png)";

  if(isMap) {
    // Update Sahasralah, Fat Fairy, and Master Sword Pedestal
    var pendantChests = [25, 61, 62];
    for(k = 0; k < pendantChests.length; k++) {
      if(!chests[pendantChests[k]].isOpened) {
        document.getElementById(pendantChests[k]).className = "chest " + chests[pendantChests[k]].isAvailable();
      }
    }
  }
}

// event of clicking on Mire/TRock's medallion subsquare
function toggleMedallion(n, mode = "advance") {
  if(mode == "advance") {
    medallions[n]++;
  } else {
    medallions[n]--;
  }

  var min = 0;
  var max = 3;

  if(medallions[n] < min) {
    medallions[n] = max;
  } else if(medallions[n] > max) {
    medallions[n] = min;
  }

  $("medallion" + n).style.backgroundImage = "url(images/medallion" + medallions[n] + ".png)";

  if(isMap) {
    // Update availability of dungeon boss AND chests
    dungeons[8 + n].isBeaten = !dungeons[8 + n].isBeaten;
    toggleBoss(8 + n);
    if(items["chest" + (8 + n)] > 0) {
      document.getElementById("dungeon" + (8 + n)).className = "dungeon " + dungeons[8 + n].canGetChest();
    }
    // TRock medallion affects Mimic Cave
    if(n == 1){
      chests[4].isOpened = !chests[4].isOpened;
      toggleChest(4);
    }
    // Change the mouseover text on the map
    var dungeonName;
    if(n == 0) {
      dungeonName = "Misery Mire";
    } else {
      dungeonName = "Turtle Rock";
    }
    dungeons[8 + n].name = dungeonName + " " + mini("medallion" + medallions[n]) + " " + mini("lantern");
  }
}

function build_lonk() {
  // Build Lonk Table
  // td
  var lonkTd = document.createElement("td");
  lonkTd.id = "tunic";
  lonkTd.style.backgroundImage = "url(images/tunic.png)";
  lonkTd.setAttribute("colspan",2);
  lonkTd.setAttribute("rowspan",2);

    // td table
  var lonkTable = document.createElement("table");
  lonkTable.className = "stoops";
  lonkTable.setAttribute("border",0);
  lonkTable.setAttribute("cellpadding",0);
  lonkTable.setAttribute("cellspacing",0);

      // td table tr
  var lonkTr = document.createElement("tr");

        //  td table tr th
  var lonkTh = document.createElement("th");
  lonkTh.setAttribute("onclick","toggle('tunic')");
  lonkTh.setAttribute("oncontextmenu","toggle('tunic');return false;");

        // Add Tunic
  lonkTr.appendChild(lonkTh);

        //  td table tr td : Build Sword
  var td = document.createElement("td");
  td.id = "sword";
  td.setAttribute("onclick","toggle('sword')");
  td.setAttribute("oncontextmenu","toggle('sword');return false;");

        // Add Sword
  lonkTr.appendChild(td);

      // Add row
  lonkTd.appendChild(lonkTr);

      // td table tr : Shield
  lonkTr = document.createElement("tr");

        // td table tr td : Build Shield
  td = document.createElement("td");
  td.id = "shield";
  td.setAttribute("onclick","toggle('shield')");
  td.setAttribute("oncontextmenu","toggle('shield');return false;");

        // Add Shield
  lonkTr.appendChild(td);

        // td table tr th
  lonkTh = document.createElement("th");

          // td table tr th table : Pearl Table
  var pearlTable = document.createElement("table");
  pearlTable.className = "lonk";
  pearlTable.setAttribute("border",0);
  pearlTable.setAttribute("cellpadding",0);
  pearlTable.setAttribute("cellspacing",0);

            // td table tr th table tr : Tunic
  var pearlTableTr = document.createElement("tr");

              // td table tr th table tr th : Build Tunic (1)
  var pearlTableTrTh = document.createElement("th");
  pearlTableTrTh.className = "mini-corner";
  pearlTableTrTh.setAttribute("onclick","toggle('tunic')");
  pearlTableTrTh.setAttribute("oncontextmenu","toggle('tunic','retreat');return false;");

            // Add Tunic (1)
  pearlTableTr.appendChild(pearlTableTrTh);

              // td table tr th table tr th : Build Tunic (2)
  pearlTableTrTh = document.createElement("th");
  pearlTableTrTh.setAttribute("onclick","toggle('tunic')");
  pearlTableTrTh.setAttribute("oncontextmenu","toggle('tunic','retreat');return false;");

            // Add Tunic (2)
  pearlTableTr.appendChild(pearlTableTrTh);

          // Add Tunic
  pearlTable.appendChild(pearlTableTr);

        // td table tr th table tr : Tunic, Pearl
  pearlTableTr = document.createElement("tr");

          // td table tr th table tr th : Build Tunic
  pearlTableTrTh = document.createElement("th");
  pearlTableTrTh.setAttribute("onclick","toggle('tunic')");
  pearlTableTrTh.setAttribute("oncontextmenu","toggle('tunic','retreat');return false;");

        // Add Tunic
  pearlTableTr.appendChild(pearlTableTrTh);

          // td table tr th table tr th : Build Pearl
  pearlTableTrTh = document.createElement("th");
  pearlTableTrTh.id = "moonpearl";
  pearlTableTrTh.className = "false";
  pearlTableTrTh.style.backgroundImage = "url(images/moonpearl.png)";
  pearlTableTrTh.style.width = "48px";
  pearlTableTrTh.style.height = "48px";
  pearlTableTrTh.setAttribute("onclick","toggle('moonpearl')");
  pearlTableTrTh.setAttribute("oncontextmenu","toggle('moonpearl','retreat');return false;");

        // Add Pearl
  pearlTableTr.appendChild(pearlTableTrTh);

    // Add Tunic, Pearl
  pearlTable.appendChild(pearlTableTr);

  lonkTh.appendChild(pearlTable);

  lonkTr.appendChild(lonkTh);

  lonkTd.appendChild(lonkTr);

  return lonkTd;
}

function print_tracker() {
  var tracker = document.createElement("table");
  tracker.className = "tracker";
  tracker.setAttribute("align","center");
  tracker.setAttribute("border",0);
  tracker.setAttribute("cellpadding",0);
  tracker.setAttribute("cellspacing",0);

  var tr = document.createElement("tr");
  tr.appendChild(build_lonk());

  var itemList  = Object.keys(items);
  var k     = 4;
  while(k < itemList.length) {
    if(k != 4) {
      tracker.appendChild(tr);
      tr = document.createElement("tr");
    }
    for(j = 0; j < rowLength; j++) {
      if(k == 4 || k == 9) {
        j = 2;
      }
      var x = itemList[k];

      // boss tables (pendant/crystal, medallion)
      if(x.substring(0,4) == "boss") {
        var d = prizes.length;
        prizes[d] = 0;

        var bossTd                    = document.createElement("td");
        bossTd.id                     = x;
        bossTd.style.backgroundImage  = "url(images/" + x + ".png)";

        var bossTdTable       = document.createElement("table");
        bossTdTable.className = "lonk";
        bossTdTable.setAttribute("cellpadding",0);
        bossTdTable.setAttribute("cellspacing",0);

        var bossTdTableTr   = document.createElement("tr");
        var bossTdTableTrTh = document.createElement("th");
        bossTdTableTrTh.setAttribute("onclick","toggle('" + x + "')");
        bossTdTableTrTh.setAttribute("oncontextmenu","toggle('" + x + "','retreat');return false;");
        bossTdTableTrTh.setAttribute("colspan",2);

        bossTdTableTr.appendChild(bossTdTableTrTh);
        bossTdTable.appendChild(bossTdTableTr);

        bossTdTableTr = document.createElement("tr");
        var bossTdTableTrTh = document.createElement("th");

        // Does dungeon have a medallion?
        if(d >= 8) {
          bossTdTableTrTh.id                    = "medallion" + (d - 8);
          bossTdTableTrTh.className             = "corner";
          bossTdTableTrTh.style.backgroundImage = "url(images/medallion0.png)";
          bossTdTableTrTh.setAttribute("onclick","toggleMedallion(" + (d - 8) + ")");
          bossTdTableTrTh.setAttribute("oncontextmenu","toggleMedallion(" + (d - 8) + ",'retreat');return false;");
        } else {
          bossTdTableTrTh.setAttribute("onclick","toggle('" + x + "')");
          bossTdTableTrTh.setAttribute("oncontextmenu","toggle('" + x + "','retreat');return false;");
        }
        bossTdTableTr.appendChild(bossTdTableTrTh);

        bossTdTableTrTh                       = document.createElement("th");
        bossTdTableTrTh.id                    = "dungeonPrize" + d;
        bossTdTableTrTh.className             = "corner";
        bossTdTableTrTh.style.backgroundImage = "url(images/dungeon0.png)";
        bossTdTableTrTh.setAttribute("onclick","toggleDungeon(" + d + ")");
        bossTdTableTrTh.setAttribute("oncontextmenu","toggleDungeon(" + d + ",'retreat');return false;");
        bossTdTableTr.appendChild(bossTdTableTrTh);

        bossTdTable.appendChild(bossTdTableTr);

        bossTd.appendChild(bossTdTable);

        tr.appendChild(bossTd);
      } else {
        var square = document.createElement("td");
        if(x.substring(0,5) == "chest") {
          square.style.backgroundImage = "url(images/chest" + items[x] + ".png)";
        } else {
          square.style.backgroundImage = "url(images/" + x + ".png)";
        }
        square.id = x;
        square.className = !!items[x];
        square.setAttribute("onclick","toggle('" + x + "')");
        square.setAttribute("oncontextmenu","toggle('" + x + "','retreat');return false;");
        tr.appendChild(square);
      }

      if(++k == itemList.length) {
        break;
      }
    }
  }
  tracker.appendChild(tr);
  $("tracker").appendChild(tracker);
}

function init() {
  isMap   = getQuery("map")   != "";
  isOpen  = getQuery("open")  != "";

  print_tracker();

  if(isMap) {
    var caption       = document.createElement("span");
    caption.id        = "caption";
    caption.innerHTML = "&nbsp;";
    $("mapDiv").appendChild(caption);
    print_map_chests();
  } else {
    $("mapDiv").style.display = "none";
  }

  var form = document.createElement("form");
  form.id = "form";
  $("disclaimer").prependChild(form);

  var span  = document.createElement("span");
  var label = document.createElement("label");
  var input = document.createElement("input");

  label.innerHTML = "Map?";
  label.setAttribute("for","map");
  span.appendChild(label);

  input.id      = "map";
  input.name    = "map";
  input.type    = "checkbox";
  input.checked = isMap;
  input.setAttribute("onchange",'$("form").submit()');
  span.appendChild(input);
  form.appendChild(span);

  span  = document.createElement("span");
  label = document.createElement("label");
  input = document.createElement("input");
  label.innerHTML = "Open Mode?";
  label.setAttribute("for","open");
  span.appendChild(label);

  input.id      = "open";
  input.name    = "open";
  input.type    = "checkbox";
  input.checked = isOpen;
  input.setAttribute("onchange",'$("map").checked="on";$("form").submit()');
  span.appendChild(input);
  form.appendChild(span);

  if(isOpen) {
    var openChests = [56,57,58];
    for(var chest in openChests) {
      chest = openChests[chest];
      toggleChest(chest);
    }
  }

  $("sword").style.backgroundImage  = "url(images/sword1.png)";
  $("shield").style.backgroundImage = "url(images/shield.png)";
}

