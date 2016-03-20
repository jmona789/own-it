$(document).ready(function() {
  $(".modal-trigger").leanModal();
  $(".addItemDisabledBtn").click(function(){
    swal({   title: "Error!",   text: "You need to be logged in to sell an item!",   type: "error",   confirmButtonText: "Okay" });
  });
});