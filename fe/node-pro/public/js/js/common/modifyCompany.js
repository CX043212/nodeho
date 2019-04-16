function ModifyCompany(list){
    this.list = list;
    this.init();
}
ModifyCompany.prototype = {
    init:function(){
       this.itemClick();
       this.modifyClick();
    },
    itemClick:function(){
        this.list.each($.proxy(this.handleEach,this))
    },
    handleEach(i){
        this.list.eq(i).on("click",i,$.proxy(this.handleItemClick,this))
    },
    handleItemClick(e){
        var id = this.list.eq(e.data).attr("data-id");
        var companyName = this.list.eq(e.data).find(".company-name").text();
        var companyScale = this.list.eq(e.data).find(".company-scale").text();
        var companyDes = this.list.eq(e.data).find(".company-des").text();

        
        this.companyName =  $("#Modify-company-name")
        this.companyName.val(companyName)
        this.companyScale = $("#Modify-company-scale");
        this.companyScale.val( companyScale)
        this.companySynopsis = $("#Modify-company-synopsis") ;
        this.companySynopsis.val(companyDes);
        this.companyLogo = $("#Modify-company-logo");
        this.id =  $("#modify_model")
        this.id .attr("data-id",id);
    },
    modifyClick:function(){
        $("#js_ModifyCompany_btn").on("click",$.proxy(this.handleModifyClick,this))
    },
    handleModifyClick(){
        

        var formData = new FormData();
        formData.append("_id", this.id.attr("data-id"));
        formData.append("companyName", this.companyName.val());
        formData.append("companyScale", this.companyScale.val());
        formData.append("companySynopsis", this.companySynopsis.val());
        formData.append("companyLogo", this.companyLogo[0].files[0]);
        console.log(
            this.companyName.val(),
            this.companyScale.val(),
            this.companySynopsis.val(),
            this.companyLogo[0].files[0]
        )

        $.ajax({
            type:"post",
            url:"/company/modifyCompanyInfo",
            contentType:false,
            processData:false,
            data:formData,
            success:$.proxy(this.handleModifySucc,this)
        })
    },
    handleModifySucc(data){
       if(data.status){
           alert("修改成功");
           location.reload(true);
       }
    }
}
