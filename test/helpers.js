export class Fixture {
  constructor(data, expected, name = null) {
    this.data = data;
    this.expected = expected;

    self.name = name || data;
  }
}
