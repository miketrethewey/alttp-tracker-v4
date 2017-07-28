class LabelSquare extends Square {
  constructor(id) {
    super(id);
  }

  build(mode = "full") {
    var square = super.build(mode);

    square.removeAttribute("onclick");
    square.removeAttribute("oncontextmenu");
    square.classList.remove("false");
    square.classList.add("true");

    return square;
  }
}
