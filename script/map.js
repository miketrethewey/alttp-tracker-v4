function print_map_chests() {
  // Initialize all chests on the map
  document.write('<div>');
  for(k = 0; k < chests.length; k++) {
    document.write("<span style='background-image:url(images/poi.png);' id='" + k + "' onClick='toggleChest(" + k + ")' onMouseover='highlight(" + k + ")' onMouseout='unhighlight(" + k + ")'></span>");
    document.getElementById(k).style.left = chests[k].x;
    document.getElementById(k).style.top  = chests[k].y;
    if(chests[k].isOpened) {
      document.getElementById(k).className = "chest opened";
    } else {
      document.getElementById(k).className = "chest " + chests[k].isAvailable();
    }
  }

  // Dungeon bosses & chests
  for(k = 0; k < dungeons.length; k++) {
    document.write("<span style='background-image:url(images/" + dungeons[k].image + ");' id='bossMap" + k + "' onMouseover='highlightDungeon(" + k + ")' onMouseout='unhighlightDungeon(" + k + ")'></span>");
    document.getElementById("bossMap" + k).style.left = dungeons[k].x;
    document.getElementById("bossMap" + k).style.top  = dungeons[k].y;
    document.getElementById("bossMap" + k).className  = "boss " + dungeons[k].isBeatable();
  }

  document.write("<span style='background-image:url(images/poi.png)' id='dungeon" + k + "' onMouseover='highlightDungeon(" + k + ")' onMouseout='unhighlightDungeon(" + k + ")'></span>");
  document.getElementById("dungeon" + k).style.left = dungeons[k].x;
  document.getElementById("dungeon" + k).style.top  = dungeons[k].y;
  document.getElementById("dungeon" + k).className  = "dungeon " + dungeons[k].canGetChest();
}
