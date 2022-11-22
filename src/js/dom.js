import Editor from "../dom/editor.art";

export default class DOM {
  constructor(editor) {
    this.editor = editor;
    this.options = editor.options;
    this.container = this.options.container;
    this.init();
  }
  init() {
    this.container.innerHTML = Editor(this.options);
    const $ = this.container.querySelector.bind(this.container);
    const $all = this.container.querySelectorAll.bind(this.container);
    this.editor = $(".emily-tpl-editor");
    this.editorWrap = $(".emily-tpl-editor-wrap");
    this.sections = $all(".emily-tpl-editor-section-item");
    this.sectionToolBar = $all(".emily-tpl-editor-section-tool-bar");
  }
  update(type, index, sectionDOM) {
    switch (type) {
      case "add":
        this.editorWrap.insertBefore(sectionDOM, this.editorWrap.children[index]);
        break;
      case "copy":
        break;
      case "delete":
        this.editorWrap.removeChild(sectionDOM);
        break;
      default:
        this.editorWrap.appendChild(sectionDOM);
    }
  }
  reload(options) {
    // console.log(options);
    this.container.innerHTML = Editor(options);
  }
  destroy() {
    this.container.innerHTML = null;
  }

}
