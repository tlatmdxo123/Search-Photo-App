import View from './View.js'

export default class LoadingView extends View{
    constructor(el){
        super(el)
        this.render()
        this.loading(false)
    }

    render(){
        this.el.innerHTML = `
            <div class="load">
                <div class="ball"></div>
                <div class="ball"></div>
                <div class="ball"></div>
            </div>
        `
    }

    loading(isLoading = true){
        console.log("loading",isLoading);
        isLoading ? this.show() : this.hide()
    }
}