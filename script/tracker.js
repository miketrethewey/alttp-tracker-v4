// Event of clicking on the item tracker
function toggle(label, mode = "advance") {
  var curr = items[label];
  var eles = document.getElementsByClassName(label);

  if(label.substring(0,5) == "chest") {
    var x   = label.substring(5);
    var cS  = new ChestSquare("chest" + x);

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

    var count = items[label];
    if(count > 9) {
      count = "many";
    }

    $(label).style.backgroundImage  = ("url(" + build_img_url("chest" + count) + ')');
    $(label).title                  = cS.getTitle();
    $(label).classList.remove(label + '-' + curr);
    $(label).classList.add(label + '-' + items[label]);

    if($("dungeonChestMini" + x)) {
      $("dungeonChestMini" + x).style.backgroundImage = ("url(" + build_img_url("chest" + count + "-mini") + ')');
      $("dungeonChestMini" + x).title = cS.getTitle();
    }

    if(isMap && x != "e" && x != "gt") {
      if(items[label] == 0) {
        $("dungeon" + x).className = "dungeon opened";
      } else {
        $("dungeon" + x).className = "dungeon " + dungeons[x].canGetChest();
      }
    }

    clear_selection();
    return;
  } else if(label.substring(0,5) == "count") {
    if(mode == "advance") {
     items[label]++;
    } else {
      items[label]--;
    }

    if(items[label] < 0) {
      items[label] = itemsMax[label];
    } else if(items[label] > itemsMax[label]) {
      items[label] = 0;
    }

    change_count(label,items[label]);

    clear_selection();
    return;
  }
  if((typeof items[label]) == "boolean") {
    $(label).classList.remove(curr);
    $(label).classList.add((items[label] = !items[label]));
    for(var ele in eles) {
    ele = eles[ele];
    if(ele.className && ele.className.length > 0 && ele.className.indexOf(curr) > -1) {
        ele.classList.remove(curr);
        ele.classList.add(items[label]);
      }
    }
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
      $(label).style.backgroundImage = ("url(" + build_img_url(label + items[label]) + ')');
      if(! bossSquare) {
        $(label).className = ("true");
      }
    } else {
      $(label).style.backgroundImage = ("url(" + build_img_url(label) + ')');
      if(! bossSquare) {
        $(label).className = ("false");
      }
    }
    $(label).classList.remove(label + curr);
    $(label).classList.add(label + items[label]);

    var miniTheme = selectedTheme;
    for(var ele in eles) {
      ele = eles[ele];
      if(ele.className && ele.className.length > 0 && ele.className.indexOf(label + '-' + curr) > -1) {
        if(label.indexOf("tunic") > -1) {
          miniTheme = "vanilla";
        }
        if(items[label] > itemsMin[label]) {
          ele.style.backgroundImage = "url(" + build_img_url(label + items[label], miniTheme) + ')';
        } else {
          ele.style.backgroundImage = "url(" + build_img_url(label, miniTheme) + ')';
        }
        ele.classList.remove(label + '-' + curr);
        ele.classList.add(label + '-' + items[label]);
        if(items[label] == 0) {
          ele.classList.remove("true");
          ele.classList.add("false");
        } else {
          ele.classList.remove("false");
          ele.classList.add("true");
        }
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

  clear_selection();
}

// BUNNY TIME!!!
function togglePearl() {
  var link = "tunic";
  if(items.tunic > 1) {
    link += items.tunic;
  }
  if(!items.moonpearl) {
    link += "b";
  }

  $("tunic").style.backgroundImage = "url(" + build_img_url(link) + ')';
  $("tunic").classList.remove("false");
  $("tunic").classList.add("true");

  var eles = document.getElementsByClassName("tunic");
  for(var ele in eles) {
    ele = eles[ele];
    if(ele.className && ele.className != "") {
      ele.style.backgroundImage = "url(" + build_img_url(link,"vanilla") + ')';
    }
  }
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
  var lastPrize = prizes[n];
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

  $("dungeonPrize" + n).style.backgroundImage = "url(" + build_img_url("dungeon" + prizes[n]) + ')';
  $("dungeonPrize" + n).classList.remove("dungeonPrize" + lastPrize)
  $("dungeonPrize" + n).classList.add("dungeonPrize" + prizes[n]);

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
  var lastMedallion = medallions[n];
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

  var medallionID = "medallion" + ((n == 0) ? 'M' : 'T')

  $(medallionID).style.backgroundImage = "url(" + build_img_url("medallion" + medallions[n]) + ')';
  $(medallionID).classList.remove("dungeonMedallion" + lastMedallion)
  $(medallionID).classList.add("dungeonMedallion" + medallions[n]);
  var eles = document.getElementsByClassName("dungeon" + medallionID.ucfirst());
  for(var ele in eles) {
    ele = eles[ele];
    if(ele.className && ele.className.length > 0) {
      ele.style.backgroundImage = "url(" + build_img_url("medallion" + medallions[n]) + ')';
      ele.classList.remove("dungeonMedallion" + lastMedallion)
      ele.classList.add("dungeonMedallion" + medallions[n]);
    }
  }

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
  lonkTd.classList.add("tunic");
  lonkTd.style.backgroundImage = "url(" + build_img_url("tunic") + ')';
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
  lonkTh.setAttribute("oncontextmenu","toggle('tunic','retreat');return false;");

        // Add Tunic
  lonkTr.appendChild(lonkTh);

        //  td table tr td : Build Sword
  var td = document.createElement("td");
  td.id = "sword";
  td.classList.add("sword");
  td.setAttribute("onclick","toggle('sword')");
  td.setAttribute("oncontextmenu","toggle('sword','retreat');return false;");

        // Add Sword
  lonkTr.appendChild(td);

      // Add row
  lonkTd.appendChild(lonkTr);

      // td table tr : Shield
  lonkTr = document.createElement("tr");

        // td table tr td : Build Shield
  td = document.createElement("td");
  td.id = "shield";
  td.classList.add("shield");
  td.setAttribute("onclick","toggle('shield')");
  td.setAttribute("oncontextmenu","toggle('shield','retreat');return false;");

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
  pearlTableTrTh.classList.add("false");
  pearlTableTrTh.classList.add("moonpearl");
  pearlTableTrTh.style.backgroundImage = "url(" + build_img_url("moonpearl") + ')';
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

  var cellID = 0;
  for(var squareID in itemList) {
    squareID  = itemList[squareID];
    if(squareID != "tunic" && squareID != "shield" && squareID != "sword" && squareID != "moonpearl") {
      var s  = [];

      if(squareID.indexOf("duo") > -1 || squareID.indexOf("tri") > -1 || squareID.indexOf("quad") > -1) {
        var multiItems  = squareID.split('-');
        id              = multiItems.shift();
        if(squareID.indexOf("duo") > -1) {
          s = new DuoSquare(id,multiItems);
        } else if(squareID.indexOf("tri") > -1) {
          s = new TriSquare(id,multiItems);
        } else {
          s = new QuadSquare(id,multiItems);
        }
      } else if(squareID.indexOf("boss") > -1) {
        s = new BossSquare(squareID);
      } else if(squareID.indexOf("chest") > -1) {
        s = new ChestSquare(squareID);
      } else if(squareID.indexOf("count") > -1) {
        s = new CountSquare(squareID);
      } else {
        s = new Square(squareID);
      }

      var square = s.build();

      tr.appendChild(square);

      var lonkRow = ((parseInt(cellID) + 1) > 0) && ((parseInt(cellID) / 5) < 2);
      var row     = ((parseInt(cellID) + 1) > 0) && ((parseInt(cellID) / 5) > 2);

      if((lonkRow && (parseInt(cellID) + 1) % 5 == 0) || (row && (parseInt(cellID) + 1 + 4) % 7 == 0)) {
        tracker.appendChild(tr);
        tr = document.createElement("tr");
      }
      cellID++;
    }
    tracker.appendChild(tr);
    $("tracker").appendChild(tracker);
  }
}

function init() {
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

  var form  = document.createElement("form");
  form.id   = "form";
  $("disclaimer").prependChild(form);

  var select  = document.createElement("select");
  select.id   = "theme";
  select.name = "theme";
  var themes  = ["default","retro","vanilla"];
  for(var t in themes) {
    t                 = themes[t];
    var option        = document.createElement("option");
    option.value      = t;
    option.innerHTML  = t.ucfirst();
    select.appendChild(option);
  }
  select.setAttribute("onchange",'$("form").submit()');
  form.appendChild(select);
  form.innerHTML += "<br />";

  var span  = document.createElement("span");
  var label = document.createElement("label");
  var input = document.createElement("input");

  input.id    = "map";
  input.name  = "map";
  input.type  = "checkbox";
  input.setAttribute("onchange",'$("form").submit()');
  span.appendChild(input);

  label.innerHTML = "Map?";
  label.setAttribute("for","map");
  span.appendChild(label);

  form.appendChild(span);
  form.innerHTML += "<br />";

  span  = document.createElement("span");
  label = document.createElement("label");
  input = document.createElement("input");
  input.id    = "open";
  input.name  = "open";
  input.type  = "checkbox";
  input.setAttribute("onchange",'$("map").checked="on";$("form").submit()');
  span.appendChild(input);

  label.innerHTML = "Open Mode?";
  label.setAttribute("for","open");
  span.appendChild(label);

  form.appendChild(span);
  form.innerHTML += "<br />";

  $("map").checked          = isMap;
  $("open").checked         = isOpen;
  $("theme").selectedIndex  = themes.indexOf(selectedTheme.toLowerCase());

  if(isOpen) {
    var openChests = [56,57,58];
    for(var chest in openChests) {
      chest = openChests[chest];
      toggleChest(chest);
    }
    $("sword").style.backgroundImage  = "url(" + build_img_url("sword") + ')';
  } else {
    $("sword").style.backgroundImage  = "url(" + build_img_url("sword1") + ')';
  }

  var ids = ["tunic","sword","shield"];
  for(var id in ids) {
    id = ids[id];
    toggle(id);
    toggle(id,"retreat");
  }
  var eles = document.getElementsByClassName("tunic");
  for(var ele in eles) {
    ele = eles[ele];
    if(ele.className && ele.className != "") {
      ele.style.backgroundImage = "url(" + build_img_url("tunic","vanilla") + ')';
    }
  }
  $("tunic").style.backgroundImage = "url(" + build_img_url("tunic") + ')';

  var eles = document.getElementsByClassName("moonpearl");
  for(var ele in eles) {
    ele = eles[ele];
    if(ele.className && ele.className != "") {
      ele.style.backgroundImage = "url(" + build_img_url("moonpearl") + ')';
      ele.classList.remove("true");
      ele.classList.add("false");
    }
  }

  document.getElementsByTagName("body")[0].className = selectedTheme.toLowerCase();
}
