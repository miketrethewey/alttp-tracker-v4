function print_map_chests() {
  // Initialize all chests on the map
  for(k = 0; k < chests.length; k++) {
    var span                    = document.createElement("span");
    span.id                     = "chestMap" + k;
    span.style.backgroundImage  = "url(images/poi.png)";
    span.setAttribute("onclick",        "toggleChest('"       + k + "')");
    span.setAttribute("oncontextmenu",  "toggleChest('"       + k + "')");
    span.setAttribute("onmouseover",    "highlightChest("     + k + ")");
    span.setAttribute("onmouseout",     "unhighlightChest("   + k + ")");
    $("mapDiv").appendChild(span);

    $("chestMap" + k).style.left = chests[k].x;
    $("chestMap" + k).style.top  = chests[k].y;
    if(chests[k].isOpened) {
      set_class("chestMap" + k, "chest opened");
    } else {
      set_class("chestMap" + k, "chest " + chests[k].isAvailable());
    }
  }

  // Dungeon bosses & chests
  for(k = 0; k < dungeons.length; k++) {
    var span                    = document.createElement("span");
    span.id                     = "bossMap" + k;
    span.style.backgroundImage  = "url(" + build_img_url(dungeons[k].image) + ')';
    span.setAttribute("onmouseover",  "highlightDungeon("    + k + ")");
    span.setAttribute("onmouseout",   "unhighlightDungeon("  + k + ")");
    $("mapDiv").appendChild(span);

    $("bossMap" + k).style.left = dungeons[k].x;
    $("bossMap" + k).style.top  = dungeons[k].y;
    set_class("bossMap" + k, "boss " + dungeons[k].isBeatable());

    span = document.createElement("span");
    span.id                     = "dungeon" + k;
    span.style.backgroundImage  = "url(images/poi.png)";
    span.setAttribute("onmouseover",  "highlightDungeon("    + k + ")");
    span.setAttribute("onmouseout",   "unhighlightDungeon("  + k + ")");
    $("mapDiv").appendChild(span);

    $("dungeon" + k).style.left = dungeons[k].x;
    $("dungeon" + k).style.top  = dungeons[k].y;
    set_class("dungeon" + k, "dungeon " + dungeons[k].canGetChest());
  }
}
