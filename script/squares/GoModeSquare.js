class GoModeSquare extends Square {
  constructor(id) {
    super(id);
    this.title            = "Go Mode!";
    this.backgroundImage  = "";
    this.onLtClick        = "check_gomode()";
    this.onRtClick        = this.onLtClick + ";return false;";
  }
  build(mode = "full") {
    var square = super.build(this.id);
    var span = document.createElement("span");
    span.innerHTML = "GO !";
    square.appendChild(span);

    return square;
  }
}
