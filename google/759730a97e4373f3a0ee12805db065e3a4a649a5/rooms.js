$(".room").click(function(e){
    var t = e.target;
    if(t.classList.contains("isActive")){
     t.classList.toggle("isActive");      
        console.log("ddd");
    }
    else if(!t.classList.contains("isActive")){
      $(".room").removeClass("isActive");   
        t.classList.toggle("isActive");
        console.log("dsssdd");
    }
}


);