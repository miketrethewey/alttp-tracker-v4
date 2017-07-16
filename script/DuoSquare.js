class DuoSquare extends QuadSquare {
  constructor(id,multiItems) {
	super(id,multiItems);
    this.classList[this.classList.length]	= "duoSquare";
  }

  build() {
    var square = super.build();

    return square;
  }
}
