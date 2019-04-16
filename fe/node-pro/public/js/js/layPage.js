function LayPage(){}

LayPage.prototype = {
    init:function(that,data){
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            laypage.render({
                //将生成的分页放在那个容器里面
                elem: "countPage",
                //数据的总条目数 根据总条数和 每页显示的数据 来知道一共多少页
                count: data.count,
                //每页显示的数据
                limit: 5,
                //回调函数只要页码发生改变那么就会触发这个回调函数
                jump: function (obj, first) {
                    
                    //obj里面有2个参数 obj.curr当前的页码  obj.limit是显示多少条数据
                    if (!first) {
                        //_this.page是初始的页码  obj.curr是当触发页码改变的时候最新的页码数
                        that.page = obj.curr;
                        //重新调用Ajax获取分页数据
                        that.handleCompanyClick(that.handleGetCompanyPageSucc);
                    }
                }
            });
        });
    }
}