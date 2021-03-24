import View from "./View.js";

export default class LoginView extends View {
  constructor(el) {
    super(el);
    this.btn = this.el.querySelector("button");
    this.change = this.el.querySelector(".change-link");
    this.message = this.el.querySelector(".check-msssage");
    this.userInput = Array.from(this.el.querySelectorAll("input"));

    this.mode = "login";

    this.bindEvent();
  }

  bindEvent() {
    this.change.addEventListener("click", (e) => {
      e.preventDefault();
      this.changeMode(e.target.textContent);
    });

    this.el.addEventListener("submit", (e) => this.onSubmit(e));
  }

  changeMode(text) {
    this.userInput.forEach((input) => (input.value = ""));
    this.message.textContent = "";
    this.mode = text === "회원가입" ? "signup" : "login";
    this.btn.textContent = text === "회원가입" ? "회원가입하기" : "로그인하기";
    this.change.textContent = text === "회원가입" ? "로그인" : "회원가입";
    this.el.querySelector("h1").textContent =
      text === "회원가입" ? "회원가입하기" : "로그인하기";
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {};
    this.userInput.forEach((input) => (userData[input.id] = input.value));

    if (this.mode === "login") {
      this.emit("@login", { userData });
    } else {
      this.emit("@signup", { userData });
    }
  }

  confirmSignup() {
    this.message.textContent = "회원가입이 완료되었습니다.";
  }
  confirmLogin() {
    this.hide();
  }

  showLoginPage() {
    this.el.style.display = "flex";
  }
}
