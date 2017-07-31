class CountSquare extends Square {
  constructor(id) {
    super(id);
    this.backgroundImage                            = build_img_url(plural(id.replace("count",""),true));
    this.onLtClick                                  = "toggle('" + id + "')";
    this.onRtClick                                  = "toggle('" + id + "','retreat');return false;";
    this.classList[this.classList.length]           = "countSquare";
    this.classList[this.classList.indexOf("false")] = "true";
  }

  build(mode = "full") {
    var square = super.build();

    var countTable = document.createElement("table");
    countTable.classList.add("countTable");
    countTable.setAttribute("cellpadding",0);
    countTable.setAttribute("cellspacing",0);

    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerHTML = "&nbsp;";
    tr.appendChild(th);
    countTable.appendChild(tr);

    tr = document.createElement("tr");
    th = document.createElement("th");
    th.style.textAlign = "right";

    var span  = document.createElement("span");
    span.id   = this.id + "IMG";
    span.classList.add("img");

    var img = document.createElement("img");
    img.src = build_img_url("0");
    img.classList.add("countNumber");

    span.appendChild(img);
    th.appendChild(span);

    span      = document.createElement("span");
    span.id     = this.id + "Value";
    span.innerHTML  = '0';
    span.classList.add("value");

    th.appendChild(span);
    tr.appendChild(th);
    countTable.appendChild(tr);

    square.appendChild(countTable);

    return square;
  }
}
