class DuoSquare extends QuadSquare {
  constructor(id,multiItems) {
    super(id,multiItems);
    this.classList[this.classList.length] = "duoSquare";
  }

  build(mode = "full") {
    var square = super.build(mode);

    return square;
  }
}
