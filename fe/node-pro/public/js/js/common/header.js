function Header(container){ 
    this.container = container;
    this.init();
}

Header.Template = `
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a href="#">
                        <img src="http://jx.1000phone.net/Public/assets/css/images/logo.png?1547187780">
                    </a>
                </div>
                <ul class="nav navbar-nav">
                    <li class="active"><a href="../index.html">教学系统</a></li>
                    <li><a href="html/list.html">OA办公系统</a></li>
                </ul>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right" id="logined">
                        <li><a href="#" data-toggle="modal" data-target="#login_model">登陆</a></li>
                        <li><a href="#" data-toggle="modal" data-target="#register_model">注册</a></li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right hide" id="logining">
                        <li><a href="#" id="js_username"></a></li>
                        <li><a href="#" id="js_out">退出</a></li>
                    </ul>
                </div>
            </div>
        </nav>
`

Header.prototype = {
    init:function(){
        this.createDom();
        this.loginToggle();
        this.logout();
    },
    createDom(){
        this.el = $("<div></div>");
        this.el.append(Header.Template);
        this.container.append(this.el)
    },
    loginToggle(){
        var user = Cookies.get("user");
        var token = Cookies.get("token");

        if(user && token){
            this.el.find("#logined").addClass("hide");
            this.el.find("#logining").removeClass("hide");
            this.el.find("#js_username").text(user);
        }else{
            this.el.find("#logined").removeClass("hide");
            this.el.find("#logining").addClass("hide");
            this.el.find("#js_username").text("");
        }
    },
    logout(){
        this.el.find("#js_out").on("click",$.proxy(this.handleLogoutClick,this))
    },
    handleLogoutClick(){
       var flag = confirm("您确定要退出登陆吗？");
       if(flag){
            Cookies.remove("user");
            Cookies.remove("token");
            location.reload(true);
            location.herf="../../../index.html";
       }else{
           return ;
       }
    }

}