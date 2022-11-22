class Proxy {
  constructor(editor) {
    this.editor = editor;
    this.init();
  }
  init() {
    document.addEventListener("click", (e) => {
      const targetClass = e.target.classList;
      switch (true) {
        case targetClass.contains("icon"):
          this.listenIconBtn(e.target.parentNode);
          break;
        case targetClass.contains("tool-bar-btn") || targetClass.contains("list-editor-btn"):
          this.listenIconBtn(e.target);
          break;
      }
    });
  }
  listenIconBtn(el) {
    el.classList.contains("tool-btn") && this.handleClickTool(el);
    el.classList.contains("list-editor-btn") && this.handleClickListEditor(el);
  }
  listenEditSectionName() {}
  handleClickTool(el) {
    console.log("tool", el);
  }
  handleClickListEditor(el) {
    // console.log("list-editor", el);
    let listWrap = el;
    let currentItem = el;
    let sectionContainer = el;
    while (!listWrap.classList.contains("list-wrap")) {
      listWrap = listWrap.parentNode;
    }
    while (!currentItem.classList.contains("list-edit")) {
      currentItem = currentItem.parentNode;
    }
    while (!sectionContainer.classList.contains("emily-tpl-editor-section-container")) {
      sectionContainer = sectionContainer.parentNode;
    }
    switch (el.classList[1]) {
      case "add":
        this.editor.addListItem(listWrap, currentItem, sectionContainer.dataset.type);
        break;
      case "copy":
        this.editor.copyListItem(listWrap, currentItem);
        break;
      case "delete":
        this.editor.deleteListItem(listWrap, currentItem);
        break;
    }
    // const currentListItem = document.querySelectorAll("")
  }
}

export default Proxy;
