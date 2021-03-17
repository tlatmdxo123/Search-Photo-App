import View from "./View.js";

const tag = "[FormView]";

export default class FormView extends View {
  constructor(el) {
    super(el);
    this.inputEl = this.el.querySelector("[type=text]");
    this.resetEl = this.el.querySelector("[type=reset]");
    this.filter = this.el.querySelectorAll('select')

    this.filterList = {}

    this.showResetBtn(false);
    this.bindEvents();
  }

  showResetBtn(show = true) {
    this.resetEl.style.display = show ? "" : "none";
  }

  bindEvents() {
    this.inputEl.addEventListener("keyup", (e) => this.onKeyup(e));
    this.el.addEventListener("submit", (e) => this.onSubmit(e));
    this.resetEl.addEventListener("click", () => this.onReset());
  }

  onKeyup(e) {
    this.showResetBtn(e.currentTarget.value.length);
    if (!this.inputEl.value) {
      this.onReset();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    Array.from(this.filter).forEach(item => {
      this.filterList[item.name] = item.value !== 'option' ? item.value : null
    })
    this.emit("@submit", { input: this.inputEl.value, filter:this.filterList });
  }

  onReset() {
    this.emit("@reset");
    this.showResetBtn(false);
  }

  setValue(keyword = "") {
    this.inputEl.value = keyword;
    this.showResetBtn(true);
  }
}
