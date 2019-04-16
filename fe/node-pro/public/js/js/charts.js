function Charts(el,options){
    this.el = el;
    this.options = options;
    this.init();
}

Charts.prototype  = {
    init:function(){
        this.draw()
    },
    draw:function(){
        var myCharts = echarts.init(this.el[0]);
       
        myCharts.setOption(this.options);
    }
}   


/*
    this===原生js中this的指向  $(this)==jquery对象;
*/