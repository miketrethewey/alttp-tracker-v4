// define dungeon chests
var dungeons = new Array;

dungeons[0] = {
    name: "Eastern Palace",
    x: "46.8%",
    y: "38.8%",
    image: "boss02.png",
    isBeaten: false,
    isBeatable: function() {
      if(canShootArrows()) {
        if(haveLightCone()) {
          return "available";
        } else {
          return "dark";
        }
      } else {
        return "unavailable";
      }
    },
    canGetChest: function() {
      if(items.chest0 > 2) {
        return "available";
      }
      if(items.chest0 > 1 || canShootArrows()) {
        if(haveLightCone()) {
          return "available";
        } else {
          return "dark";
        }
      }
      return "unavailable";
    }
};

dungeons[1] = {
    name: "Desert Palace",
    x: "3.8%",
    y: "78.4%",
    image: "boss12.png",
    isBeaten: false,
    isBeatable: function() {
      if(!canLiftRocks()) {
        return "unavailable";
      }
      if(!items.book && !(items.flute && canLiftDarkRocks() && items.mirror)) {
        return "unavailable";
      }
      if(!canLightTorches()) {
        return "unavailable";
      }
      if(!canDash()) {
        return "possible";
      }
      return "available";
    },
    canGetChest: function() {
      if(!items.book && !(items.flute && canLiftDarkRocks() && items.mirror)) {
        return "unavailable";
      }
      if(canDash() && canLightTorches() && canLiftRocks()) {
        return "available";
      }
      if(items.chest1 > 1 && canDash()) {
        return "available"
      }
      return "possible";
    }
};

dungeons[2] = {
    name: "Tower of Hera",
    x: "31.0%",
    y: "5.5%",
    image: "boss22.png",
    isBeaten: false,
    isBeatable: function() {
      if(!items.mirror && !(items.hookshot && items.hammer)) {
        return "unavailable";
      }
      if(!deathmountain() && !deathmountaindarkness()) {
        return "unavailable";
      }
      if(!deathmountain()) {
        return "dark";
      }
      if(canLightTorches()) {
        return "available";
      }
      return "possible";
    },
    canGetChest: function() {
      return this.isBeatable();
    }
};

dungeons[3] = {
    name: "Palace of Darkness " + mini("lantern"),
    x: "97.0%",
    y: "40.0%",
    image: "boss32.png",
    isBeaten: false,
    isBeatable: function() {
      if(!items.moonpearl || !(canShootArrows()) || !items.hammer) {
        return "unavailable";
      }
      if(!items.agahnim && !canLiftRocks()) {
        if(!canEnterAga1()) {
          return "unavailable";
        } else {
          return "agahnim-check";
        }
      }
      if(!haveLightCone()) {
        return "dark";
      }
      return "available";
    },
    canGetChest: function() {
      if(!items.moonpearl) {
        return "unavailable";
      }
      if(!items.agahnim && !(items.hammer && canLiftRocks()) && !(canLiftDarkRocks() && canSwim())) {
        if(!canEnterAga1()) {
          return "unavailable";
        } else {
          return "agahnim-check";
        }
      }
      if(canShootArrows() && (items.chest3 > 1 || items.hammer)) {
        if(haveLightCone()) {
          return "available";
        } else {
          return "dark";
        }
      }
      return "possible";
    }
};

dungeons[4] = {
    name: "Swamp Palace",
    x: "73.5%",
    y: "91.0%",
    image: "boss42.png",
    isBeaten: false,
    isBeatable: function() {
      if(!items.moonpearl || !items.mirror || !canSwim()) {
        return "unavailable";
      }
      if(!items.hammer || !items.hookshot) {
        return "unavailable";
      }
      if(!canLiftRocks() && !items.agahnim) {
        if(!canEnterAga1()) {
          return "unavailable";
        } else {
          return "agahnim-check";
        }
      }
      return "available";
    },
    canGetChest: function() {
      if(!items.moonpearl || !items.mirror || !canSwim()) {
        return "unavailable";
      }
      if(!steve() && (!items.agahnim && (stevelight() || (items.hammer && canEnterAga1())))) {
        return "agahnim-check";
      }
      if(!steve() && !(items.agahnim && items.hammer)) {
        return "unavailable";
      }
      // Here we go...
      if(items.chest4 <= 2) {
        if(items.hookshot && items.hammer) {
          return "available";
        } else {
          return "unavailable";
        }
      } else if(items.chest4 <= 4) {
        if(!items.hammer) {
          return "unavailable";
        }
        if(items.hookshot) {
          return "available";
        }
        return "possible";
      } else if(items.chest4 == 5) {
        if(items.hammer) {
          return "available";
        } else {
          return "unavailable";
        }
      }
      if(items.hammer) {
        return "available";
      }
      return "possible";
    }
};

dungeons[5] = {
    name: "Skull Woods",
    x: "53.3%",
    y: "5.4%",
    image: "boss52.png",
    isBeaten: false,
    isBeatable: function() {
      if(!steve() || !items.firerod) {
        return "unavailable";
      }
      if(stevelight() && items.firerod) {
        return "agahnim-check";
      }
      return "available";
    },
    canGetChest: function() {
      if(!steve()) {
        return "unavailable";
      }
      if(items.firerod) {
        return "available";
      } else {
        return "possible";
      }
      if(stevelight()) {
        return "agahnim-check";
      }
      return "unavailable";
    }
};

