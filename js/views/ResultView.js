import View from "./View.js";

const tag = "[ResultView]";

export default class ResultView extends View {
  constructor(el) {
    super(el);
    this.messages = {
      NO_RESULT: "검색 결과가 없습니다",
    };
  }

  render(data = []) {
    console.log(tag, "render()", data);
    this.el.innerHTML = data.length
      ? this.getSearchResultsHtml(data)
      : this.messages.NO_RESULT;

    this.show();
    this.bindEvent();
  }

  getSearchResultsHtml(data) {
    return (
      data.reduce((html, item) => {
        html += this.getSearchItemHtml(item);
        return html;
      }, "<ul class='result_wrap'>") + "</ul>"
    );
  }

  getSearchItemHtml(item) {
    return `<li data-id='${item.id}' class='result_item'>
      <img src="${item.urls.regular}" alt='${item.alt_description}'>
    </li>`;
  }

  bindEvent() {
    const items = this.el.querySelectorAll(".result_item");
    Array.from(items).forEach((item) =>
      item.addEventListener("click", (e) => {
        this.onClickImg(e);
      })
    );
  }

  onClickImg(e) {
    const id = e.currentTarget.dataset.id;
    this.emit("@onClickImg", { id });
  }
}
