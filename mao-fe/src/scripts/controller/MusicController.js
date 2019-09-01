import musicTpl from '../views/music.html'
import music_listTpl from '../views/music_list.html'

import Data from '../model/data.js'
class MusicController{
    constructor(){

    }
    init(){
        this.render();
    }
    async render(){
        $('main').html(musicTpl);
        let info = (await Data.get4())
        console.log(info)
        let html = template.render(music_listTpl,{
            info
        })
        $('.music-content').html(html)
    }
}


export default new MusicController()