dungeons[6] = {
    name: "Thieves' Town",
    x: "56.4%",
    y: "47.9%",
    image: "boss62.png",
    isBeaten: false,
    isBeatable: function() {
      if(steve()) {
        return "available";
      }
      if(stevelight()) {
        return "agahnim-check";
      }
      return "unavailable";
    },
    canGetChest: function() {
      if(!stevelight() && !steve()) {
        return "unavailable";
      }
      if(!steve()) {
        return "agahnim-check";
      }
      if(items.chest6 == 1 && !items.hammer) {
        return "possible";
      }
      return "available";
    }
};

dungeons[7] = {
    name: "Ice Palace (yellow=must bomb jump)",
    x: "89.8%",
    y: "85.8%",
    image: "boss72.png",
    isBeaten: false,
    isBeatable: function() {
      if(!items.moonpearl || !canLiftDarkRocks() || !items.hammer) {
        return "unavailable";
      }
      if(!canMeltThings()) {
        return "unavailable";
      }
      if(items.hookshot || items.somaria) {
        if(canSwim()) {
          return "available";
        } else {
          return "fakeflippers";
        }
      }
      if(canSwim()) {
        return "possible";
      } else {
        return "fakeflippers";
      }
    },
    canGetChest: function() {
      if(!items.moonpearl || !canLiftDarkRocks()) {
        return "unavailable";
      }
      if(!canMeltThings()) {
        return "unavailable";
      }
      if(items.hammer) {
        if(canSwim()) {
          return "available";
        } else {
          return "fakeflippers";
        }
      }
      if(canSwim()) {
        return "possible";
      } else {
        return "fakeflippers";
      }
    }
};

dungeons[8] = {
    name: "Misery Mire " + mini("medallion0") + mini("lantern"),
    x: "55.8%",
    y: "82.9%",
    image: "boss82.png",
    isBeaten: false,
    isBeatable: function() {
      if(!items.moonpearl || !items.flute || !canLiftDarkRocks() || !items.somaria) {
        return "unavailable";
      }
      if(!canDash() && !items.hookshot) {
        return "unavailable";
      }
      // Medallion Check
      if(!items.bombos && !items.ether && !items.quake) {
        return "unavailable";
      }
      if((medallions[0] == 1 && !items.bombos) || (medallions[0] == 2 && !items.ether) || (medallions[0] == 3 && !items.quake)) {
        return "unavailable";
      }
      if(medallions[0] == 0 && !(items.bombos && items.ether && items.quake)) {
        return "possible";
      }
      if(haveLightCone()) {
        return "available";
      }
      if(items.firerod) {
        return "dark";
      }
      return "possible";
    },
    canGetChest: function() {
      if(!items.moonpearl || !items.flute || !canLiftDarkRocks()) {
        return "unavailable";
      }
      if(!canDash() && !items.hookshot) {
        return "unavailable";
      }
      // Medallion Check
      if(!items.bombos && !items.ether && !items.quake) {
        return "unavailable";
      }
      if((medallions[0] == 1 && !items.bombos) || (medallions[0] == 2 && !items.ether) || (medallions[0] == 3 && !items.quake)) {
        return "unavailable";
      }
      if(medallions[0] == 0 && !(items.bombos && items.ether && items.quake)) {
        return "possible";
      }
      if(!canLightTorches()) {
        return "possible";
      }
      if(items.chest8 > 1 || items.somaria) {
        if(haveLightCone()) {
          return "available";
        } else {
          return "dark";
        }
      }
      return "possible";
    }
};

dungeons[9] = {
    name: "Turtle Rock " + mini("medallion0") + mini("lantern"),
    x: "96.9%",
    y: "7.0%",
    image: "boss92.png",
    isBeaten: false,
    isBeatable: function() {
      if(!items.moonpearl || !items.hammer || !canLiftDarkRocks() || !items.somaria) {
        return "unavailable";
      }
      if(!items.hookshot && !items.mirror) {
        return "unavailable";
      }
      if(!items.icerod || !items.firerod) {
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
        if(!haveLightCone()) {
          return "dark";
        } else {
          return "possible";
        }
      }
      if(!haveLightCone()) {
        return "dark";
      } else {
        return "available";
      }
    },
    canGetChest: function() {
      if(!items.moonpearl || !items.hammer || !canLiftDarkRocks() || !items.somaria) {
        return "unavailable";
      }
      if(!items.hookshot && !items.mirror) {
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
        if(!items.flute && !haveLightCone()) {
          return "dark";
        } else {
          return "possible";
        }
      }
      if(!items.firerod) {
        if(!items.flute && !haveLightCone()) {
          return "dark";
        } else {
          return "possible";
        }
      }
      if(items.chest9 > 1) {
        if(!items.flute && !haveLightCone()) {
          return "dark";
        } else {
          return "available";
        }
      }
      if(items.icerod) {
        if(!haveLightCone()) {
          return "dark";
        } else {
          return "available";
        }
      }
      if(!items.flute && !haveLightCone()) {
        return "dark";
      } else {
        return "possible";
      }
    }
};

//define overworld chests
var chests = new Array;

chests[0] = {
    name: "King's Tomb " + mini("boots") + " + " + mini("glove2") + '/' + mini("mirror"),
    x: "30.8%",
    y: "29.6%",
    isOpened: false,
    isAvailable: function() {
      if(!items["boots"]) {
        return "unavailable";
      }
      if ((steve() && items["mirror"]) || canLiftDarkRocks()) {
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
    name: "Lumberjack Tree " + mini("agahnim-check") + mini("boots"),
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
    x: "35.3%",
    y: "26.4%",
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
