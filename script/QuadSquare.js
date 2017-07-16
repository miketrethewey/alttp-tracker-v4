class QuadSquare extends Square {
  constructor(id,multiItems) {
  super(id);
  this.items                                        = multiItems;
  this.backgroundImage                              = "";
    this.classList[this.classList.length]           = "multiSquare";
    this.classList[this.classList.length]           = "quadSquare";
    this.classList[this.classList.indexOf("false")] = "true";
  }

  build() {
    var square  = super.build();
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
    tr.appendChild(new Square(this.items[itemI++]).build());

    // Row 1 Cell 2
    if(this.items.length > 2) {
      tr.appendChild(new Square(this.items[itemI++]).build());
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
      tr.appendChild(new Square(this.items[itemI++]).build());
    } else {
      th.classList.add("corner");
      tr.appendChild(th);
    }

    // Row 2 Cell 2
    if(this.items.length > 2) {
      tr.appendChild(new Square(this.items[itemI++]).build());
    } else {
      tr.appendChild(new Square(this.items[itemI++]).build());
    }

    table.appendChild(tr);

    square.appendChild(table);

    return square;
  }
}
