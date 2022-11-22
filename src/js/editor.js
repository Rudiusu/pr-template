import DOM from "./dom";
import Section from "./section";
import Proxy from "./event/proxy";
import Events from "./event/pub-listen";
export default class Editor {
  constructor(options) {
    this.options = options;
    this.dom = new DOM(this);
    this.section = new Section(this);
    this.proxy = new Proxy(this);
    this.events = new Events(this);
    // console.log(options);
  }
  on(eventName, callback) {
    this.events.on(eventName, callback);
  }
  off(eventName, callback) {
    this.events.off(eventName, callback);
  }
  addListItem(listWrap, currentItem, type) {
    console.log(currentItem, listWrap, type);
    const index = [...listWrap.children].indexOf(currentItem);
    const div = document.createElement("div");
    div.innerHTML = this.section.factory(type);
    const newItem = div.querySelector(`.${type}-item`);
    listWrap.insertBefore(newItem, listWrap.children[index + 1]);
    this.events.trigger("add-item");
  }
  copyListItem(listWrap, currentItem) {
    const index = [...listWrap.children].indexOf(currentItem);
    const newItem = currentItem.cloneNode(true);
    listWrap.insertBefore(newItem, listWrap.children[index + 1]);
    this.events.trigger("copy-item");
  }
  deleteListItem(listWrap, currentItem) {
    listWrap.removeChild(currentItem);
    this.events.trigger("delete-item");
  }
}
