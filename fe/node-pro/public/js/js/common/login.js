function Login(container){ 
    this.container = container;
    this.init();
}

Login.Template = `
<!-- 登陆模特框 -->
<div class="modal fade" tabindex="-1" role="dialog" id="login_model">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">登陆</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="login_username">用户名</label>
                        <input type="email" class="form-control" id="login_username" placeholder="请输入用户名">
                    </div>
                    <div class="form-group">
                        <label for="login_password">密码</label>
                        <input type="password" class="form-control" id="login_password" placeholder="请输入密码">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
                <button type="button" class="btn btn-primary" id="js_login" data-dismiss="modal">登陆</button>
            </div>
        </div>
    </div>
</div>
<!-- 登陆模特框结束 -->
`

Login.prototype = {
    init:function(){
        this.createDom();
        this.userLogin();
    },
    createDom(){
        this.el = $("<div></div>");
        this.el.append(Login.Template);
        this.container.append(this.el)
    },
    userLogin(){
        this.el.find("#js_login").on("click",$.proxy(this.handleLoginBtn,this))
    },
    handleLoginBtn(){
        var obj = {
            username:this.el.find("#login_username").val(),
            password:this.el.find("#login_password").val(),
        }
        
        $.ajax({
            type:"post",
            url:"/api/login",
            data:obj,
            success:$.proxy(this.handleLoginSucc,this),
        })
    },
    handleLoginSucc(data){
       if(data.status){
           alert(data.info);
           location.reload(true);
       }else{
           alert(data.info);
           location.reload(true);
       }
    }
}