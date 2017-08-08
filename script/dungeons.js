var dungeonbeaten	= dungeonbeatenInit;
var dungeonchests	= dungeonchestsInit;
var prizes			= prizesInit;
var medallions		= medallionsInit;

// define dungeon chests
var dungeons = new Array;

dungeons[0] = {
    name: "Eastern Palace",
    x: "46.8%",
    y: "38.8%",
    image: "boss02.png",
    isBeaten: function() {
	  return dungeonbeaten[0];
	},
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
    isBeaten: function() {
	  return dungeonbeaten[1];
	},
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
    isBeaten: function() {
	  return dungeonbeaten[2];
	},
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
    isBeaten: function() {
	  return dungeonbeaten[3];
	},
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
    isBeaten: function() {
	  return dungeonbeaten[4];
	},
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
    isBeaten: function() {
	  return dungeonbeaten[5];
	},
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
    isBeaten: function() {
	  return dungeonbeaten[6];
	},
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
    isBeaten: function() {
	  return dungeonbeaten[7];
	},
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
    isBeaten: function() {
	  return dungeonbeaten[8];
	},
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
    isBeaten: function() {
	  return dungeonbeaten[9];
	},
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
