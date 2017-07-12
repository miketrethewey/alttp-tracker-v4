function print_map_chests() {
  // Initialize all chests on the map
  for(k = 0; k < chests.length; k++) {
    var span                    = document.createElement("span");
    span.id                     = k;
    span.style.backgroundImage  = "url(images/poi.png)";
    span.setAttribute("onclick",      "toggleChest('" + k + "')");
    span.setAttribute("onmouseover",  "highlight("    + k + ")");
    span.setAttribute("onmouseout",   "unhighlight("  + k + ")");
    $("map").appendChild(span);

    $(k).style.left = chests[k].x;
    $(k).style.top  = chests[k].y;
    if(chests[k].isOpened) {
      $(k).className = "chest opened";
    } else {
      $(k).className = "chest " + chests[k].isAvailable();
    }
  }

  // Dungeon bosses & chests
  for(k = 0; k < dungeons.length; k++) {
    var span                    = document.createElement("span");
    span.id                     = "bossMap" + k;
    span.style.backgroundImage  = "url(images/" + dungeons[k].image + ')';
    span.setAttribute("onmouseover",  "highlightDungeon("    + k + ")");
    span.setAttribute("onmouseout",   "unhighlightDungeon("  + k + ")");
    $("map").appendChild(span);

    $("bossMap" + k).style.left = dungeons[k].x;
    $("bossMap" + k).style.top  = dungeons[k].y;
    $("bossMap" + k).className  = "boss " + dungeons[k].isBeatable();

    span = document.createElement("span");
    span.id                     = "dungeon" + k;
    span.style.backgroundImage  = "url(images/poi.png)";
    span.setAttribute("onmouseover",  "highlightDungeon("    + k + ")");
    span.setAttribute("onmouseout",   "unhighlightDungeon("  + k + ")");
    $("map").appendChild(span);

    $("dungeon" + k).style.left = dungeons[k].x;
    $("dungeon" + k).style.top  = dungeons[k].y;
    $("dungeon" + k).className  = "dungeon " + dungeons[k].canGetChest();
  }
}
