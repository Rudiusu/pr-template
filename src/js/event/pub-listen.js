class Events {
  constructor() {
    this.events = {};
    this.Events = ["edit", "add-item", "copy-item", "delete-item"];
  }

  on(name, callback) {
    if (this.Events.indexOf(name) !== -1 && typeof callback === "function") {
      if (!this.events[name]) {
        this.events[name] = [];
      }
      this.events[name].push(callback);
    }
  }
  off(name, callback) {
    if (this.Events.indexOf(name) !== -1 && typeof callback === "function") {
      if (!this.events[name]) {
        this.events[name] = [];
      }
      const index = this.events[name].indexOf(callback);
      if (typeof index === "number") this.events[name].splice(index, 1);
    }
  }
  trigger(name, ...args) {
    if (this.events[name] && this.events[name].length) {
      for (let i = 0; i < this.events[name].length; i++) {
        this.events[name][i](...args);
      }
    }
  }
}

export default Events;
