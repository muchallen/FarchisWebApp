
$(document).ready(function(){
  $(".nav-item").click(function(e) {
    // first remove the active class from all the nav-links
    $('.nav-item').removeClass('active');
    // then apply active class on the target nav-link's id
   // 
   console.log(e.target.id);
   if(e.target.id=="para"){
    e.target.parentElement.parentElement.classList="active nav-item"
   }

   if(e.target.id=="ank"){
    e.target.parentElement.classList="active nav-item"
   }
 
    // 
  
    // same with the list containers, here you need to switch two classes
   
  });
})
