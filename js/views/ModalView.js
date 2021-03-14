import View from "./View.js";

const tag = "[ModalView]";

export default class ModalView extends View {
  constructor(el) {
    super(el);
    this.toggleModal(false);
    this.bindEvent();
  }

  render(data = {}) {
    if (!data) return;
    console.log(data);
    const tags = data.tags.map((tag) => tag.title).join("#");
    this.el.innerHTML = `
        <div data-action='remove' class='modal-box'>
            <div class='modal-inner'>
                <div class='modal-content'>
                    <img src = '${data.urls.regular}' />
                    <ul class='img-info'>
                        <li>size:너비-${data.width},높이-${data.height}</li>
                        <li>tags:${
                          tags.length ? tags : "관련 태그가 없습니다"
                        }</li>
                    </ul>
                    <button class='btn-remove' data-action='remove'>x</button>
                </div>
            </div>
        </div>
    `;

    this.toggleModal(true);
  }

  bindEvent() {
    const clickHadler = this.onClickModal.bind(this);
    this.el.addEventListener("click", (e) => clickHadler(e));
  }

  toggleModal(isShow = true) {
    console.log(isShow);
    document.querySelector("body").className = isShow ? "active" : "";
    isShow ? this.show() : this.hide();
  }

  onClickModal(e) {
    let action = e.target.dataset.action;
    if (action) {
      this[action]();
    }
  }

  remove() {
    this.toggleModal(false);
  }
}
