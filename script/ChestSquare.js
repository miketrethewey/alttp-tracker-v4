class ChestSquare extends Square {
  constructor(id) {
    super(id);
    this.dungeonID                                  = id.slice(5);
    var count = items[id];
    if(count > 9) {
      count = "many";
    }
    this.backgroundImage                            = build_img_url("chest" + count);
    this.classList[this.classList.length]           = "chestSquare";
    this.classList[this.classList.indexOf("false")] = "true";
  }
}
