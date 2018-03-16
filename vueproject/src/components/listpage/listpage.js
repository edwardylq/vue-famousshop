var state={
    Jump:false,
    name:''
}
var mutations={
    refresh(){
         
            $('#liheader .ser').on('click',()=>{
               if($('#liheader input').val()){
                  state.name=$('#liheader input').val();
                 }
            })
            $('#pagetwo .brand').eq(0).show().siblings().hide()
            $('.pageone p').on('click',function(){
            var $idx=$(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('#pagetwo .brand').eq($idx).show().siblings().hide();
                  
                  window.sessionStorage.setItem('style',$(this).text())
             })
             $('#pagetwo ul li').on('click',function(){
                   window.sessionStorage.setItem('type',$(this).children('span').text())
                // $router.push({path:'/Listdetail'})
               state.Jump=true
          })
             
             
    }
}
var actions={
    refresh(context){
        context.commit('refresh')
    }
}

export default{
    state,
    mutations,
    actions
}