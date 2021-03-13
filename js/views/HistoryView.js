import View from "./View.js";

const tag = "[HistoryView]";

export default class HistoryView extends View {
  constructor(el) {
    super(el);
  }

  render(data = []) {
    this.el.innerHTML = data.length
      ? this.getHistoryHtml(data)
      : "최근 검색어가 없습니다";

    this.show();
    this.bindClickEvent();
  }

  getHistoryHtml(data) {
    return (
      data.reduce((html, item) => {
        html += `<li data-keyword=${item.keyword} class='history'>
          <span>${item.keyword}</span>
          <button class='delete'><i class="fas fa-times"></i></button>
        </li>`;
        return "" + html;
      }, "<ul class='history-wrap'><span class='index'>최근 검색어:</span>") +
      "</ul>"
    );
  }

  bindClickEvent() {
    Array.from(this.el.querySelectorAll(".history")).forEach((li) => {
      li.addEventListener("click", (e) => this.onClickHistory(e));
    });

    Array.from(this.el.querySelectorAll(".delete")).forEach((btn) => {
      btn.addEventListener("click", (e) => this.onClickRemoveBtn(e));
    });
  }

  onClickHistory(e) {
    const { keyword } = e.currentTarget.dataset;
    this.emit("@click", { keyword });
  }

  onClickRemoveBtn(e) {
    e.stopPropagation();
    const keyword = e.currentTarget.parentNode.dataset.keyword;
    this.emit("@remove", { keyword });
  }
}
