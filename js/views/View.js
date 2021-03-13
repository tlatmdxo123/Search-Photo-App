const tag = "[View]";

export default class View {
  constructor(el) {
    if (!el) throw el;
    this.el = el;
    return this;
  }

  on(event, handler) {
    this.el.addEventListener(event, handler);
    return this;
  }

  emit(event, data) {
    const evt = new CustomEvent(event, { detail: data });
    this.el.dispatchEvent(evt);
    return this;
  }

  hide() {
    this.el.style.display = "none";
  }

  show() {
    this.el.style.display = "";
  }
}
