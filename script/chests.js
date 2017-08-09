//define overworld chests
var chests = new Array;

chests[0] = {
    name: "King's Tomb " + mini("boots") + " + " + mini("glove2") + '/' + mini("mirror"),
    x: "30.8%",
    y: "29.6%",
    isOpened: false,
    isAvailable: function() {
      if(!items.boots) {
        return "unavailable";
      }
      if ((steve() && items.mirror) || canLiftDarkRocks()) {
        return "available";
      }
      if(stevelight() && items.mirror) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[1] = {
    name: "Light World Swamp (2)",
    x: "23.4%",
    y: "93.4%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[2] = {
    name: "Stoops Lonk's Hoose",
    x: "27.4%",
    y: "67.9%",
    isOpened: true,
    isAvailable: function() {
      return "available";
    }
};

chests[3] = {
    name: "Spiral Cave",
    x: "39.9%",
    y: "9.3%",
    isOpened: false,
    isAvailable: function() {
      if(items.hookshot || (items.mirror && items.hammer)) {
        if(deathmountain()) {
          return "available";
        } else if(deathmountaindarkness()) {
          return "dark";
        }
      }
      return "unavailable";
    }
};

chests[4] = {
    name: "Mimic Cave (" + mini("mirror") + " outside of Turtle Rock)(Yellow = " + mini("medallion0") + " unknown OR possible w/out " + mini("firerod") + ")",
    x: "42.6%",
    y: "9.3%",
    isOpened: false,
    isAvailable: function() {
      if(!items.moonpearl || !items.hammer || !canLiftDarkRocks() || !items.somaria || !items.mirror) {
        return "unavailable";
      }
      // Medallion Check
      if(!items.bombos && !items.ether && !items.quake) {
        return "unavailable";
      }
      if((medallions[1] == 1 && !items.bombos) || (medallions[1] == 2 && !items.ether) || (medallions[1] == 3 && !items.quake)) {
        return "unavailable";
      }
      if(medallions[1] == 0 && !(items.bombos && items.ether && items.quake)) {
        return "possible";
      }
      var maybeDark = "available";
      if(canLiftRocks() && !haveLightCone() && !items.flute) {
        maybeDark = "dark";
      }
      if(items.firerod) {
        return maybeDark;
      }
      return "possible";
    }
};

chests[5] = {
    name: "Tavern",
    x: "8.1%",
    y: "57.8%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[6] = {
    name: "Chicken House " + mini("bomb"),
    x: "4.4%",
    y: "54.2%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[7] = {
    name: "Bombable Hut " + mini("bomb"),
    x: "55.4%",
    y: "57.8%",
    isOpened: false,
    isAvailable: function() {
      if(steve()) {
        return "available";
      }
      if(stevelight()) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[8] = {
    name: "C House",
    x: "60.8%",
    y: "47.9%",
    isOpened: false,
    isAvailable: function() {
      if(steve()) {
        return "available";
      }
      if(stevelight()) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[9] = {
    name: "Aginah's Cave " + mini("bomb"),
    x: "10.0%",
    y: "82.6%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[10] = {
    name: "West of Mire (2)",
    x: "51.7%",
    y: "79.5%",
    isOpened: false,
    isAvailable: function() {
      if(items.flute && items.moonpearl && canLiftDarkRocks()) {
        return "available";
      }
      return "unavailable";
    }
};

chests[11] = {
    name: "DW Death Mountain (2) : Don't need " + mini("moonpearl"),
    x: "92.8%",
    y: "14.7%",
    isOpened: false,
    isAvailable: function() {
      if(canLiftDarkRocks() && (items.hookshot || (items.mirror && items.hammer))) {
        if(deathmountain() && items.moonpearl) {
          return "available";
        } else {
          return "dark";
        }
      }
      return "unavailable";
    }
};

chests[12] = {
    name: "Sahasrahla's Hut (3) " + mini("bomb") + '/' + mini("boots"),
    x: "40.7%",
    y: "41.4%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[13] = {
    name: "Byrna Spike Cave",
    x: "78.6%",
    y: "14.9%",
    isOpened: false,
    isAvailable: function() {
      if(items.moonpearl && canLiftRocks() && items.hammer) {
        if(deathmountain()) {
          return "available";
        } else if(deathmountaindarkness()) {
          return "dark";
        }
      }
      return "unavailable";
    }
};

chests[14] = {
    name: "Kakariko Well (4 + " + mini("bomb") + ")",
    x: "1.7%",
    y: "41.0%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[15] = {
    name: "Thieves' Hut (4 + " + mini("bomb") + ")",
    x: "6.4%",
    y: "41.0%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[16] = {
    name: "Thieves' Hut (4 + " + mini("bomb") + ")",
    x: "80.0%",
    y: "77.1%",
    isOpened: false,
    isAvailable: function() {
      if(steve() || (items.agahnim && items.moonpearl && items.hammer)) {
        return "available";
      }
      if(stevelight() || (items.moonpearl && items.hammer && canEnterAga1())) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[17] = {
    name: "Death Mountain East (5 + 2 " + mini("bomb") + ")",
    x: "41.4%",
    y: "17.1%",
    isOpened: false,
    isAvailable: function() {
      if(items.hookshot || (items.mirror && items.hammer)) {
        if(deathmountain()) {
          return "available";
        } else if(deathmountaindarkness()) {
          return "dark";
        }
      }
      return "unavailable";
    }
};

chests[18] = {
    name: "West of Sanctuary " + mini("boots"),
    x: "19.5%",
    y: "29.3%",
    isOpened: false,
    isAvailable: function() {
      if(canDash()) {
        return "available";
      }
      return "unavailable";
    }
};

chests[19] = {
    name: "Minimoldorm Cave (NPC + 4) " + mini("bomb"),
    x: "32.6%",
    y: "93.4%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[20] = {
    name: "Ice Rod Cave " + mini("bomb"),
    x: "44.7%",
    y: "76.9%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[21] = {
    name: "Cave Under Rock (bottom chest) " + mini("hookshot") + "/" + mini("boots"),
    x: "91.6%",
    y: "8.6%",
    isOpened: false,
    isAvailable: function() {
      if(items.moonpearl && canLiftDarkRocks() && (items.hookshot || (items.mirror && items.hammer && canDash()))) {
        if(deathmountain()) {
          return "available";
        } else {
          return "dark";
        }
      }
      return "unavailable";
    }
};

chests[22] = {
    name: "Cave Under Rock (3 top chests) " + mini("hookshot"),
    x: "91.6%",
    y: "3.4%",
    isOpened: false,
    isAvailable: function() {
      if(items.moonpearl && canLiftDarkRocks() && items.hookshot) {
        if(deathmountain()) {
          return "available";
        } else {
          return "dark";
        }
      }
      return "unavailable";
    }
};

chests[23] = {
    name: "Treasure Chest Minigame: Pay 30 rupees",
    x: "52.1%",
    y: "46.4%",
    isOpened: false,
    isAvailable: function() {
      if(steve()) {
        return "available";
      }
      if(stevelight()) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[24] = {
    name: "Bottle Vendor: Pay 100 rupees",
    x: "4.5%",
    y: "46.8%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[25] = {
    name: "Sahasrahla " + mini("pendant0"),
    x: "40.7%",
    y: "46.7%",
    isOpened: false,
    isAvailable: function() {
      for(var k = 0; k < 10; k++) {
        if(prizes[k] == GREEN_PENDANT && items["boss" + k] == 2) {
          return "available";
        }
      }
      return "unavailable";
    }
};

chests[26] = {
    name: "Ol' Stumpy",
    x: "65.5%",
    y: "68.6%",
    isOpened: false,
    isAvailable: function() {
      if(steve() || (items.agahnim && items.moonpearl && items.hammer)) {
        return "available";
      }
      if(stevelight() || (items.moonpearl && items.hammer && canEnterAga1())) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[27] = {
    name: "Dying Boy: Distract him with " + mini("bottle") + " so that you can rob his family!",
    x: "7.8%",
    y: "52.1%",
    isOpened: false,
    isAvailable: function() {
      if(items.bottle) {
        return "available";
      }
      return "unavailable";
    }
};

chests[28] = {
    name: "Reunite the Hammer Brothers and show the Purple Chest to Gary",
    x: "65.2%",
    y: "52.2%",
    isOpened: false,
    isAvailable: function() {
      if(items.moonpearl && canLiftDarkRocks()) {
        return "available";
      }
      return "unavailable";
    }
};

chests[29] = {
    name: "Fugitive under the bridge " + mini("flippers"),
    x: "35.4%",
    y: "69.7%",
    isOpened: false,
    isAvailable: function() {
      if(canSwim()) {
        return "available";
      }
      return "fakeflippers";
    }
};

chests[30] = {
    name: "Ether Tablet " + mini("sword2") + mini("book"),
    x: "21.0%",
    y: "3.0%",
    isOpened: false,
    isAvailable: function() {
      if(haveMagicalSword() && items.book && (items.mirror || (items.hookshot && items.hammer))) {
        if(deathmountain()) {
          return "available";
        } else if(deathmountaindarkness()) {
          return "dark";
        }
      }
      return "unavailable";
    }
};

chests[31] = {
    name: "Bombos Tablet " + mini("mirror") + mini("sword2") + mini("book"),
    x: "11.0%",
    y: "92.2%",
    isOpened: false,
    isAvailable: function() {
      if((steve() || (items.agahnim && items.moonpearl && items.hammer)) && items.mirror && haveMagicalSword() && items.book) {
        return "available";
      }
      if((stevelight() || (items.moonpearl && items.hammer && canEnterAga1())) && items.mirror && haveMagicalSword() && items.book) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[32] = {
    name: "Catfish",
    x: "96.0%",
    y: "17.2%",
    isOpened: false,
    isAvailable: function() {
      if(items.moonpearl && canLiftRocks() && (items.agahnim || items.hammer || (canLiftDarkRocks() && canSwim()))) {
        return "available";
      }
      if(items.moonpearl && canLiftRocks() && canEnterAga1()) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[33] = {
    name: "King Zora: Pay 500 rupees",
    x: "47.5%",
    y: "12.1%",
    isOpened: false,
    isAvailable: function() {
      if(canSwim() || canLiftRocks()) {
        return "available";
      }
      return "fakeflippers";
    }
};

chests[34] = {
    name: "Lost Old Man",
    x: "20.8%",
    y: "20.4%",
    isOpened: false,
    isAvailable: function() {
      if(deathmountain()) {
        return "available";
      }
      if(deathmountaindarkness()) {
        return "dark";
      }
      return "unavailable";
    }
};

chests[35] = {
    name: "Witch: Give her " + mini("mushroom"),
    x: "40.8%",
    y: "32.5%",
    isOpened: false,
    isAvailable: function() {
      if(items.mushroom) {
        return "available";
      }
      return "unavailable";
    }
};

chests[36] = {
    name: "Forest Hideout",
    x: "9.4%",
    y: "13.0%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[37] = {
    name: "Lumberjack Tree " + mini("agahnim") + mini("boots"),
    x: "15.1%",
    y: "7.6%",
    isOpened: false,
    isAvailable: function() {
      if(items.agahnim && canDash()) {
        return "available";
      }
      if(canDash() && canEnterAga1()) {
        return "agahnim-check";
      }
      return "possible";
    }
};

chests[38] = {
    name: "Spectacle Rock Cave",
    x: "24.3%",
    y: "14.8%",
    isOpened: false,
    isAvailable: function() {
      if(deathmountain()) {
        return "available";
      }
      if(deathmountaindarkness()) {
        return "dark";
      }
      return "unavailable";
    }
};

chests[39] = {
    name: "South of Grove " + mini("mirror"),
    x: "14.1%",
    y: "84.1%",
    isOpened: false,
    isAvailable: function() {
      if(items.mirror && (steve() || (items.agahnim && items.moonpearl && items.hammer))) {
        return "available";
      }
      if(items.mirror && (stevelight() || (items.moonpearl && items.hammer && canEnterAga1()))) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[40] = {
    name: "Graveyard Cliff Cave " + mini("mirror"),
    x: "28.1%",
    y: "27.0%",
    isOpened: false,
    isAvailable: function() {
      if(steve() && items.mirror) {
        return "available";
      }
      if(stevelight() && items.mirror) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[41] = {
    name: "Checkerboard Cave " + mini("mirror"),
    x: "8.8%",
    y: "77.3%",
    isOpened: false,
    isAvailable: function() {
      if(items.flute && canLiftDarkRocks() && items.mirror) {
        return "available";
      }
      return "unavailable";
    }
};

chests[42] = {
    name: mini("hammer").repeat(8) + "!!!!!!!!",
    x: "65.8%",
    y: "60.1%",
    isOpened: false,
    isAvailable: function() {
      if(items.moonpearl && canLiftDarkRocks() && items.hammer) {
        return "available";
      }
      return "unavailable";
    }
};

chests[43] = {
    name: "Library " + mini("boots"),
    x: "7.7%",
    y: "65.9%",
    isOpened: false,
    isAvailable: function() {
      if(canDash()) {
        return "available";
      }
      return "possible";
    }
};

chests[44] = {
    name: "Mushroom",
    x: "6.2%",
    y: "8.6%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[45] = {
    name: "Spectacle Rock " + mini("mirror"),
    x: "25.4%",
    y: "8.5%",
    isOpened: false,
    isAvailable: function() {
      if(deathmountain()) {
        if(items.mirror) {
          return "available";
        } else {
          return "possible";
        }
      }
      if(deathmountaindarkness()) {
        if(items.mirror) {
          return "dark";
        } else {
          return "possible";
        }
      }
      return "unavailable";
    }
};

chests[46] = {
    name: "Floating Island " + mini("mirror"),
    x: "40.2%",
    y: "3.0%",
    isOpened: false,
    isAvailable: function() {
      var maybeDark = "available";
      if(canLiftRocks() && !haveLightCone() && !items.flute) {
        maybeDark = "dark";
      }
      if((canLiftRocks() || items.flute) && (items.hookshot || (items.hammer && items.mirror))) {
        if(items.mirror && items.moonpearl && canLiftDarkRocks()) {
          return maybeDark;
        } else {
          return "possible";
        }
      }
      return "unavailable";
    }
};

chests[47] = {
    name: "Race Minigame " + mini("bomb") + '/' + mini("boots"),
    x: "1.8%",
    y: "69.8%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[48] = {
    name: "Desert West Ledge " + mini("book") + '/' + mini("mirror"),
    x: "1.5%",
    y: "91.0%",
    isOpened: false,
    isAvailable: function() {
      if(items.book || (items.flute && canLiftDarkRocks() && items.mirror)) {
        return "available";
      }
      return "possible";
    }
};

chests[49] = {
    name: "Lake Hylia Island " + mini("mirror"),
    x: "36.1%",
    y: "82.9%",
    isOpened: false,
    isAvailable: function() {
      if(items.moonpearl && items.mirror && (items.agahnim || canLiftDarkRocks() || (canLiftRocks() && items.hammer))) {
        if(canSwim()) {
          return "available";
        } else {
          return "fakeflippers";
        }
      } else if(items.moonpearl && items.mirror && canEnterAga1()) {
        return "agahnim-check";
      } else {
        return "possible";
      }
    }
};

chests[50] = {
    name: "Bumper Cave " + mini("cape"),
    x: "67.1%",
    y: "15.2%",
    isOpened: false,
    isAvailable: function() {
      if(steve()) {
        if(items.cape) {
          return "available";
        } else {
          return "possible";
        }
      }
      if(stevelight() && items.cape && canLiftRocks()) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[51] = {
    name: "Pyramid",
    x: "79.0%",
    y: "43.5%",
    isOpened: false,
    isAvailable: function() {
      if(items.agahnim || (canLiftRocks() && items.hammer && items.moonpearl) || (canLiftDarkRocks() && items.moonpearl && canSwim())) {
        return "available";
      }
      return "unavailable";
    }
};

chests[52] = {
    name: "Alec Baldwin's Dig-a-Thon: Pay 80 rupees",
    x: "52.9%",
    y: "69.2%",
    isOpened: false,
    isAvailable: function() {
      if(steve() || (items.agahnim && items.moonpearl && items.hammer)) {
        return "available";
      }
      if(stevelight() || items.moonpearl && items.hammer && canEnterAga1()) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[53] = {
    name: "Zora River Ledge " + mini("flippers"),
    x: "47.5%",
    y: "17.3%",
    isOpened: false,
    isAvailable: function() {
      if(canSwim()) {
        return "available";
      }
      if(canLiftRocks()) {
        return "possible";
      }
      return "unavailable";
    }
};

chests[54] = {
    name: "Buried Item " + mini("shovel"),
    x: "14.4%",
    y: "66.2%",
    isOpened: false,
    isAvailable: function() {
      if(items.shovel) {
        return "available";
      }
      return "unavailable";
    }
};

chests[55] = {
    name: "Escape Sewer (4) " + mini("bomb") + '/' + mini("boots"),
    x: "26.8%",
    y: "32.4%",
    isOpened: false,
    isAvailable: function() {
      return "available";
    }
};

chests[56] = {
    name: "Castle Secret Entrance",
    x: "29.8%",
    y: "41.8%",
    isOpened: true,
    isAvailable: function() {
      return "available";
    }
};

chests[57] = {
    name: "Hyrule Castle (3)",
    x: "24.9%",
    y: "44.1%",
    isOpened: true,
    isAvailable: function() {
      return "available";
    }
};

chests[58] = {
    name: "Sanctuary",
    x: "23.0%",
    y: "28.0%",
    isOpened: true,
    isAvailable: function() {
      return "available";
    }
};

chests[59] = {
    name: "Mad Batter " + mini("hammer") + '/' + mini("mirror") + " + " + mini("powder"),
    x: "16.0%",
    y: "58.0%",
    isOpened: false,
    isAvailable: function() {
      if(items.powder && (items.hammer || (canLiftDarkRocks() && items.mirror && items.moonpearl))) {
        return "available";
      }
      return "unavailable";
    }
};

chests[60] = {
    name: "Take the frog home",
    x: "15.2%",
    y: "51.8%",
    isOpened: false,
    isAvailable: function() {
      if(items.moonpearl && canLiftDarkRocks()) {
        return "available";
      }
      return "unavailable";
    }
};

chests[61] = {
    name: "Fat Fairy: Buy OJ bomb from Dark Link's House after " + mini("dungeon2") + "5 " + mini("dungeon2") + "6 (2 items)",
    x: "73.5%",
    y: "48.5%",
    isOpened: false,
    isAvailable: function() {
      //crystal check
      var crystalCount = 0;
      for(var k = 0; k < 10; k++) {
        if(prizes[k] == OJ_CRYSTAL && items["boss" + k] == 2) {
          crystalCount++;
        }
      }
      if(!items.moonpearl || crystalCount < 2) {
        return "unavailable";
      }
      if(items.hammer && (items.agahnim || items.glove)) {
        return "available";
      }
      if(items.agahnim && items.mirror && steve()) {
        return "available";
      }
      if((items.hammer && canEnterAga1()) || (items.mirror && (steve() || stevelight()))) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

chests[62] = {
    name: "Master Sword Pedestal "+mini("pendant0") + mini("pendant1") + mini("pendant2") + " (can check with " + mini("book") + ')',
    x: "2.5%",
    y: "3.2%",
    isOpened: false,
    isAvailable: function() {
      var pendantCount = 0;
      for(var k = 0; k < 10; k++) {
        if((prizes[k] == GREEN_PENDANT || prizes[k] == OTHER_PENDANT) && items["boss" + k] == 2) {
          if(++pendantCount == 3) {
            return "available";
          }
        }
      }
      return "unavailable";
    }
};

chests[63] = {
    name: "Waterfall of Wishing",
    x: "45%",
    y: "14.5%",
    isOpened: false,
    isAvailable: function() {
      if(canSwim()) {
        return "available";
      } else if(items.moonpearl) {
        return "jesusdash";
      }
      return "unavailable";
    }
};
