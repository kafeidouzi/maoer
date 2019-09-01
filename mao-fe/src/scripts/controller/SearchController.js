import searchTpl from '../views/search.html'

import Data from '../model/data'
class SearchController{
    constructor(){

    }
    init(){
        this.render();
    }
    async render(){
        let info = (await Data.get5()).info
        let html = template.render(searchTpl,{
            info
        })
        $('main').html(html)
    }
}
export default new SearchController()