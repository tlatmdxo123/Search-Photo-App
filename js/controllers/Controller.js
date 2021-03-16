import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";
import HistoryView from "../views/HistoryView.js";
import ModalView from "../views/ModalView.js";
import LoadingView from "../views/LoadingView.js";
import DarkModeView from "../views/DarkModeView.js";

import SearchModel from "../models/SearchModel.js";
import HistoryModel from "../models/HistoryModel.js";
import ModalModel from "../models/ModalModel.js";

const tag = "[Controller]";

export default class Controller {
  constructor() {
    this.formView = new FormView(document.querySelector(".search-form"));
    this.formView
      .on("@submit", (e) => this.onSubmit(e.detail.input))
      .on("@reset", (e) => this.onReset());

    this.loadingView = new LoadingView(document.querySelector('#load-wrap'))
    
    this.resultView = new ResultView(
      document.querySelector("#search-result")
    ).on("@onClickImg", (e) => this.onClickImg(e.detail.id));

    this.historyView = new HistoryView(
      document.querySelector("#search-history")
    );
    this.historyView
      .on("@click", (e) => this.onClickHistory(e.detail.keyword))
      .on("@remove", (e) => this.onClickRemove(e.detail.keyword));

    this.modalView = new ModalView(document.querySelector("#modal-wrap"));

    this.darkModeView = new DarkModeView(document.querySelector('#darkmode-wrap'))
      .on('@toggle',e => this.toggleDark(e.detail.isDark))
    const {matches} = window.matchMedia('(prefers-color-scheme:dark)')
    this.darkModeView.toggleDark(matches)
    this.renderView();
    this.infiniteScroll()
  }

  renderView() {
    this.fetchSearchHistory();
  }

  infiniteScroll(){
    const renderingTrigger = document.querySelector('#rendering-trigger')
    const observer = new IntersectionObserver(this.getMoreData.bind(this))
    observer.observe(renderingTrigger)
  }

  getMoreData(){
    this.loadingView.loading(true)
    SearchModel.fetchMoreData().then(({data}) => {
      this.fetchMoreData(data.results)
    })
  }

  fetchMoreData(data){
    this.resultView.moreRender(data)
    this.loadingView.loading(false)
  }

  fetchSearchHistory() {
    HistoryModel.list().then((data) => {
      this.historyView.render(data);
    });
  }

  onSubmit(input) {
    console.log(tag, "onSubmit", input);
    this.search(input);
  }

  search(input) {
    this.formView.setValue(input);
    this.loadingView.loading(true)
    SearchModel.list(input).then(({ data }) => {
      this.onSearchResult(data.results);
    });
    HistoryModel.add(input);
  }

  onSearchResult(data = []) {
    this.historyView.hide();
    this.resultView.render(data);
    this.loadingView.loading(false)
  }

  onReset() {
    this.resultView.hide();
    this.fetchSearchHistory();
  }

  onClickHistory(keyword) {
    this.search(keyword);
  }

  onClickRemove(keyword) {
    HistoryModel.remove(keyword);
    this.fetchSearchHistory();
  }

  onClickImg(id) {
    console.log(id);
    ModalModel.list(id).then(({ data }) => {
      this.modalView.render(data);
    });
  }

  toggleDark(isDark){
    document.querySelector('body').className = isDark ? 'dark' : ''
  }
}
