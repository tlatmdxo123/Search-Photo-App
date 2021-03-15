import View from "./View.js";

const tag = "[ResultView]";

export default class ResultView extends View {
  constructor(el) {
    super(el);
    this.messages = {
      NO_RESULT: "검색 결과가 없습니다",
    };
  }
  
  moreRender(data=[]){
    
    if(this.el.children.length === 0){
      this.el.insertAdjacentHTML('beforeend',data.length ? this.getSearchResultsHtml(data) : '')
    }else{
      const resultWrap = this.el.querySelector('#result_wrap')
      resultWrap.insertAdjacentHTML('beforeend',data.length ? data.reduce((html,item) => {
        html+=this.getSearchItemHtml(item)
        return html
      },'') : '')
    }
    this.bindEvent();
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
      }, "<ul id='result_wrap' class='result_wrap'>") + "</ul>"
    );
  }

  getSearchItemHtml(item) {
    return `<li data-id='${item.id}' class='result_item'>
      <img src="${item.urls.regular}" alt='${item.alt_description}'>
    </li>`;
  }

  bindEvent() {
    this.el.addEventListener('click',e => {
      this.onClickImg(e)
    })

  }

  onClickImg(e) {
    const id = e.target.parentNode.dataset.id;
    this.emit("@onClickImg", { id });
  }
}
