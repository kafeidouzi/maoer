import sortTpl from '../views/sort.html'

import Data from '../model/data.js'
class SortController{
    constructor(){

    }
    init(){
        this.render();
    }
    async render(){
        let info =( await Data.get3()).info
        let html = template.render(sortTpl,{
            info
        })
        $('main ').html(html)
        //$('main').html(''+html);
    }    
}
export default new SortController()