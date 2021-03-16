import View from './View.js'

export default class DarkModeView extends View{
    constructor(el){
        super(el)
        const {matches} = window.matchMedia('(prefers-color-scheme:dark)')
        this.isDark = matches
        this.render()
        this.bindEvent()
        this.toggleDark(this.isDark)
    }
    render(){
        this.el.innerHTML = `
            <label class='darkModeBox' for='darkToggle'>
                <div class='round'></div>
            </label>
            <input id='darkToggle' class='darkToggle' type='checkbox'>
        `
        this.darkToggle = this.el.querySelector('#darkToggle')
    }
    bindEvent(){
        this.darkToggle.checked = this.isDark
        this.darkToggle.addEventListener('change',e => this.toggleDark(e.target.checked))
    }

    toggleDark(isDark){
        this.el.querySelector('.round').style.transform = isDark ? 'translate(27px,-50%)' : ''
        this.emit('@toggle',{isDark})
        
    }



}