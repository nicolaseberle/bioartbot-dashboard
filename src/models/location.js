export default class Location {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
  resetLocation() {
    this.name = "";
    this.description = "";
  }
}
