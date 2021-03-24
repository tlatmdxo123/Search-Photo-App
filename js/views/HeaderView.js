import View from "./View.js";

export default class HeaderView extends View {
  constructor(el) {
    super(el);
    this.userBtn = this.el.querySelector(".info-btn");

    this.bindEvent();
  }

  bindEvent() {
    this.userBtn.addEventListener("click", () => this.onClickUser());
  }

  onClickUser() {
    this.emit("@onClickUser");
  }
}
