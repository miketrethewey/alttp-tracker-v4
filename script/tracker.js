var rowLength	= 7;
var prizes		= [];
var medallions	= [0, 0];

function $(e) {
  return document.getElementById(e);
}

// Event of clicking on the item tracker
function toggle(label) {
  if(label.substring(0,5) == "chest") {
    if(--items[label] < 0)
      items[label] = itemsMax[label];
      $(label).style.backgroundImage = ("url(images/chest" + items[label] + ".png)");
    x = label.substring(5);
//    if(items[label] == 0)
//      $("dungeon" + x).className = "dungeon opened";
//    else
//      $("dungeon" + x).className = "dungeon " + dungeons[x].canGetChest();
    return;
  }

  if((typeof items[label]) == "boolean") {
    $(label).className = (items[label] = !items[label]);
  }
  else {
    if(++items[label] > itemsMax[label]){
      items[label] = itemsMin[label];
        $(label).style.backgroundImage = ("url(images/" + label + ".png)");
      if(!items[label])
      $(label).className = ("false");
    }
    else{
        $(label).style.backgroundImage = ("url(images/" + label + items[label] + ".png)");
      $(label).className = ("true");
    }
  }

  // Initiate bunny graphics!
    if(label == "moonpearl" || label == "tunic")
      togglePearl();
}

// BUNNY TIME!!!
function togglePearl() {
  var link = "url(images/tunic";
  if(items.tunic > 1)
    link += items.tunic;
  if(!items.moonpearl)
    link += "b";
  link += ".png)";

  $("tunic").style.backgroundImage = link;
}

// event of clicking on a boss's pendant/crystal subsquare
function toggleDungeon(n) {
  prizes[n]++;
  if(prizes[n] == 5)
    prizes[n] = 0;
  $("dungeonPrize" + n).style.backgroundImage = "url(images/dungeon" + prizes[n] + ".png)";
}

// event of clicking on Mire/TRock's medallion subsquare
function toggleMedallion(n) {
  medallions[n]++;
  if(medallions[n] == 4)
    medallions[n] = 0;
  $("medallion" + n).style.backgroundImage = "url(images/medallion" + medallions[n] + ".png)";
}

function print_lonk() {
  document.write('    <table class="tracker" cellpadding="0" cellspacing="0" border="0" align="center">');
  document.write('    <!-- Top left cell is Link. Dont move it. I cant make the CSS work any other way :( -->');
  document.write('    <!-- EDIT: I guess I could do it similar to the boss squares, but thats annoying -->');
  document.write('    <tr>');
  document.write('      <td colspan="2" rowspan="2"id="tunic" style="background-image: url(images/tunic.png);">');
  document.write('        <table cellpadding="0" cellspacing="0" class="stoops" border="0">');
  document.write('          <tr>');
  document.write('            <th onClick="toggle(\'tunic\')"></th>');
  document.write('            <td id="sword" onClick="toggle(\'sword\')"></td>');
  document.write('          </tr>');
  document.write('          <tr>');
  document.write('            <td id="shield" onClick="toggle(\'shield\')"></td>');
  document.write('            <th>');
  document.write('              <table cellpadding="0" cellspacing="0" border="0" class="lonk">');
  document.write('                <tr>');
  document.write('                  <th class="mini-corner" onClick="toggle(\'tunic\')"></th>');
  document.write('                  <th onClick="toggle(\'tunic\')"></th>');
  document.write('                </tr>');
  document.write('                <tr>');
  document.write('                  <th onClick="toggle(\'tunic\')"></th>');
  document.write('                  <th id="moonpearl" class="false" style="background-image:url(images/moonpearl.png); width:48px; height:48px;" onClick="toggle(\'moonpearl\')"></th>');
  document.write('                </tr>');
  document.write('              </table>');
  document.write('            </th>');
  document.write('          </tr>');
  document.write('        </table>');
  document.write('      </td>');
}

function print_tracker() {
  print_lonk();

  var itemList	= Object.keys(items);
  var k			= 4;
  while(k < itemList.length){
    if(k != 4)
      document.write("<tr>");
    for(j = 0; j < rowLength; j++){
      if(k == 4 || k == 9)
        j = 2;
      var x = itemList[k];

        // boss tables (pendant/crystal, medallion)
        if(x.substring(0,4) == "boss"){
          var d = prizes.length;
          prizes[d] = 0;

          document.write("<td id='" + x + "' style='background-image:url(images/" + x + ".png);'>");
          document.write("<table cellpadding='0' cellspacing='0' class='lonk'>");
            document.write("<tr>");
              document.write("<th onClick='toggle(" + '"' + x + '"' + ")'></th>");
              document.write("<th onClick='toggle(" + '"' + x + '"' + ")'></th>");
            document.write("</tr>");
            document.write("<tr>");
              // Does dungeon have a medallion?
              if(d >= 8)
                document.write("<th id='medallion" + (d - 8) + "' onClick='toggleMedallion(" + (d - 8) + ")' class='corner' style='background-image:url(images/medallion0.png)'></th>");
              else
                document.write("<th onClick='toggle(" + '"' + x + '"' + ")'></th>");
              document.write("<th id='dungeonPrize" + d + "' onClick='toggleDungeon(" + d + ")' class='corner' style='background-image:url(images/dungeon0.png)'></th>");
            document.write("</tr>");
            document.write("</table>");
          document.write("</td>");
        }
        else {
          if(x.substring(0,5) == "chest"){
            document.write("<td style='background-image:url(images/chest" + items[x] + ".png);' ");
          }
          else
            document.write("<td style='background-image:url(images/" + x + ".png);' ");
          document.write("id='" + x + "' ");
          document.write("class='" + !!items[x] + "' ");
          document.write("onClick='toggle(" + '"' + x + '"' + ")'>");
          document.write("</td>");
        }

      if(++k == itemList.length)
      break;
    }
    document.write("</tr>");
  }
  document.write('</table>');
}

function init() {
  $("sword").style.backgroundImage	= "url(images/sword1.png)";
  $("shield").style.backgroundImage	= "url(images/shield.png)";
}
