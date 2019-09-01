import indexTpl from '../views/index.html'

import recommendController from './RecommendController'
import musicController from './MusicController'
import sortController from './SortController'
import searchController from './SearchController'
import loginController from './LoginController'

class Index{
    constructor(){
        this.render();
        this.bindTabbarEvent();
        this.bindHashChange()
        this.aside();
        this.strategies ={
            recommend : recommendController,
            music : musicController,
            sort : sortController,
            search : searchController,
            login : loginController
        }
    }
    render(){
        $('#root').html(indexTpl)
        //recommendController.render()
    }
    bindHashChange(){
        $(window).on('hashchange',()=>{
            let hash = location.hash && location.hash.substr(1) || 'recommend'
            this.setTabActive(hash)
            console.log(this.strategies[hash])
            this.renderMain(this.strategies[hash])
            
        })
        $(window).on('load',()=>{
            let hash =location.hash && location.hash.substr(1) || 'recommend'
            location.hash = hash
            this.renderMain(this.strategies[hash])
            
            this.setTabActive(hash)
            $('aside').removeClass('aaaa');
        })
    }
    renderMain(controller){
        console.log(controller)
        controller.init()
        // .then(()=>{
        //     recommendController.banner()
        //     recommendController.aside()
        //     recommendController.lazyLoad()
        // })
        
    }
    aside(){
        $('.sort-icon').on('tap',()=>{
            $('aside').hasClass('aaaa')? $('aside').removeClass('aaaa'):$('aside').addClass('aaaa');
        })
    }
    setTabActive(hash){
        $(`.tabbar1 li[data-hash =${hash}]`).addClass('active').siblings().removeClass('active')
        if(hash === 'search'){
            $('.sea-input').css({
                'marginTop': 0,
            })
        }else{
            $('.sea-input').css({
                'marginTop': -.35+'rem',
            })
        }
    }
    bindTabbarEvent(){
        $('.tabbar1 li').on('tap',(evt)=>{
            let dataHash = $(evt.target).attr('data-hash')
            location.hash = dataHash
        })
        $('.sea-icon').on('tap',function(){
            console.log(1)
            $('.sea-input').css({
                'marginTop': 0,
            })
            $('aside').removeClass('aaaa');
            let dataHash = $(this).attr('data-hash')
            location.hash = dataHash
            
        })
        $('.cancel').on('tap',(evt)=>{
            $('.sea-input').css({
                'marginTop': -.35+'rem',
            })
            
           console.log(this)
           history.go(-1)
            // let dataHash = $(evt.target).attr('data-hash')
            // location.hash = dataHash
        })
        $('.entry1').on('tap',function(){
            $('aside').removeClass('aaaa');
            let dataHash = $(this).attr('data-hash')
            location.hash = dataHash
        })
        $('.logo').on('tap',(evt)=>{
            let dataHash = $(evt.target).attr('data-hash')
            location.hash = dataHash
        })
    }

}
export default new Index()