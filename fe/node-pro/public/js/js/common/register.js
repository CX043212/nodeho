function Register(container){ 
    this.container = container;
    this.init();
}

Register.Template = `
<!-- 注册模特框 -->
<div class="modal fade" tabindex="-1" role="dialog" id="register_model">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">注册</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="register_username">用户名</label>
                        <input type="email" class="form-control" id="register_username" placeholder="请输入用户名">
                    </div>
                    <div class="form-group">
                        <label for="register_password">密码</label>
                        <input type="password" class="form-control" id="register_password" placeholder="请输入密码">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
                <button type="button" class="btn btn-primary" id="js_register_btn" data-dismiss="modal">注册</button>
            </div>
        </div>
    </div>
</div>
<!-- 注册模特框结束 -->
`

Register.prototype = {
    init:function(){
        this.createDom();
        this.handleRegisterClick();
    },
    createDom(){
        this.el = $("<div></div>");
        this.el.append(Register.Template);
        this.container.append(this.el)
    },
    handleRegisterClick(){
        this.el.find("#js_register_btn").on("click",$.proxy(this.handleClickCb,this))
    },
    handleClickCb(){
        var username = this.el.find("#register_username").val();
        var password = this.el.find("#register_password").val();

        $.ajax({
            type:"post",
            url:"/api/register",
            data:{
                username,
                password,
            },
            success:$.proxy(this.handleRegisterSucc,this)
        })
    },
    handleRegisterSucc(data){
       if(data.status){
           alert("注册成功");
           location.reload(true);
       }
    }
}