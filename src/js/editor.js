import DOM from "./dom";
import Section from "./section";
export default class Editor {
  constructor(options) {
    this.options = options;
    this.dom = new DOM(this);
    this.section = new Section(this);
    // console.log(options);
  }
}
