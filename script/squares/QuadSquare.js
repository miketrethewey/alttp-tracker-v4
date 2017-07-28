class QuadSquare extends Square {
  constructor(id,multiItems) {
    super(id);
    this.items                                      = multiItems;
    this.backgroundImage                            = "";
    this.classList[this.classList.length]           = "multiSquare";
    this.classList[this.classList.length]           = "quadSquare";
    this.classList[this.classList.indexOf("false")] = "true";
  }

  build(mode = "full") {
    var square  = super.build(mode);
    var itemI = 0;

    square.removeAttribute("onclick");
    square.removeAttribute("oncontextmenu");

    // Quad Table
    var table   = document.createElement("table");
    table.className = this.classList.join(' ');

    table.setAttribute("cellpadding",0);
    table.setAttribute("cellspacing",0);

    // Row 1
    var tr = document.createElement("tr");
    var th = document.createElement("th");

    // Row 1 Cell 1
    tr.appendChild(this.chooseSquare(this.items[itemI++]).build("mini"));

    // Row 1 Cell 2
    if(this.items.length > 2) {
      tr.appendChild(this.chooseSquare(this.items[itemI++]).build("mini"));
    } else {
      th.classList.add("corner");
      tr.appendChild(th);
    }

    table.appendChild(tr);

    // Row 2
    tr = document.createElement("tr");
    th = document.createElement("th");

    // Row 2 Cell 1
    if(this.items.length > 2) {
      tr.appendChild(this.chooseSquare(this.items[itemI++]).build("mini"));
    } else {
      th.classList.add("corner");
      tr.appendChild(th);
    }

    // Row 2 Cell 2
    if(this.items.length > 2) {
      tr.appendChild(this.chooseSquare(this.items[itemI++]).build("mini"));
    } else {
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
