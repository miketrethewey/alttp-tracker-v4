class BossSquare extends Square {
  constructor(id) {
    super(id);
    this.dungeonID                                  = id.slice(4);
    this.medallionID                                = (this.dungeonID >= 8) ? (this.dungeonID - 8) : -1;
    this.backgroundImage                            = build_img_url("boss" + this.dungeonID);
    this.classList[this.classList.length]           = "bossSquare";
    this.classList[this.classList.indexOf("false")] = "true";
    prizes[this.dungeonID]                          = 0;
  }

  build(mode = "full") {
    var square = super.build();

    square.removeAttribute("onclick");
    square.removeAttribute("oncontextmenu");

    // Boss Table
    var table       = document.createElement("table");
    table.className = this.classList.join(' ');
    table.setAttribute("cellpadding",0);
    table.setAttribute("cellspacing",0);

    // Row 1
    var tr = document.createElement("tr");
    var th = document.createElement("th");

    // Row 1 Cell 1
    th.classList.add("corner");
    th.setAttribute("onclick",this.onLtClick);
    th.setAttribute("oncontextmenu",this.onRtClick);
    tr.appendChild(th);

    if(mode == "full") {
      // Row 1 Cell 2
      th = document.createElement("th");
      th.classList.add("corner");
      th.setAttribute("onclick",this.onLtClick);
      th.setAttribute("oncontextmenu",this.onRtClick);

      if(this.medallionID >= 0) {
        th.id                             = "medallion" + this.medallionID;
        th.style.backgroundImage          = "url(" + build_img_url("medallion0") + ')';
        th.setAttribute("onclick",        this.onLtClick.replace("toggle","toggleMedallion").replace("'" + this.id + "'",this.medallionID));
        th.setAttribute("oncontextmenu",  this.onRtClick.replace("toggle","toggleMedallion").replace("'" + this.id + "'",this.medallionID));
        th.classList.add("dungeonMedallion");
        th.classList.add("dungeonMedallion0");
      }

      tr.appendChild(th);

      table.appendChild(tr);

      // Row 2
      tr = document.createElement("tr");
      th = document.createElement("th");

      // Row 2 Cell 1
      th.classList.add("corner");
      th.setAttribute("onclick",this.onLtClick);
      th.setAttribute("oncontextmenu",this.onRtClick);
      tr.appendChild(th);

      // Row 2 Cell 2
      th                        = document.createElement("th");
      th.id                     = "dungeonPrize" + this.dungeonID;
      th.style.backgroundImage  = "url(" + build_img_url("dungeon0") + ')';
      th.classList.add("corner");
      th.classList.add("dungeonPrize");
      th.classList.add("dungeonPrize0");
      th.setAttribute("onclick",        this.onLtClick);
      th.setAttribute("oncontextmenu",  this.onRtClick);
      th.setAttribute("onclick",        this.onLtClick.replace("toggle","toggleDungeon").replace("'" + this.id + "'",this.dungeonID));
      th.setAttribute("oncontextmenu",  this.onRtClick.replace("toggle","toggleDungeon").replace("'" + this.id + "'",this.dungeonID));
    }
    tr.appendChild(th);
    table.appendChild(tr);

    square.appendChild(table);

    return square;
  }
}
