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
    return `<li class='result_item'>
      <img src="${item.urls.regular}">
    </li>`;
  }
}
