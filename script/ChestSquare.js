class ChestSquare extends Square {
  constructor(id) {
    super(id);
    this.dungeonID                                  = id.slice(5);
    this.backgroundImage                            = build_img_url("chest" + items[id]);
    this.classList[this.classList.length]           = "chestSquare";
    this.classList[this.classList.indexOf("false")] = "true";
  }
}
