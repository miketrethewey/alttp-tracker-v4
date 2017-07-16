class TriSquare extends Square {
  constructor(id,multiItems) {
	super(id);
	this.items										= multiItems;
	this.backgroundImage							= "";
    this.classList[this.classList.length]			= "multiSquare";
    this.classList[this.classList.length]			= "triSquare";
    this.classList[this.classList.indexOf("false")]	= "true";
  }

  build() {
    var square	= super.build();
    var itemI	= 0;

    square.removeAttribute("onclick");
    square.removeAttribute("oncontextmenu");

    // Tri Table
    var table		= document.createElement("table");
    table.className	= this.classList.join(' ');

    table.setAttribute("cellpadding",0);
    table.setAttribute("cellspacing",0);

    // Row 1
    var tr = document.createElement("tr");

    // Row 1 Cell 1
    var topSquare = new Square(this.items[itemI++]).build();
    topSquare.style.backgroundPosition = "center";
    topSquare.setAttribute("colspan",2);
    tr.appendChild(topSquare);

	table.appendChild(tr);

    // Row 2
	tr = document.createElement("tr");

    // Row 2 Cell 1
    if(this.items.length > 2) {
      tr.appendChild(new Square(this.items[itemI++]).build());
	}

    // Row 2 Cell 2
    if(this.items.length > 2) {
      tr.appendChild(new Square(this.items[itemI++]).build());
	}

	table.appendChild(tr);

	square.appendChild(table);

    return square;
  }
}
