class Square {
  constructor(id) {
    this.id               = id;
    this.title            = this.id.substr(0,1).toUpperCase() + this.id.slice(1);
    this.classList        = ["trackerSquare", this.getCategory(), this.id + '-' + items[id], "false"];
    this.backgroundImage  = build_img_url(this.id);
    this.onLtClick        = "toggle('" + id + "','advance')";
    this.onRtClick        = this.onLtClick.replace("advance","retreat") + ";return false;";
  }

  build(mode = "full") {
    var square = document.createElement("td");

    square.id     = this.id;
    square.title  = this.getTitle();
    if(this.backgroundImage != "") {
      square.style.backgroundImage = "url(" + this.backgroundImage + ')';
    }
    square.className = this.classList.join(' ');
    square.setAttribute("onclick",        this.onLtClick);
    square.setAttribute("oncontextmenu",  this.onRtClick);

    return square;
  }

  getCategory() {
    return this.id.indexOf("nothing") > -1 ? "nothing" : this.id;

}
  getTitle() {
    var bosses     = ["Armos Knights","Lanmolas","Moldorm","Helmasaur King","Arrghus","Mothula","Blind","Kholdstare","Vitreous","Trinexx"];
    var dungeons   = ["Eastern Palace","Desert Palace","Tower of Hera","Palace of Darkness","Swamp Palace","Skull Woods","Thieves' Town","Ice Palace","Misery Mire","Turtle Rock"];
    if(this.title.toLowerCase().indexOf("boss") > -1) {
      this.title = dungeons[this.dungeonID];
    } else if(this.title.toLowerCase().indexOf("chest") > -1) {
      this.title = dungeons[this.dungeonID];
    } else {
      switch(this.title.toLowerCase()) {
        case "byrna":
        case "somaria":
          this.title = "Cane of " + this.title;
          break;
        case "cape":
        case "mirror":
          this.title = "Magic " + this.title;
          break;
        case "firerod":
          this.title = "Fire Rod";
          break;
        case "icerod":
          this.title = "Ice Rod";
          break;
        case "moonpearl":
          this.title = "Moon Pearl";
          break;
        case "pendant0":
          this.title = "Pendant of Courage";
          break;
        case "pendant1":
          this.title = "Pendant of Power";
          break;
        case "pendant2":
          this.title = "Pendant of Wisdom";
          break;
      }
    }
    return this.title;
  }
}
