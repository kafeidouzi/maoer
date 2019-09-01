import recommendTpl from '../views/recommend.html';
import recommend_listTpl from '../views/recommend_list.html'
import recommend_lisTpl  from '../views/recommend_lis.html'

import Data from '../model/data.js'
import BScroll from 'better-scroll'
class RecommendController {
    constructor(){
        
    }
     init(){
         
        this.render().then(()=>{
        this.banner();
        this.imgShow();
        this.lazyLoad()
        })
        
    }
    async render(){
        $('main').html(recommendTpl);
        let info = (await Data.get()).info
        let html = template.render(recommend_listTpl,{
            info
        })
        let info2 = (await Data.get2()).info
        let html2 = template.render(recommend_lisTpl,{
            info2
        })
       $('.list').html(html+html2)
    //    let bScroll = new BScroll('main', {
    //     click: true
    //    });
   
       
    }
    banner(){
        $(document).ready(function () {
            
            var mySwiper = new Swiper ('.swiper-container', {
                //direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项
                
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                },
                autoplay:true,
                autoplay: { 
                    delay: 1000,
                    stopOnLastSlide: false,
                    disableOnInteraction: true,
                    },
              })    
           })        
    }
   
    lazyLoad(){
        $('.content').on('scroll',()=>{
            this.imgShow();
        })
    }
    imgShow(){
        this.list = Array.from($('.list .small-list .picture'));
        this.height = document.documentElement.clientHeight;
        this.top = $('.content').scrollTop();
        this.list.forEach(picture=>{
            picture.setAttribute("data-top",picture.offsetTop)
            this.picture_top = picture.getAttribute('data-top')
            let src = picture.getAttribute('data-img')
            // console.log(picture.children[0]);
            //console.log(this.height)
            this.height+this.top> (this.picture_top - 200)? picture.children[0].src= src: "";    
        })
    }
}

export default  new RecommendController()