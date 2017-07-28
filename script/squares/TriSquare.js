class TriSquare extends Square {
  constructor(id,multiItems) {
    super(id);
    this.items                                      = multiItems;
    this.backgroundImage                            = "";
    this.classList[this.classList.length]           = "multiSquare";
    this.classList[this.classList.length]           = "triSquare";
    this.classList[this.classList.indexOf("false")] = "true";
  }

  build() {
    var square  = super.build();
    var itemI   = 0;

    square.removeAttribute("onclick");
    square.removeAttribute("oncontextmenu");

    // Tri Table
    var table       = document.createElement("table");
    table.className = this.classList.join(' ');

    table.setAttribute("cellpadding",0);
    table.setAttribute("cellspacing",0);

    // Row 1
    var tr = document.createElement("tr");

    // Row 1 Cell 1
    var topSquare                       = this.chooseSquare(this.items[itemI++]).build("mini");
    topSquare.style.backgroundPosition  = "center center";
    topSquare.setAttribute("colspan",2);
    tr.appendChild(topSquare);

    table.appendChild(tr);

    // Row 2
    tr = document.createElement("tr");

    // Row 2 Cell 1
    if(this.items.length > 2) {
      tr.appendChild(this.chooseSquare(this.items[itemI++]).build("mini"));
    }

    // Row 2 Cell 2
    if(this.items.length > 2) {
      tr.appendChild(this.chooseSquare(this.items[itemI++]).build("mini"));
    }

    table.appendChild(tr);

    square.appendChild(table);

    return square;
  }

  chooseSquare(id) {
    if(id.indexOf("boss") > -1) {
      return new BossSquare(id);
    } else if(id.indexOf("chest") > -1) {
      return new ChestSquare(id);
    } else if(id.indexOf("label") > -1) {
      return new LabelSquare(id);
    } else {
      return new Square(id);
    }
  }
}
