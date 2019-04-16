function TabBar() {
    this.container = $("#tabBar");
    this.detailsContent = $(".detailsContent");
    this.page = 1;
   
}

TabBar.Template = `
    <ul class="tabNav">
        <li>
            <a href="##">系统首页</a>
        </li>
        <li>
            <a href="##">公司管理</a>
            <ul>
                <li><a href="##" id="js_company_list">公司列表</a></li>
                <li><a href="##" id="js_add_company">新增公司</a></li>
            </ul>
        </li>
        <li>
            <a href="##" id="scharts">条形图</a>
        </li>
        <li>
            <a href="##">矩形图</a>
        </li>
    </ul>
`;
TabBar.prototype = {
    init: function () {
        this.createDom();
        this.tabToggle();
        this.addCompany();
        this.companyList();
        this.schart();
    },
    createDom: function () {
        this.el = $("<div></div>");
        this.el.append(TabBar.Template);
        this.container.append(this.el);
    },
    tabToggle: function () {
        this.el.find(".tabNav>li").children(0).on("click", $.proxy(this.handleTabClick))
    },
    handleTabClick: function () {
        $(this).next().slideToggle();
    },
    addCompany: function () {
        this.el.find("#js_add_company").on("click", $.proxy(this.handleAdd, this))
    },
    handleAdd: function () {
        this.detailsContent.load("../../../html/addCompany.html", $.proxy(this.handleSucc, this));
    },
    handleSucc: function () {

        $("#js_addCompany_btn").on("click", $.proxy(this.handleAddCompany, this))
    },
    //添加公司
    handleAddCompany: function () {

        this.companyName = $("#company-name");
        this.companyScale = $("#company-scale");
        this.companySynopsis = $("#company-synopsis");
        this.companyLogo = $("#company-logo");

        //模拟form表单提交
        var formData = new FormData();

        formData.append("companyName", this.companyName.val());
        formData.append("companyScale", this.companyScale.val());
        formData.append("companySynopsis", this.companySynopsis.val());
        formData.append("companyLogo", this.companyLogo[0].files[0]);

        $.ajax({
            type: "post",
            url: "/company/addCompany",
            data: formData,
            contentType: false,
            processData: false,
            success: $.proxy(this.handleAddSucc, this)
        })
    },
    handleAddSucc: function (data) {
        if (data.status) {
            alert("添加成功");
            this.companyName.val("")
            this.companyScale.val("")
            this.companySynopsis.val("")
            this.companyLogo.val("")
        }
    },
    //分页开始
    companyList: function () {
        //当点击公司列表的时候 触发了一个函数 handleCompanyClick
        $("#js_company_list").on("click",this.handleGetCompanySucc,$.proxy(this.handleCompanyClick, this))
    },
    handleCompanyClick(params) {
      
        //清空 detailsContent
        this.detailsContent.text("");

        //获取数据 第一次获取数据5条数据 需要将这个5条数据渲染到页面上handleGetCompanySucc
        $.ajax({
            type: "get",
            url: "/company/companyList",
            headers:{
                "X-Token":Cookies.get("token")
            },
            data: {
                page: this.page,
                limit: 5
            },
            success: $.proxy(Object.prototype.toString.call(params) == "[object Function]"?params:params.data, this)
        })
    },
    handleGetCompanySucc(data) {
        if(data.status){
            //渲染到页面上
             this.render(data);
        
            //分页页码
            //new LayPage().init(this,data);
        }else{
            alert(data.info);
        }
    },
    handleGetCompanyPageSucc(data) {
       if(data.status){
            this.render(data);
       }else{
            alert(data.info);
       }

    },
    render(data){
        var str = "";
        for (var i = 0; i < data.data.length; i++) {
            str += `
            <div class="company-item" data-id=${data.data[i]._id}>
                <div class="company_t" data-toggle="modal" data-target="#modify_model">
                    <div class="company-logo">
                        <img src="http://localhost:3000${data.data[i].companyLogo}" />
                    </div>
                    <p class="company-name">${data.data[i].companyName}</p>
                    <p class="company-scale">${data.data[i].companyScale}</p>
                    <p class="company-des">${data.data[i].companySynopsis}</p>
                </div>
                <div class="company-b">
                        <span>27</span>
                        <p>在招职位</p>
                </div>
            </div>
            `
        }
        this.detailsContent.html(str);
        var companyList = $(".company-item");
        new ModifyCompany(companyList);


    },
    //分页结束
    //统计图开始
    schart:function(){
        this.el.find("#scharts").on("click",$.proxy(this.handleSchartClick,this))
    },
    handleSchartClick:function () { 
        this.detailsContent.text("");
        this.detailsContent.append($("<div id='main'></div>"));


        var option = {
            title: {
                text: 'BK1821数据统计'
            },
            tooltip: {},
            legend: {
                data:['身高',"体重","长度"]
            },
            xAxis: {
                data: ["郗新华","马良博	","张宇","赵亚华"]
            },
            yAxis: {
                min:5,
                max:200
            },
            series: [
                {
                name: '身高',
                type: 'pie',
                data: [175, 170, 180, 185]
                },
                {
                    name: '体重',
                    type: 'pie',
                    data: [180, 200, 150, 155]
                },
                {
                    name: '长度',
                    type: 'pie',
                    data: [5, 11, 12, 20]
                }
            ]
        };

        


        new Charts(this.detailsContent.find("#main"),option);
    }
   
}

new TabBar()


/*
    
    page  limit   跳过
    1      5       0
    2      5       5
    3      5       10


    跳过多少条:(page-1)*limit




    后端分页逻辑

    mongodb 语法

    db.表名.find().skip(跳过多少条).limit(显示多少条).then((result)=>{
        result//显示哪些数据
    })

    //做分页
    db.表名.find().skip((page-1)*limit).limit(5).then((result)=>{
        result//显示哪些数据
         cb(result)
    })

    db.表名.find().then((result)=>{
        cb(result)
    })


    controller
        接受用户传递过来的参数
       let {page,limit} = req.query

        findCompany({page,limit},(data)=>{
            if(data.lenth>0){
                findCompanyCount((result)=>{
                    res.json({
                        status:true,
                        data:data,
                        count:result.length
                    })
                })
            }
        })


    返回数据的类型
        {
            status:true,
            data:result,
            count:数据的总条数
        }





    前端：
        点击公司列表
            $.ajax({
                url:"",
                data:{
                    page:1,
                    limit:5
                },
                success:function(data){
                    console.log(data);//这里面有5条数据
                }
            })
            显示 1-5条数据


        点击第二页的时候

            主要变的是page
            (
                但是：
                    问题：
                       1、 jq里面没有办法给函数设定初始值
                       2、死循环
                    

                

            )

            $.ajax({
                url:"",
                data:{
                    page:2,
                    limit:5
                },
                success:function(data){
                    console.log(data);//这里面有5条数据
                }
            })


*/



