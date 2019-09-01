import loginTpl from '../views/login.html'

class LoginController{
    constructor(){
        
    }
    init(){
        this.render()
        this.bindEvent()
        // .then(()=>{
        //     console.log(1)
        // })
    }
    render(){
        $('main').html(loginTpl)
    }
    
    bindEvent() {
        // $('#user-menu span').on('click', function() {
        //   _uri = $(this).attr('id') === 'btn-signup' ? '/api/users/signup' : '/api/users/signin'
        //   _type = $(this).attr('id')
        //   $('#user-form input').val('')
        // })
        
   
        $('#signin').on('click', () => {
          let data = $('#user-form').serialize()
            
          $.ajax({
            url: '/api/users/signin',
            type: 'POST',
            data,
            success: this.bindEventSucc.bind(this),
            error: this.bindEventErr.bind(this)
          })
        })
        $('#signup').on('click', () => {
            let data = $('#user-form').serialize()
      
            $.ajax({
              url: '/api/users/signup',
              type: 'POST',
              data,
              success: this.bindEventSucc.bind(this),
              error: this.bindEventErr.bind(this)
            })
          })
    
        // $('#btn-signout').on('click', () => {
        //   $.ajax({
        //     url: '/api/users/signout',
        //     success: this.bindEventSucc.bind(this),
        //     error: this.bindEventErr.bind(this)
        //   })
        // })
      }
    
      bindEventErr() {
        
      }
    
      bindEventSucc(result) {
       var  _type = $('#signin').attr('id')
        if (_type === 'signup') {
          alert(result.data.msg)
        } else if (_type === 'signin') {
          if (result.ret) {
              location.hash='recommend'
              console.log(1112)
            // let html = userView({
            //   isSignin: true,
            //   username: result.data.username
            // })
        
            // $('#user-menu').html(html)
          } else {
            alert(result.data.msg)
          }
        } 
      }
}
export default new LoginController()