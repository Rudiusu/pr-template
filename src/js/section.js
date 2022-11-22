import SectionTPL from "../dom/section.art";
import titleTPL from "../dom/section/title.art";
import textTPL from "../dom/section/text.art";
import imageTPL from "../dom/section/image.art";
import videoTPL from "../dom/section/video.art";

import Title from "./section/title";
import Text from "./section/text";
import Image from "./section/image";
import Video from "./section/video";
import ImageWithText from "./section/image-with-text";
import ImageGrid from "./section/image-grid";

import utils from "./utils";
export default class Section {
  constructor(editor) {
    this.editor = editor;
    this.init();
  }

  init(section) {
    let { sectionToolBar, sections } = this.editor.dom;
    const listenClickSection = (el) => {
      const activeSection = document.querySelector(".emily-tpl-editor-section-item.focus");
      activeSection && activeSection.classList.remove("focus");
      this.activeSection = el;
      el.classList.add("focus");
    };
    const listenToolButton = (toolbar) => {
      [...toolbar.children].forEach((btn) => {
        btn.addEventListener("click", () => {
          const btn_type = btn.classList[1];
          this[btn_type](btn);
        });
      });
    };
    if (section) {
      sectionToolBar = section.querySelectorAll(".emily-tpl-editor-section-tool-bar");
      [...sectionToolBar].forEach((el) => {
        listenToolButton(el);
      });

      section.addEventListener("click", () => {
        listenClickSection(section);
      });
    } else {
      [...sectionToolBar].forEach((el) => {
        listenToolButton(el);
      });
      [...sections].forEach((el, index) => {
        if (!el.classList.contains("set")) {
          this.set(el);
        } else {
          const sec_wrap = el.querySelector(".emily-tpl-section-wrap");
          const sec_container = el.querySelector(".emily-tpl-editor-section-container");
          this.createInstance(sec_container.dataset.type, sec_wrap.children[1]);
        }

        el.addEventListener("click", () => listenClickSection(el));
      });
    }
  }
  set(section) {
    const confirm_sec_btn = section.querySelector(".emily-tpl-btn.normal.confirm");

    confirm_sec_btn.addEventListener("click", () => {
      const sec_name = section.querySelector(".emily-tpl-input.section-name").value;
      const sec_type = section.querySelector(".emily-tpl-select.section-type").value;
      const sec_wrap = section.querySelector(".emily-tpl-section-wrap");
      const div = document.createElement("div");

      console.dir(sec_name);
      console.dir(sec_type);
      section.classList.add("set");
      sec_wrap.querySelector(".section-name").innerText = sec_name || "暂无名称";
      sec_wrap.querySelector(".section-type").innerText = utils.num2type(sec_type);
      switch (sec_type) {
        case "0": //title
          const title = this.factory("title");
          div.innerHTML = title;
          break;
        case "1": //text
          const text = this.factory("text");
          div.innerHTML = text;
          break;
        case "2": //image
          const image = this.factory("image");
          div.innerHTML = image;
          break;
        case "3": //video
          const video = this.factory("video");
          div.innerHTML = video;
          break;
      }
      this.createInstance(sec_type, div.children[0]);
      sec_wrap.appendChild(div.children[0]);
    });
  }
  createInstance(type, dom) {
    switch (type) {
      case "title":
      case "0":
        new Title(dom);
        break;
      case "text":
      case "1":
        new Text(dom);
        break;
      case ("image", "2"):
        new Image(dom);
        break;
      case ("video", "3"):
        new Video(dom);
        break;
      case ("image-with-text", "4"):
        new ImageWithText(dom);
        break;
      case ("image-grid", "5"):
        new ImageGrid(dom);
        break;
    }
  }
  add(btn) {
    let newSection, activeSectionIndex;
    activeSectionIndex = [...this.editor.dom.editorWrap.children].indexOf(this.activeSection);
    console.log("add section", activeSectionIndex);
    const tool_pos = btn.parentElement.classList[1];
    this.editor.options.sections.push({});
    const div = document.createElement("div");
    div.innerHTML = SectionTPL();
    newSection = div.children[0];
    this.init(newSection);
    this.set(newSection);
    this.editor.dom.update("add", tool_pos === "top" ? activeSectionIndex : activeSectionIndex + 1, newSection);
  }
  copy(btn) {
    let activeSectionIndex;
    activeSectionIndex = [...this.editor.dom.editorWrap.children].indexOf(this.activeSection);
    const tool_pos = btn.parentElement.classList[1];
    const cloneSection = this.activeSection.cloneNode(true);
    cloneSection.classList.remove("focus");
    console.log("copy section", activeSectionIndex);
    this.init(cloneSection);
    this.editor.dom.update("add", tool_pos === "top" ? activeSectionIndex : activeSectionIndex + 1, cloneSection);
  }
  delete() {
    let activeSectionIndex;
    activeSectionIndex = [...this.editor.dom.editorWrap.children].indexOf(this.activeSection);
    console.log("delete section", activeSectionIndex);
    this.editor.dom.update("delete", activeSectionIndex, this.activeSection);
  }

  factory(type) {
    let section;
    switch (type) {
      case "title":
        section = titleTPL();
        break;
      case "text":
        section = textTPL({
          value: [""],
        });
        break;
      case "image":
        section = imageTPL({
          value: [""],
        });
        break;
      case "video":
        section = videoTPL({
          value: [""],
        });
        break;
    }

    return section;
  }
}
